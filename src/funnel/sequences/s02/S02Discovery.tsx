/**
 * S02_05_DISCOVERY — El problema de interpretar
 * The core micro-revelation of Sequence 02:
 * "El problema no es interpretar. Todos lo hacemos.
 *  El problema aparece cuando reaccionamos como si nuestra interpretación ya fuera un hecho."
 */

import React from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S02Discovery: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const interpretationId = state.initialInterpretation?.id ?? null;

  const getInterpretationSummary = () => {
    switch (interpretationId) {
      case "angry":
        return "Que estaba molesta.";
      case "bad_day":
        return "Que había tenido un mal día.";
      case "worried":
        return "Que algo le preocupaba.";
      case "angry_with_me":
        return "Que estaba molesta contigo.";
      case "unknown":
        return "No tenías suficiente información.";
      default:
        return "Tu lectura inicial de la situación.";
    }
  };

  const handleNext = () => {
    setCurrentScreen("S02_06_EXIT");
  };

  const isUnknown = interpretationId === "unknown";

  return (
    <div
      id="screen-s02-05-discovery"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="discovery-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Revelation Flow */}
      <main className="my-auto py-6 flex flex-col gap-8 animate-fade-in">
        {/* Core Thesis Paragraphs */}
        <div className="space-y-4">
          <p
            id="discovery-thesis-line1"
            className="text-xl sm:text-2xl font-light text-neutral-200 tracking-tight leading-snug"
          >
            El problema no es interpretar.
          </p>
          <p
            id="discovery-thesis-line2"
            className="text-xl sm:text-2xl font-light text-neutral-400 tracking-tight leading-snug"
          >
            Todos lo hacemos.
          </p>
          <p
            id="discovery-thesis-highlight"
            className="text-xl sm:text-2xl font-normal text-white tracking-tight leading-snug pt-2 border-l-2 border-neutral-600 pl-4"
          >
            El problema aparece cuando reaccionamos como si nuestra interpretación ya fuera un hecho.
          </p>
        </div>

        {/* Minimalist Editorial Breakdown */}
        <div
          id="discovery-breakdown-container"
          className="flex flex-col gap-3 pt-2"
        >
          {/* Step 1: Lo que viste */}
          <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800/80 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-semibold">
              LO QUE VISTE
            </span>
            <p className="text-base sm:text-lg text-neutral-200 font-serif italic">
              “Estoy cansada.”
            </p>
          </div>

          {/* Divider connector */}
          <div className="flex justify-center -my-1 text-neutral-600 text-sm select-none" aria-hidden="true">
            ↓
          </div>

          {/* Step 2: Lo que interpretaste */}
          <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800/80 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-semibold">
              {isUnknown ? "LO QUE SABÍAS" : "LO QUE INTERPRETASTE"}
            </span>
            <p className="text-base sm:text-lg text-neutral-200 font-normal">
              {getInterpretationSummary()}
            </p>
          </div>

          {/* Divider connector */}
          <div className="flex justify-center -my-1 text-neutral-600 text-sm select-none" aria-hidden="true">
            ↓
          </div>

          {/* Step 3: Pero tal vez faltaba algo */}
          <div className="p-4 rounded-lg bg-neutral-900/40 border border-dashed border-neutral-700/80 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-semibold">
              PERO TAL VEZ FALTABA ALGO
            </span>
            <span className="text-xl font-bold text-neutral-300 font-mono">
              ?
            </span>
          </div>
        </div>
      </main>

      {/* Action Footer */}
      <footer className="w-full pt-4 pb-2">
        <button
          id="btn-discovery-what-missing"
          type="button"
          onClick={handleNext}
          className="w-full h-14 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-semibold text-base rounded-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          ¿Qué faltaba?
        </button>
      </footer>
    </div>
  );
};
