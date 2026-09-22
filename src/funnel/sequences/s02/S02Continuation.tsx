/**
 * S02_01_CONTINUATION — Continuación del Caso
 * Shows what happened after "Sí... estoy cansada."
 * Pure vertical 9:16 cinematic video experience.
 * Seamless continuation of audio/video experience.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { useMedia } from "../../media/MediaContext";
import { VIDEO_ASSETS } from "../../config/assetRegistry";
import { trackEvent } from "../../tracking/trackEvent";

export const S02Continuation: React.FC = () => {
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
  const hasStartedRef = useRef<boolean>(false);
  const hasEndedRef = useRef<boolean>(false);

  // Track sequence_02_started once on mount
  useEffect(() => {
    trackEvent({
      event: "sequence_02_started",
      sequence: "S02_ALGO_SALIO_MAL",
      screen: "S02_01_CONTINUATION",
    });
  }, []);

  // Initiate playback of S02 continuation video
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const startContinuation = async () => {
      const ok = await playAsset(VIDEO_ASSETS.S02_CONTINUATION, {
        sequence: "S02_ALGO_SALIO_MAL",
        screen: "S02_01_CONTINUATION",
      });
      if (!ok) {
        setNeedsGestureToResume(true);
      }
    };

    startContinuation();
  }, [playAsset]);

  useEffect(() => {
    if (isPlaying) {
      setNeedsGestureToResume(false);
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
        sequence: "S02_ALGO_SALIO_MAL",
        screen: "S02_01_CONTINUATION",
        asset: VIDEO_ASSETS.S02_CONTINUATION,
      });

      // Direct, unidirectional canonical transition to S02_02_PROBLEM_ORIGIN
      setCurrentScreen("S02_02_PROBLEM_ORIGIN");
    };

    const handleError = () => {
      console.warn("[MPN Video S02_01] Media load error event triggered");
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [videoRef, markVideoCompleted, setCurrentScreen]);

  const handleResumeGesture = async () => {
    const ok = await playAsset(VIDEO_ASSETS.S02_CONTINUATION, {
      sequence: "S02_ALGO_SALIO_MAL",
      screen: "S02_01_CONTINUATION",
    });
    if (ok) {
      setNeedsGestureToResume(false);
    }
  };

  return (
    <div
      id="screen-s02-01-continuation"
      className="relative w-full h-[100dvh] bg-transparent flex items-center justify-center overflow-hidden select-none pointer-events-none"
    >
      <div className="relative w-full h-full max-w-[calc(100dvh*9/16)] max-h-[100dvh] aspect-[9/16] bg-transparent flex items-center justify-center">
        {/* REFRESH / DIRECT LOAD AUDIO GESTURE OVERLAY */}
        {needsGestureToResume && status !== "playing" && !hasEnded && (
          <div
            id="video-resume-overlay-s02-01"
            className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-6 animate-fade-in">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">
                MANUAL PARA NOVIOS
              </span>
              <p className="text-white text-lg font-medium">
                Continuar el caso.
              </p>
              <button
                id="btn-resume-s02-continuation"
                type="button"
                onClick={handleResumeGesture}
                className="w-full h-14 bg-white text-neutral-950 font-semibold text-base rounded-md flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all cursor-pointer"
              >
                <span>🔊</span>
                <span>CONTINUAR EL CASO</span>
              </button>
            </div>
          </div>
        )}

        {/* AUDIO BLOCKED FALLBACK */}
        {status === "audio_blocked" && !needsGestureToResume && (
          <div
            id="video-audio-blocked-overlay-s02-01"
            className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-4">
              <p className="text-neutral-200 text-base">
                Activa el sonido para continuar
              </p>
              <button
                id="btn-activate-video-sound-s02-01"
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
            id="video-load-error-overlay-s02-01"
            className="absolute inset-0 z-30 bg-black/95 flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-4">
              <p className="text-neutral-300 text-base">
                No pudimos cargar la continuación.
              </p>
              <button
                id="btn-retry-video-load-s02-01"
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
                    Asset: <span className="text-white">{VIDEO_ASSETS.S02_CONTINUATION}</span>
                  </p>
                  <button
                    id="btn-dev-simulate-ended-s02-01"
                    type="button"
                    onClick={() => {
                      markVideoCompleted({
                        sequence: "S02_ALGO_SALIO_MAL",
                        screen: "S02_01_CONTINUATION",
                        asset: VIDEO_ASSETS.S02_CONTINUATION,
                      });
                      setCurrentScreen("S02_02_PROBLEM_ORIGIN");
                    }}
                    className="w-full py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded border border-neutral-700 text-center font-sans text-xs cursor-pointer"
                  >
                    Simular fin de video → S02_02
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
