/**
 * S01_02_VIDEO — El Caso
 * Pure vertical 9:16 cinematic video player.
 * No controls, playsInline, auto-advances on `ended`, explicit gesture required on refresh.
 */

import React, { useEffect, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { useMedia } from "../../media/MediaContext";

export const S01Video: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const {
    videoRef,
    status,
    isPlaying,
    markVideoCompleted,
    playWithAudioGesture,
    retryPlayback,
  } = useMedia();

  // If user navigated directly here or refreshed, require gesture to resume sound
  const [needsGestureToResume, setNeedsGestureToResume] = useState<boolean>(
    () => !isPlaying
  );
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  useEffect(() => {
    if (isPlaying) {
      setNeedsGestureToResume(false);
    }
  }, [isPlaying]);

  // Handle video element events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setHasEnded(true);
      markVideoCompleted();
      // Brief cinematic dark beat (350ms) before auto-advancing to decision
      setTimeout(() => {
        setCurrentScreen("S01_03_DECISION");
      }, 350);
    };

    const handleError = () => {
      console.warn("[MPN Video] Media load error event triggered");
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [videoRef, markVideoCompleted, setCurrentScreen]);

  const handleResumeGesture = async () => {
    const ok = await playWithAudioGesture();
    if (ok) {
      setNeedsGestureToResume(false);
    }
  };

  return (
    <div
      id="screen-s01-02-video"
      className="relative w-full h-[100dvh] bg-transparent flex items-center justify-center overflow-hidden select-none pointer-events-none"
    >
      {/* 9:16 Centered Container (transparent overlay layer for fallbacks & controls) */}
      <div className="relative w-full h-full max-w-[calc(100dvh*9/16)] max-h-[100dvh] aspect-[9/16] bg-transparent flex items-center justify-center">
        {/* The persistent video component is rendered by VideoPlayerLayer,
            so S01Video provides the interactive touch layer & refresh gestures */}

        {/* REFRESH / DIRECT LOAD AUDIO GESTURE OVERLAY (Rule AI) */}
        {needsGestureToResume && status !== "playing" && !hasEnded && (
          <div
            id="video-resume-overlay"
            className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-6 animate-fade-in">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">
                MANUAL PARA NOVIOS
              </span>
              <p className="text-white text-lg font-medium">
                El Caso está listo.
              </p>
              <button
                id="btn-resume-case"
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

        {/* AUDIO BLOCKED FALLBACK (Rule V) */}
        {status === "audio_blocked" && !needsGestureToResume && (
          <div
            id="video-audio-blocked-overlay"
            className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-4">
              <p className="text-neutral-200 text-base">
                Activa el sonido para comenzar
              </p>
              <button
                id="btn-activate-video-sound"
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

        {/* ASSET LOAD ERROR FALLBACK (Rule V & S) */}
        {status === "load_error" && (
          <div
            id="video-load-error-overlay"
            className="absolute inset-0 z-30 bg-black/95 flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-4">
              <p className="text-neutral-300 text-base">
                No pudimos cargar el caso.
              </p>
              <button
                id="btn-retry-video-load"
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
                    Asset oficial: <span className="text-white">media.manualparanovios.com/MPN_S01_V01_EL_CASO_WEB.mp4</span>
                  </p>
                  <button
                    id="btn-dev-simulate-ended"
                    type="button"
                    onClick={() => {
                      markVideoCompleted();
                      setCurrentScreen("S01_03_DECISION");
                    }}
                    className="w-full py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded border border-neutral-700 text-center font-sans text-xs cursor-pointer"
                  >
                    Simular fin de video → S01_03
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blackout beat on video end before decision */}
        {hasEnded && (
          <div className="absolute inset-0 z-40 bg-black transition-opacity duration-300 opacity-100" />
        )}
      </div>
    </div>
  );
};
