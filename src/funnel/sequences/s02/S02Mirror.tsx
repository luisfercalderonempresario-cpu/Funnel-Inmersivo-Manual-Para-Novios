/**
 * S02_04_MIRROR — Personalización del Espejo
 * Shows Andrés that he too had to interpret incomplete information.
 * Personalizes directly based on initialInterpretation from S01.
 */

import React from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S02Mirror: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const interpretationId = state.initialInterpretation?.id ?? null;

  const handleContinue = () => {
    trackEvent({
      event: "interpretation_mirror_viewed",
      sequence: "S02_ALGO_SALIO_MAL",
      screen: "S02_04_MIRROR",
      value: interpretationId ?? "dev_fallback",
    });

    setCurrentScreen("S02_05_DISCOVERY");
  };

  return (
    <div
      id="screen-s02-04-mirror"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="mirror-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Editorial Flow */}
      <main className="my-auto py-8 flex flex-col gap-8 animate-fade-in">
        {/* Primary Anchor Headline */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.15em] text-neutral-400 font-medium">
            El espejo
          </span>
          <h1
            id="mirror-headline"
            className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug"
          >
            Con lo que acabas de ver que pasó, tú también tuviste que interpretar.
          </h1>
        </div>

        {/* Observation Block */}
        <div
          id="mirror-observation-block"
          className="p-5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 flex flex-col gap-2"
        >
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
            Ella dijo:
          </span>
          <p
            id="mirror-quote-statement"
            className="text-xl sm:text-2xl text-neutral-100 font-normal italic font-serif"
          >
            “Estoy cansada.”
          </p>
        </div>

        {/* Personalized Thought / Insight Block */}
        <div
          id="mirror-personalized-block"
          className="p-5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 flex flex-col gap-2"
        >
          {interpretationId === "angry" && (
            <>
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Y tú pensaste:
              </span>
              <p
                id="mirror-thought-angry"
                className="text-lg sm:text-xl text-white font-normal"
              >
                Pensaste que estaba molesta.
              </p>
            </>
          )}

          {interpretationId === "bad_day" && (
            <>
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Y tú pensaste:
              </span>
              <p
                id="mirror-thought-bad-day"
                className="text-lg sm:text-xl text-white font-normal"
              >
                Pensaste que había tenido un mal día.
              </p>
            </>
          )}

          {interpretationId === "worried" && (
            <>
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Y tú pensaste:
              </span>
              <p
                id="mirror-thought-worried"
                className="text-lg sm:text-xl text-white font-normal"
              >
                Pensaste que algo le preocupaba.
              </p>
            </>
          )}

          {interpretationId === "angry_with_me" && (
            <>
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Y tú pensaste:
              </span>
              <p
                id="mirror-thought-angry-with-me"
                className="text-lg sm:text-xl text-white font-normal"
              >
                Pensaste que podía estar molesta contigo.
              </p>
            </>
          )}

          {interpretationId === "unknown" && (
            <>
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Y tú notaste algo importante:
              </span>
              <p
                id="mirror-thought-unknown"
                className="text-lg sm:text-xl text-white font-normal"
              >
                Todavía no tenías suficiente información.
              </p>
            </>
          )}

          {interpretationId === null && (
            <>
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Lectura inicial:
              </span>
              <p
                id="mirror-thought-fallback"
                className="text-lg sm:text-xl text-white font-normal"
              >
                Todavía no tenías toda la información.
              </p>
            </>
          )}
        </div>

        {/* Common Closing Reflection */}
        <div
          id="mirror-closing-reflection"
          className="space-y-1.5 pt-1 text-neutral-300 text-base sm:text-lg font-light leading-relaxed"
        >
          <p>Y tenía sentido.</p>
          <p className="text-neutral-100 font-normal">
            Pero todavía faltaba información.
          </p>
        </div>
      </main>

      {/* Action Footer */}
      <footer className="w-full pt-4 pb-2">
        <button
          id="btn-mirror-continue"
          type="button"
          onClick={handleContinue}
          className="w-full h-14 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-semibold text-base rounded-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          Sigue
        </button>
      </footer>
    </div>
  );
};
