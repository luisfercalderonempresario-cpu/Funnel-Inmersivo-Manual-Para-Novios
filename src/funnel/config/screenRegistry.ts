/**
 * MPN - Screen Registry
 * Central single source of truth for funnel screens and sequence mappings.
 */

export const FUNNEL_SEQUENCES = {
  S01_EL_CASO: {
    id: "S01_EL_CASO",
    name: "S01 — EL CASO",
    order: 1,
  },
  S02_ALGO_SALIO_MAL: {
    id: "S02_ALGO_SALIO_MAL",
    name: "S02 — ALGO SALIÓ MAL",
    order: 2,
  },
  S03_LO_QUE_NO_VISTE: {
    id: "S03_LO_QUE_NO_VISTE",
    name: "S03 — LO QUE NO VISTE",
    order: 3,
  },
  S04_LA_PIEZA_INESPERADA: {
    id: "S04_LA_PIEZA_INESPERADA",
    name: "S04 — LA PIEZA INESPERADA",
    order: 4,
  },
  S05_VUELVE_A_MIRAR: {
    id: "S05_VUELVE_A_MIRAR",
    name: "S05 — VUELVE A MIRAR",
    order: 5,
  },
} as const;

export type SequenceId = keyof typeof FUNNEL_SEQUENCES;

export interface ScreenDefinition {
  readonly id: string;
  readonly sequence: SequenceId;
  readonly name: string;
  readonly route: string;
  readonly stepIndex: number;
}

