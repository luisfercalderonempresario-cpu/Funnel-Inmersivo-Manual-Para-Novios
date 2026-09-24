/**
 * MPN - Asset Registry
 * Central register for all audiovisual and media assets.
 * Components must consume this registry rather than hardcoding paths.
 */

export const VIDEO_ASSETS = {
  S01_CASE: "https://media.manualparanovios.com/MPN_S01_V01_EL_CASO_WEB.mp4",
  S02_CONTINUATION: "https://media.manualparanovios.com/S02_01_CONTINUATION_WEB.mp4",
  S02_REWIND: "https://media.manualparanovios.com/S02_03_REWIND_WEB.mp4",
  S03_SLEEP_CONTEXT: "https://media.manualparanovios.com/S03_01_SLEEP_CONTEXT.mp4",
  S03_WORK_CONTEXT: "https://media.manualparanovios.com/S03_03_WORK_CONTEXT_WEB.mp4",
  S05_RETURN_TO_CASE: "https://media.manualparanovios.com/S05_01_RETURN_TO_CASE_WEB.mp4",
  S07_DEMONSTRATION: "https://media.manualparanovios.com/S07_02_DEMONSTRATION_WEB.mp4",
} as const;

export type VideoAssetKey = keyof typeof VIDEO_ASSETS;
