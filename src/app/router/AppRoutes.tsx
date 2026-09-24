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
import { S03SleepContext } from "../../funnel/sequences/s03/S03SleepContext";
import { S03SleepShift } from "../../funnel/sequences/s03/S03SleepShift";
import { S03WorkContext } from "../../funnel/sequences/s03/S03WorkContext";
import { S03ActionShift } from "../../funnel/sequences/s03/S03ActionShift";
import { S03Reconstruction } from "../../funnel/sequences/s03/S03Reconstruction";
import { S03ContextDiscovery } from "../../funnel/sequences/s03/S03ContextDiscovery";
import { S03Exit } from "../../funnel/sequences/s03/S03Exit";
import { S04MissingPiece } from "../../funnel/sequences/s04/S04MissingPiece";
import { S04CycleExplained } from "../../funnel/sequences/s04/S04CycleExplained";
import { S04Guardrail } from "../../funnel/sequences/s04/S04Guardrail";
import { S04Utility } from "../../funnel/sequences/s04/S04Utility";
import { S04AskBetter } from "../../funnel/sequences/s04/S04AskBetter";
import { S04BeliefCheck } from "../../funnel/sequences/s04/S04BeliefCheck";
import { S04MasterBelief } from "../../funnel/sequences/s04/S04MasterBelief";
import { S04Exit } from "../../funnel/sequences/s04/S04Exit";
import { S05ReturnToCase } from "../../funnel/sequences/s05/S05ReturnToCase";
import { S05SecondDecision } from "../../funnel/sequences/s05/S05SecondDecision";
import { S05DecisionCompare } from "../../funnel/sequences/s05/S05DecisionCompare";
import { S05Demonstration } from "../../funnel/sequences/s05/S05Demonstration";
import { S05BeliefShift } from "../../funnel/sequences/s05/S05BeliefShift";
import { S05Exit } from "../../funnel/sequences/s05/S05Exit";
import { S06Personalize } from "../../funnel/sequences/s06/S06Personalize";
import { S06Recognition } from "../../funnel/sequences/s06/S06Recognition";
import { S06Desire } from "../../funnel/sequences/s06/S06Desire";
import { S06Reflection } from "../../funnel/sequences/s06/S06Reflection";
import { S06Exit } from "../../funnel/sequences/s06/S06Exit";
import { S07Setup } from "../../funnel/sequences/s07/S07Setup";
import { S07Demonstration } from "../../funnel/sequences/s07/S07Demonstration";
import { S07Mechanism } from "../../funnel/sequences/s07/S07Mechanism";
import { S07Interest } from "../../funnel/sequences/s07/S07Interest";
import { S07Concern } from "../../funnel/sequences/s07/S07Concern";
import { S07Reveal } from "../../funnel/sequences/s07/S07Reveal";
import { S07PersonalValue } from "../../funnel/sequences/s07/S07PersonalValue";
import { S07Exit } from "../../funnel/sequences/s07/S07Exit";
import { S08Entry } from "../../funnel/sequences/s08/S08Entry";
import { S08DateKnowledge } from "../../funnel/sequences/s08/S08DateKnowledge";
import { S08ExactDate } from "../../funnel/sequences/s08/S08ExactDate";
import { S08ApproximateDate } from "../../funnel/sequences/s08/S08ApproximateDate";
import { S08Example } from "../../funnel/sequences/s08/S08Example";
import { S08Preparing } from "../../funnel/sequences/s08/S08Preparing";
import { S08Today } from "../../funnel/sequences/s08/S08Today";
import { S08Value } from "../../funnel/sequences/s08/S08Value";
import { S08TrialExit } from "../../funnel/sequences/s08/S08TrialExit";
import { S08BBridge } from "../../funnel/sequences/s08b/S08BBridge";
import { S08BPersonalGoal } from "../../funnel/sequences/s08b/S08BPersonalGoal";
import { S08BExpansion } from "../../funnel/sequences/s08b/S08BExpansion";
import { S08BProduct } from "../../funnel/sequences/s08b/S08BProduct";
import { S08BGuardrail } from "../../funnel/sequences/s08b/S08BGuardrail";
import { S08BBonus } from "../../funnel/sequences/s08b/S08BBonus";
import { S08BValueBridge } from "../../funnel/sequences/s08b/S08BValueBridge";
import { S08BOffer } from "../../funnel/sequences/s08b/S08BOffer";
import { S08BGuarantee } from "../../funnel/sequences/s08b/S08BGuarantee";
import { S08BFinalClose } from "../../funnel/sequences/s08b/S08BFinalClose";
import { S08BCheckoutHandoff } from "../../funnel/sequences/s08b/S08BCheckoutHandoff";

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
                  <Route
                    path="/funnel/s03/sleep-context"
                    element={<S03SleepContext />}
                  />
                  <Route
                    path="/funnel/s03/sleep-shift"
                    element={<S03SleepShift />}
                  />
                  <Route
                    path="/funnel/s03/work-context"
                    element={<S03WorkContext />}
                  />
                  <Route
                    path="/funnel/s03/action-shift"
                    element={<S03ActionShift />}
                  />
                  <Route
                    path="/funnel/s03/reconstruction"
                    element={<S03Reconstruction />}
                  />
                  <Route
                    path="/funnel/s03/context-discovery"
                    element={<S03ContextDiscovery />}
                  />
                  <Route
                    path="/funnel/s03/exit"
                    element={<S03Exit />}
                  />
                  <Route
                    path="/funnel/s04/missing-piece"
                    element={<S04MissingPiece />}
                  />
                  <Route
                    path="/funnel/s04/cycle-explained"
                    element={<S04CycleExplained />}
                  />
                  <Route
                    path="/funnel/s04/guardrail"
                    element={<S04Guardrail />}
                  />
                  <Route
                    path="/funnel/s04/utility"
                    element={<S04Utility />}
                  />
                  <Route
                    path="/funnel/s04/ask-better"
                    element={<S04AskBetter />}
                  />
                  <Route
                    path="/funnel/s04/belief-check"
                    element={<S04BeliefCheck />}
                  />
                  <Route
                    path="/funnel/s04/master-belief"
                    element={<S04MasterBelief />}
                  />
                  <Route
                    path="/funnel/s04/exit"
                    element={<S04Exit />}
                  />
                  <Route
                    path="/funnel/s05/return-to-case"
                    element={<S05ReturnToCase />}
                  />
                  <Route
                    path="/funnel/s05/second-decision"
                    element={<S05SecondDecision />}
                  />
                  <Route
                    path="/funnel/s05/decision-compare"
                    element={<S05DecisionCompare />}
                  />
                  <Route
                    path="/funnel/s05/demonstration"
                    element={<S05Demonstration />}
                  />
                  <Route
                    path="/funnel/s05/belief-shift"
                    element={<S05BeliefShift />}
                  />
                  <Route
                    path="/funnel/s05/exit"
                    element={<S05Exit />}
                  />
                  <Route
                    path="/funnel/s06/personalize"
                    element={<S06Personalize />}
                  />
                  <Route
                    path="/funnel/s06/recognition"
                    element={<S06Recognition />}
                  />
                  <Route
                    path="/funnel/s06/desire"
                    element={<S06Desire />}
                  />
                  <Route
                    path="/funnel/s06/reflection"
                    element={<S06Reflection />}
                  />
                  <Route
                    path="/funnel/s06/exit"
                    element={<S06Exit />}
                  />
                  <Route
                    path="/funnel/s07/setup"
                    element={<S07Setup />}
                  />
                  <Route
                    path="/funnel/s07/demonstration"
                    element={<S07Demonstration />}
                  />
                  <Route
                    path="/funnel/s07/mechanism"
                    element={<S07Mechanism />}
                  />
                  <Route
                    path="/funnel/s07/interest"
                    element={<S07Interest />}
                  />
                  <Route
                    path="/funnel/s07/concern"
                    element={<S07Concern />}
                  />
                  <Route
                    path="/funnel/s07/reveal"
                    element={<S07Reveal />}
                  />
                  <Route
                    path="/funnel/s07/personal-value"
                    element={<S07PersonalValue />}
                  />
                  <Route
                    path="/funnel/s07/exit"
                    element={<S07Exit />}
                  />
                  <Route
                    path="/funnel/s08/entry"
                    element={<S08Entry />}
                  />
                  <Route
                    path="/funnel/s08/date-knowledge"
                    element={<S08DateKnowledge />}
                  />
                  <Route
                    path="/funnel/s08/exact-date"
                    element={<S08ExactDate />}
                  />
                  <Route
                    path="/funnel/s08/approximate-date"
                    element={<S08ApproximateDate />}
                  />
                  <Route
                    path="/funnel/s08/example"
                    element={<S08Example />}
                  />
                  <Route
                    path="/funnel/s08/preparing"
                    element={<S08Preparing />}
                  />
                  <Route
                    path="/funnel/s08/today"
                    element={<S08Today />}
                  />
                  <Route
                    path="/funnel/s08/value"
                    element={<S08Value />}
                  />
                  <Route
                    path="/funnel/s08/trial-exit"
                    element={<S08TrialExit />}
                  />
                  <Route
                    path="/funnel/s08/offer/bridge"
                    element={<S08BBridge />}
                  />
                  <Route
                    path="/funnel/s08/offer/personal-goal"
                    element={<S08BPersonalGoal />}
                  />
                  <Route
                    path="/funnel/s08/offer/expansion"
                    element={<S08BExpansion />}
                  />
                  <Route
                    path="/funnel/s08/offer/product"
                    element={<S08BProduct />}
                  />
                  <Route
                    path="/funnel/s08/offer/guardrail"
                    element={<S08BGuardrail />}
                  />
                  <Route
                    path="/funnel/s08/offer/bonus"
                    element={<S08BBonus />}
                  />
                  <Route
                    path="/funnel/s08/offer/value-bridge"
                    element={<S08BValueBridge />}
                  />
                  <Route
                    path="/funnel/s08/offer/offer"
                    element={<S08BOffer />}
                  />
                  <Route
                    path="/funnel/s08/offer/guarantee"
                    element={<S08BGuarantee />}
                  />
                  <Route
                    path="/funnel/s08/offer/final-close"
                    element={<S08BFinalClose />}
                  />
                  <Route
                    path="/funnel/s08/offer/checkout"
                    element={<S08BCheckoutHandoff />}
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
