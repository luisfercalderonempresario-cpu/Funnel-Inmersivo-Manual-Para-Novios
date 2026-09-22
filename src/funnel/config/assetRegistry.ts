/**
 * MPN - Asset Registry
 * Central register for all audiovisual and media assets.
 * Components must consume this registry rather than hardcoding paths.
 */

export const VIDEO_ASSETS = {
  S01_CASE: "https://media.manualparanovios.com/MPN_S01_V01_EL_CASO_WEB.mp4",
} as const;

export type VideoAssetKey = keyof typeof VIDEO_ASSETS;
