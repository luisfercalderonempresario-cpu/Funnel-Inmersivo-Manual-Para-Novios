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
      problemOriginGuess: null,
      sequence02Completed: false,
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
      problemOriginGuess: null,
      sequence02Completed: false,
      completedSequences: ["S01_EL_CASO"],
    },
  },
  BEFORE_S02: {
    id: "BEFORE_S02",
    name: "BEFORE_S02 (Entrada a S02)",
    description: "S01 completado, listo para iniciar S02_01_CONTINUATION.",
    targetScreen: "S02_01_CONTINUATION",
    state: {
      currentSequence: "S02_ALGO_SALIO_MAL",
      currentScreen: "S02_01_CONTINUATION",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      initialInterpretation: {
        id: "angry_with_me",
        label: "Está molesta conmigo.",
      },
      problemOriginGuess: null,
      sequence02Completed: false,
      completedSequences: ["S01_EL_CASO"],
    },
  },
  AFTER_PROBLEM_ORIGIN: {
    id: "AFTER_PROBLEM_ORIGIN",
    name: "AFTER_PROBLEM_ORIGIN (Origen elegido)",
    description: "Con problemOriginGuess seleccionado, en S02_03_REWIND.",
    targetScreen: "S02_03_REWIND",
    state: {
      currentSequence: "S02_ALGO_SALIO_MAL",
      currentScreen: "S02_03_REWIND",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      initialInterpretation: {
        id: "angry_with_me",
        label: "Está molesta conmigo.",
      },
      problemOriginGuess: {
        id: "asked_again",
        label: "Cuando volvió a preguntarle.",
      },
      sequence02Completed: false,
      completedSequences: ["S01_EL_CASO"],
    },
  },
  AFTER_S02: {
    id: "AFTER_S02",
    name: "AFTER_S02 (Secuencia 02 Completa)",
    description: "S02 completado, en pantalla de cierre S02_06_EXIT.",
    targetScreen: "S02_06_EXIT",
    state: {
      currentSequence: "S02_ALGO_SALIO_MAL",
      currentScreen: "S02_06_EXIT",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      initialInterpretation: {
        id: "angry_with_me",
        label: "Está molesta conmigo.",
      },
      problemOriginGuess: {
        id: "asked_again",
        label: "Cuando volvió a preguntarle.",
      },
      sequence02Completed: true,
      completedSequences: ["S01_EL_CASO", "S02_ALGO_SALIO_MAL"],
    },
  },
};
