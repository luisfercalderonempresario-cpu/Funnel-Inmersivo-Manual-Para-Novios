/**
 * S08_02_DATE_KNOWLEDGE — Triaje de conocimiento de fecha
 * Captures user certainty and routes to exact, approximate, or example path.
 */

import React from "react";
import { useFunnel } from "../../state/FunnelContext";
import { DateKnowledge } from "../../state/funnelTypes";

export const S08DateKnowledge: React.FC = () => {
  const { state, setDateKnowledge, setCurrentScreen } = useFunnel();

  const handleSelect = (choice: NonNullable<DateKnowledge>) => {
    setDateKnowledge(choice);
    if (choice === "exact") {
      setCurrentScreen("S08_03_EXACT_DATE");
    } else if (choice === "approximate") {
      setCurrentScreen("S08_04_APPROXIMATE_DATE");
    } else if (choice === "unknown") {
      setCurrentScreen("S08_05_EXAMPLE");
    }
  };

  return (
    <div
      id="screen-s08-02-date-knowledge"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            CONTEXTO™
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            PASO 1 DE 2
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 space-y-6 animate-fade-in">
        <div className="space-y-3">
          <h1 className="text-xl sm:text-2xl text-white font-serif leading-snug">
            ¿Conoces la fecha en que comenzó su último periodo?
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed font-sans">
            El primer día del periodo marca el inicio del ciclo.
          </p>
        </div>

        {/* Option Cards */}
        <div className="space-y-3 pt-2">
          <button
            id="btn-date-knowledge-exact"
            type="button"
            onClick={() => handleSelect("exact")}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              state.dateKnowledge === "exact"
                ? "bg-neutral-800 border-white text-white shadow-lg"
                : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-200"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm sm:text-base font-medium">
                Sí, sé la fecha aproximada o exacta.
              </span>
              <span className="text-neutral-500 text-xs font-mono pt-0.5">→</span>
            </div>
          </button>

          <button
            id="btn-date-knowledge-approximate"
            type="button"
            onClick={() => handleSelect("approximate")}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              state.dateKnowledge === "approximate"
                ? "bg-neutral-800 border-white text-white shadow-lg"
                : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-200"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm sm:text-base font-medium">
                Solo sé más o menos cuántas semanas hace.
              </span>
              <span className="text-neutral-500 text-xs font-mono pt-0.5">→</span>
            </div>
          </button>

          <button
            id="btn-date-knowledge-unknown"
            type="button"
            onClick={() => handleSelect("unknown")}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              state.dateKnowledge === "unknown"
                ? "bg-neutral-800 border-white text-white shadow-lg"
                : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-200"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm sm:text-base font-medium">
                No la sé.
              </span>
              <span className="text-neutral-500 text-xs font-mono pt-0.5">→</span>
            </div>
          </button>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="pb-4 sm:pb-6">
        <button
          id="btn-date-knowledge-back"
          type="button"
          onClick={() => setCurrentScreen("S08_01_ENTRY")}
          className="text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-wider"
        >
          ← Volver
        </button>
      </footer>
    </div>
  );
};
