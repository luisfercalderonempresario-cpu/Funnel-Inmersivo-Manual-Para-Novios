/**
 * S03_01_SLEEP_CONTEXT — Contexto de sueño
 * Introduces the first piece of unseen context:
 * "Martes. Unas horas antes." -> S03_SLEEP_CONTEXT video
 * Revealed: "Esa noche había dormido cerca de 3 horas."
 * Recalled: "«Estoy cansada.»"
 * Pure context piece, not causal explanation.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { useMedia } from "../../media/MediaContext";
import { VIDEO_ASSETS } from "../../config/assetRegistry";
import { trackEvent } from "../../tracking/trackEvent";

export const S03SleepContext: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const {
    videoRef,
    status,
    isPlaying,
    playAsset,
    markVideoCompleted,
    retryPlayback,
  } = useMedia();

  const [phase, setPhase] = useState<"intro" | "video" | "revelation">("intro");
  const [needsGestureToResume, setNeedsGestureToResume] = useState<boolean>(false);
  const hasStartedSequenceRef = useRef<boolean>(false);
  const hasStartedVideoRef = useRef<boolean>(false);
  const hasEndedRef = useRef<boolean>(false);
  const hasTrackedViewedRef = useRef<boolean>(false);

  // Track sequence_03_started once
  useEffect(() => {
    if (hasStartedSequenceRef.current) return;
    hasStartedSequenceRef.current = true;

    trackEvent({
      event: "sequence_03_started",
      sequence: "S03_LO_QUE_NO_VISTE",
      screen: "S03_01_SLEEP_CONTEXT",
    });
  }, []);

  // Phase 1: Brief narrative contextual setup ("Martes. Unas horas antes.")
  useEffect(() => {
    const introTimer = setTimeout(() => {
      setPhase("video");
    }, 1800);

    return () => {
      clearTimeout(introTimer);
    };
  }, []);

  // Phase 2: Start video playback
  useEffect(() => {
    if (phase !== "video" || hasStartedVideoRef.current) return;
    hasStartedVideoRef.current = true;

    const startSleepVideo = async () => {
      const ok = await playAsset(VIDEO_ASSETS.S03_SLEEP_CONTEXT, {
        sequence: "S03_LO_QUE_NO_VISTE",
        screen: "S03_01_SLEEP_CONTEXT",
      });
      if (!ok) {
        setNeedsGestureToResume(true);
      }
    };

    startSleepVideo();
  }, [phase, playAsset]);

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
      if (hasEndedRef.current) return;
      hasEndedRef.current = true;

      markVideoCompleted({
        sequence: "S03_LO_QUE_NO_VISTE",
        screen: "S03_01_SLEEP_CONTEXT",
        asset: VIDEO_ASSETS.S03_SLEEP_CONTEXT,
      });

      // Advance to revelation beat
      setPhase("revelation");
    };

    const handleError = () => {
      console.warn("[MPN Video S03_01] Media load error event triggered");
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [videoRef, markVideoCompleted]);

  // Phase 3: Revelation beat -> Advance naturally to S03_02
  useEffect(() => {
    if (phase !== "revelation") return;

    if (!hasTrackedViewedRef.current) {
      hasTrackedViewedRef.current = true;
      trackEvent({
        event: "sleep_context_viewed",
        sequence: "S03_LO_QUE_NO_VISTE",
        screen: "S03_01_SLEEP_CONTEXT",
      });
    }

    const timer = setTimeout(() => {
      setCurrentScreen("S03_02_SLEEP_SHIFT");
    }, 3200);

    return () => {
      clearTimeout(timer);
    };
  }, [phase, setCurrentScreen]);

  const handleResumeGesture = async () => {
    const ok = await playAsset(VIDEO_ASSETS.S03_SLEEP_CONTEXT, {
      sequence: "S03_LO_QUE_NO_VISTE",
      screen: "S03_01_SLEEP_CONTEXT",
    });
    if (ok) {
      setNeedsGestureToResume(false);
    }
  };

  return (
    <div
      id="screen-s03-01-sleep-context"
      className="relative w-full h-[100dvh] bg-transparent flex items-center justify-center overflow-hidden select-none"
    >
      {/* Intro Narrative Beat */}
      {phase === "intro" && (
        <div
          id="sleep-context-intro"
          className="absolute inset-0 z-20 bg-neutral-950 flex flex-col items-center justify-center text-center p-6"
        >
          <div className="flex flex-col items-center gap-3 animate-fade-in">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-400 font-medium">
              Martes.
            </p>
            <p className="text-xl sm:text-2xl font-light text-white tracking-tight">
              Unas horas antes.
            </p>
          </div>
        </div>
      )}

      {/* Video Container Layer */}
      <div className="relative w-full h-full max-w-[calc(100dvh*9/16)] max-h-[100dvh] aspect-[9/16] bg-transparent flex items-center justify-center pointer-events-none">
        {/* REFRESH / DIRECT LOAD AUDIO GESTURE OVERLAY */}
        {needsGestureToResume && status !== "playing" && phase === "video" && (
          <div
            id="video-resume-overlay-s03-01"
            className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-6 animate-fade-in">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">
                MANUAL PARA NOVIOS
              </span>
              <p className="text-white text-lg font-medium">
                Ver lo que no viste.
              </p>
              <button
                id="btn-resume-s03-sleep"
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

        {/* AUDIO BLOCKED FALLBACK */}
        {status === "audio_blocked" && !needsGestureToResume && phase === "video" && (
          <div
            id="video-audio-blocked-overlay-s03-01"
            className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-4">
              <p className="text-neutral-200 text-base">
                Activa el sonido para continuar
              </p>
              <button
                id="btn-activate-video-sound-s03-01"
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
        {status === "load_error" && phase === "video" && (
          <div
            id="video-load-error-overlay-s03-01"
            className="absolute inset-0 z-30 bg-black/95 flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
          >
            <div className="max-w-xs flex flex-col items-center gap-4">
              <p className="text-neutral-300 text-base">
                No pudimos cargar este fragmento.
              </p>
              <button
                id="btn-retry-video-load-s03-01"
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
                    Asset: <span className="text-white">{VIDEO_ASSETS.S03_SLEEP_CONTEXT}</span>
                  </p>
                  <button
                    id="btn-dev-simulate-ended-s03-01"
                    type="button"
                    onClick={() => {
                      markVideoCompleted({
                        sequence: "S03_LO_QUE_NO_VISTE",
                        screen: "S03_01_SLEEP_CONTEXT",
                        asset: VIDEO_ASSETS.S03_SLEEP_CONTEXT,
                      });
                      setPhase("revelation");
                    }}
                    className="w-full py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded border border-neutral-700 text-center font-sans text-xs cursor-pointer"
                  >
                    Simular fin de video → Revelación
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Post-Video Revelation Beat */}
      {phase === "revelation" && (
        <div
          id="sleep-context-revelation"
          className="absolute inset-0 z-30 bg-neutral-950 flex flex-col justify-between px-6 py-10 sm:py-14 max-w-lg mx-auto"
          style={{
            paddingTop: "max(2.5rem, env(safe-area-inset-top))",
            paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
          }}
        >
          <header className="pt-2">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none">
              MANUAL PARA NOVIOS
            </span>
          </header>

          <main className="my-auto py-12 flex flex-col items-center justify-center text-center gap-6 animate-fade-in">
            <p
              id="sleep-revelation-text"
              className="text-xl sm:text-2xl font-light text-white tracking-tight leading-relaxed max-w-sm"
            >
              Esa noche había dormido cerca de 3 horas.
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium block pb-1">
                La señal original:
              </span>
              <p
                id="sleep-signal-quote"
                className="text-lg sm:text-xl font-serif italic text-neutral-300"
              >
                “Estoy cansada.”
              </p>
            </div>
          </main>

          <footer className="w-full min-h-12 pb-2" />
        </div>
      )}
    </div>
  );
};
