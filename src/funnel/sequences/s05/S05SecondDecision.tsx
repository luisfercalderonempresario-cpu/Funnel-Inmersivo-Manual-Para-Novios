/**
 * S05_02_SECOND_DECISION — ¿Qué harías tú ahora?
 * The exact same 4 choices from S01, presented with the exact same ordering and IDs:
 * A: Le preguntaría otra vez. (ask_again)
 * B: Le daría espacio. (give_space)
 * C: Intentaría animarla. (cheer_up)
 * D: Seguiría normal. (continue_normally)
 * No bias, no preselection, no indicator of initial choice.
 * Persists secondDecision before advancing to S05_03_DECISION_COMPARE.
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { SecondDecisionId } from "../../state/funnelTypes";

interface DecisionOption {
  key: "A" | "B" | "C" | "D";
  id: SecondDecisionId;
  label: string;
}

const SECOND_DECISION_OPTIONS: readonly DecisionOption[] = [
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

export const S05SecondDecision: React.FC = () => {
  const { state, setSecondDecision, setCurrentScreen } = useFunnel();
  const [selectedId, setSelectedId] = useState<SecondDecisionId | null>(
    () => state.secondDecision?.id ?? null
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showMicrofeedback, setShowMicrofeedback] = useState<boolean>(false);

  const handleSelect = (option: DecisionOption) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setSelectedId(option.id);

    // Save choice and label before navigation
    setSecondDecision({
      id: option.id,
      label: option.label,
    });

    // Microconfirmation
    setShowMicrofeedback(true);

    setTimeout(() => {
      setCurrentScreen("S05_03_DECISION_COMPARE");
    }, 750);
  };

  return (
    <div
      id="screen-s05-02-second-decision"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-10 sm:py-14 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="second-decision-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content / Prompt */}
      <main className="my-auto py-6 flex flex-col gap-5">
        <p
          id="second-decision-preamble"
          className="text-sm sm:text-base text-neutral-400 font-light"
        >
          Ahora que sabes un poco más…
        </p>

        <h2
          id="second-decision-question-heading"
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
          {SECOND_DECISION_OPTIONS.map((opt) => {
            const isSelected = selectedId === opt.id;

            return (
              <button
                key={opt.id}
                id={`btn-second-decision-${opt.id}`}
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
            id="second-decision-microfeedback"
            className="text-neutral-300 font-light text-base tracking-wide animate-fade-in"
          >
            Tiene sentido.
          </p>
        )}
      </footer>
    </div>
  );
};
