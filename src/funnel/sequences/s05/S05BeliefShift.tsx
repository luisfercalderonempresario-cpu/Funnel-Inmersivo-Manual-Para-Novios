/**
 * S05_05_BELIEF_SHIFT — Cambio de creencia
 * Measures belief shift acquired before product revelation.
 * Question: "Después de este caso, ¿qué te parece más importante?"
 * 4 Options:
 * - know_what_to_do: "Saber exactamente qué hacer."
 * - understand_first: "Entender mejor antes de reaccionar."
 * - avoid_mistakes: "Evitar equivocarme."
 * - unsure: "No estoy seguro todavía."
 * Formative feedback without quiz grading, points or judgment.
 * Persists beliefShift before feedback is shown.
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { BeliefShiftId } from "../../state/funnelTypes";

interface BeliefOption {
  key: "A" | "B" | "C" | "D";
  id: BeliefShiftId;
  label: string;
}

const BELIEF_OPTIONS: readonly BeliefOption[] = [
  {
    key: "A",
    id: "know_what_to_do",
    label: "Saber exactamente qué hacer.",
  },
  {
    key: "B",
    id: "understand_first",
    label: "Entender mejor antes de reaccionar.",
  },
  {
    key: "C",
    id: "avoid_mistakes",
    label: "Evitar equivocarme.",
  },
  {
    key: "D",
    id: "unsure",
    label: "No estoy seguro todavía.",
  },
] as const;

export const S05BeliefShift: React.FC = () => {
  const { state, setBeliefShift, setCurrentScreen } = useFunnel();
  const [selectedId, setSelectedId] = useState<BeliefShiftId | null>(
    () => state.beliefShift ?? null
  );
  const [showFeedback, setShowFeedback] = useState<boolean>(() => state.beliefShift !== null);

  const handleSelect = (option: BeliefOption) => {
    setSelectedId(option.id);
    // Persist choice immediately before displaying feedback
    setBeliefShift(option.id);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setCurrentScreen("S05_06_EXIT");
  };

  return (
    <div
      id="screen-s05-05-belief-shift"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Header */}
      <header className="pt-2">
        <span
          id="belief-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 flex flex-col gap-6">
        <h2
          id="belief-shift-question"
          className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight"
        >
          Después de este caso, ¿qué te parece más importante?
        </h2>

        {/* Options List */}
        <div
          role="radiogroup"
          aria-label="Opciones de creencia"
          className="flex flex-col gap-3 pt-1"
        >
          {BELIEF_OPTIONS.map((opt) => {
            const isSelected = selectedId === opt.id;

            return (
              <button
                key={opt.id}
                id={`btn-belief-${opt.id}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelect(opt)}
                className={`w-full p-4 sm:p-4.5 rounded-lg text-left transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                  isSelected
                    ? "bg-neutral-800 border-neutral-400 text-white shadow-lg"
                    : "bg-neutral-900/90 hover:bg-neutral-800/80 border-neutral-800 hover:border-neutral-700 text-neutral-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold tracking-wider px-2 py-1 rounded ${
                      isSelected
                        ? "bg-white text-neutral-950"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className="text-base font-normal">
                    {opt.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Formative Feedback */}
        {showFeedback && selectedId && (
          <div
            id="belief-feedback-container"
            className="p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 flex flex-col gap-2.5 animate-fade-in"
          >
            {selectedId === "understand_first" && (
              <>
                <p className="text-sm font-semibold text-neutral-200 tracking-wide">
                  Ahí está la diferencia.
                </p>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  No siempre necesitas tener la respuesta perfecta.
                </p>
                <p className="text-sm text-neutral-300 font-normal leading-relaxed">
                  A veces necesitas entender un poco más antes de responder.
                </p>
              </>
            )}

            {selectedId === "know_what_to_do" && (
              <>
                <p className="text-sm font-semibold text-neutral-200 tracking-wide">
                  Es normal querer saber qué hacer.
                </p>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Pero una misma acción no funciona igual en todos los momentos.
                </p>
                <p className="text-sm text-neutral-300 font-normal leading-relaxed">
                  Entender primero puede ayudarte a decidir mejor después.
                </p>
              </>
            )}

            {selectedId === "avoid_mistakes" && (
              <>
                <p className="text-sm font-semibold text-neutral-200 tracking-wide">
                  Evitar errores ayuda.
                </p>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Pero una relación no se construye intentando no equivocarse nunca.
                </p>
                <p className="text-sm text-neutral-300 font-normal leading-relaxed">
                  También se construye aprendiendo a comprender mejor.
                </p>
              </>
            )}

            {selectedId === "unsure" && (
              <>
                <p className="text-sm font-semibold text-neutral-200 tracking-wide">
                  Está bien.
                </p>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Quédate con algo simple:
                </p>
                <p className="text-sm text-neutral-300 font-normal leading-relaxed">
                  Más contexto puede darte un poco más de claridad antes de reaccionar.
                </p>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="w-full min-h-16 flex items-center justify-center pb-2">
        {showFeedback && (
          <button
            id="btn-belief-continue"
            type="button"
            onClick={handleContinue}
            className="w-full py-4 bg-white text-neutral-950 font-medium text-base rounded-md hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg animate-fade-in"
          >
            Continúa
          </button>
        )}
      </footer>
    </div>
  );
};
