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
] as const;

export function isVideoScreenId(screenId: ScreenId): boolean {
  return (
    screenId === "S01_02_VIDEO" ||
    screenId === "S02_01_CONTINUATION" ||
    screenId === "S02_03_REWIND"
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