export const FUNNEL_SCREENS = {
  S01_01_INTRO: {
    id: "S01_01_INTRO",
    sequence: "S01_EL_CASO",
    name: "Introducción",
    route: "/funnel/s01/intro",
    stepIndex: 0,
  },
  S01_02_VIDEO: {
    id: "S01_02_VIDEO",
    sequence: "S01_EL_CASO",
    name: "El Caso",
    route: "/funnel/s01/video",
    stepIndex: 1,
  },
  S01_03_DECISION: {
    id: "S01_03_DECISION",
    sequence: "S01_EL_CASO",
    name: "¿Qué harías tú?",
    route: "/funnel/s01/decision",
    stepIndex: 2,
  },
  S01_04_INTERPRETATION: {
    id: "S01_04_INTERPRETATION",
    sequence: "S01_EL_CASO",
    name: "Interpretación inicial",
    route: "/funnel/s01/interpretation",
    stepIndex: 3,
  },
  S01_05_EXIT: {
    id: "S01_05_EXIT",
    sequence: "S01_EL_CASO",
    name: "Salida S01",
    route: "/funnel/s01/exit",
    stepIndex: 4,
  },
  S02_01_CONTINUATION: {
    id: "S02_01_CONTINUATION",
    sequence: "S02_ALGO_SALIO_MAL",
    name: "Continuación",
    route: "/funnel/s02/continuation",
    stepIndex: 5,
  },
  S02_02_PROBLEM_ORIGIN: {
    id: "S02_02_PROBLEM_ORIGIN",
    sequence: "S02_ALGO_SALIO_MAL",
    name: "¿Dónde empezó el problema?",
    route: "/funnel/s02/problem-origin",
    stepIndex: 6,
  },
  S02_03_REWIND: {
    id: "S02_03_REWIND",
    sequence: "S02_ALGO_SALIO_MAL",
    name: "Rewind",
    route: "/funnel/s02/rewind",
    stepIndex: 7,
  },
  S02_04_MIRROR: {
    id: "S02_04_MIRROR",
    sequence: "S02_ALGO_SALIO_MAL",
    name: "Tú también interpretaste",
    route: "/funnel/s02/mirror",
    stepIndex: 8,
  },
  S02_05_DISCOVERY: {
    id: "S02_05_DISCOVERY",
    sequence: "S02_ALGO_SALIO_MAL",
    name: "El problema de interpretar",
    route: "/funnel/s02/discovery",
    stepIndex: 9,
  },
  S02_06_EXIT: {
    id: "S02_06_EXIT",
    sequence: "S02_ALGO_SALIO_MAL",
    name: "Lo que no viste",
    route: "/funnel/s02/exit",
    stepIndex: 10,
  },
  S03_01_SLEEP_CONTEXT: {
    id: "S03_01_SLEEP_CONTEXT",
    sequence: "S03_LO_QUE_NO_VISTE",
    name: "Contexto de sueño",
    route: "/funnel/s03/sleep-context",
    stepIndex: 11,
  },
  S03_02_SLEEP_SHIFT: {
    id: "S03_02_SLEEP_SHIFT",
    sequence: "S03_LO_QUE_NO_VISTE",
    name: "¿Cambia tu interpretación?",
    route: "/funnel/s03/sleep-shift",
    stepIndex: 12,
  },
  S03_03_WORK_CONTEXT: {
    id: "S03_03_WORK_CONTEXT",
    sequence: "S03_LO_QUE_NO_VISTE",
    name: "Contexto laboral",
    route: "/funnel/s03/work-context",
    stepIndex: 13,
  },
  S03_04_ACTION_SHIFT: {
    id: "S03_04_ACTION_SHIFT",
    sequence: "S03_LO_QUE_NO_VISTE",
    name: "¿Cambiaría tu acción?",
    route: "/funnel/s03/action-shift",
    stepIndex: 14,
  },
  S03_05_RECONSTRUCTION: {
    id: "S03_05_RECONSTRUCTION",
    sequence: "S03_LO_QUE_NO_VISTE",
    name: "Reconstrucción",
    route: "/funnel/s03/reconstruction",
    stepIndex: 15,
  },
  S03_06_CONTEXT_DISCOVERY: {
    id: "S03_06_CONTEXT_DISCOVERY",
    sequence: "S03_LO_QUE_NO_VISTE",
    name: "Eso es contexto",
    route: "/funnel/s03/context-discovery",
    stepIndex: 16,
  },
  S03_07_EXIT: {
    id: "S03_07_EXIT",
    sequence: "S03_LO_QUE_NO_VISTE",
    name: "Salida S03",
    route: "/funnel/s03/exit",
    stepIndex: 17,
  },
  S04_01_MISSING_PIECE: {
    id: "S04_01_MISSING_PIECE",
    sequence: "S04_LA_PIEZA_INESPERADA",
    name: "La pieza que faltaba",
    route: "/funnel/s04/missing-piece",
    stepIndex: 18,
  },
  S04_02_CYCLE_EXPLAINED: {
    id: "S04_02_CYCLE_EXPLAINED",
    sequence: "S04_LA_PIEZA_INESPERADA",
    name: "El ciclo menstrual",
    route: "/funnel/s04/cycle-explained",
    stepIndex: 19,
  },
  S04_03_GUARDRAIL: {
    id: "S04_03_GUARDRAIL",
    sequence: "S04_LA_PIEZA_INESPERADA",
    name: "El guardarraíl",
    route: "/funnel/s04/guardrail",
    stepIndex: 20,
  },
  S04_04_UTILITY: {
    id: "S04_04_UTILITY",
    sequence: "S04_LA_PIEZA_INESPERADA",
    name: "Para qué sirve",
    route: "/funnel/s04/utility",
    stepIndex: 21,
  },
  S04_05_ASK_BETTER: {
    id: "S04_05_ASK_BETTER",
    sequence: "S04_LA_PIEZA_INESPERADA",
    name: "Mejores preguntas",
    route: "/funnel/s04/ask-better",
    stepIndex: 22,
  },
  S04_06_BELIEF_CHECK: {
    id: "S04_06_BELIEF_CHECK",
    sequence: "S04_LA_PIEZA_INESPERADA",
    name: "Comprobación de creencia",
    route: "/funnel/s04/belief-check",
    stepIndex: 23,
  },
  S04_07_MASTER_BELIEF: {
    id: "S04_07_MASTER_BELIEF",
    sequence: "S04_LA_PIEZA_INESPERADA",
    name: "Creencia maestra",
    route: "/funnel/s04/master-belief",
    stepIndex: 24,
  },
  S04_08_EXIT: {
    id: "S04_08_EXIT",
    sequence: "S04_LA_PIEZA_INESPERADA",
    name: "Salida S04",
    route: "/funnel/s04/exit",
    stepIndex: 25,
  },
  S05_01_RETURN_TO_CASE: {
    id: "S05_01_RETURN_TO_CASE",
    sequence: "S05_VUELVE_A_MIRAR",
    name: "Vuelve al caso",
    route: "/funnel/s05/return-to-case",
    stepIndex: 26,
  },
  S05_02_SECOND_DECISION: {
    id: "S05_02_SECOND_DECISION",
    sequence: "S05_VUELVE_A_MIRAR",
    name: "¿Qué harías tú ahora?",
    route: "/funnel/s05/second-decision",
    stepIndex: 27,
  },
  S05_03_DECISION_COMPARE: {
    id: "S05_03_DECISION_COMPARE",
    sequence: "S05_VUELVE_A_MIRAR",
    name: "Comparación de decisión",
    route: "/funnel/s05/decision-compare",
    stepIndex: 28,
  },
  S05_04_DEMONSTRATION: {
    id: "S05_04_DEMONSTRATION",
    sequence: "S05_VUELVE_A_MIRAR",
    name: "Demostración",
    route: "/funnel/s05/demonstration",
    stepIndex: 29,
  },
  S05_05_BELIEF_SHIFT: {
    id: "S05_05_BELIEF_SHIFT",
    sequence: "S05_VUELVE_A_MIRAR",
    name: "Cambio de creencia",
    route: "/funnel/s05/belief-shift",
    stepIndex: 30,
  },
  S05_06_EXIT: {
    id: "S05_06_EXIT",
    sequence: "S05_VUELVE_A_MIRAR",
    name: "Salida S05",
    route: "/funnel/s05/exit",
    stepIndex: 31,
  },
} as const satisfies Record<string, ScreenDefinition>;

