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
      sleepContextShift: null,
      contextChangesAction: null,
      sequence03Completed: false,
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
      sleepContextShift: null,
      contextChangesAction: null,
      sequence03Completed: false,
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
      sleepContextShift: null,
      contextChangesAction: null,
      sequence03Completed: false,
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
      sleepContextShift: null,
      contextChangesAction: null,
      sequence03Completed: false,
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
      sleepContextShift: null,
      contextChangesAction: null,
      sequence03Completed: false,
      completedSequences: ["S01_EL_CASO", "S02_ALGO_SALIO_MAL"],
    },
  },
  BEFORE_S03: {
    id: "BEFORE_S03",
    name: "BEFORE_S03 (Entrada a S03)",
    description: "S02 completado, listo para iniciar S03_01_SLEEP_CONTEXT.",
    targetScreen: "S03_01_SLEEP_CONTEXT",
    state: {
      currentSequence: "S03_LO_QUE_NO_VISTE",
      currentScreen: "S03_01_SLEEP_CONTEXT",
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
      sleepContextShift: null,
      contextChangesAction: null,
      sequence03Completed: false,
      completedSequences: ["S01_EL_CASO", "S02_ALGO_SALIO_MAL"],
    },
  },
  AFTER_SLEEP_CONTEXT: {
    id: "AFTER_SLEEP_CONTEXT",
    name: "AFTER_SLEEP_CONTEXT (Sueño visto)",
    description: "sleepContextShift definido, en S03_03_WORK_CONTEXT.",
    targetScreen: "S03_03_WORK_CONTEXT",
    state: {
      currentSequence: "S03_LO_QUE_NO_VISTE",
      currentScreen: "S03_03_WORK_CONTEXT",
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
      sleepContextShift: "significant",
      contextChangesAction: null,
      sequence03Completed: false,
      completedSequences: ["S01_EL_CASO", "S02_ALGO_SALIO_MAL"],
    },
  },
  AFTER_WORK_CONTEXT: {
    id: "AFTER_WORK_CONTEXT",
    name: "AFTER_WORK_CONTEXT (Trabajo visto)",
    description: "sleepContextShift y contextChangesAction listos, en S03_05_RECONSTRUCTION.",
    targetScreen: "S03_05_RECONSTRUCTION",
    state: {
      currentSequence: "S03_LO_QUE_NO_VISTE",
      currentScreen: "S03_05_RECONSTRUCTION",
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
      sleepContextShift: "significant",
      contextChangesAction: "yes",
      sequence03Completed: false,
      completedSequences: ["S01_EL_CASO", "S02_ALGO_SALIO_MAL"],
    },
  },
  AFTER_S03: {
    id: "AFTER_S03",
    name: "AFTER_S03 (Secuencia 03 Completa)",
    description: "S03 completado, en pantalla de cierre S03_07_EXIT.",
    targetScreen: "S03_07_EXIT",
    state: {
      currentSequence: "S03_LO_QUE_NO_VISTE",
      currentScreen: "S03_07_EXIT",
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
      sleepContextShift: "significant",
      contextChangesAction: "yes",
      sequence03Completed: true,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
      ],
    },
  },
};
