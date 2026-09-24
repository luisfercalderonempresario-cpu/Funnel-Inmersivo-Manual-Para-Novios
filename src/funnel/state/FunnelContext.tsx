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
  CycleUnderstandingId,
  SecondDecisionValue,
  BeliefShiftId,
  PersonalProblemRecognition,
  DesiredTransformation,
  ToolInterestId,
  ToolInterestConcernId,
  getDecisionChanged,
} from "./funnelTypes";
import { trackEvent } from "../tracking/trackEvent";

export interface FunnelContextValue {
  state: FunnelState;
  decisionChanged: boolean | null;
  setInitialDecision: (decision: InitialDecisionValue) => void;
  setInitialInterpretation: (interpretation: InitialInterpretationValue) => void;
  setProblemOriginGuess: (guess: ProblemOriginGuessValue) => void;
  setSleepContextShift: (shift: SleepContextShiftId) => void;
  setContextChangesAction: (action: ContextChangesActionId) => void;
  setCycleUnderstanding: (understanding: CycleUnderstandingId) => void;
  setSecondDecision: (decision: SecondDecisionValue) => void;
  setBeliefShift: (shift: BeliefShiftId) => void;
  setPersonalProblemRecognition: (
    recognition: PersonalProblemRecognition
  ) => void;
  setDesiredTransformation: (
    transformation: DesiredTransformation,
    label: string
  ) => void;
  setToolInterest: (interest: ToolInterestId, label?: string) => void;
  setToolInterestConcern: (
    concern: ToolInterestConcernId,
    label?: string
  ) => void;
  setCurrentScreen: (screenId: ScreenId, options?: { isDev?: boolean }) => void;
  markCaseStarted: () => void;
  completeSequence: (sequenceId: SequenceId) => void;
  markSequence02Completed: () => void;
  markSequence03Completed: () => void;
  markSequence04Completed: () => void;
  markSequence05Completed: () => void;
  markSequence06Completed: () => void;
  markSequence07Completed: () => void;
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

  const setCycleUnderstanding = useCallback(
    (understanding: CycleUnderstandingId) => {
      setState((prev) => ({
        ...prev,
        cycleUnderstanding: understanding,
      }));
      trackEvent({
        event: "cycle_understanding_selected",
        sequence: "S04_LA_PIEZA_INESPERADA",
        screen: "S04_06_BELIEF_CHECK",
        value: understanding,
      });
    },
    []
  );

  const setSecondDecision = useCallback(
    (decision: SecondDecisionValue) => {
      setState((prev) => {
        const changed =
          prev.initialDecision !== null
            ? prev.initialDecision.id !== decision.id
            : null;

        trackEvent({
          event: "second_decision_selected",
          sequence: "S05_VUELVE_A_MIRAR",
          screen: "S05_02_SECOND_DECISION",
          value: decision.id,
          metadata: {
            initialDecisionId: prev.initialDecision?.id ?? null,
            secondDecisionId: decision.id,
            decisionChanged: changed,
          },
        });

        return {
          ...prev,
          secondDecision: decision,
        };
      });
    },
    []
  );

  const setBeliefShift = useCallback((shift: BeliefShiftId) => {
    setState((prev) => ({
      ...prev,
      beliefShift: shift,
    }));
    trackEvent({
      event: "belief_shift_selected",
      sequence: "S05_VUELVE_A_MIRAR",
      screen: "S05_05_BELIEF_SHIFT",
      value: shift,
    });
  }, []);

  const setPersonalProblemRecognition = useCallback(
    (recognition: PersonalProblemRecognition) => {
      setState((prev) => ({
        ...prev,
        personalProblemRecognition: recognition,
      }));
      if (recognition !== null) {
        trackEvent({
          event: "personal_problem_recognition",
          sequence: "S06_AHORA_PIENSA_EN_ELLA",
          screen: "S06_02_RECOGNITION",
          value: recognition,
        });
      }
    },
    []
  );

  const setDesiredTransformation = useCallback(
    (transformation: DesiredTransformation, label: string) => {
      setState((prev) => ({
        ...prev,
        desiredTransformation: transformation,
      }));
      if (transformation !== null) {
        trackEvent({
          event: "desired_transformation_selected",
          sequence: "S06_AHORA_PIENSA_EN_ELLA",
          screen: "S06_03_DESIRE",
          value: transformation,
          metadata: {
            desiredTransformationId: transformation,
            desiredTransformationLabel: label,
          },
        });
      }
    },
    []
  );

