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
    name: "Salida",
    route: "/funnel/s01/exit",
    stepIndex: 4,
  },
} as const satisfies Record<string, ScreenDefinition>;

export type ScreenId = keyof typeof FUNNEL_SCREENS;

export const SCREEN_ORDER: readonly ScreenId[] = [
  "S01_01_INTRO",
  "S01_02_VIDEO",
  "S01_03_DECISION",
  "S01_04_INTERPRETATION",
  "S01_05_EXIT",
] as const;

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
