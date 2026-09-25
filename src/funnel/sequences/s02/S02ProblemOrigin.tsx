/**
 * S02_02_PROBLEM_ORIGIN — ¿Dónde empezó el problema?
 * Narrative decision on where Andrés believes the conflict originated.
 * No right or wrong answers.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import {
  ProblemOriginGuessId,
  ProblemOriginGuessValue,
} from "../../state/funnelTypes";

interface OptionItem {
  id: ProblemOriginGuessId;
  prefix: string;
  label: string;
}

const ORIGIN_OPTIONS: readonly OptionItem[] = [
  {
    id: "asked_again",
    prefix: "A",
    label: "Cuando volvió a preguntarle.",
  },
  {
    id: "assumed_about_him",
    prefix: "B",
    label: "Cuando pensó que podía ser por él.",
  },
  {
    id: "called_her_weird",
    prefix: "C",
    label: "Cuando le dijo que estaba rara.",
  },
  {
    id: "unsure",
    prefix: "D",
    label: "No estoy seguro.",
  },
];

export const S02ProblemOrigin: React.FC = () => {
  const { state, setProblemOriginGuess, setCurrentScreen } = useFunnel();
  const [selectedId, setSelectedId] = useState<ProblemOriginGuessId | null>(
    () => state.problemOriginGuess?.id ?? null
  );
  const [feedbackPhase, setFeedbackPhase] = useState<
    "idle" | "sense" | "look"
  >("idle");

  const timer1Ref = useRef<NodeJS.Timeout | null>(null);
  const timer2Ref = useRef<NodeJS.Timeout | null>(null);
  const timer3Ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timer1Ref.current) clearTimeout(timer1Ref.current);
      if (timer2Ref.current) clearTimeout(timer2Ref.current);
      if (timer3Ref.current) clearTimeout(timer3Ref.current);
    };
  }, []);

  const handleSelectOption = (option: OptionItem) => {
    if (feedbackPhase !== "idle") return;

    const value: ProblemOriginGuessValue = {
      id: option.id,
      label: option.label,
    };

    setSelectedId(option.id);

    // Save answer BEFORE transitioning
    setProblemOriginGuess(value);

    // Phase 1: brief selection acknowledgement, then "Tiene sentido." (visible for 2.0s)
    timer1Ref.current = setTimeout(() => {
      setFeedbackPhase("sense");
    }, 400);

    // Phase 2: "Pero mira algo." (visible for 2.2s)
    timer2Ref.current = setTimeout(() => {
      setFeedbackPhase("look");
    }, 2400);

    // Phase 3: Transition to S02_03_REWIND (+2s real reading time total)
    timer3Ref.current = setTimeout(() => {
      setCurrentScreen("S02_03_REWIND");
    }, 4600);
  };

  return (
    <div
      id="screen-s02-02-problem-origin"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="origin-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content Area */}
      <main className="my-auto py-8">
        {feedbackPhase === "idle" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            {/* Editorial Title */}
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.15em] text-neutral-400 font-medium">
                Punto de fricción
              </span>
              <p className="text-base sm:text-lg font-light text-neutral-300 leading-relaxed">
                Ella evidentemente se molestó más.
              </p>
              <h1
                id="origin-heading"
                className="text-2xl sm:text-3xl font-normal text-white tracking-tight leading-snug pt-1"
              >
                ¿Dónde crees que empezó el problema?
              </h1>
            </div>

            {/* Quiet, Clean Option List */}
            <div
              id="origin-options-list"
              className="flex flex-col gap-3"
              role="radiogroup"
              aria-label="¿Dónde crees que empezó el problema?"
            >
              {ORIGIN_OPTIONS.map((opt) => {
                const isSelected = selectedId === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`btn-origin-opt-${opt.id}`}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full min-h-14 py-3.5 px-4 text-left rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-3.5 border ${
                      isSelected
                        ? "bg-neutral-800/90 border-neutral-400 text-white shadow-md scale-[1.01]"
                        : "bg-neutral-900/50 hover:bg-neutral-900 border-neutral-800/90 hover:border-neutral-700 text-neutral-300 hover:text-white"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-mono font-medium shrink-0 transition-colors ${
                        isSelected
                          ? "bg-neutral-200 text-neutral-950 font-bold"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {opt.prefix}
                    </span>
                    <span className="text-sm sm:text-base font-normal leading-relaxed">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Narrative Feedback Beats */}
        {feedbackPhase === "sense" && (
          <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in">
            <p
              id="origin-feedback-sense"
              className="text-2xl sm:text-3xl font-light text-neutral-200 tracking-tight"
            >
              Tiene sentido.
            </p>
          </div>
        )}

        {feedbackPhase === "look" && (
          <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in">
            <p
              id="origin-feedback-look"
              className="text-2xl sm:text-3xl font-normal text-white tracking-tight"
            >
              Pero mira algo.
            </p>
          </div>
        )}
      </main>

      {/* Footer spacer */}
      <footer className="w-full min-h-8 pb-2" />
    </div>
  );
};
