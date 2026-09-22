/**
 * S01_03_DECISION — ¿Qué harías tú?
 * Interactive decision card interface with premium dark tactile styling.
 * Microconfirmation: "Tiene sentido." followed by auto-advance to S01_04_INTERPRETATION.
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { InitialDecisionId } from "../../state/funnelTypes";

interface DecisionOption {
  key: "A" | "B" | "C" | "D";
  id: InitialDecisionId;
  label: string;
}

const DECISION_OPTIONS: readonly DecisionOption[] = [
  {
    key: "A",
    id: "ask_again",
    label: "Le preguntaría otra vez.",
  },
  {
    key: "B",
    id: "give_space",
    label: "Le daría espacio.",
  },
  {
    key: "C",
    id: "cheer_up",
    label: "Intentaría animarla.",
  },
  {
    key: "D",
    id: "continue_normally",
    label: "Seguiría normal.",
  },
] as const;

export const S01Decision: React.FC = () => {
  const { state, setInitialDecision, setCurrentScreen } = useFunnel();
  const [selectedId, setSelectedId] = useState<InitialDecisionId | null>(
    () => state.initialDecision?.id ?? null
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showMicrofeedback, setShowMicrofeedback] = useState<boolean>(false);

  const handleSelect = (option: DecisionOption) => {
    // Prevent accidental double tap or re-selection while processing
    if (isProcessing) return;

    setIsProcessing(true);
    setSelectedId(option.id);

    // Save ID and literal human label
    setInitialDecision({
      id: option.id,
      label: option.label,
    });

    // Show microfeedback "Tiene sentido."
    setShowMicrofeedback(true);

    // Microconfirmation duration ~750ms then auto-advance
    setTimeout(() => {
      setCurrentScreen("S01_04_INTERPRETATION");
    }, 750);
  };

  return (
    <div
      id="screen-s01-03-decision"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-10 sm:py-14 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Sequence Header Context */}
      <header className="pt-2">
        <span
          id="decision-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content / Decision Prompt */}
      <main className="my-auto py-6 flex flex-col gap-6">
        <h2
          id="decision-question-heading"
          className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
        >
          ¿QUÉ HARÍAS TÚ?
        </h2>

        {/* Options List */}
        <div
          role="radiogroup"
          aria-label="Opciones de decisión"
          className="flex flex-col gap-3.5 pt-2"
        >
          {DECISION_OPTIONS.map((opt) => {
            const isSelected = selectedId === opt.id;

            return (
              <button
                key={opt.id}
                id={`btn-decision-${opt.id}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={isProcessing}
                onClick={() => handleSelect(opt)}
                className={`w-full p-4 sm:p-5 rounded-lg text-left transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                  isSelected
                    ? "bg-neutral-800 border-neutral-400 text-white shadow-lg"
                    : "bg-neutral-900/90 hover:bg-neutral-800/80 border-neutral-800 hover:border-neutral-700 text-neutral-200"
                } ${isProcessing && !isSelected ? "opacity-40" : "opacity-100"}`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`text-xs font-semibold tracking-wider px-2 py-1 rounded ${
                      isSelected
                        ? "bg-white text-neutral-950"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className="text-base sm:text-lg font-normal">
                    {opt.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* Microfeedback Area */}
      <footer className="w-full min-h-12 flex items-center justify-center pb-2">
        {showMicrofeedback && (
          <p
            id="decision-microfeedback"
            className="text-neutral-300 font-light text-base tracking-wide animate-fade-in"
          >
            Tiene sentido.
          </p>
        )}
      </footer>
    </div>
  );
};
