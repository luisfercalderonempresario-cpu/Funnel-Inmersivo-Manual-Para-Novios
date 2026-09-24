/**
 * MPN - Funnel State Types
 * Canonical type definitions for Sequence, Screen, and User Decisions.
 */

import { ScreenId, SequenceId } from "../config/screenRegistry";

export type InitialDecisionId =
  | "ask_again"
  | "give_space"
  | "cheer_up"
  | "continue_normally";

export interface InitialDecisionValue {
  id: InitialDecisionId;
  label: string;
}

export type InitialInterpretationId =
  | "angry"
  | "bad_day"
  | "worried"
  | "angry_with_me"
  | "unknown";

export interface InitialInterpretationValue {
  id: InitialInterpretationId;
  label: string;
}

export type ProblemOriginGuessId =
  | "asked_again"
  | "assumed_about_him"
  | "called_her_weird"
  | "unsure";

export interface ProblemOriginGuessValue {
  id: ProblemOriginGuessId;
  label: string;
}

export type SleepContextShiftId = "significant" | "some" | "little";

export type ContextChangesActionId = "yes" | "probably" | "not_necessarily";

export type CycleUnderstandingId =
  | "predict_feelings"
  | "add_context"
  | "know_approach"
  | "unsure";

export type SecondDecisionId = InitialDecisionId;

export interface SecondDecisionValue {
  id: SecondDecisionId;
  label: string;
}

export type BeliefShiftId =
  | "know_what_to_do"
  | "understand_first"
  | "avoid_mistakes"
  | "unsure";

export type PersonalProblemRecognition =
  | "yes"
  | "multiple"
  | "none_recalled"
  | null;

export type DesiredTransformation =
  | "understand_better"
  | "listen_better"
  | "react_calmly"
  | "approach_or_space"
  | "feel_supported"
  | null;

export type ToolInterestId = "yes" | "would_try" | "depends" | null;

export type ToolInterestConcernId =
  | "usefulness"
  | "ease"
  | "non_generalization"
  | "price"
  | null;

export type DateKnowledge = "exact" | "approximate" | "unknown" | null;

export type InputConfidence = "exact" | "approximate" | "example" | null;

export type EstimatedPhase = "menstrual" | "follicular" | "ovulatory" | "luteal" | null;

export type TrialValueResponse = "yes" | "probably" | "unsure" | null;

export function getDecisionChanged(
  initialDecision: InitialDecisionValue | null,
  secondDecision: SecondDecisionValue | null
): boolean | null {
  if (!initialDecision || !secondDecision) return null;
  return initialDecision.id !== secondDecision.id;
}

export interface FunnelState {
  currentSequence: SequenceId;
  currentScreen: ScreenId;
  caseStarted: boolean;
  initialDecision: InitialDecisionValue | null;
  initialInterpretation: InitialInterpretationValue | null;
  problemOriginGuess: ProblemOriginGuessValue | null;
  sequence02Completed?: boolean;
  sleepContextShift: SleepContextShiftId | null;
  contextChangesAction: ContextChangesActionId | null;
  sequence03Completed?: boolean;
  cycleUnderstanding: CycleUnderstandingId | null;
  sequence04Completed?: boolean;
  secondDecision: SecondDecisionValue | null;
  beliefShift: BeliefShiftId | null;
  sequence05Completed?: boolean;
  personalProblemRecognition: PersonalProblemRecognition;
  desiredTransformation: DesiredTransformation;
  sequence06Completed?: boolean;
  toolInterest: ToolInterestId;
  toolInterestConcern: ToolInterestConcernId;
  sequence07Completed?: boolean;
  // S08-A Trial State
  dateKnowledge: DateKnowledge;
  lastPeriodStartDate: string | null;
  approximateWeeksAgo: 1 | 2 | 3 | 4 | null;
  inputConfidence: InputConfidence;
  estimatedCycleDay: number | null;
  estimatedPhase: EstimatedPhase;
  exampleMode: boolean;
  trialValueResponse: TrialValueResponse;
  trialStarted: boolean;
  trialCompleted: boolean;
  productValueExperienced: boolean;
  calculatedForDate: string | null;
  completedSequences: SequenceId[];
}

/**
 * Global application persistence state.
 * Clearly separates `funnel` state from any future product/system data.
 */
export interface ContextoStorageSchema {
  funnel: FunnelState;
  version: 1;
}

export const INITIAL_FUNNEL_STATE: FunnelState = {
  currentSequence: "S01_EL_CASO",
  currentScreen: "S01_01_INTRO",
  caseStarted: false,
  initialDecision: null,
  initialInterpretation: null,
  problemOriginGuess: null,
  sequence02Completed: false,
  sleepContextShift: null,
  contextChangesAction: null,
  sequence03Completed: false,
  cycleUnderstanding: null,
  sequence04Completed: false,
  secondDecision: null,
  beliefShift: null,
  sequence05Completed: false,
  personalProblemRecognition: null,
  desiredTransformation: null,
  sequence06Completed: false,
  toolInterest: null,
  toolInterestConcern: null,
  sequence07Completed: false,
  dateKnowledge: null,
  lastPeriodStartDate: null,
  approximateWeeksAgo: null,
  inputConfidence: null,
  estimatedCycleDay: null,
  estimatedPhase: null,
  exampleMode: false,
  trialValueResponse: null,
  trialStarted: false,
  trialCompleted: false,
  productValueExperienced: false,
  calculatedForDate: null,
  completedSequences: [],
};
