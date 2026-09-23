/**
 * MPN - Funnel Context & Global State Provider
 * Manages sequence progression, decision states, and persistence.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FUNNEL_SCREENS,
  getNextScreenId,
  getPrevScreenId,
  ScreenId,
  SequenceId,
} from "../config/screenRegistry";
import { DEV_PRESETS } from "../dev/devPresets";
import {
  clearPersistedState,
  loadPersistedState,
  savePersistedState,
} from "./persistence";
import {
  FunnelState,
  INITIAL_FUNNEL_STATE,
  InitialDecisionValue,
  InitialInterpretationValue,
  ProblemOriginGuessValue,
  SleepContextShiftId,
  ContextChangesActionId,
} from "./funnelTypes";
import { trackEvent } from "../tracking/trackEvent";

export interface FunnelContextValue {
  state: FunnelState;
  setInitialDecision: (decision: InitialDecisionValue) => void;
  setInitialInterpretation: (interpretation: InitialInterpretationValue) => void;
  setProblemOriginGuess: (guess: ProblemOriginGuessValue) => void;
  setSleepContextShift: (shift: SleepContextShiftId) => void;
  setContextChangesAction: (action: ContextChangesActionId) => void;
  setCurrentScreen: (screenId: ScreenId, options?: { isDev?: boolean }) => void;
  markCaseStarted: () => void;
  completeSequence: (sequenceId: SequenceId) => void;
  markSequence02Completed: () => void;
  markSequence03Completed: () => void;
  resetS01: () => void;
  resetFunnel: () => void;
  applyPreset: (presetKey: string) => void;
  navigateToNextScreen: (isDev?: boolean) => void;
  navigateToPrevScreen: (isDev?: boolean) => void;
}

const FunnelContext = createContext<FunnelContextValue | null>(null);

export const FunnelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<FunnelState>(() => loadPersistedState());

  // Automatically persist changes
  useEffect(() => {
    savePersistedState(state);
  }, [state]);

  const setCurrentScreen = useCallback(
    (screenId: ScreenId, options?: { isDev?: boolean; replace?: boolean }) => {
      const screenDef = FUNNEL_SCREENS[screenId];
      setState((prev) => {
        if (
          prev.currentScreen === screenId &&
          (!screenDef || prev.currentSequence === screenDef.sequence)
        ) {
          return prev;
        }
        return {
          ...prev,
          currentScreen: screenId,
          currentSequence: screenDef ? screenDef.sequence : prev.currentSequence,
        };
      });

      const targetRoute = screenDef?.route;
      if (targetRoute && location.pathname !== targetRoute) {
        navigate(targetRoute, { replace: options?.replace ?? false });
      }

      if (options?.isDev) {
        console.debug(`[MPN DEV] Navigated directly to ${screenId}`);
      }
    },
    [location.pathname, navigate]
  );

  const markCaseStarted = useCallback(() => {
    setState((prev) => ({
      ...prev,
      caseStarted: true,
      currentScreen: "S01_02_VIDEO",
    }));

    const targetRoute = FUNNEL_SCREENS["S01_02_VIDEO"]?.route;
    if (targetRoute && location.pathname !== targetRoute) {
      navigate(targetRoute);
    }
  }, [location.pathname, navigate]);

  const setInitialDecision = useCallback(
    (decision: InitialDecisionValue) => {
      setState((prev) => ({
        ...prev,
        initialDecision: decision,
      }));
      trackEvent({
        event: "initial_decision_selected",
        sequence: "S01_EL_CASO",
        screen: "S01_03_DECISION",
        value: decision.id,
        metadata: { label: decision.label },
      });
    },
    []
  );

  const setInitialInterpretation = useCallback(
    (interpretation: InitialInterpretationValue) => {
      setState((prev) => ({
        ...prev,
        initialInterpretation: interpretation,
      }));
      trackEvent({
        event: "initial_interpretation_selected",
        sequence: "S01_EL_CASO",
        screen: "S01_04_INTERPRETATION",
        value: interpretation.id,
        metadata: { label: interpretation.label },
      });
    },
    []
  );

  const setProblemOriginGuess = useCallback(
    (guess: ProblemOriginGuessValue) => {
      setState((prev) => ({
        ...prev,
        problemOriginGuess: guess,
      }));
      trackEvent({
        event: "problem_origin_guess",
        sequence: "S02_ALGO_SALIO_MAL",
        screen: "S02_02_PROBLEM_ORIGIN",
        value: guess.id,
        metadata: { label: guess.label },
      });
    },
    []
  );

  const setSleepContextShift = useCallback(
    (shift: SleepContextShiftId) => {
      setState((prev) => ({
        ...prev,
        sleepContextShift: shift,
      }));
      trackEvent({
        event: "sleep_context_shift",
        sequence: "S03_LO_QUE_NO_VISTE",
        screen: "S03_02_SLEEP_SHIFT",
        value: shift,
      });
    },
    []
  );

  const setContextChangesAction = useCallback(
    (action: ContextChangesActionId) => {
      setState((prev) => ({
        ...prev,
        contextChangesAction: action,
      }));
      trackEvent({
        event: "context_changes_action",
        sequence: "S03_LO_QUE_NO_VISTE",
        screen: "S03_04_ACTION_SHIFT",
        value: action,
      });
    },
    []
  );

  const completeSequence = useCallback(
    (sequenceId: SequenceId) => {
      setState((prev) => {
        const completed = prev.completedSequences.includes(sequenceId)
          ? prev.completedSequences
          : [...prev.completedSequences, sequenceId];
        return {
          ...prev,
          completedSequences: completed,
        };
      });
      if (sequenceId === "S01_EL_CASO") {
        trackEvent({
          event: "sequence_01_completed",
          sequence: sequenceId,
          screen: "S01_05_EXIT",
        });
      }
    },
    []
  );

  const markSequence02Completed = useCallback(() => {
    setState((prev) => {
      const s02Seq: SequenceId = "S02_ALGO_SALIO_MAL";
      const completed: SequenceId[] = prev.completedSequences.includes(s02Seq)
        ? prev.completedSequences
        : [...prev.completedSequences, s02Seq];
      return {
        ...prev,
        sequence02Completed: true,
        completedSequences: completed,
      };
    });
    trackEvent({
      event: "context_gap_teased",
      sequence: "S02_ALGO_SALIO_MAL",
      screen: "S02_06_EXIT",
    });
    trackEvent({
      event: "sequence_02_completed",
      sequence: "S02_ALGO_SALIO_MAL",
      screen: "S02_06_EXIT",
    });
  }, []);

  const markSequence03Completed = useCallback(() => {
    setState((prev) => {
      const s03Seq: SequenceId = "S03_LO_QUE_NO_VISTE";
      const completed: SequenceId[] = prev.completedSequences.includes(s03Seq)
        ? prev.completedSequences
        : [...prev.completedSequences, s03Seq];
      return {
        ...prev,
        sequence03Completed: true,
        completedSequences: completed,
      };
    });
    trackEvent({
      event: "sequence_03_completed",
      sequence: "S03_LO_QUE_NO_VISTE",
      screen: "S03_07_EXIT",
    });
  }, []);

  const resetS01 = useCallback(() => {
    const newState: FunnelState = {
      ...state,
      currentSequence: "S01_EL_CASO",
      currentScreen: "S01_01_INTRO",
      caseStarted: false,
      initialDecision: null,
      initialInterpretation: null,
      completedSequences: state.completedSequences.filter(
        (s) => s !== "S01_EL_CASO"
      ),
    };
    setState(newState);
    savePersistedState(newState);
    navigate("/funnel/s01/intro", { replace: true });
    console.debug("[MPN] S01 reset completed");
  }, [state, navigate]);

  const resetFunnel = useCallback(() => {
    clearPersistedState();
    const fresh = { ...INITIAL_FUNNEL_STATE };
    setState(fresh);
    savePersistedState(fresh);
    navigate("/funnel/s01/intro", { replace: true });
    console.debug("[MPN] Entire funnel reset completed");
  }, [navigate]);

  const applyPreset = useCallback(
    (presetKey: string) => {
      const preset = DEV_PRESETS[presetKey];
      if (!preset) return;
      const nextState = { ...preset.state };
      setState(nextState);
      savePersistedState(nextState);
      const targetRoute = FUNNEL_SCREENS[nextState.currentScreen]?.route;
      if (targetRoute) {
        navigate(targetRoute);
      }
      console.debug(`[MPN DEV] Applied preset "${preset.name}"`, nextState);
    },
    [navigate]
  );

  const navigateToNextScreen = useCallback(
    (isDev = false) => {
      const next = getNextScreenId(state.currentScreen);
      if (next) {
        setCurrentScreen(next, { isDev });
      }
    },
    [state.currentScreen, setCurrentScreen]
  );

  const navigateToPrevScreen = useCallback(
    (isDev = false) => {
      const prev = getPrevScreenId(state.currentScreen);
      if (prev) {
        setCurrentScreen(prev, { isDev });
      }
    },
    [state.currentScreen, setCurrentScreen]
  );

  const value: FunnelContextValue = {
    state,
    setInitialDecision,
    setInitialInterpretation,
    setProblemOriginGuess,
    setSleepContextShift,
    setContextChangesAction,
    setCurrentScreen,
    markCaseStarted,
    completeSequence,
    markSequence02Completed,
    markSequence03Completed,
    resetS01,
    resetFunnel,
    applyPreset,
    navigateToNextScreen,
    navigateToPrevScreen,
  };

  return (
    <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>
  );
};

export function useFunnel(): FunnelContextValue {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error("useFunnel must be used within a FunnelProvider");
  }
  return context;
}
