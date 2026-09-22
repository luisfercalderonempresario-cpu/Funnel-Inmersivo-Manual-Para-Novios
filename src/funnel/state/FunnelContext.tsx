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
} from "./funnelTypes";
import { trackEvent } from "../tracking/trackEvent";

export interface FunnelContextValue {
  state: FunnelState;
  setInitialDecision: (decision: InitialDecisionValue) => void;
  setInitialInterpretation: (interpretation: InitialInterpretationValue) => void;
  setCurrentScreen: (screenId: ScreenId, options?: { isDev?: boolean }) => void;
  markCaseStarted: () => void;
  completeSequence: (sequenceId: SequenceId) => void;
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
  const [state, setState] = useState<FunnelState>(() => loadPersistedState());

  // Automatically persist changes
  useEffect(() => {
    savePersistedState(state);
  }, [state]);

  const setCurrentScreen = useCallback(
    (screenId: ScreenId, options?: { isDev?: boolean }) => {
      setState((prev) => {
        if (prev.currentScreen === screenId) return prev;
        return {
          ...prev,
          currentScreen: screenId,
        };
      });
      if (options?.isDev) {
        console.debug(`[MPN DEV] Navigated directly to ${screenId}`);
      }
    },
    []
  );

  const markCaseStarted = useCallback(() => {
    setState((prev) => ({
      ...prev,
      caseStarted: true,
      currentScreen: "S01_02_VIDEO",
    }));
  }, []);

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
      trackEvent({
        event: "sequence_01_completed",
        sequence: sequenceId,
        screen: "S01_05_EXIT",
      });
    },
    []
  );

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
    console.debug("[MPN] S01 reset completed");
  }, [state]);

  const resetFunnel = useCallback(() => {
    clearPersistedState();
    const fresh = { ...INITIAL_FUNNEL_STATE };
    setState(fresh);
    savePersistedState(fresh);
    console.debug("[MPN] Entire funnel reset completed");
  }, []);

  const applyPreset = useCallback((presetKey: string) => {
    const preset = DEV_PRESETS[presetKey];
    if (!preset) return;
    const nextState = { ...preset.state };
    setState(nextState);
    savePersistedState(nextState);
    console.debug(`[MPN DEV] Applied preset "${preset.name}"`, nextState);
  }, []);

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
    setCurrentScreen,
    markCaseStarted,
    completeSequence,
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
