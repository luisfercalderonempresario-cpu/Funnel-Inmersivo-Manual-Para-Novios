/**
 * MPN - Application Routes & Screen Orchestrator
 * Connects URL routes to canonical screens with production progression gates
 * and unrestricted direct access in DEV mode.
 */

import React, { useEffect, useRef } from "react";
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
import { S02Continuation } from "../../funnel/sequences/s02/S02Continuation";
import { S02ProblemOrigin } from "../../funnel/sequences/s02/S02ProblemOrigin";
import { S02Rewind } from "../../funnel/sequences/s02/S02Rewind";
import { S02Mirror } from "../../funnel/sequences/s02/S02Mirror";
import { S02Discovery } from "../../funnel/sequences/s02/S02Discovery";
import { S02Exit } from "../../funnel/sequences/s02/S02Exit";

/**
 * Route sync component:
 * Synchronizes browser direct navigation / popstate (Back/Forward buttons) with FunnelContext.
 *
 * In DEV mode: entering any route directly automatically synchronizes currentScreen.
 * In PRODUCTION mode: enforces sequence progression gates.
 */
const RouteSyncManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, setCurrentScreen } = useFunnel();
  const isDev = Boolean(import.meta.env.DEV);
  const stateRef = useRef(state);
  stateRef.current = state;

  // React ONLY to browser URL changes (direct entry or back/forward)
  useEffect(() => {
    const screenDef = getScreenByRoute(location.pathname);
    if (!screenDef) {
      navigate("/funnel/s01/intro", { replace: true });
      return;
    }

    const currentState = stateRef.current;

    // If currentScreen is ALREADY aligned with this route, do not re-sync or trigger state transitions
    if (currentState.currentScreen === screenDef.id) {
      return;
    }

    if (isDev) {
      // In DEV: unconditionally allow direct screen entry
      setCurrentScreen(screenDef.id as ScreenId, { isDev: true });
    } else {
      // In Production: enforce sequential progression gates
      const allowed = canAccessScreenInProduction(
        screenDef.id as ScreenId,
        currentState
      );
      if (!allowed) {
        const legitimateRoute =
          FUNNEL_SCREENS[currentState.currentScreen]?.route ?? "/funnel/s01/intro";
        if (location.pathname !== legitimateRoute) {
          navigate(legitimateRoute, { replace: true });
        }
      } else {
        setCurrentScreen(screenDef.id as ScreenId);
      }
    }
  }, [location.pathname, isDev, setCurrentScreen, navigate]);

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
                  <Route
                    path="/funnel/s02/continuation"
                    element={<S02Continuation />}
                  />
                  <Route
                    path="/funnel/s02/problem-origin"
                    element={<S02ProblemOrigin />}
                  />
                  <Route
                    path="/funnel/s02/rewind"
                    element={<S02Rewind />}
                  />
                  <Route
                    path="/funnel/s02/mirror"
                    element={<S02Mirror />}
                  />
                  <Route
                    path="/funnel/s02/discovery"
                    element={<S02Discovery />}
                  />
                  <Route
                    path="/funnel/s02/exit"
                    element={<S02Exit />}
                  />
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
