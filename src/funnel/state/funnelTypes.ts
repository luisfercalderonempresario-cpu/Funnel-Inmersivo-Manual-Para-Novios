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

export interface FunnelState {
  currentSequence: SequenceId;
  currentScreen: ScreenId;
  caseStarted: boolean;
  initialDecision: InitialDecisionValue | null;
  initialInterpretation: InitialInterpretationValue | null;
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
  completedSequences: [],
};
