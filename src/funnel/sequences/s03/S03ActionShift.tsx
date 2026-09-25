/**
 * S03_04_ACTION_SHIFT — ¿Cambiaría tu acción?
 * Narrative decision on whether knowing the sleep and work context shifts what you'd do.
 * No scoring. No correct answer.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { ContextChangesActionId } from "../../state/funnelTypes";

interface OptionItem {
  id: ContextChangesActionId;
  prefix: string;
  label: string;
}

const ACTION_SHIFT_OPTIONS: readonly OptionItem[] = [
  {
    id: "yes",
    prefix: "A",
    label: "Sí.",
  },
  {
    id: "probably",
    prefix: "B",
    label: "Probablemente.",
  },
  {
    id: "not_necessarily",
    prefix: "C",
    label: "No necesariamente.",
  },
];

export const S03ActionShift: React.FC = () => {
  const { state, setContextChangesAction, setCurrentScreen } = useFunnel();
  const [selectedId, setSelectedId] = useState<ContextChangesActionId | null>(
    () => state.contextChangesAction ?? null
  );
  const [feedbackPhase, setFeedbackPhase] = useState<
    "idle" | "maybe_different" | "now_you_know"
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
    setContextChangesAction(option.id);

    // Phase 1: "Puede que hicieras algo distinto, o puede que hicieras exactamente lo mismo." (visible for 2.8s)
    timer1Ref.current = setTimeout(() => {
      setFeedbackPhase("maybe_different");
    }, 400);

    // Phase 2: "Pero ahora sabes algo que antes no sabías." (visible for 2.4s)
    timer2Ref.current = setTimeout(() => {
      setFeedbackPhase("now_you_know");
    }, 3200);

    // Phase 3: Transition to S03_05_RECONSTRUCTION (+2s real reading time total)
    timer3Ref.current = setTimeout(() => {
      setCurrentScreen("S03_05_RECONSTRUCTION");
    }, 5600);
  };

  return (
    <div
      id="screen-s03-04-action-shift"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="action-shift-brand-label"
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
                La decisión
              </span>
              <h1
                id="action-shift-heading"
                className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug"
              >
                Y sabiendo esto… ¿cambiaría lo que harías?
              </h1>
            </div>

            {/* Clean Option List */}
            <div
              id="action-shift-options-list"
              className="flex flex-col gap-3"
              role="radiogroup"
              aria-label="¿Cambiaría lo que harías?"
            >
              {ACTION_SHIFT_OPTIONS.map((opt) => {
                const isSelected = selectedId === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`btn-action-shift-${opt.id}`}
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
        {feedbackPhase === "maybe_different" && (
          <div className="flex flex-col items-center justify-center text-center py-12 gap-3 animate-fade-in">
            <p
              id="action-shift-feedback-1"
              className="text-xl sm:text-2xl font-light text-neutral-200 tracking-tight leading-relaxed max-w-sm"
            >
              Puede que hicieras algo distinto,
            </p>
            <p
              id="action-shift-feedback-2"
              className="text-xl sm:text-2xl font-light text-neutral-400 tracking-tight leading-relaxed max-w-sm"
            >
              o puede que hicieras exactamente lo mismo.
            </p>
          </div>
        )}

        {feedbackPhase === "now_you_know" && (
          <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in">
            <p
              id="action-shift-feedback-3"
              className="text-2xl sm:text-3xl font-normal text-white tracking-tight leading-snug max-w-sm"
            >
              Pero ahora sabes algo que antes no sabías.
            </p>
          </div>
        )}
      </main>

      {/* Footer spacer */}
      <footer className="w-full min-h-8 pb-2" />
    </div>
  );
};
