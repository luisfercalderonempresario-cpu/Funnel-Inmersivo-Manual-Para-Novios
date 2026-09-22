/**
 * MPN - Dev State Presets
 * Pre-configured state scenarios for rapid QA and testing.
 */

import { ScreenId } from "../config/screenRegistry";
import { FunnelState, INITIAL_FUNNEL_STATE } from "../state/funnelTypes";

export interface DevPreset {
  id: string;
  name: string;
  description: string;
  targetScreen: ScreenId;
  state: FunnelState;
}

export const DEV_PRESETS: Record<string, DevPreset> = {
  FRESH: {
    id: "FRESH",
    name: "FRESH (Inicio Limpio)",
    description: "Estado limpio desde S01_01_INTRO sin decisiones guardadas.",
    targetScreen: "S01_01_INTRO",
    state: {
      ...INITIAL_FUNNEL_STATE,
    },
  },
  AFTER_DECISION: {
    id: "AFTER_DECISION",
    name: "AFTER_DECISION (Decisión tomada)",
    description: "Con initialDecision='give_space' colocado en S01_03_DECISION.",
    targetScreen: "S01_04_INTERPRETATION",
    state: {
      currentSequence: "S01_EL_CASO",
      currentScreen: "S01_04_INTERPRETATION",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      initialInterpretation: null,
      completedSequences: [],
    },
  },
  AFTER_S01: {
    id: "AFTER_S01",
    name: "AFTER_S01 (Secuencia 01 Completa)",
    description: "Con initialDecision + initialInterpretation completadas.",
    targetScreen: "S01_05_EXIT",
    state: {
      currentSequence: "S01_EL_CASO",
      currentScreen: "S01_05_EXIT",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      initialInterpretation: {
        id: "angry_with_me",
        label: "Está molesta conmigo.",
      },
      completedSequences: ["S01_EL_CASO"],
    },
  },
};
