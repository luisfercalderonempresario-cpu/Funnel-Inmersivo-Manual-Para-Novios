/**
 * S04_06_BELIEF_CHECK — Comprobación de creencia
 * The single interactive moment of Sequence 04:
 * Question: "Entonces, conocer su ciclo te serviría principalmente para…"
 * Options:
 *  - predict_feelings: "Saber cómo probablemente se siente."
 *  - add_context: "Tener más contexto antes de asumir."
 *  - know_approach: "Saber exactamente cómo acercarme."
 *  - unsure: "No estoy seguro todavía."
 * Corrects mental model gently without points, red/green, or scores.
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { CycleUnderstandingId } from "../../state/funnelTypes";

interface OptionDef {
  id: CycleUnderstandingId;
  label: string;
}

const OPTIONS: OptionDef[] = [
  {
    id: "predict_feelings",
    label: "Saber cómo probablemente se siente.",
  },
  {
    id: "add_context",
    label: "Tener más contexto antes de asumir.",
  },
  {
    id: "know_approach",
    label: "Saber exactamente cómo acercarme.",
  },
  {
    id: "unsure",
    label: "No estoy seguro todavía.",
  },
];

export const S04BeliefCheck: React.FC = () => {
  const { state, setCycleUnderstanding, setCurrentScreen } = useFunnel();

  const [selectedId, setSelectedId] = useState<CycleUnderstandingId | null>(
    state.cycleUnderstanding
  );
  const [showFeedback, setShowFeedback] = useState<boolean>(
    Boolean(state.cycleUnderstanding)
  );

  const handleSelect = (id: CycleUnderstandingId) => {
    if (selectedId) return; // Block accidental double selections
    setSelectedId(id);
    // Persist immediately before showing feedback
    setCycleUnderstanding(id);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setCurrentScreen("S04_07_MASTER_BELIEF");
  };

  return (
    <div
      id="screen-s04-06-belief-check"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="belief-check-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono leading-relaxed">
            Ahora quiero hacerte una pregunta importante
          </span>
          <h1
            id="belief-check-question"
            className="text-xl sm:text-2xl font-medium text-white tracking-tight leading-snug"
          >
            Entonces, conocer su ciclo te serviría principalmente para…
          </h1>
        </div>

        {/* Options List */}
        <div
          id="belief-check-options"
          className="flex flex-col gap-3 py-1"
          role="radiogroup"
          aria-label="Opciones de comprensión del ciclo"
        >
          {OPTIONS.map((opt) => {
            const isSelected = selectedId === opt.id;
            return (
              <button
                key={opt.id}
                id={`btn-belief-${opt.id}`}
                type="button"
                disabled={Boolean(selectedId)}
                onClick={() => handleSelect(opt.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-neutral-800/90 border-neutral-400 text-white shadow-lg"
                    : selectedId
                    ? "bg-neutral-900/40 border-neutral-800/50 text-neutral-400 cursor-default opacity-60"
                    : "bg-neutral-900/80 hover:bg-neutral-800/80 border-neutral-800 hover:border-neutral-700 text-neutral-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "border-white bg-white"
                        : "border-neutral-600 bg-transparent"
                    }`}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                    )}
                  </span>
                  <span className="text-sm sm:text-base font-light leading-relaxed">
                    {opt.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Non-judgmental Feedback Section */}
        {showFeedback && selectedId && (
          <div
            id="belief-feedback-container"
            className="p-5 rounded-lg bg-neutral-900/80 border border-neutral-700/80 flex flex-col gap-2.5 animate-fade-in"
          >
            {selectedId === "predict_feelings" && (
              <>
                <p className="text-sm font-medium text-neutral-200">
                  Puede parecerlo.
                </p>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Pero conocer una fase no te dice cómo se siente ella.
                </p>
                <p className="text-xs text-neutral-400 font-light leading-relaxed pt-1">
                  Solo añade contexto que puedes contrastar con lo que ella te diga.
                </p>
              </>
            )}

            {selectedId === "add_context" && (
              <>
                <p className="text-sm font-medium text-white">
                  Exacto.
                </p>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  No para predecirla.
                </p>
                <p className="text-sm text-neutral-200 font-medium leading-relaxed pt-1">
                  Para tener más contexto antes de reaccionar.
                </p>
              </>
            )}

            {selectedId === "know_approach" && (
              <>
                <p className="text-sm font-medium text-neutral-200">
                  Puede orientarte a hacer mejores preguntas.
                </p>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Pero no puede decirte exactamente qué necesita.
                </p>
                <p className="text-xs text-neutral-400 font-light leading-relaxed pt-1">
                  Eso sigue viniendo de ella.
                </p>
              </>
            )}

            {selectedId === "unsure" && (
              <>
                <p className="text-sm font-medium text-neutral-200">
                  Quédate con esto:
                </p>
                <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                  El ciclo añade contexto; no reemplaza su voz.
                </p>
              </>
            )}
          </div>
        )}
      </main>

      {/* Action Footer */}
      <footer className="w-full pt-4 pb-2">
        {showFeedback ? (
          <button
            id="btn-belief-continue"
            type="button"
            onClick={handleNext}
            className="w-full py-4 px-6 bg-neutral-100 hover:bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide rounded-lg transition-colors duration-200 cursor-pointer text-center animate-fade-in"
          >
            Continúa
          </button>
        ) : (
          <div className="min-h-14" />
        )}
      </footer>
    </div>
  );
};
