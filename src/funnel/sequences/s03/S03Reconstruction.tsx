/**
 * S03_05_RECONSTRUCTION — Reconstrucción
 * Gathers the pieces of context narrative together:
 * LO QUE VISTE: "Estoy cansada."
 * LO QUE NO VISTE:
 *  - "Había dormido cerca de 3 horas."
 *  - "Había tenido un problema importante en el trabajo."
 * Optional personalization from initialInterpretation.
 * Master thesis:
 * "Lo que viste no cambió. La información que tenías sí."
 */

import React, { useEffect, useRef } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S03Reconstruction: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);
  const interpretationId = state.initialInterpretation?.id ?? null;

  useEffect(() => {
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;

    trackEvent({
      event: "context_reconstruction_viewed",
      sequence: "S03_LO_QUE_NO_VISTE",
      screen: "S03_05_RECONSTRUCTION",
    });
  }, []);

  const getInterpretationCopy = () => {
    switch (interpretationId) {
      case "angry":
        return "Que estaba molesta.";
      case "bad_day":
        return "Que había tenido un mal día.";
      case "worried":
        return "Que algo le preocupaba.";
      case "angry_with_me":
        return "Que podía estar molesta contigo.";
      case "unknown":
        return "Al principio ya notaste que te faltaba información.";
      default:
        return null;
    }
  };

  const interpretationCopy = getInterpretationCopy();

  const handleUnderstand = () => {
    setCurrentScreen("S03_06_CONTEXT_DISCOVERY");
  };

  return (
    <div
      id="screen-s03-05-reconstruction"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="reconstruction-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Reconstruction Content */}
      <main className="my-auto py-6 flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-[0.15em] text-neutral-400 font-medium">
            Reconstrucción
          </span>
          <h1
            id="reconstruction-heading"
            className="text-2xl sm:text-3xl font-light text-white tracking-tight"
          >
            Las piezas del martes
          </h1>
        </div>

        {/* Section: LO QUE VISTE */}
        <div
          id="reconstruction-seen-block"
          className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800/80 flex flex-col gap-1.5"
        >
          <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-semibold">
            LO QUE VISTE
          </span>
          <p
            id="reconstruction-seen-quote"
            className="text-lg sm:text-xl font-serif italic text-white"
          >
            “Estoy cansada.”
          </p>
        </div>

        {/* Optional Section: AL PRINCIPIO INTERPRETASTE (if present) */}
        {interpretationCopy && (
          <div
            id="reconstruction-interpreted-block"
            className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800/60 flex flex-col gap-1"
          >
            <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-medium">
              AL PRINCIPIO INTERPRETASTE
            </span>
            <p
              id="reconstruction-interpreted-copy"
              className="text-sm sm:text-base text-neutral-300 font-normal"
            >
              {interpretationCopy}
            </p>
          </div>
        )}

        {/* Section: LO QUE NO VISTE */}
        <div
          id="reconstruction-unseen-block"
          className="p-5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 flex flex-col gap-3"
        >
          <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-semibold">
            LO QUE NO VISTE
          </span>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
              <p
                id="reconstruction-unseen-sleep"
                className="text-base sm:text-lg text-neutral-100 font-normal leading-relaxed"
              >
                Había dormido cerca de 3 horas.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
              <p
                id="reconstruction-unseen-work"
                className="text-base sm:text-lg text-neutral-100 font-normal leading-relaxed"
              >
                Había tenido un problema importante en el trabajo.
              </p>
            </div>
          </div>
        </div>

        {/* Core Thesis Highlight */}
        <div
          id="reconstruction-core-thesis"
          className="pt-2 border-l-2 border-neutral-500 pl-4 space-y-1"
        >
          <p
            id="reconstruction-thesis-1"
            className="text-lg sm:text-xl font-light text-neutral-300 tracking-tight"
          >
            Lo que viste no cambió.
          </p>
          <p
            id="reconstruction-thesis-2"
            className="text-xl sm:text-2xl font-semibold text-white tracking-tight"
          >
            La información que tenías sí.
          </p>
        </div>
      </main>

      {/* Action Footer */}
      <footer className="w-full pt-4 pb-2">
        <button
          id="btn-reconstruction-understand"
          type="button"
          onClick={handleUnderstand}
          className="w-full h-14 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-semibold text-base rounded-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          Entiendo
        </button>
      </footer>
    </div>
  );
};
