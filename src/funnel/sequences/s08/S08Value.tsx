/**
 * S08_08_VALUE — Evaluación del Valor Percibido
 * Captures user reflection on practical utility with grounded empathetic feedback.
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { TrialValueResponse } from "../../state/funnelTypes";

export const S08Value: React.FC = () => {
  const { state, setTrialValueResponse, setCurrentScreen } = useFunnel();
  const [selected, setSelected] = useState<TrialValueResponse>(
    state.trialValueResponse
  );

  const handleSelect = (choice: NonNullable<TrialValueResponse>) => {
    setSelected(choice);
    setTrialValueResponse(choice);
  };

  const handleContinue = () => {
    setCurrentScreen("S08_09_TRIAL_EXIT");
  };

  return (
    <div
      id="screen-s08-08-value"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            CONTEXTO™
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            REFLEXIÓN
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 space-y-6 animate-fade-in">
        <div className="space-y-4">
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            Esto no te dice cómo se siente ella.
          </p>
          <p className="text-white text-lg sm:text-xl font-serif leading-snug">
            Pero puede darte un punto de partida diferente para acercarte.
          </p>
          <div className="pt-2 space-y-2">
            <p className="text-neutral-400 text-sm leading-relaxed">
              Pensando en esos momentos en que no sabes muy bien qué hacer…
            </p>
            <h1 className="text-xl sm:text-2xl text-white font-serif leading-snug">
              ¿te habría sido útil tener esto?
            </h1>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 pt-2">
          <button
            id="btn-value-yes"
            type="button"
            onClick={() => handleSelect("yes")}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selected === "yes"
                ? "bg-neutral-800 border-white text-white shadow-lg"
                : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-200"
            }`}
          >
            <span className="text-sm sm:text-base font-medium">Sí.</span>
          </button>

          <button
            id="btn-value-probably"
            type="button"
            onClick={() => handleSelect("probably")}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selected === "probably"
                ? "bg-neutral-800 border-white text-white shadow-lg"
                : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-200"
            }`}
          >
            <span className="text-sm sm:text-base font-medium">
              Probablemente.
            </span>
          </button>

          <button
            id="btn-value-unsure"
            type="button"
            onClick={() => handleSelect("unsure")}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selected === "unsure"
                ? "bg-neutral-800 border-white text-white shadow-lg"
                : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-200"
            }`}
          >
            <span className="text-sm sm:text-base font-medium">
              No estoy seguro.
            </span>
          </button>
        </div>

        {/* Dynamic empathetic feedback */}
        {selected && (
          <div
            id="value-feedback-card"
            className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-lg space-y-2 animate-fade-in"
          >
            {selected === "yes" && (
              <>
                <p className="text-white text-sm font-medium">Tiene sentido.</p>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Porque no siempre necesitas una respuesta perfecta. A veces necesitas un poco más de contexto antes de responder.
                </p>
              </>
            )}

            {selected === "probably" && (
              <>
                <p className="text-white text-sm font-medium">Tiene sentido.</p>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  A veces una pequeña orientación puede ser suficiente para empezar una conversación desde otro lugar.
                </p>
              </>
            )}

            {selected === "unsure" && (
              <>
                <p className="text-white text-sm font-medium">Tiene sentido.</p>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Una orientación así solo tiene valor si realmente te ayuda en un momento real.
                </p>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="space-y-4 pb-4 sm:pb-6">
        {selected ? (
          <button
            id="btn-value-continue"
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-xl cursor-pointer"
          >
            CONTINUAR
          </button>
        ) : (
          <div className="h-14" aria-hidden="true" />
        )}

        <button
          type="button"
          onClick={() => setCurrentScreen("S08_07_TODAY")}
          className="block text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-wider"
        >
          ← Volver al contexto de hoy
        </button>
      </footer>
    </div>
  );
};
