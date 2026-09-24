/**
 * Cycle calculations and calendar date math for Contexto™ S08-A (PMV).
 *
 * Ground rules:
 * - Day 1 of cycle = First day of last menstrual period.
 * - Calendar-day differences based on local dates (YYYY-MM-DD) to prevent timezone/DST off-by-one errors.
 * - Phase mapping (PMV simplified model):
 *     Days 1–5:   menstrual
 *     Days 6–13:  follicular
 *     Days 14–16: ovulatory
 *     Days 17–28: luteal
 *     Days 29+:   out of range (no modulo 28, requires recent reference or example).
 */

export type EstimatedPhase = "menstrual" | "follicular" | "ovulatory" | "luteal" | null;

export interface DateValidationResult {
  valid: boolean;
  error?: "future" | "too_old" | "invalid_format";
  errorMessage?: string;
  daysAgo?: number;
}

export interface CycleCalculationResult {
  cycleDay: number;
  phase: EstimatedPhase;
  isOutOfRange: boolean;
}

/**
 * Returns today's date formatted as YYYY-MM-DD using local device clock.
 */
export function getTodayLocalDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parses YYYY-MM-DD safely into local Date object (without UTC offset distortion).
 */
export function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr || typeof dateStr !== "string") return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr.trim());
  if (!match) return null;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const day = parseInt(match[3], 10);

  const d = new Date(year, month, day);
  // Verify date didn't overflow (e.g. 2026-02-31)
  if (d.getFullYear() !== year || d.getMonth() !== month || d.getDate() !== day) {
    return null;
  }
  return d;
}

/**
 * Calculates calendar days between two YYYY-MM-DD dates (endStr - startStr).
 * Positive if startStr is in the past compared to endStr.
 */
export function calendarDaysBetween(startStr: string, endStr: string): number {
  const s = parseLocalDate(startStr);
  const e = parseLocalDate(endStr);
  if (!s || !e) return NaN;

  // Measure difference using midnight UTC timestamps of each day to prevent DST shift errors
  const utc1 = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate());
  const utc2 = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());

  return Math.round((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

/**
 * Validates exact date input:
 * - Must be valid calendar date
 * - Must not be in the future (daysAgo >= 0)
 * - Must be within 60 days back (daysAgo <= 60)
 */
export function validateExactDate(
  dateStr: string,
  todayStr: string = getTodayLocalDateString()
): DateValidationResult {
  const parsed = parseLocalDate(dateStr);
  if (!parsed) {
    return {
      valid: false,
      error: "invalid_format",
      errorMessage: "No pudimos usar esa fecha. Revísala e inténtalo de nuevo.",
    };
  }

  const daysAgo = calendarDaysBetween(dateStr, todayStr);

  if (isNaN(daysAgo)) {
    return {
      valid: false,
      error: "invalid_format",
      errorMessage: "No pudimos usar esa fecha. Revísala e inténtalo de nuevo.",
    };
  }

  if (daysAgo < 0) {
    return {
      valid: false,
      error: "future",
      errorMessage: "Esa fecha todavía no ha ocurrido. Revisa el día e inténtalo de nuevo.",
      daysAgo,
    };
  }

  if (daysAgo > 60) {
    return {
      valid: false,
      error: "too_old",
      errorMessage: "Para esta prueba necesitamos una referencia de los últimos 60 días.",
      daysAgo,
    };
  }

  return {
    valid: true,
    daysAgo,
  };
}

/**
 * Maps cycle day (1-based) to estimated phase.
 * Never applies modulo 28. Days > 28 return null phase (out of range).
 */
export function getPhaseForCycleDay(cycleDay: number): EstimatedPhase {
  if (cycleDay >= 1 && cycleDay <= 5) return "menstrual";
  if (cycleDay >= 6 && cycleDay <= 13) return "follicular";
  if (cycleDay >= 14 && cycleDay <= 16) return "ovulatory";
  if (cycleDay >= 17 && cycleDay <= 28) return "luteal";
  return null;
}

/**
 * Calculates cycle day and phase from an exact period start date.
 * Cycle Day = daysAgo + 1 (inclusive count).
 */
export function calculateCycleFromExactDate(
  startDateStr: string,
  todayStr: string = getTodayLocalDateString()
): CycleCalculationResult {
  const daysAgo = calendarDaysBetween(startDateStr, todayStr);
  if (isNaN(daysAgo) || daysAgo < 0) {
    return { cycleDay: 1, phase: "menstrual", isOutOfRange: false };
  }

  const cycleDay = daysAgo + 1;
  const isOutOfRange = cycleDay > 28;
  const phase = isOutOfRange ? null : getPhaseForCycleDay(cycleDay);

  return {
    cycleDay,
    phase,
    isOutOfRange,
  };
}

/**
 * Calculates cycle day and phase from approximate weeks ago.
 * 1 week  -> 7 days ago  -> cycle day 8  -> follicular
 * 2 weeks -> 14 days ago -> cycle day 15 -> ovulatory
 * 3 weeks -> 21 days ago -> cycle day 22 -> luteal
 * 4 weeks -> 28 days ago -> cycle day 29 -> out of range (no phase)
 */
export function calculateCycleFromApproximateWeeks(
  weeksAgo: 1 | 2 | 3 | 4
): CycleCalculationResult {
  const daysAgo = weeksAgo * 7;
  const cycleDay = daysAgo + 1;
  const isOutOfRange = cycleDay > 28;
  const phase = isOutOfRange ? null : getPhaseForCycleDay(cycleDay);

  return {
    cycleDay,
    phase,
    isOutOfRange,
  };
}

/**
 * Fixed example mode configuration (illustrative scenario).
 */
export const EXAMPLE_CYCLE_STATE = {
  cycleDay: 23,
  phase: "luteal" as const,
  isOutOfRange: false,
};