  const setToolInterest = useCallback(
    (interest: ToolInterestId, label?: string) => {
      setState((prev) => ({
        ...prev,
        toolInterest: interest,
        // When interest changes to yes or would_try, toolInterestConcern is cleared
        toolInterestConcern: interest === "depends" ? prev.toolInterestConcern : null,
      }));
      if (interest !== null) {
        trackEvent({
          event: "tool_interest_selected",
          sequence: "S07_Y_SI_EXISTIERA",
          screen: "S07_04_INTEREST",
          value: interest,
          metadata: {
            toolInterestId: interest,
            toolInterestLabel: label ?? interest,
          },
        });
      }
    },
    []
  );

  const setToolInterestConcern = useCallback(
    (concern: ToolInterestConcernId, label?: string) => {
      setState((prev) => ({
        ...prev,
        toolInterestConcern: concern,
      }));
      if (concern !== null) {
        trackEvent({
          event: "tool_interest_concern_selected",
          sequence: "S07_Y_SI_EXISTIERA",
          screen: "S07_05_CONCERN",
          value: concern,
          metadata: {
            toolInterestConcernId: concern,
            toolInterestConcernLabel: label ?? concern,
          },
        });
      }
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

  const markSequence04Completed = useCallback(() => {
    setState((prev) => {
      const s04Seq: SequenceId = "S04_LA_PIEZA_INESPERADA";
      const completed: SequenceId[] = prev.completedSequences.includes(s04Seq)
        ? prev.completedSequences
        : [...prev.completedSequences, s04Seq];
      return {
        ...prev,
        sequence04Completed: true,
        completedSequences: completed,
      };
    });
    trackEvent({
      event: "sequence_04_completed",
      sequence: "S04_LA_PIEZA_INESPERADA",
      screen: "S04_08_EXIT",
    });
  }, []);

  const markSequence05Completed = useCallback(() => {
    setState((prev) => {
      const s05Seq: SequenceId = "S05_VUELVE_A_MIRAR";
      const completed: SequenceId[] = prev.completedSequences.includes(s05Seq)
        ? prev.completedSequences
        : [...prev.completedSequences, s05Seq];
      return {
        ...prev,
        sequence05Completed: true,
        completedSequences: completed,
      };
    });
    trackEvent({
      event: "sequence_05_completed",
      sequence: "S05_VUELVE_A_MIRAR",
      screen: "S05_06_EXIT",
    });
  }, []);

  const markSequence06Completed = useCallback(() => {
    setState((prev) => {
      const s06Seq: SequenceId = "S06_AHORA_PIENSA_EN_ELLA";
      const completed: SequenceId[] = prev.completedSequences.includes(s06Seq)
        ? prev.completedSequences
        : [...prev.completedSequences, s06Seq];
      return {
        ...prev,
        sequence06Completed: true,
        completedSequences: completed,
      };
    });
    trackEvent({
      event: "sequence_06_completed",
      sequence: "S06_AHORA_PIENSA_EN_ELLA",
      screen: "S06_05_EXIT",
    });
  }, []);

  const markSequence07Completed = useCallback(() => {
    setState((prev) => {
      const s07Seq: SequenceId = "S07_Y_SI_EXISTIERA";
      const completed: SequenceId[] = prev.completedSequences.includes(s07Seq)
        ? prev.completedSequences
        : [...prev.completedSequences, s07Seq];
      return {
        ...prev,
        sequence07Completed: true,
        completedSequences: completed,
      };
    });
    trackEvent({
      event: "sequence_07_completed",
      sequence: "S07_Y_SI_EXISTIERA",
      screen: "S07_08_EXIT",
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

  const decisionChanged = getDecisionChanged(
    state.initialDecision,
    state.secondDecision
  );

  const value: FunnelContextValue = {
    state,
    decisionChanged,
    setInitialDecision,
    setInitialInterpretation,
    setProblemOriginGuess,
    setSleepContextShift,
    setContextChangesAction,
    setCycleUnderstanding,
    setSecondDecision,
    setBeliefShift,
    setPersonalProblemRecognition,
    setDesiredTransformation,
    setToolInterest,
    setToolInterestConcern,
    setCurrentScreen,
    markCaseStarted,
    completeSequence,
    markSequence02Completed,
    markSequence03Completed,
    markSequence04Completed,
    markSequence05Completed,
    markSequence06Completed,
    markSequence07Completed,
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
