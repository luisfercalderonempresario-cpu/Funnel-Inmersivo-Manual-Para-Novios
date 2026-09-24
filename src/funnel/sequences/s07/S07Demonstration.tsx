/**
 * S07_02_DEMONSTRATION — Demostración Audiovisual
 * Plays official demonstration video (S07_DEMONSTRATION).
 * Leverages persistent VideoPlayerLayer via MediaContext.
 * Advances canonically to S07_03_MECHANISM on ended.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { useMedia } from "../../media/MediaContext";
import { VIDEO_ASSETS } from "../../config/assetRegistry";

export const S07Demonstration: React.FC = () => {
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

  // Initiate playback of demonstration video
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const startPlayback = async () => {
      const ok = await playAsset(VIDEO_ASSETS.S07_DEMONSTRATION, {
        sequence: "S07_Y_SI_EXISTIERA",
        screen: "S07_02_DEMONSTRATION",
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
        sequence: "S07_Y_SI_EXISTIERA",
        screen: "S07_02_DEMONSTRATION",
        asset: VIDEO_ASSETS.S07_DEMONSTRATION,
      });

      // Canonical transition to S07_03_MECHANISM
      setCurrentScreen("S07_03_MECHANISM");
    };

    const handleError = () => {
      console.warn("[MPN Video S07_02] Media load error event triggered");
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [videoRef, markVideoCompleted, setCurrentScreen]);

  const handleResumeGesture = async () => {
    const ok = await playAsset(VIDEO_ASSETS.S07_DEMONSTRATION, {
      sequence: "S07_Y_SI_EXISTIERA",
      screen: "S07_02_DEMONSTRATION",
    });
    if (ok) {
      setNeedsGestureToResume(false);
    }
  };

  return (
    <div
      id="screen-s07-02-demonstration"
      className="relative w-full h-[100dvh] bg-transparent flex items-center justify-center overflow-hidden select-none pointer-events-none"
    >
      <div className="relative w-full h-full max-w-[calc(100dvh*9/16)] max-h-[100dvh] aspect-[9/16] bg-transparent flex items-center justify-center">
        {/* AUDIO GESTURE OVERLAY (if needed due to browser autoplay policies) */}
        {needsGestureToResume && status !== "playing" && !hasEnded && (
          <div
            id="video-resume-overlay-s07-02"
            className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-6 animate-fade-in">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">
                MANUAL PARA NOVIOS
              </span>
              <div className="text-center space-y-1">
                <p className="text-white text-lg font-medium">
                  Ver demostración
                </p>
              </div>
              <button
                id="btn-resume-s07-demonstration"
                type="button"
                onClick={handleResumeGesture}
                className="w-full h-14 bg-white text-neutral-950 font-semibold text-base rounded-md flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all cursor-pointer"
              >
                <span>🔊</span>
                <span>REPRODUCIR</span>
              </button>
            </div>
          </div>
        )}

        {/* AUDIO BLOCKED OVERLAY */}
        {status === "audio_blocked" && !needsGestureToResume && (
          <div
            id="video-audio-blocked-overlay-s07-02"
            className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-4">
              <p className="text-neutral-200 text-base">
                Activa el sonido para continuar
              </p>
              <button
                id="btn-activate-sound-s07-02"
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

        {/* ASSET LOAD ERROR OVERLAY */}
        {status === "load_error" && (
          <div
            id="video-load-error-overlay-s07-02"
            className="absolute inset-0 z-30 bg-black/95 flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-4">
              <p className="text-neutral-300 text-base">
                No pudimos cargar la demostración.
              </p>
              <button
                id="btn-retry-video-load-s07-02"
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
                    Asset: <span className="text-white">{VIDEO_ASSETS.S07_DEMONSTRATION}</span>
                  </p>
                  <button
                    id="btn-dev-simulate-ended-s07-02"
                    type="button"
                    onClick={() => {
                      markVideoCompleted({
                        sequence: "S07_Y_SI_EXISTIERA",
                        screen: "S07_02_DEMONSTRATION",
                        asset: VIDEO_ASSETS.S07_DEMONSTRATION,
                      });
                      setCurrentScreen("S07_03_MECHANISM");
                    }}
                    className="w-full py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded border border-neutral-700 text-center font-sans text-xs cursor-pointer"
                  >
                    Simular fin de video → S07_03
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DEV QA QUICK ADVANCE IN DEV MODE */}
        {import.meta.env.DEV && !hasEnded && isPlaying && (
          <div className="absolute top-4 right-4 z-40 pointer-events-auto">
            <button
              id="btn-dev-skip-s07-02"
              type="button"
              onClick={() => {
                markVideoCompleted({
                  sequence: "S07_Y_SI_EXISTIERA",
                  screen: "S07_02_DEMONSTRATION",
                  asset: VIDEO_ASSETS.S07_DEMONSTRATION,
                });
                setCurrentScreen("S07_03_MECHANISM");
              }}
              className="bg-neutral-900/80 hover:bg-neutral-800 text-[10px] font-mono text-neutral-400 px-2 py-1 rounded border border-neutral-700 cursor-pointer"
            >
              [DEV] Saltar video →
            </button>
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
