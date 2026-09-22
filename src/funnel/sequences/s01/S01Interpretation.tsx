/**
 * S01_04_INTERPRETATION — Interpretación inicial
 * Explores the user's initial perception without judgment or validation.
 * Auto-advances to S01_05_EXIT.
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { InitialInterpretationId } from "../../state/funnelTypes";

interface InterpretationOption {
  id: InitialInterpretationId;
  label: string;
}

const INTERPRETATION_OPTIONS: readonly InterpretationOption[] = [
  {
    id: "angry",
    label: "Está molesta.",
  },
  {
    id: "bad_day",
    label: "Tuvo un mal día.",
  },
  {
    id: "worried",
    label: "Algo le preocupa.",
  },
  {
    id: "angry_with_me",
    label: "Está molesta conmigo.",
  },
  {
    id: "unknown",
    label: "No tengo idea.",
  },
] as const;

export const S01Interpretation: React.FC = () => {
  const { state, setInitialInterpretation, setCurrentScreen } = useFunnel();
  const [selectedId, setSelectedId] = useState<InitialInterpretationId | null>(
    () => state.initialInterpretation?.id ?? null
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSelect = (option: InterpretationOption) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setSelectedId(option.id);

    setInitialInterpretation({
      id: option.id,
      label: option.label,
    });

    // Pacing transition to exit: 400ms
    setTimeout(() => {
      setCurrentScreen("S01_05_EXIT");
    }, 400);
  };

  return (
    <div
      id="screen-s01-04-interpretation"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-10 sm:py-14 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="interpretation-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Narrative Prompt */}
      <main className="my-auto py-6 flex flex-col gap-6">
        <div className="space-y-3">
          <p className="text-neutral-400 text-sm sm:text-base font-light">
            Cuando ella respondió:
          </p>
          <blockquote className="border-l border-neutral-600 pl-4 py-1 text-xl sm:text-2xl font-normal text-white italic tracking-tight">
            “Estoy cansada”
          </blockquote>
          <p className="text-neutral-200 text-lg sm:text-xl font-normal pt-1">
            ¿qué pensaste que podía estar pasando?
          </p>
        </div>

        {/* Options List */}
        <div
          role="radiogroup"
          aria-label="Opciones de interpretación"
          className="flex flex-col gap-3 pt-2"
        >
          {INTERPRETATION_OPTIONS.map((opt) => {
            const isSelected = selectedId === opt.id;

            return (
              <button
                key={opt.id}
                id={`btn-interp-${opt.id}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={isProcessing}
                onClick={() => handleSelect(opt)}
                className={`w-full p-4 sm:p-4.5 rounded-lg text-left transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? "bg-neutral-800 border-neutral-400 text-white shadow-lg"
                    : "bg-neutral-900/90 hover:bg-neutral-800/80 border-neutral-800 hover:border-neutral-700 text-neutral-200"
                } ${isProcessing && !isSelected ? "opacity-40" : "opacity-100"}`}
              >
                <span className="text-base sm:text-lg font-normal">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      <footer className="w-full min-h-12 pb-2" />
    </div>
  );
};
