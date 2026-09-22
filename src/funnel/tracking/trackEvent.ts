/**
 * MPN - Event Tracking Abstraction
 * Captures canonical funnel events with standard metadata.
 * In DEV mode, logs clearly to console without contaminating production metrics.
 */

import { ScreenId, SequenceId } from "../config/screenRegistry";

export type FunnelEventName =
  | "case_started"
  | "audio_playback_started"
  | "video_started"
  | "video_completed"
  | "initial_decision_selected"
  | "initial_interpretation_selected"
  | "sequence_01_completed"
  | "sequence_02_started"
  | "problem_origin_guess"
  | "interpretation_mirror_viewed"
  | "context_gap_teased"
  | "sequence_02_completed";

export interface FunnelEventPayload {
  event: FunnelEventName;
  sequence: SequenceId;
  screen: ScreenId;
  value?: string | number | boolean | null;
  metadata?: Record<string, unknown>;
  timestamp?: number;
}

export function trackEvent(payload: FunnelEventPayload, options?: { isDevAction?: boolean }): void {
  const isDev = Boolean(import.meta.env.DEV);

  // If triggered by dev tools, do not record as standard conversion
  if (options?.isDevAction) {
    if (isDev) {
      console.debug("[MPN Track Event (DEV TOOL ONLY)]", payload);
    }
    return;
  }

  const enrichedPayload = {
    ...payload,
    timestamp: payload.timestamp ?? Date.now(),
  };

  if (isDev) {
    console.info(
      `%c[MPN EVENT]%c ${enrichedPayload.event} | Screen: ${enrichedPayload.screen} | Value: ${enrichedPayload.value ?? "n/a"}`,
      "background: #111827; color: #60a5fa; font-weight: bold; padding: 2px 6px; border-radius: 4px;",
      "color: inherit;",
      enrichedPayload
    );
    return;
  }

  // Production dispatch ready (future analytics provider hooks)
  // Window telemetry or queue can be attached here
}
