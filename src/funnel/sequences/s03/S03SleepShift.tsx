/**
 * S03_02_SLEEP_SHIFT — ¿Cambia tu interpretación?
 * Asks whether knowing she slept ~3 hours shifts the interpretation.
 * No scoring, no right/wrong answers.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { SleepContextShiftId } from "../../state/funnelTypes";

interface OptionItem {
  id: SleepContextShiftId;
  prefix: string;
  label: string;
}

const SLEEP_SHIFT_OPTIONS: readonly OptionItem[] = [
  {
    id: "significant",
    prefix: "A",
    label: "Sí, bastante.",
  },
  {
    id: "some",
    prefix: "B",
    label: "Un poco.",
  },
  {
    id: "little",
    prefix: "C",
    label: "No demasiado.",
  },
];

export const S03SleepShift: React.FC = () => {
  const { state, setSleepContextShift, setCurrentScreen } = useFunnel();
  const [selectedId, setSelectedId] = useState<SleepContextShiftId | null>(
    () => state.sleepContextShift ?? null
  );
  const [feedbackPhase, setFeedbackPhase] = useState<
    "idle" | "know_something" | "not_all"
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

    setSelectedId(option.id);

    // Save answer BEFORE transitioning
    setSleepContextShift(option.id);

    // Phase 1: "Ahora sabes algo que él no sabía."
    timer1Ref.current = setTimeout(() => {
      setFeedbackPhase("know_something");
    }, 400);

    // Phase 2: "Pero eso no era todo."
    timer2Ref.current = setTimeout(() => {
      setFeedbackPhase("not_all");
    }, 1700);

    // Phase 3: Transition to S03_03_WORK_CONTEXT
    timer3Ref.current = setTimeout(() => {
      setCurrentScreen("S03_03_WORK_CONTEXT");
    }, 2900);
  };

  return (
    <div
      id="screen-s03-02-sleep-shift"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="sleep-shift-brand-label"
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
                Nueva información
              </span>
              <h1
                id="sleep-shift-heading"
                className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug"
              >
                Sabiendo esto… ¿cambia cómo interpretas ese momento?
              </h1>
            </div>

            {/* Clean Option List */}
            <div
              id="sleep-shift-options-list"
              className="flex flex-col gap-3"
              role="radiogroup"
              aria-label="¿Cambia cómo interpretas ese momento?"
            >
              {SLEEP_SHIFT_OPTIONS.map((opt) => {
                const isSelected = selectedId === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`btn-sleep-shift-${opt.id}`}
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
        {feedbackPhase === "know_something" && (
          <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in">
            <p
              id="sleep-shift-feedback-1"
              className="text-2xl sm:text-3xl font-light text-neutral-200 tracking-tight"
            >
              Ahora sabes algo que él no sabía.
            </p>
          </div>
        )}

        {feedbackPhase === "not_all" && (
          <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in">
            <p
              id="sleep-shift-feedback-2"
              className="text-2xl sm:text-3xl font-normal text-white tracking-tight"
            >
              Pero eso no era todo.
            </p>
          </div>
        )}
      </main>

      {/* Footer spacer */}
      <footer className="w-full min-h-8 pb-2" />
    </div>
  );
};
