/**
 * MPN - Funnel Navigation Logic
 * Coordinates screen transitions, progression gates, and dev direct routing.
 */

import {
  FUNNEL_SCREENS,
  getNextScreenId,
  getPrevScreenId,
  getScreenById,
  getScreenByRoute,
  SCREEN_ORDER,
  ScreenId,
} from "../config/screenRegistry";
import { FunnelState } from "../state/funnelTypes";

/**
 * Validates whether a user in production mode is allowed to view a target screen
 * based on their current saved progress.
 */
export function canAccessScreenInProduction(
  targetScreenId: ScreenId,
  state: FunnelState
): boolean {
  const targetDef = getScreenById(targetScreenId);
  if (!targetDef) return false;

  // S01_01_INTRO is always accessible
  if (targetScreenId === "S01_01_INTRO") return true;

  // S01_02_VIDEO requires case started
  if (targetScreenId === "S01_02_VIDEO") {
    return state.caseStarted || state.currentScreen === "S01_02_VIDEO";
  }

  // S01_03_DECISION requires case started
  if (targetScreenId === "S01_03_DECISION") {
    return state.caseStarted || state.currentScreen === "S01_03_DECISION";
  }

  // S01_04_INTERPRETATION requires initialDecision made
  if (targetScreenId === "S01_04_INTERPRETATION") {
    return (
      state.initialDecision !== null ||
      state.currentScreen === "S01_04_INTERPRETATION"
    );
  }

  // S01_05_EXIT requires initialInterpretation made
  if (targetScreenId === "S01_05_EXIT") {
    return (
      (state.initialDecision !== null && state.initialInterpretation !== null) ||
      state.currentScreen === "S01_05_EXIT"
    );
  }

  // S02_01_CONTINUATION requires S01 completed or already on screen
  if (targetScreenId === "S02_01_CONTINUATION") {
    return (
      (state.initialDecision !== null && state.initialInterpretation !== null) ||
      state.completedSequences.includes("S01_EL_CASO") ||
      state.currentScreen === "S02_01_CONTINUATION"
    );
  }

  // S02_02_PROBLEM_ORIGIN requires S01 completed or already on screen
  if (targetScreenId === "S02_02_PROBLEM_ORIGIN") {
    return (
      (state.initialDecision !== null && state.initialInterpretation !== null) ||
      state.completedSequences.includes("S01_EL_CASO") ||
      state.currentScreen === "S02_02_PROBLEM_ORIGIN"
    );
  }

  // S02_03_REWIND requires problemOriginGuess or already on screen
  if (targetScreenId === "S02_03_REWIND") {
    return (
      state.problemOriginGuess !== null ||
      state.currentScreen === "S02_03_REWIND"
    );
  }

  // S02_04_MIRROR requires problemOriginGuess or already on screen
  if (targetScreenId === "S02_04_MIRROR") {
    return (
      state.problemOriginGuess !== null ||
      state.currentScreen === "S02_04_MIRROR"
    );
  }

  // S02_05_DISCOVERY requires problemOriginGuess or already on screen
  if (targetScreenId === "S02_05_DISCOVERY") {
    return (
      state.problemOriginGuess !== null ||
      state.currentScreen === "S02_05_DISCOVERY"
    );
  }

  // S02_06_EXIT requires problemOriginGuess or sequence02Completed or already on screen
  if (targetScreenId === "S02_06_EXIT") {
    return (
      state.problemOriginGuess !== null ||
      Boolean(state.sequence02Completed) ||
      state.currentScreen === "S02_06_EXIT"
    );
  }

  // S03_01_SLEEP_CONTEXT requires S02 completed or already on screen
  if (targetScreenId === "S03_01_SLEEP_CONTEXT") {
    return (
      Boolean(state.sequence02Completed) ||
      state.completedSequences.includes("S02_ALGO_SALIO_MAL") ||
      state.currentScreen === "S03_01_SLEEP_CONTEXT"
    );
  }

  // S03_02_SLEEP_SHIFT requires S02 completed or already on screen
  if (targetScreenId === "S03_02_SLEEP_SHIFT") {
    return (
      Boolean(state.sequence02Completed) ||
      state.completedSequences.includes("S02_ALGO_SALIO_MAL") ||
      state.currentScreen === "S03_02_SLEEP_SHIFT"
    );
  }

  // S03_03_WORK_CONTEXT requires sleepContextShift or already on screen
  if (targetScreenId === "S03_03_WORK_CONTEXT") {
    return (
      state.sleepContextShift !== null ||
      state.currentScreen === "S03_03_WORK_CONTEXT"
    );
  }

  // S03_04_ACTION_SHIFT requires sleepContextShift or already on screen
  if (targetScreenId === "S03_04_ACTION_SHIFT") {
    return (
      state.sleepContextShift !== null ||
      state.currentScreen === "S03_04_ACTION_SHIFT"
    );
  }

  // S03_05_RECONSTRUCTION requires sleepContextShift & contextChangesAction or already on screen
  if (targetScreenId === "S03_05_RECONSTRUCTION") {
    return (
      (state.sleepContextShift !== null && state.contextChangesAction !== null) ||
      state.currentScreen === "S03_05_RECONSTRUCTION"
    );
  }

  // S03_06_CONTEXT_DISCOVERY requires sleepContextShift & contextChangesAction or already on screen
  if (targetScreenId === "S03_06_CONTEXT_DISCOVERY") {
    return (
      (state.sleepContextShift !== null && state.contextChangesAction !== null) ||
      state.currentScreen === "S03_06_CONTEXT_DISCOVERY"
    );
  }

  // S03_07_EXIT requires sleepContextShift & contextChangesAction, or sequence03Completed, or already on screen
  if (targetScreenId === "S03_07_EXIT") {
    return (
      (state.sleepContextShift !== null && state.contextChangesAction !== null) ||
      Boolean(state.sequence03Completed) ||
      state.currentScreen === "S03_07_EXIT"
    );
  }

  return false;
}

export function getScreenRoute(screenId: ScreenId): string {
  return FUNNEL_SCREENS[screenId]?.route ?? "/funnel/s01/intro";
}

export {
  FUNNEL_SCREENS,
  getNextScreenId,
  getPrevScreenId,
  getScreenById,
  getScreenByRoute,
  SCREEN_ORDER,
};
