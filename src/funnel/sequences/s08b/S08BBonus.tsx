/**
 * S08B_06_BONUS — Guía para conocer la fecha
 * Presenta el bono incluido con Contexto™ para obtener la fecha de forma respetuosa.
 * Dispara 'bonus_viewed' una única vez.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S08BBonus: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const [stage, setStage] = useState<number>(0);
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "bonus_viewed",
        sequence: "S08B_OFFER",
        screen: "S08B_06_BONUS",
        metadata: {
          desiredTransformation: state.desiredTransformation,
          trialValueResponse: state.trialValueResponse,
        },
      });
    }

    const t = setTimeout(() => setStage(1), 1000);
    return () => clearTimeout(t);
  }, [state.desiredTransformation, state.trialValueResponse]);

  const handleContinue = () => {
    setCurrentScreen("S08B_07_VALUE_BRIDGE");
  };

  return (
    <div
      id="screen-s08b-06-bonus"
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
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            BONO INCLUIDO
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 space-y-6 animate-fade-in">
        <div className="space-y-3">
          <p className="text-sm font-mono uppercase tracking-wider text-neutral-400">
            Hay una cosa que puede hacer que las estimaciones sean más útiles:
          </p>
          <h1 className="text-xl sm:text-2xl text-white font-serif leading-snug">
            Tener una buena referencia del primer día de su última menstruación.
          </h1>
        </div>

        <div className="space-y-1 text-neutral-300 text-sm sm:text-base">
          <p className="text-neutral-400">Y quizá ahora estés pensando:</p>
          <p className="text-white font-medium italic">
            &ldquo;¿Cómo le pregunto eso sin que suene raro?&rdquo;
          </p>
        </div>

        {stage >= 1 && (
          <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-xl space-y-4 animate-fade-in">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                BONO INCLUIDO CON CONTEXTO™
              </span>
              <h2 className="text-white text-lg font-serif mt-1">
                Guía para conocer la fecha
              </h2>
            </div>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Una guía breve para ayudarte a conseguir esa referencia de forma natural, respetuosa y transparente.
            </p>

            <div className="space-y-2 text-neutral-400 text-xs sm:text-sm pt-1">
              <p className="text-neutral-300 font-medium">Incluye orientación para:</p>
              <ul className="space-y-1.5 list-disc list-inside text-neutral-300">
                <li>explicar por qué quieres saberlo;</li>
                <li>preguntarlo sin convertirlo en un interrogatorio;</li>
                <li>y obtener una referencia más precisa sin hacerla sentir observada.</li>
              </ul>
            </div>

            <div className="pt-2 border-t border-neutral-800/80 text-xs sm:text-sm text-neutral-400 space-y-1">
              <p>No se trata de investigarla.</p>
              <p className="text-white font-medium">Se trata de hablarlo con ella.</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="space-y-4 pb-4 sm:pb-6">
        <button
          id="btn-s08b-bonus-continue"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
        >
          CONTINUAR
        </button>
      </footer>
    </div>
  );
};