export type ScreenId = keyof typeof FUNNEL_SCREENS;

export const SCREEN_ORDER: readonly ScreenId[] = [
  "S01_01_INTRO",
  "S01_02_VIDEO",
  "S01_03_DECISION",
  "S01_04_INTERPRETATION",
  "S01_05_EXIT",
  "S02_01_CONTINUATION",
  "S02_02_PROBLEM_ORIGIN",
  "S02_03_REWIND",
  "S02_04_MIRROR",
  "S02_05_DISCOVERY",
  "S02_06_EXIT",
  "S03_01_SLEEP_CONTEXT",
  "S03_02_SLEEP_SHIFT",
  "S03_03_WORK_CONTEXT",
  "S03_04_ACTION_SHIFT",
  "S03_05_RECONSTRUCTION",
  "S03_06_CONTEXT_DISCOVERY",
  "S03_07_EXIT",
  "S04_01_MISSING_PIECE",
  "S04_02_CYCLE_EXPLAINED",
  "S04_03_GUARDRAIL",
  "S04_04_UTILITY",
  "S04_05_ASK_BETTER",
  "S04_06_BELIEF_CHECK",
  "S04_07_MASTER_BELIEF",
  "S04_08_EXIT",
  "S05_01_RETURN_TO_CASE",
  "S05_02_SECOND_DECISION",
  "S05_03_DECISION_COMPARE",
  "S05_04_DEMONSTRATION",
  "S05_05_BELIEF_SHIFT",
  "S05_06_EXIT",
] as const;

export function isVideoScreenId(screenId: ScreenId): boolean {
  return (
    screenId === "S01_02_VIDEO" ||
    screenId === "S02_01_CONTINUATION" ||
    screenId === "S02_03_REWIND" ||
    screenId === "S03_01_SLEEP_CONTEXT" ||
    screenId === "S03_03_WORK_CONTEXT" ||
    screenId === "S05_01_RETURN_TO_CASE"
  );
}

export function getScreenById(id: string): ScreenDefinition | undefined {
  return (FUNNEL_SCREENS as Record<string, ScreenDefinition>)[id];
}

export function getScreenByRoute(route: string): ScreenDefinition | undefined {
  return Object.values(FUNNEL_SCREENS).find((s) => s.route === route);
}

export function getNextScreenId(currentId: ScreenId): ScreenId | null {
  const index = SCREEN_ORDER.indexOf(currentId);
  if (index >= 0 && index < SCREEN_ORDER.length - 1) {
    return SCREEN_ORDER[index + 1];
  }
  return null;
}

export function getPrevScreenId(currentId: ScreenId): ScreenId | null {
  const index = SCREEN_ORDER.indexOf(currentId);
  if (index > 0) {
    return SCREEN_ORDER[index - 1];
  }
  return null;
}
