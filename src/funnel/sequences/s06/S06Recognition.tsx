/**
 * S06_02_RECOGNITION — Reconocimiento
 * Exact question: "¿Te ha pasado?"
 * Options:
 * - "yes": "Sí."
 * - "multiple": "Más de una vez."
 * - "none_recalled": "No se me ocurre ninguna ahora."
 * Reflective non-evaluative feedback converges directly to S06_03_DESIRE.
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { PersonalProblemRecognition } from "../../state/funnelTypes";

interface OptionItem {
  id: "yes" | "multiple" | "none_recalled";
  label: string;
}

const RECOGNITION_OPTIONS: OptionItem[] = [
  { id: "yes", label: "Sí." },
  { id: "multiple", label: "Más de una vez." },
  { id: "none_recalled", label: "No se me ocurre ninguna ahora." },
];

export const S06Recognition: React.FC = () => {
  const { state, setPersonalProblemRecognition, setCurrentScreen } = useFunnel();
  const [selectedId, setSelectedId] = useState<PersonalProblemRecognition>(
    state.personalProblemRecognition
  );
  const [feedbackStage, setFeedbackStage] = useState<number>(
    state.personalProblemRecognition ? 1 : 0
  );

  const handleSelectOption = (id: "yes" | "multiple" | "none_recalled") => {
    setSelectedId(id);
    setPersonalProblemRecognition(id);
    setFeedbackStage(1);
  };

  const handleContinue = () => {
    setCurrentScreen("S06_03_DESIRE");
  };

  return (
    <div
      id="screen-s06-02-recognition"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="recognition-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center py-8 space-y-8">
        {/* Title Question */}
        <div className="space-y-2">
          <h1
            id="recognition-title"
            className="text-white text-2xl sm:text-3xl font-light tracking-tight leading-snug"
          >
            ¿Te ha pasado?
          </h1>
        </div>

        {/* Options List */}
        <div
          id="recognition-options-container"
          role="radiogroup"
          aria-label="Opciones de reconocimiento"
          className="space-y-3"
        >
          {RECOGNITION_OPTIONS.map((option) => {
            const isSelected = selectedId === option.id;
            return (
              <button
                key={option.id}
                id={`btn-recognition-opt-${option.id}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full py-4 px-5 rounded-md border text-left text-base sm:text-lg font-light transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-neutral-900 border-white/60 text-white shadow-md ring-1 ring-white/20"
                    : "bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900/40"
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`w-4 h-4 rounded-full border transition-all flex items-center justify-center shrink-0 ml-3 ${
                    isSelected
                      ? "border-white bg-white"
                      : "border-neutral-700 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Formative Non-judgmental Feedback */}
        {selectedId && feedbackStage >= 1 && (
          <div
            id="recognition-feedback-box"
            className="pt-4 border-t border-neutral-800/80 space-y-3 animate-fade-in"
          >
            {selectedId === "yes" || selectedId === "multiple" ? (
              <>
                <p
                  id="recognition-feedback-ack"
                  className="text-white text-lg font-light tracking-wide"
                >
                  Tiene sentido.
                </p>
                <div className="space-y-1.5 text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                  <p>Y después de todo lo que acabas de ver…</p>
                  <p className="text-neutral-300">
                    quiero hacerte una pregunta más importante.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p
                  id="recognition-feedback-ack"
                  className="text-white text-lg font-light tracking-wide"
                >
                  Está bien.
                </p>
                <div className="space-y-1.5 text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                  <p>
                    No necesitas recordar una discusión para pensar en esto.
                  </p>
                  <p className="text-neutral-300">
                    Piensa simplemente en ella hoy.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="pt-6">
        {selectedId ? (
          <button
            id="btn-recognition-continue"
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-lg cursor-pointer animate-fade-in"
          >
            Continúa
          </button>
        ) : (
          <div className="h-14" aria-hidden="true" />
        )}
      </footer>
    </div>
  );
};
