/**
 * S07_04_INTEREST — ¿Lo usarías?
 * Tests honest user interest before product reveal.
 * Options: "Sí.", "Lo probaría.", "Depende."
 * Handles inline feedback for YES and WOULD_TRY before advancing to S07_06_REVEAL.
 * Routes DEPENDS immediately to S07_05_CONCERN.
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { ToolInterestId } from "../../state/funnelTypes";

interface OptionItem {
  id: "yes" | "would_try" | "depends";
  label: string;
}

const INTEREST_OPTIONS: OptionItem[] = [
  { id: "yes", label: "Sí." },
  { id: "would_try", label: "Lo probaría." },
  { id: "depends", label: "Depende." },
];

export const S07Interest: React.FC = () => {
  const { state, setToolInterest, setCurrentScreen } = useFunnel();
  const [selectedId, setSelectedId] = useState<ToolInterestId>(state.toolInterest);

  const handleSelectOption = (option: OptionItem) => {
    setSelectedId(option.id);
    setToolInterest(option.id, option.label);

    // If DEPENDS: transition directly to S07_05_CONCERN
    if (option.id === "depends") {
      setCurrentScreen("S07_05_CONCERN");
    }
  };

  const handleContinueAfterFeedback = () => {
    // Both 'yes' and 'would_try' route directly to REVEAL, bypassing CONCERN
    setCurrentScreen("S07_06_REVEAL");
  };

  return (
    <div
      id="screen-s07-04-interest"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="s07-interest-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Narrative & Question */}
      <main className="flex-1 flex flex-col justify-center py-8 space-y-6">
        <div className="space-y-2">
          <p
            id="s07-interest-lead"
            className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed"
          >
            Si pudieras tener algo así en tu celular…
          </p>
          <h1
            id="s07-interest-title"
            className="text-white text-2xl sm:text-3xl font-normal tracking-tight"
          >
            ¿lo usarías?
          </h1>
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {INTEREST_OPTIONS.map((opt) => {
            const isSelected = selectedId === opt.id;
            return (
              <button
                key={opt.id}
                id={`btn-interest-opt-${opt.id}`}
                type="button"
                onClick={() => handleSelectOption(opt)}
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

        {/* Inline Feedback for YES */}
        {selectedId === "yes" && (
          <div
            id="s07-feedback-yes"
            className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-md space-y-2 animate-fade-in"
          >
            <p className="text-white text-base font-medium">Tiene sentido.</p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Sobre todo si pudiera ayudarte con lo que elegiste antes.
            </p>
          </div>
        )}

        {/* Inline Feedback for WOULD_TRY */}
        {selectedId === "would_try" && (
          <div
            id="s07-feedback-would-try"
            className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-md space-y-2 animate-fade-in"
          >
            <p className="text-white text-base font-medium">Eso es suficiente.</p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              No tendrías por qué creer que funciona antes de usarlo.
            </p>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="pt-6">
        {(selectedId === "yes" || selectedId === "would_try") ? (
          <button
            id="btn-s07-interest-continue"
            type="button"
            onClick={handleContinueAfterFeedback}
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
