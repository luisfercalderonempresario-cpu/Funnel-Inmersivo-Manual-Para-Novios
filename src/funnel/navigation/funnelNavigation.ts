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

  const hasCompletedS03 =
    Boolean(state.sequence03Completed) ||
    state.completedSequences.includes("S03_LO_QUE_NO_VISTE") ||
    state.currentSequence === "S04_LA_PIEZA_INESPERADA";

  // S04 screens require completion of S03
  if (
    targetScreenId === "S04_01_MISSING_PIECE" ||
    targetScreenId === "S04_02_CYCLE_EXPLAINED" ||
    targetScreenId === "S04_03_GUARDRAIL" ||
    targetScreenId === "S04_04_UTILITY" ||
    targetScreenId === "S04_05_ASK_BETTER" ||
    targetScreenId === "S04_06_BELIEF_CHECK"
  ) {
    return hasCompletedS03 || state.currentScreen === targetScreenId;
  }

  // S04_07_MASTER_BELIEF requires cycleUnderstanding or already on screen
  if (targetScreenId === "S04_07_MASTER_BELIEF") {
    return (
      hasCompletedS03 &&
      (state.cycleUnderstanding !== null ||
        state.currentScreen === "S04_07_MASTER_BELIEF")
    );
  }

  // S04_08_EXIT requires cycleUnderstanding or sequence04Completed or already on screen
  if (targetScreenId === "S04_08_EXIT") {
    return (
      hasCompletedS03 &&
      (state.cycleUnderstanding !== null ||
        Boolean(state.sequence04Completed) ||
        state.currentScreen === "S04_08_EXIT")
    );
  }

  const hasCompletedS04 =
    Boolean(state.sequence04Completed) ||
    state.completedSequences.includes("S04_LA_PIEZA_INESPERADA") ||
    state.currentSequence === "S05_VUELVE_A_MIRAR";

  // S05_01_RETURN_TO_CASE & S05_02_SECOND_DECISION require completion of S04
  if (
    targetScreenId === "S05_01_RETURN_TO_CASE" ||
    targetScreenId === "S05_02_SECOND_DECISION"
  ) {
    return hasCompletedS04 || state.currentScreen === targetScreenId;
  }

  // S05_03_DECISION_COMPARE requires secondDecision or already on screen
  if (targetScreenId === "S05_03_DECISION_COMPARE") {
    return (
      hasCompletedS04 &&
      (state.secondDecision !== null ||
        state.currentScreen === "S05_03_DECISION_COMPARE")
    );
  }

  // S05_04_DEMONSTRATION & S05_05_BELIEF_SHIFT require secondDecision or already on screen
  if (
    targetScreenId === "S05_04_DEMONSTRATION" ||
    targetScreenId === "S05_05_BELIEF_SHIFT"
  ) {
    return (
      hasCompletedS04 &&
      (state.secondDecision !== null || state.currentScreen === targetScreenId)
    );
  }

  // S05_06_EXIT requires beliefShift or sequence05Completed or already on screen
  if (targetScreenId === "S05_06_EXIT") {
    return (
      hasCompletedS04 &&
      (state.beliefShift !== null ||
        Boolean(state.sequence05Completed) ||
        state.currentScreen === "S05_06_EXIT")
    );
  }

  const hasCompletedS05 =
    Boolean(state.sequence05Completed) ||
    state.completedSequences.includes("S05_VUELVE_A_MIRAR") ||
    state.currentSequence === "S06_AHORA_PIENSA_EN_ELLA";

  // S06_01_PERSONALIZE & S06_02_RECOGNITION require S05 completion
  if (
    targetScreenId === "S06_01_PERSONALIZE" ||
    targetScreenId === "S06_02_RECOGNITION"
  ) {
    return hasCompletedS05 || state.currentScreen === targetScreenId;
  }

  // S06_03_DESIRE requires personalProblemRecognition or already on screen
  if (targetScreenId === "S06_03_DESIRE") {
    return (
      hasCompletedS05 &&
      (state.personalProblemRecognition !== null ||
        state.currentScreen === "S06_03_DESIRE")
    );
  }

  // S06_04_REFLECTION handles desiredTransformation (or safe fallback)
  if (targetScreenId === "S06_04_REFLECTION") {
    return (
      hasCompletedS05 &&
      (state.desiredTransformation !== null ||
        state.currentScreen === "S06_04_REFLECTION")
    );
  }

  // S06_05_EXIT requires desiredTransformation or sequence06Completed or already on screen
  if (targetScreenId === "S06_05_EXIT") {
    return (
      hasCompletedS05 &&
      (state.desiredTransformation !== null ||
        Boolean(state.sequence06Completed) ||
        state.currentScreen === "S06_05_EXIT")
    );
  }

  const hasCompletedS06 =
    Boolean(state.sequence06Completed) ||
    state.completedSequences.includes("S06_AHORA_PIENSA_EN_ELLA") ||
    state.currentSequence === "S07_Y_SI_EXISTIERA";

  // S07_01_SETUP, S07_02_DEMONSTRATION, S07_03_MECHANISM, S07_04_INTEREST
  if (
    targetScreenId === "S07_01_SETUP" ||
    targetScreenId === "S07_02_DEMONSTRATION" ||
    targetScreenId === "S07_03_MECHANISM" ||
    targetScreenId === "S07_04_INTEREST"
  ) {
    return hasCompletedS06 || state.currentScreen === targetScreenId;
  }

  // S07_05_CONCERN: only normal when toolInterest === "depends"
  if (targetScreenId === "S07_05_CONCERN") {
    return (
      hasCompletedS06 &&
      (state.toolInterest === "depends" ||
        state.currentScreen === "S07_05_CONCERN")
    );
  }

  // S07_06_REVEAL: requires toolInterest !== null (or already on screen)
  if (targetScreenId === "S07_06_REVEAL") {
    return (
      hasCompletedS06 &&
      (state.toolInterest !== null || state.currentScreen === "S07_06_REVEAL")
    );
  }

  // S07_07_PERSONAL_VALUE: requires toolInterest !== null (tolerates desiredTransformation === null via fallback)
  if (targetScreenId === "S07_07_PERSONAL_VALUE") {
    return (
      hasCompletedS06 &&
      (state.toolInterest !== null ||
        state.currentScreen === "S07_07_PERSONAL_VALUE")
    );
  }

  // S07_08_EXIT: requires toolInterest or sequence07Completed or already on screen
  if (targetScreenId === "S07_08_EXIT") {
    return (
      hasCompletedS06 &&
      (state.toolInterest !== null ||
        Boolean(state.sequence07Completed) ||
        state.currentScreen === "S07_08_EXIT")
    );
  }

  // --- S08-A Production Gates ---

  const hasCompletedS07 =
    Boolean(state.sequence07Completed) ||
    state.completedSequences.includes("S07_Y_SI_EXISTIERA") ||
    Boolean(state.trialStarted) ||
    state.currentSequence === "S08_PRUEBA_REAL";

  if (targetScreenId === "S08_01_ENTRY" || targetScreenId === "S08_02_DATE_KNOWLEDGE") {
    return hasCompletedS07 || state.currentScreen === targetScreenId;
  }

  if (targetScreenId === "S08_03_EXACT_DATE") {
    return (
      hasCompletedS07 &&
      (state.dateKnowledge === "exact" || state.currentScreen === "S08_03_EXACT_DATE")
    );
  }

  if (targetScreenId === "S08_04_APPROXIMATE_DATE") {
    return (
      hasCompletedS07 &&
      (state.dateKnowledge === "approximate" ||
        state.currentScreen === "S08_04_APPROXIMATE_DATE")
    );
  }

  if (targetScreenId === "S08_05_EXAMPLE") {
    return (
      hasCompletedS07 &&
      (state.dateKnowledge === "unknown" ||
        state.exampleMode ||
        state.currentScreen === "S08_05_EXAMPLE")
    );
  }

  if (targetScreenId === "S08_06_PREPARING") {
    const hasReference =
      Boolean(state.lastPeriodStartDate) ||
      state.approximateWeeksAgo !== null ||
      state.exampleMode;
    return hasCompletedS07 && (hasReference || state.currentScreen === "S08_06_PREPARING");
  }

  // TODAY requires valid 1–28 day + phase, OR exampleMode (Section 52)
  if (targetScreenId === "S08_07_TODAY") {
    const hasValidEstimate =
      typeof state.estimatedCycleDay === "number" &&
      state.estimatedCycleDay >= 1 &&
      state.estimatedCycleDay <= 28 &&
      state.estimatedPhase !== null;

    const hasValidExample = state.exampleMode && state.estimatedPhase !== null;

    return (
      hasCompletedS07 &&
      (hasValidEstimate || hasValidExample || state.currentScreen === "S08_07_TODAY")
    );
  }

  if (targetScreenId === "S08_08_VALUE") {
    return (
      hasCompletedS07 &&
      (state.estimatedPhase !== null ||
        state.exampleMode ||
        state.currentScreen === "S08_08_VALUE")
    );
  }

  if (targetScreenId === "S08_09_TRIAL_EXIT") {
    return (
      hasCompletedS07 &&
      (state.trialValueResponse !== null ||
        Boolean(state.trialCompleted) ||
        state.currentScreen === "S08_09_TRIAL_EXIT")
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
