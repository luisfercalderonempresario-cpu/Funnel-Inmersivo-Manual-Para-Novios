/**
 * S01_01_INTRO — Introducción
 * Dark, minimal, cinematographic screen with generous negative space.
 * Silent entry until explicit user audio gesture: "PONME EL CASO".
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { useMedia } from "../../media/MediaContext";

export const S01Intro: React.FC = () => {
  const { setCurrentScreen, markCaseStarted } = useFunnel();
  const { status, playWithAudioGesture, retryPlayback } = useMedia();
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleStartCase = async () => {
    setIsTransitioning(true);
    const success = await playWithAudioGesture();
    if (success) {
      markCaseStarted();
      setCurrentScreen("S01_02_VIDEO");
    } else {
      setIsTransitioning(false);
    }
  };

  const handleRetryAudio = async () => {
    setIsTransitioning(true);
    const success = await retryPlayback();
    if (success) {
      markCaseStarted();
      setCurrentScreen("S01_02_VIDEO");
    } else {
      setIsTransitioning(false);
    }
  };

  return (
    <div
      id="screen-s01-01-intro"
      className={`min-h-[100dvh] w-full flex flex-col justify-between px-6 py-10 sm:py-14 max-w-lg mx-auto transition-opacity duration-300 ${
        isTransitioning ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100"
      }`}
      style={{
        paddingTop: "max(2.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Top Brand Marker */}
      <header className="pt-2">
        <h1
          id="mpn-title"
          className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </h1>
      </header>

      {/* Main Narrative Statement */}
      <main className="my-auto py-8 flex flex-col gap-6">
        <div className="space-y-4 text-neutral-200 text-lg sm:text-xl font-normal leading-relaxed">
          <p className="text-white font-medium text-xl sm:text-2xl tracking-tight">
            Te voy a poner en una situación.
          </p>
          <p className="text-neutral-300">
            No busques la respuesta perfecta.
          </p>
          <p className="text-neutral-300">
            Responde lo que realmente harías.
          </p>
        </div>

        <div className="pt-2">
          <p className="text-neutral-400 text-base sm:text-lg font-light italic">
            Solo quiero saber qué harías tú.
          </p>
        </div>
      </main>

      {/* Action Area / Gestures / Fallbacks */}
      <footer className="w-full pb-2">
        {status === "audio_blocked" ? (
          <div
            id="audio-fallback-prompt"
            className="flex flex-col items-center gap-3 animate-fade-in"
          >
            <p className="text-sm text-amber-200/90 font-normal text-center">
              Activa el sonido para comenzar
            </p>
            <button
              id="btn-activate-sound"
              type="button"
              onClick={handleRetryAudio}
              className="w-full h-14 bg-neutral-100 hover:bg-white text-neutral-950 font-semibold text-base rounded-md flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98] transition-all cursor-pointer select-none"
            >
              <span>🔊</span>
              <span>ACTIVAR SONIDO</span>
            </button>
          </div>
        ) : status === "load_error" ? (
          <div
            id="load-error-prompt"
            className="flex flex-col items-center gap-3"
          >
            <p className="text-sm text-neutral-400 font-normal text-center">
              No pudimos cargar el caso.
            </p>
            <button
              id="btn-retry-load"
              type="button"
              onClick={handleRetryAudio}
              className="w-full h-14 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-medium text-base rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
            >
              <span>INTENTAR DE NUEVO</span>
            </button>
          </div>
        ) : (
          <button
            id="btn-start-case"
            type="button"
            onClick={handleStartCase}
            disabled={isTransitioning}
            className="w-full h-14 bg-neutral-100 hover:bg-white active:bg-neutral-200 text-neutral-950 font-semibold text-base tracking-wide rounded-md flex items-center justify-center gap-2.5 shadow-2xl transition-all cursor-pointer select-none"
          >
            <span aria-hidden="true">🔊</span>
            <span>PONME EL CASO</span>
          </button>
        )}
      </footer>
    </div>
  );
};
