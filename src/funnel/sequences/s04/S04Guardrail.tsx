/**
 * S04_03_GUARDRAIL — El guardarraíl
 * Non-negotiable conceptual boundary:
 * "Pero cuidado.
 *  Conocer la fase no significa saber cómo se siente ella.
 *  No significa que puedas predecir su estado de ánimo.
 *  Tampoco que dos mujeres vivan una fase de la misma manera.
 *  Incluso ella puede vivir ciclos diferentes.
 *  Su voz siempre vale más que cualquier estimación."
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S04Guardrail: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);

  // Progressive reveal (0: Caution, 1: Core thesis, 2: Specific nuances, 3: The ultimate truth)
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "cycle_guardrail_viewed",
        sequence: "S04_LA_PIEZA_INESPERADA",
        screen: "S04_03_GUARDRAIL",
      });
    }

    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 1600);
    const t3 = setTimeout(() => setStage(3), 2700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleNext = () => {
    setCurrentScreen("S04_04_UTILITY");
  };

  return (
    <div
      id="screen-s04-03-guardrail"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="guardrail-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 flex flex-col gap-6">
        <span
          id="guardrail-caution"
          className="text-xs sm:text-sm uppercase tracking-widest text-amber-400/90 font-mono font-medium animate-fade-in"
        >
          Pero cuidado
        </span>

        {stage >= 1 && (
          <h1
            id="guardrail-master-principle"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug animate-fade-in"
          >
            Conocer la fase no significa saber cómo se siente ella.
          </h1>
        )}

        {stage >= 2 && (
          <div className="flex flex-col gap-3 py-2 text-neutral-300 text-sm sm:text-base font-light leading-relaxed animate-fade-in">
            <p id="guardrail-predict-negation">
              No significa que puedas predecir su estado de ánimo.
            </p>
            <p id="guardrail-individual-negation">
              Tampoco que dos mujeres vivan una fase de la misma manera.
            </p>
            <p id="guardrail-cycle-variability">
              Incluso ella puede vivir ciclos diferentes.
            </p>
          </div>
        )}

        {stage >= 3 && (
          <div
            id="guardrail-voice-priority"
            className="mt-3 p-4 rounded-lg bg-neutral-900/80 border-l-2 border-neutral-300 animate-fade-in"
          >
            <p className="text-base sm:text-lg font-medium text-white tracking-tight">
              Su voz siempre vale más que cualquier estimación.
            </p>
          </div>
        )}
      </main>

      {/* Action Footer */}
      <footer className="w-full pt-4 pb-2">
        {stage >= 3 ? (
          <button
            id="btn-guardrail-inquire-utility"
            type="button"
            onClick={handleNext}
            className="w-full py-4 px-6 bg-neutral-100 hover:bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide rounded-lg transition-colors duration-200 cursor-pointer text-center animate-fade-in"
          >
            Entonces, ¿para qué sirve?
          </button>
        ) : (
          <div className="min-h-14" />
        )}
      </footer>
    </div>
  );
};
