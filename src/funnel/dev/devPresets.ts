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

function createPreset(
  id: string,
  name: string,
  description: string,
  targetScreen: ScreenId,
  stateOverrides: Partial<FunnelState>
): DevPreset {
  return {
    id,
    name,
    description,
    targetScreen,
    state: {
      ...INITIAL_FUNNEL_STATE,
      ...stateOverrides,
    },
  };
}

export const DEV_PRESETS: Record<string, DevPreset> = {
  FRESH: createPreset(
    "FRESH",
    "FRESH (Inicio Limpio)",
    "Estado limpio desde S01_01_INTRO sin decisiones guardadas.",
    "S01_01_INTRO",
    {
      currentSequence: "S01_EL_CASO",
      currentScreen: "S01_01_INTRO",
      caseStarted: false,
    }
  ),

  AFTER_DECISION: createPreset(
    "AFTER_DECISION",
    "AFTER_DECISION (Decisión tomada)",
    "Con initialDecision='give_space' colocado en S01_03_DECISION.",
    "S01_04_INTERPRETATION",
    {
      currentSequence: "S01_EL_CASO",
      currentScreen: "S01_04_INTERPRETATION",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
    }
  ),

  AFTER_S01: createPreset(
    "AFTER_S01",
    "AFTER_S01 (Secuencia 01 Completa)",
    "Con initialDecision + initialInterpretation completadas.",
    "S01_05_EXIT",
    {
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
    }
  ),

  BEFORE_S02: createPreset(
    "BEFORE_S02",
    "BEFORE_S02 (Entrada a S02)",
    "S01 completado, listo para iniciar S02_01_CONTINUATION.",
    "S02_01_CONTINUATION",
    {
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
      completedSequences: ["S01_EL_CASO"],
    }
  ),

  AFTER_PROBLEM_ORIGIN: createPreset(
    "AFTER_PROBLEM_ORIGIN",
    "AFTER_PROBLEM_ORIGIN (Origen elegido)",
    "Con problemOriginGuess seleccionado, en S02_03_REWIND.",
    "S02_03_REWIND",
    {
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
      completedSequences: ["S01_EL_CASO"],
    }
  ),

  AFTER_S02: createPreset(
    "AFTER_S02",
    "AFTER_S02 (Secuencia 02 Completa)",
    "S02 completado, en pantalla de cierre S02_06_EXIT.",
    "S02_06_EXIT",
    {
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
    }
  ),

  BEFORE_S03: createPreset(
    "BEFORE_S03",
    "BEFORE_S03 (Entrada a S03)",
    "S02 completado, listo para iniciar S03_01_SLEEP_CONTEXT.",
    "S03_01_SLEEP_CONTEXT",
    {
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
      completedSequences: ["S01_EL_CASO", "S02_ALGO_SALIO_MAL"],
    }
  ),

  AFTER_SLEEP_CONTEXT: createPreset(
    "AFTER_SLEEP_CONTEXT",
    "AFTER_SLEEP_CONTEXT (Sueño visto)",
    "sleepContextShift definido, en S03_03_WORK_CONTEXT.",
    "S03_03_WORK_CONTEXT",
    {
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
      completedSequences: ["S01_EL_CASO", "S02_ALGO_SALIO_MAL"],
    }
  ),

  AFTER_WORK_CONTEXT: createPreset(
    "AFTER_WORK_CONTEXT",
    "AFTER_WORK_CONTEXT (Trabajo visto)",
    "sleepContextShift y contextChangesAction listos, en S03_05_RECONSTRUCTION.",
    "S03_05_RECONSTRUCTION",
    {
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
      completedSequences: ["S01_EL_CASO", "S02_ALGO_SALIO_MAL"],
    }
  ),

  AFTER_S03: createPreset(
    "AFTER_S03",
    "AFTER_S03 (Secuencia 03 Completa)",
    "S03 completado, en pantalla de cierre S03_07_EXIT.",
    "S03_07_EXIT",
    {
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
    }
  ),

  BEFORE_S04: createPreset(
    "BEFORE_S04",
    "BEFORE_S04 (Entrada a S04)",
    "S03 completado, listo para iniciar S04_01_MISSING_PIECE.",
    "S04_01_MISSING_PIECE",
    {
      currentSequence: "S04_LA_PIEZA_INESPERADA",
      currentScreen: "S04_01_MISSING_PIECE",
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
    }
  ),

  BEFORE_BELIEF_CHECK: createPreset(
    "BEFORE_BELIEF_CHECK",
    "BEFORE_BELIEF_CHECK (Antes del check)",
    "En S04_06_BELIEF_CHECK sin respuesta previa.",
    "S04_06_BELIEF_CHECK",
    {
      currentSequence: "S04_LA_PIEZA_INESPERADA",
      currentScreen: "S04_06_BELIEF_CHECK",
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
    }
  ),

  BELIEF_PREDICT_FEELINGS: createPreset(
    "BELIEF_PREDICT_FEELINGS",
    "BELIEF_PREDICT_FEELINGS (Predicción)",
    "cycleUnderstanding='predict_feelings', feedback visible.",
    "S04_06_BELIEF_CHECK",
    {
      currentSequence: "S04_LA_PIEZA_INESPERADA",
      currentScreen: "S04_06_BELIEF_CHECK",
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
      cycleUnderstanding: "predict_feelings",
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
      ],
    }
  ),

  BELIEF_ADD_CONTEXT: createPreset(
    "BELIEF_ADD_CONTEXT",
    "BELIEF_ADD_CONTEXT (Más contexto)",
    "cycleUnderstanding='add_context', feedback visible.",
    "S04_06_BELIEF_CHECK",
    {
      currentSequence: "S04_LA_PIEZA_INESPERADA",
      currentScreen: "S04_06_BELIEF_CHECK",
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
      cycleUnderstanding: "add_context",
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
      ],
    }
  ),

  BELIEF_KNOW_APPROACH: createPreset(
    "BELIEF_KNOW_APPROACH",
    "BELIEF_KNOW_APPROACH (Saber cómo acercarme)",
    "cycleUnderstanding='know_approach', feedback visible.",
    "S04_06_BELIEF_CHECK",
    {
      currentSequence: "S04_LA_PIEZA_INESPERADA",
      currentScreen: "S04_06_BELIEF_CHECK",
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
      cycleUnderstanding: "know_approach",
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
      ],
    }
  ),

  BELIEF_UNSURE: createPreset(
    "BELIEF_UNSURE",
    "BELIEF_UNSURE (No seguro - S04)",
    "cycleUnderstanding='unsure', feedback visible.",
    "S04_06_BELIEF_CHECK",
    {
      currentSequence: "S04_LA_PIEZA_INESPERADA",
      currentScreen: "S04_06_BELIEF_CHECK",
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
      cycleUnderstanding: "unsure",
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
      ],
    }
  ),

  AFTER_S04: createPreset(
    "AFTER_S04",
    "AFTER_S04 (Secuencia 04 Completa)",
    "S04 completado, en pantalla de cierre S04_08_EXIT.",
    "S04_08_EXIT",
    {
      currentSequence: "S04_LA_PIEZA_INESPERADA",
      currentScreen: "S04_08_EXIT",
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
      cycleUnderstanding: "add_context",
      sequence04Completed: true,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
      ],
    }
  ),

  // ==========================================
  // S05 PRESETS
  // ==========================================
  BEFORE_S05: createPreset(
    "BEFORE_S05",
    "BEFORE_S05 (Entrada a S05)",
    "S04 completado, listo para iniciar S05_01_RETURN_TO_CASE.",
    "S05_01_RETURN_TO_CASE",
    {
      currentSequence: "S05_VUELVE_A_MIRAR",
      currentScreen: "S05_01_RETURN_TO_CASE",
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
      cycleUnderstanding: "add_context",
      sequence04Completed: true,
      secondDecision: null,
      beliefShift: null,
      sequence05Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
      ],
    }
  ),

  SECOND_DECISION_CHANGED: createPreset(
    "SECOND_DECISION_CHANGED",
    "SECOND_DECISION_CHANGED (Decisión cambió)",
    "initial='give_space', second='ask_again', muestra rama A de comparación.",
    "S05_03_DECISION_COMPARE",
    {
      currentSequence: "S05_VUELVE_A_MIRAR",
      currentScreen: "S05_03_DECISION_COMPARE",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      secondDecision: {
        id: "ask_again",
        label: "Le preguntaría otra vez.",
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
      cycleUnderstanding: "add_context",
      sequence04Completed: true,
      beliefShift: null,
      sequence05Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
      ],
    }
  ),

  SECOND_DECISION_SAME: createPreset(
    "SECOND_DECISION_SAME",
    "SECOND_DECISION_SAME (Misma decisión)",
    "initial='give_space', second='give_space', muestra rama B de comparación.",
    "S05_03_DECISION_COMPARE",
    {
      currentSequence: "S05_VUELVE_A_MIRAR",
      currentScreen: "S05_03_DECISION_COMPARE",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      secondDecision: {
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
      cycleUnderstanding: "add_context",
      sequence04Completed: true,
      beliefShift: null,
      sequence05Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
      ],
    }
  ),

  SECOND_DECISION_NO_INITIAL: createPreset(
    "SECOND_DECISION_NO_INITIAL",
    "SECOND_DECISION_NO_INITIAL (Sin initialDecision previa)",
    "initial=null, second='cheer_up', muestra rama C de fallback seguro.",
    "S05_03_DECISION_COMPARE",
    {
      currentSequence: "S05_VUELVE_A_MIRAR",
      currentScreen: "S05_03_DECISION_COMPARE",
      caseStarted: true,
      initialDecision: null,
      secondDecision: {
        id: "cheer_up",
        label: "Intentaría animarla.",
      },
      initialInterpretation: null,
      problemOriginGuess: {
        id: "asked_again",
        label: "Cuando volvió a preguntarle.",
      },
      sequence02Completed: true,
      sleepContextShift: "significant",
      contextChangesAction: "yes",
      sequence03Completed: true,
      cycleUnderstanding: "add_context",
      sequence04Completed: true,
      beliefShift: null,
      sequence05Completed: false,
      completedSequences: [
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
      ],
    }
  ),

  BELIEF_UNDERSTAND_FIRST: createPreset(
    "BELIEF_UNDERSTAND_FIRST",
    "BELIEF_UNDERSTAND_FIRST (Entender antes de reaccionar)",
    "beliefShift='understand_first', feedback reflexivo visible.",
    "S05_05_BELIEF_SHIFT",
    {
      currentSequence: "S05_VUELVE_A_MIRAR",
      currentScreen: "S05_05_BELIEF_SHIFT",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      secondDecision: {
        id: "ask_again",
        label: "Le preguntaría otra vez.",
      },
      sequence02Completed: true,
      sleepContextShift: "significant",
      contextChangesAction: "yes",
      sequence03Completed: true,
      cycleUnderstanding: "add_context",
      sequence04Completed: true,
      beliefShift: "understand_first",
      sequence05Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
      ],
    }
  ),

  BELIEF_KNOW_WHAT_TO_DO: createPreset(
    "BELIEF_KNOW_WHAT_TO_DO",
    "BELIEF_KNOW_WHAT_TO_DO (Saber exactamente qué hacer)",
    "beliefShift='know_what_to_do', feedback pedagógico visible.",
    "S05_05_BELIEF_SHIFT",
    {
      currentSequence: "S05_VUELVE_A_MIRAR",
      currentScreen: "S05_05_BELIEF_SHIFT",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      secondDecision: {
        id: "ask_again",
        label: "Le preguntaría otra vez.",
      },
      sequence02Completed: true,
      sleepContextShift: "significant",
      contextChangesAction: "yes",
      sequence03Completed: true,
      cycleUnderstanding: "add_context",
      sequence04Completed: true,
      beliefShift: "know_what_to_do",
      sequence05Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
      ],
    }
  ),

  BELIEF_AVOID_MISTAKES: createPreset(
    "BELIEF_AVOID_MISTAKES",
    "BELIEF_AVOID_MISTAKES (Evitar equivocarme)",
    "beliefShift='avoid_mistakes', feedback constructivo visible.",
    "S05_05_BELIEF_SHIFT",
    {
      currentSequence: "S05_VUELVE_A_MIRAR",
      currentScreen: "S05_05_BELIEF_SHIFT",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      secondDecision: {
        id: "ask_again",
        label: "Le preguntaría otra vez.",
      },
      sequence02Completed: true,
      sleepContextShift: "significant",
      contextChangesAction: "yes",
      sequence03Completed: true,
      cycleUnderstanding: "add_context",
      sequence04Completed: true,
      beliefShift: "avoid_mistakes",
      sequence05Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
      ],
    }
  ),

  S05_BELIEF_UNSURE: createPreset(
    "S05_BELIEF_UNSURE",
    "S05_BELIEF_UNSURE (No seguro - S05)",
    "beliefShift='unsure', feedback de acompañamiento visible.",
    "S05_05_BELIEF_SHIFT",
    {
      currentSequence: "S05_VUELVE_A_MIRAR",
      currentScreen: "S05_05_BELIEF_SHIFT",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      secondDecision: {
        id: "ask_again",
        label: "Le preguntaría otra vez.",
      },
      sequence02Completed: true,
      sleepContextShift: "significant",
      contextChangesAction: "yes",
      sequence03Completed: true,
      cycleUnderstanding: "add_context",
      sequence04Completed: true,
      beliefShift: "unsure",
      sequence05Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
      ],
    }
  ),

  AFTER_S05: createPreset(
    "AFTER_S05",
    "AFTER_S05 (Secuencia 05 Completa)",
    "S05 completado, en pantalla de cierre S05_06_EXIT.",
    "S05_06_EXIT",
    {
      currentSequence: "S05_VUELVE_A_MIRAR",
      currentScreen: "S05_06_EXIT",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      secondDecision: {
        id: "ask_again",
        label: "Le preguntaría otra vez.",
      },
      sequence02Completed: true,
      sleepContextShift: "significant",
      contextChangesAction: "yes",
      sequence03Completed: true,
      cycleUnderstanding: "add_context",
      sequence04Completed: true,
      beliefShift: "understand_first",
      sequence05Completed: true,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
      ],
    }
  ),

  // ==========================================
  // S06 PRESETS
  // ==========================================
  BEFORE_S06: createPreset(
    "BEFORE_S06",
    "BEFORE_S06 (Entrada a S06)",
    "S05 completado, listo para iniciar S06_01_PERSONALIZE.",
    "S06_01_PERSONALIZE",
    {
      currentSequence: "S06_AHORA_PIENSA_EN_ELLA",
      currentScreen: "S06_01_PERSONALIZE",
      caseStarted: true,
      initialDecision: {
        id: "give_space",
        label: "Le daría espacio.",
      },
      secondDecision: {
        id: "ask_again",
        label: "Le preguntaría otra vez.",
      },
      sequence02Completed: true,
      sleepContextShift: "significant",
      contextChangesAction: "yes",
      sequence03Completed: true,
      cycleUnderstanding: "add_context",
      sequence04Completed: true,
      beliefShift: "understand_first",
      sequence05Completed: true,
      personalProblemRecognition: null,
      desiredTransformation: null,
      sequence06Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
      ],
    }
  ),

  RECOGNITION_YES: createPreset(
    "RECOGNITION_YES",
    "RECOGNITION_YES (Reconocimiento: Sí)",
    "personalProblemRecognition='yes', en S06_03_DESIRE.",
    "S06_03_DESIRE",
    {
      currentSequence: "S06_AHORA_PIENSA_EN_ELLA",
      currentScreen: "S06_03_DESIRE",
      caseStarted: true,
      sequence02Completed: true,
      sequence03Completed: true,
      sequence04Completed: true,
      sequence05Completed: true,
      personalProblemRecognition: "yes",
      desiredTransformation: null,
      sequence06Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
      ],
    }
  ),

  RECOGNITION_MULTIPLE: createPreset(
    "RECOGNITION_MULTIPLE",
    "RECOGNITION_MULTIPLE (Reconocimiento: Más de una vez)",
    "personalProblemRecognition='multiple', en S06_03_DESIRE.",
    "S06_03_DESIRE",
    {
      currentSequence: "S06_AHORA_PIENSA_EN_ELLA",
      currentScreen: "S06_03_DESIRE",
      caseStarted: true,
      sequence02Completed: true,
      sequence03Completed: true,
      sequence04Completed: true,
      sequence05Completed: true,
      personalProblemRecognition: "multiple",
      desiredTransformation: null,
      sequence06Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
      ],
    }
  ),

  RECOGNITION_NONE: createPreset(
    "RECOGNITION_NONE",
    "RECOGNITION_NONE (Reconocimiento: Ninguna ahora)",
    "personalProblemRecognition='none_recalled', en S06_03_DESIRE.",
    "S06_03_DESIRE",
    {
      currentSequence: "S06_AHORA_PIENSA_EN_ELLA",
      currentScreen: "S06_03_DESIRE",
      caseStarted: true,
      sequence02Completed: true,
      sequence03Completed: true,
      sequence04Completed: true,
      sequence05Completed: true,
      personalProblemRecognition: "none_recalled",
      desiredTransformation: null,
      sequence06Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
      ],
    }
  ),

  DESIRE_UNDERSTAND: createPreset(
    "DESIRE_UNDERSTAND",
    "DESIRE_UNDERSTAND (Entenderla mejor)",
    "desiredTransformation='understand_better', en S06_04_REFLECTION.",
    "S06_04_REFLECTION",
    {
      currentSequence: "S06_AHORA_PIENSA_EN_ELLA",
      currentScreen: "S06_04_REFLECTION",
      caseStarted: true,
      sequence02Completed: true,
      sequence03Completed: true,
      sequence04Completed: true,
      sequence05Completed: true,
      personalProblemRecognition: "yes",
      desiredTransformation: "understand_better",
      sequence06Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
      ],
    }
  ),

  DESIRE_LISTEN: createPreset(
    "DESIRE_LISTEN",
    "DESIRE_LISTEN (Escucharla mejor)",
    "desiredTransformation='listen_better', en S06_04_REFLECTION.",
    "S06_04_REFLECTION",
    {
      currentSequence: "S06_AHORA_PIENSA_EN_ELLA",
      currentScreen: "S06_04_REFLECTION",
      caseStarted: true,
      sequence02Completed: true,
      sequence03Completed: true,
      sequence04Completed: true,
      sequence05Completed: true,
      personalProblemRecognition: "yes",
      desiredTransformation: "listen_better",
      sequence06Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
      ],
    }
  ),

  DESIRE_CALM: createPreset(
    "DESIRE_CALM",
    "DESIRE_CALM (Reaccionar con más calma)",
    "desiredTransformation='react_calmly', en S06_04_REFLECTION.",
    "S06_04_REFLECTION",
    {
      currentSequence: "S06_AHORA_PIENSA_EN_ELLA",
      currentScreen: "S06_04_REFLECTION",
      caseStarted: true,
      sequence02Completed: true,
      sequence03Completed: true,
      sequence04Completed: true,
      sequence05Completed: true,
      personalProblemRecognition: "yes",
      desiredTransformation: "react_calmly",
      sequence06Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
      ],
    }
  ),

  DESIRE_APPROACH_SPACE: createPreset(
    "DESIRE_APPROACH_SPACE",
    "DESIRE_APPROACH_SPACE (Acercarme o darle espacio)",
    "desiredTransformation='approach_or_space', en S06_04_REFLECTION.",
    "S06_04_REFLECTION",
    {
      currentSequence: "S06_AHORA_PIENSA_EN_ELLA",
      currentScreen: "S06_04_REFLECTION",
      caseStarted: true,
      sequence02Completed: true,
      sequence03Completed: true,
      sequence04Completed: true,
      sequence05Completed: true,
      personalProblemRecognition: "yes",
      desiredTransformation: "approach_or_space",
      sequence06Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
      ],
    }
  ),

  DESIRE_SUPPORTED: createPreset(
    "DESIRE_SUPPORTED",
    "DESIRE_SUPPORTED (Hacerla sentir acompañada)",
    "desiredTransformation='feel_supported', en S06_04_REFLECTION.",
    "S06_04_REFLECTION",
    {
      currentSequence: "S06_AHORA_PIENSA_EN_ELLA",
      currentScreen: "S06_04_REFLECTION",
      caseStarted: true,
      sequence02Completed: true,
      sequence03Completed: true,
      sequence04Completed: true,
      sequence05Completed: true,
      personalProblemRecognition: "yes",
      desiredTransformation: "feel_supported",
      sequence06Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
      ],
    }
  ),

  DESIRE_NULL_FALLBACK: createPreset(
    "DESIRE_NULL_FALLBACK",
    "DESIRE_NULL_FALLBACK (Sin selección previa)",
    "desiredTransformation=null, prueba de fallback en S06_04_REFLECTION.",
    "S06_04_REFLECTION",
    {
      currentSequence: "S06_AHORA_PIENSA_EN_ELLA",
      currentScreen: "S06_04_REFLECTION",
      caseStarted: true,
      sequence02Completed: true,
      sequence03Completed: true,
      sequence04Completed: true,
      sequence05Completed: true,
      personalProblemRecognition: null,
      desiredTransformation: null,
      sequence06Completed: false,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
      ],
    }
  ),

  AFTER_S06: createPreset(
    "AFTER_S06",
    "AFTER_S06 (Secuencia 06 Completa)",
    "S06 completado, en pantalla de cierre S06_05_EXIT.",
    "S06_05_EXIT",
    {
      currentSequence: "S06_AHORA_PIENSA_EN_ELLA",
      currentScreen: "S06_05_EXIT",
      caseStarted: true,
      sequence02Completed: true,
      sequence03Completed: true,
      sequence04Completed: true,
      sequence05Completed: true,
      personalProblemRecognition: "yes",
      desiredTransformation: "understand_better",
      sequence06Completed: true,
      completedSequences: [
        "S01_EL_CASO",
        "S02_ALGO_SALIO_MAL",
        "S03_LO_QUE_NO_VISTE",
        "S04_LA_PIEZA_INESPERADA",
        "S05_VUELVE_A_MIRAR",
        "S06_AHORA_PIENSA_EN_ELLA",
      ],
    }
  ),
};
