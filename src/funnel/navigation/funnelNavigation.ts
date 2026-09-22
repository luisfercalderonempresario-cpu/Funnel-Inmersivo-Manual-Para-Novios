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
    return state.caseStarted;
  }

  // S01_04_INTERPRETATION requires initialDecision made
  if (targetScreenId === "S01_04_INTERPRETATION") {
    return state.initialDecision !== null;
  }

  // S01_05_EXIT requires initialInterpretation made
  if (targetScreenId === "S01_05_EXIT") {
    return state.initialDecision !== null && state.initialInterpretation !== null;
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
