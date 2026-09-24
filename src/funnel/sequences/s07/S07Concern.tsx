/**
 * S07_05_CONCERN — ¿De qué dependería principalmente?
 * Active only when toolInterest === "depends".
 * Addresses the user's primary condition respectfully before the reveal.
 * Options: usefulness, ease, non_generalization, price.
 */

import React, { useEffect, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { ToolInterestConcernId } from "../../state/funnelTypes";

interface ConcernOption {
  id: "usefulness" | "ease" | "non_generalization" | "price";
  label: string;
}

const CONCERN_OPTIONS: ConcernOption[] = [
  { id: "usefulness", label: "De que realmente me sea útil." },
  { id: "ease", label: "De que sea fácil de usar." },
  { id: "non_generalization", label: "De que no generalice cómo se siente ella." },
  { id: "price", label: "Del precio." },
];

export const S07Concern: React.FC = () => {
  const { state, setToolInterestConcern, setCurrentScreen } = useFunnel();
  const [selectedConcern, setSelectedConcern] =
    useState<ToolInterestConcernId>(state.toolInterestConcern);

  // If accessed directly without toolInterest === "depends", reroute canonically
  useEffect(() => {
    if (state.toolInterest !== "depends") {
      if (state.toolInterest === "yes" || state.toolInterest === "would_try") {
        setCurrentScreen("S07_06_REVEAL");
      } else {
        setCurrentScreen("S07_04_INTEREST");
      }
    }
  }, [state.toolInterest, setCurrentScreen]);

  const handleSelect = (option: ConcernOption) => {
    setSelectedConcern(option.id);
    setToolInterestConcern(option.id, option.label);
  };

  const handleContinue = () => {
    setCurrentScreen("S07_06_REVEAL");
  };

  return (
    <div
      id="screen-s07-05-concern"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="s07-concern-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Narrative & Question */}
      <main className="flex-1 flex flex-col justify-center py-8 space-y-6">
        <div className="space-y-2">
          <h1
            id="s07-concern-title"
            className="text-white text-2xl sm:text-3xl font-light tracking-tight leading-snug"
          >
            ¿De qué dependería principalmente?
          </h1>
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {CONCERN_OPTIONS.map((opt) => {
            const isSelected = selectedConcern === opt.id;
            return (
              <button
                key={opt.id}
                id={`btn-concern-opt-${opt.id}`}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full p-4 rounded-md text-left transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 border-white text-white shadow-md"
                    : "bg-neutral-900/40 border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-900/70"
                }`}
              >
                <span className="text-base font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Targeted Feedback */}
        {selectedConcern === "usefulness" && (
          <div
            id="s07-feedback-usefulness"
            className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-md space-y-2 animate-fade-in"
          >
            <p className="text-white text-base font-medium">Tiene sentido.</p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Por eso no tendría mucho sentido pedirte que creyeras en algo así sin probarlo.
            </p>
          </div>
        )}

        {selectedConcern === "ease" && (
          <div
            id="s07-feedback-ease"
            className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-md space-y-2 animate-fade-in"
          >
            <p className="text-white text-base font-medium">Tiene sentido.</p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              La idea es que puedas usarlo en menos de 2 minutos.
            </p>
          </div>
        )}

        {selectedConcern === "non_generalization" && (
          <div
            id="s07-feedback-non-generalization"
            className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-md space-y-3 animate-fade-in"
          >
            <p className="text-neutral-300 text-sm">Esa condición es importante.</p>
            <p className="text-white text-base sm:text-lg font-medium tracking-tight border-l-2 border-white/80 pl-3">
              La herramienta nunca debería tener más autoridad sobre ella que ella misma.
            </p>
            <p className="text-neutral-400 text-xs">
              Su voz siempre tiene prioridad.
            </p>
          </div>
        )}

        {selectedConcern === "price" && (
          <div
            id="s07-feedback-price"
            className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-md space-y-2 animate-fade-in"
          >
            <p className="text-white text-base font-medium">Tiene sentido.</p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Primero tendría que demostrarte que te sirve.
            </p>
            <p className="text-neutral-400 text-xs">
              Después tendría sentido hablar de precio.
            </p>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="pt-6">
        {selectedConcern ? (
          <button
            id="btn-s07-concern-continue"
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-lg cursor-pointer animate-fade-in"
          >
            CONTINUAR
          </button>
        ) : (
          <div className="h-14" aria-hidden="true" />
        )}
      </footer>
    </div>
  );
};
