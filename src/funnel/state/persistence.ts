/**
 * MPN - Local Storage Persistence Layer
 * Handles safe read/write operations under the CONTEXTO_STATE_V1 namespace.
 */

import { ContextoStorageSchema, FunnelState, INITIAL_FUNNEL_STATE } from "./funnelTypes";
import {
  calculateCycleFromExactDate,
  getTodayLocalDateString,
  EXAMPLE_CYCLE_STATE,
} from "../utils/cycleCalculations";

export const STORAGE_KEY = "CONTEXTO_STATE_V1";

export function loadPersistedState(): FunnelState {
  if (typeof window === "undefined") {
    return { ...INITIAL_FUNNEL_STATE };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...INITIAL_FUNNEL_STATE };
    }

    const parsed = JSON.parse(raw) as Partial<ContextoStorageSchema>;
    if (!parsed || typeof parsed !== "object" || !parsed.funnel) {
      return { ...INITIAL_FUNNEL_STATE };
    }

    const funnel = parsed.funnel;

    // Validate minimal structural integrity
    const result: FunnelState = {
      currentSequence: funnel.currentSequence || INITIAL_FUNNEL_STATE.currentSequence,
      currentScreen: funnel.currentScreen || INITIAL_FUNNEL_STATE.currentScreen,
      caseStarted: Boolean(funnel.caseStarted),
      initialDecision:
        funnel.initialDecision && typeof funnel.initialDecision === "object"
          ? {
              id: funnel.initialDecision.id,
              label: funnel.initialDecision.label || "",
            }
          : null,
      initialInterpretation:
        funnel.initialInterpretation && typeof funnel.initialInterpretation === "object"
          ? {
              id: funnel.initialInterpretation.id,
              label: funnel.initialInterpretation.label || "",
            }
          : null,
      problemOriginGuess:
        funnel.problemOriginGuess && typeof funnel.problemOriginGuess === "object"
          ? {
              id: funnel.problemOriginGuess.id,
              label: funnel.problemOriginGuess.label || "",
            }
          : null,
      sequence02Completed: Boolean(funnel.sequence02Completed),
      sleepContextShift:
        funnel.sleepContextShift === "significant" ||
        funnel.sleepContextShift === "some" ||
        funnel.sleepContextShift === "little"
          ? funnel.sleepContextShift
          : null,
      contextChangesAction:
        funnel.contextChangesAction === "yes" ||
        funnel.contextChangesAction === "probably" ||
        funnel.contextChangesAction === "not_necessarily"
          ? funnel.contextChangesAction
          : null,
      sequence03Completed: Boolean(funnel.sequence03Completed),
      cycleUnderstanding:
        funnel.cycleUnderstanding === "predict_feelings" ||
        funnel.cycleUnderstanding === "add_context" ||
        funnel.cycleUnderstanding === "know_approach" ||
        funnel.cycleUnderstanding === "unsure"
          ? funnel.cycleUnderstanding
          : null,
      sequence04Completed: Boolean(funnel.sequence04Completed),
      secondDecision:
        funnel.secondDecision && typeof funnel.secondDecision === "object"
          ? {
              id: funnel.secondDecision.id,
              label: funnel.secondDecision.label || "",
            }
          : null,
      beliefShift:
        funnel.beliefShift === "know_what_to_do" ||
        funnel.beliefShift === "understand_first" ||
        funnel.beliefShift === "avoid_mistakes" ||
        funnel.beliefShift === "unsure"
          ? funnel.beliefShift
          : null,
      sequence05Completed: Boolean(funnel.sequence05Completed),
      personalProblemRecognition:
        funnel.personalProblemRecognition === "yes" ||
        funnel.personalProblemRecognition === "multiple" ||
        funnel.personalProblemRecognition === "none_recalled"
          ? funnel.personalProblemRecognition
          : null,
      desiredTransformation:
        funnel.desiredTransformation === "understand_better" ||
        funnel.desiredTransformation === "listen_better" ||
        funnel.desiredTransformation === "react_calmly" ||
        funnel.desiredTransformation === "approach_or_space" ||
        funnel.desiredTransformation === "feel_supported"
          ? funnel.desiredTransformation
          : null,
      sequence06Completed: Boolean(funnel.sequence06Completed),
      toolInterest:
        funnel.toolInterest === "yes" ||
        funnel.toolInterest === "would_try" ||
        funnel.toolInterest === "depends"
          ? funnel.toolInterest
          : null,
      toolInterestConcern:
        funnel.toolInterest === "depends" &&
        (funnel.toolInterestConcern === "usefulness" ||
          funnel.toolInterestConcern === "ease" ||
          funnel.toolInterestConcern === "non_generalization" ||
          funnel.toolInterestConcern === "price")
          ? funnel.toolInterestConcern
          : null,
      sequence07Completed: Boolean(funnel.sequence07Completed),
      // S08-A Trial State Hydration
      dateKnowledge:
        funnel.dateKnowledge === "exact" ||
        funnel.dateKnowledge === "approximate" ||
        funnel.dateKnowledge === "unknown"
          ? funnel.dateKnowledge
          : null,
      lastPeriodStartDate:
        typeof funnel.lastPeriodStartDate === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(funnel.lastPeriodStartDate)
          ? funnel.lastPeriodStartDate
          : null,
      approximateWeeksAgo:
        funnel.approximateWeeksAgo === 1 ||
        funnel.approximateWeeksAgo === 2 ||
        funnel.approximateWeeksAgo === 3 ||
        funnel.approximateWeeksAgo === 4
          ? funnel.approximateWeeksAgo
          : null,
      inputConfidence:
        funnel.inputConfidence === "exact" ||
        funnel.inputConfidence === "approximate" ||
        funnel.inputConfidence === "example"
          ? funnel.inputConfidence
          : null,
      exampleMode: Boolean(funnel.exampleMode),
      trialValueResponse:
        funnel.trialValueResponse === "yes" ||
        funnel.trialValueResponse === "probably" ||
        funnel.trialValueResponse === "unsure"
          ? funnel.trialValueResponse
          : null,
      trialStarted: Boolean(funnel.trialStarted),
      trialCompleted: Boolean(funnel.trialCompleted),
      productValueExperienced: Boolean(funnel.productValueExperienced),
      calculatedForDate:
        typeof funnel.calculatedForDate === "string" ? funnel.calculatedForDate : null,
      estimatedCycleDay:
        typeof funnel.estimatedCycleDay === "number" ? funnel.estimatedCycleDay : null,
      estimatedPhase:
        funnel.estimatedPhase === "menstrual" ||
        funnel.estimatedPhase === "follicular" ||
        funnel.estimatedPhase === "ovulatory" ||
        funnel.estimatedPhase === "luteal"
          ? funnel.estimatedPhase
          : null,
      completedSequences: Array.isArray(funnel.completedSequences)
        ? funnel.completedSequences
        : [],
    };

    // Recalculation on local calendar day shift (Section 54)
    const today = getTodayLocalDateString();
    if (
      result.inputConfidence === "exact" &&
      result.lastPeriodStartDate &&
      result.calculatedForDate !== today
    ) {
      const calc = calculateCycleFromExactDate(result.lastPeriodStartDate, today);
      result.estimatedCycleDay = calc.cycleDay;
      result.estimatedPhase = calc.phase;
      result.calculatedForDate = today;
    } else if (result.exampleMode) {
      result.estimatedCycleDay = EXAMPLE_CYCLE_STATE.cycleDay;
      result.estimatedPhase = EXAMPLE_CYCLE_STATE.phase;
    }

    return result;
  } catch (err) {
    // If JSON is corrupt or localStorage is blocked in iframe/private mode
    console.warn("[MPN Persistence] Safe fallback to initial state:", err);
    return { ...INITIAL_FUNNEL_STATE };
  }
}

export function savePersistedState(state: FunnelState): void {
  if (typeof window === "undefined") return;

  try {
    const payload: ContextoStorageSchema = {
      version: 1,
      funnel: state,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("[MPN Persistence] Could not save state:", err);
  }
}

export function clearPersistedState(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("[MPN Persistence] Could not clear state:", err);
  }
}
