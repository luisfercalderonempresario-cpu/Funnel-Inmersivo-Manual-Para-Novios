/**
 * S05_01_RETURN_TO_CASE — Vuelve al caso
 * Cinematic return to the original scene.
 * Signal is identical: "Martes. 7:43 P. M." -> "Estoy cansada."
 * Seamless vertical 9:16 video playback via persistent player layer.
 * Hard narrative transition to S05_02_SECOND_DECISION upon completion.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { useMedia } from "../../media/MediaContext";
import { VIDEO_ASSETS } from "../../config/assetRegistry";
import { trackEvent } from "../../tracking/trackEvent";

export const S05ReturnToCase: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const {
    videoRef,
    status,
    isPlaying,
    playAsset,
    markVideoCompleted,
    retryPlayback,
  } = useMedia();

  const [needsGestureToResume, setNeedsGestureToResume] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [introCueVisible, setIntroCueVisible] = useState<boolean>(true);
  const hasStartedRef = useRef<boolean>(false);
  const hasEndedRef = useRef<boolean>(false);
  const hasTrackedMountRef = useRef<boolean>(false);

  // Track sequence_05_started and return_to_case_viewed once on mount
  useEffect(() => {
    if (hasTrackedMountRef.current) return;
    hasTrackedMountRef.current = true;

    trackEvent({
      event: "sequence_05_started",
      sequence: "S05_VUELVE_A_MIRAR",
      screen: "S05_01_RETURN_TO_CASE",
    });

    trackEvent({
      event: "return_to_case_viewed",
      sequence: "S05_VUELVE_A_MIRAR",
      screen: "S05_01_RETURN_TO_CASE",
    });
  }, []);

  // Initiate playback of S05 return-to-case video
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const startPlayback = async () => {
      const ok = await playAsset(VIDEO_ASSETS.S05_RETURN_TO_CASE, {
        sequence: "S05_VUELVE_A_MIRAR",
        screen: "S05_01_RETURN_TO_CASE",
      });
      if (!ok) {
        setNeedsGestureToResume(true);
      }
    };

    startPlayback();
  }, [playAsset]);

  useEffect(() => {
    if (isPlaying) {
      setNeedsGestureToResume(false);
      // Fade out the intro cue after playback has begun
      const t = setTimeout(() => {
        setIntroCueVisible(false);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [isPlaying]);

  // Video element event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (hasEndedRef.current) return;
      hasEndedRef.current = true;
      setHasEnded(true);

      markVideoCompleted({
        sequence: "S05_VUELVE_A_MIRAR",
        screen: "S05_01_RETURN_TO_CASE",
        asset: VIDEO_ASSETS.S05_RETURN_TO_CASE,
      });

      // Hard narrative transition to S05_02_SECOND_DECISION
      setCurrentScreen("S05_02_SECOND_DECISION");
    };

    const handleError = () => {
      console.warn("[MPN Video S05_01] Media load error event triggered");
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [videoRef, markVideoCompleted, setCurrentScreen]);

  const handleResumeGesture = async () => {
    const ok = await playAsset(VIDEO_ASSETS.S05_RETURN_TO_CASE, {
      sequence: "S05_VUELVE_A_MIRAR",
      screen: "S05_01_RETURN_TO_CASE",
    });
    if (ok) {
      setNeedsGestureToResume(false);
    }
  };

  return (
    <div
      id="screen-s05-01-return-to-case"
      className="relative w-full h-[100dvh] bg-transparent flex items-center justify-center overflow-hidden select-none pointer-events-none"
    >
      <div className="relative w-full h-full max-w-[calc(100dvh*9/16)] max-h-[100dvh] aspect-[9/16] bg-transparent flex items-center justify-center">
        {/* Cinematic Intro Cue: "Martes. 7:43 P. M." */}
        {introCueVisible && !hasEnded && (
          <div
            id="s05-intro-cue"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 pointer-events-none transition-opacity duration-700"
          >
            <div className="text-center flex flex-col gap-2 animate-fade-in">
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-mono">
                Martes.
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-widest font-mono">
                7:43 P. M.
              </h2>
            </div>
          </div>
        )}

        {/* REFRESH / DIRECT LOAD AUDIO GESTURE OVERLAY */}
        {needsGestureToResume && status !== "playing" && !hasEnded && (
          <div
            id="video-resume-overlay-s05-01"
            className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-6 animate-fade-in">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">
                MANUAL PARA NOVIOS
              </span>
              <div className="text-center space-y-1">
                <p className="text-neutral-400 text-xs uppercase tracking-widest font-mono">
                  Martes · 7:43 P. M.
                </p>
                <p className="text-white text-lg font-medium">
                  Volver al caso.
                </p>
              </div>
              <button
                id="btn-resume-s05-return-case"
                type="button"
                onClick={handleResumeGesture}
                className="w-full h-14 bg-white text-neutral-950 font-semibold text-base rounded-md flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all cursor-pointer"
              >
                <span>🔊</span>
                <span>VOLVER A MIRAR</span>
              </button>
            </div>
          </div>
        )}

        {/* AUDIO BLOCKED FALLBACK */}
        {status === "audio_blocked" && !needsGestureToResume && (
          <div
            id="video-audio-blocked-overlay-s05-01"
            className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-4">
              <p className="text-neutral-200 text-base">
                Activa el sonido para continuar
              </p>
              <button
                id="btn-activate-video-sound-s05-01"
                type="button"
                onClick={retryPlayback}
                className="w-full h-14 bg-white text-neutral-950 font-semibold text-base rounded-md flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>🔊</span>
                <span>ACTIVAR SONIDO</span>
              </button>
            </div>
          </div>
        )}

        {/* ASSET LOAD ERROR FALLBACK */}
        {status === "load_error" && (
          <div
            id="video-load-error-overlay-s05-01"
            className="absolute inset-0 z-30 bg-black/95 flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-4">
              <p className="text-neutral-300 text-base">
                No pudimos cargar la escena.
              </p>
              <button
                id="btn-retry-video-load-s05-01"
                type="button"
                onClick={retryPlayback}
                className="w-full h-13 bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-base rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>INTENTAR DE NUEVO</span>
              </button>

              {import.meta.env.DEV && (
                <div className="mt-3 p-3 bg-neutral-900/90 border border-neutral-800 rounded text-left text-[11px] font-mono text-neutral-400 space-y-2">
                  <p className="text-amber-400 font-semibold">[QA DEV]:</p>
                  <p className="text-neutral-300 break-all">
                    Asset: <span className="text-white">{VIDEO_ASSETS.S05_RETURN_TO_CASE}</span>
                  </p>
                  <button
                    id="btn-dev-simulate-ended-s05-01"
                    type="button"
                    onClick={() => {
                      markVideoCompleted({
                        sequence: "S05_VUELVE_A_MIRAR",
                        screen: "S05_01_RETURN_TO_CASE",
                        asset: VIDEO_ASSETS.S05_RETURN_TO_CASE,
                      });
                      setCurrentScreen("S05_02_SECOND_DECISION");
                    }}
                    className="w-full py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded border border-neutral-700 text-center font-sans text-xs cursor-pointer"
                  >
                    Simular fin de video → S05_02
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blackout beat on video end before transition */}
        {hasEnded && (
          <div className="absolute inset-0 z-40 bg-black transition-opacity duration-300 opacity-100" />
        )}
      </div>
    </div>
  );
};
