/**
 * MPN - Application Routes & Screen Orchestrator
 * Connects URL routes to canonical screens with production progression gates
 * and unrestricted direct access in DEV mode.
 */

import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FUNNEL_SCREENS,
  getScreenByRoute,
  ScreenId,
} from "../../funnel/config/screenRegistry";
import { canAccessScreenInProduction } from "../../funnel/navigation/funnelNavigation";
import { FunnelProvider, useFunnel } from "../../funnel/state/FunnelContext";
import { MediaProvider } from "../../funnel/media/MediaContext";
import { VideoPlayerLayer } from "../../funnel/media/VideoPlayerLayer";
import { DevNavigator } from "../../funnel/dev/DevNavigator";

import { S01Intro } from "../../funnel/sequences/s01/S01Intro";
import { S01Video } from "../../funnel/sequences/s01/S01Video";
import { S01Decision } from "../../funnel/sequences/s01/S01Decision";
import { S01Interpretation } from "../../funnel/sequences/s01/S01Interpretation";
import { S01Exit } from "../../funnel/sequences/s01/S01Exit";

/**
 * Route sync component:
 * Keeps React Router URL and FunnelContext state bidirectionally in sync.
 * In DEV mode: entering any route directly automatically synchronizes currentScreen
 * without forcing previous steps.
 * In PRODUCTION mode: enforces sequence progression gates.
 */
const RouteSyncManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, setCurrentScreen } = useFunnel();
  const isDev = Boolean(import.meta.env.DEV);

  // Sync route -> state on direct URL entry or back/forward browser buttons
  useEffect(() => {
    const screenDef = getScreenByRoute(location.pathname);
    if (!screenDef) return;

    if (isDev) {
      // In DEV: unconditionally allow direct screen entry
      if (state.currentScreen !== screenDef.id) {
        setCurrentScreen(screenDef.id as ScreenId, { isDev: true });
      }
    } else {
      // In Production: enforce sequential progression
      const allowed = canAccessScreenInProduction(
        screenDef.id as ScreenId,
        state
      );
      if (!allowed) {
        const legitimateRoute =
          FUNNEL_SCREENS[state.currentScreen]?.route ?? "/funnel/s01/intro";
        if (location.pathname !== legitimateRoute) {
          navigate(legitimateRoute, { replace: true });
        }
      } else if (state.currentScreen !== screenDef.id) {
        setCurrentScreen(screenDef.id as ScreenId);
      }
    }
  }, [location.pathname, isDev, state, setCurrentScreen, navigate]);

  // Sync state -> route when user advances through in-app interactions
  useEffect(() => {
    const targetRoute = FUNNEL_SCREENS[state.currentScreen]?.route;
    if (targetRoute && location.pathname !== targetRoute) {
      navigate(targetRoute);
    }
  }, [state.currentScreen, navigate, location.pathname]);

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <FunnelProvider>
        <MediaProvider>
          <RouteSyncManager>
            <div className="relative min-h-[100dvh] w-full bg-[#090a0f] text-neutral-100 flex flex-col items-center justify-center overflow-x-hidden">
              {/* Persistent Video Player for zero-latency audio starts */}
              <VideoPlayerLayer />

              {/* Screen Router View */}
              <div className="relative z-20 w-full min-h-[100dvh]">
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/funnel/s01/intro" replace />}
                  />
                  <Route path="/funnel/s01/intro" element={<S01Intro />} />
                  <Route path="/funnel/s01/video" element={<S01Video />} />
                  <Route
                    path="/funnel/s01/decision"
                    element={<S01Decision />}
                  />
                  <Route
                    path="/funnel/s01/interpretation"
                    element={<S01Interpretation />}
                  />
                  <Route path="/funnel/s01/exit" element={<S01Exit />} />
                  {/* Catch-all route */}
                  <Route
                    path="*"
                    element={<Navigate to="/funnel/s01/intro" replace />}
                  />
                </Routes>
              </div>

              {/* Dev Navigator Tool (DEV ONLY) */}
              <DevNavigator />
            </div>
          </RouteSyncManager>
        </MediaProvider>
      </FunnelProvider>
    </BrowserRouter>
  );
};
