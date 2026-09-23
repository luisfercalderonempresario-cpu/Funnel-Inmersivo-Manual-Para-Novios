/**
 * S04_04_UTILITY — Para qué sirve
 * Clarifies context vs causality:
 * "Para algo mucho más simple.
 *  Para recordar que quizá todavía te falta contexto.
 *  NO: Está así porque está en esta fase.
 *  SINO: Puede haber algo que todavía no estoy considerando.
 *  El ciclo no te da una respuesta sobre ella.
 *  Te da una razón más para no apresurarte a sacar conclusiones."
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S04Utility: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);

  // Progressive reveal (0: Lead, 1: Contrast block, 2: Conclusion)
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "cycle_utility_viewed",
        sequence: "S04_LA_PIEZA_INESPERADA",
        screen: "S04_04_UTILITY",
      });
    }

    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleNext = () => {
    setCurrentScreen("S04_05_ASK_BETTER");
  };

  return (
    <div
      id="screen-s04-04-utility"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="utility-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p
            id="utility-lead-1"
            className="text-sm sm:text-base font-light text-neutral-400"
          >
            Para algo mucho más simple.
          </p>
          <h1
            id="utility-lead-2"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug animate-fade-in"
          >
            Para recordar que quizá todavía te falta contexto.
          </h1>
        </div>

        {/* Conceptual Contrast: NO vs SINO */}
        {stage >= 1 && (
          <div
            id="utility-contrast-block"
            className="flex flex-col gap-3 py-2 animate-fade-in"
          >
            {/* The Reductionist Trap (NO) */}
            <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800/80 flex flex-col gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400/90 font-semibold">
                NO
              </span>
              <p className="text-neutral-300 text-sm sm:text-base font-light italic">
                “Está así porque está en esta fase.”
              </p>
            </div>

            {/* The Contextual Mindset (SINO) */}
            <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-700/80 flex flex-col gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                SINO
              </span>
              <p className="text-white text-sm sm:text-base font-medium">
                “Puede haber algo que todavía no estoy considerando.”
              </p>
            </div>
          </div>
        )}

        {/* Closing Takeaway */}
        {stage >= 2 && (
          <div className="flex flex-col gap-2 pt-2 animate-fade-in">
            <p
              id="utility-takeaway-1"
              className="text-sm sm:text-base font-light text-neutral-300 leading-relaxed"
            >
              El ciclo no te da una respuesta sobre ella.
            </p>
            <p
              id="utility-takeaway-2"
              className="text-base sm:text-lg font-medium text-white leading-relaxed"
            >
              Te da una razón más para no apresurarte a sacar conclusiones.
            </p>
          </div>
        )}
      </main>

      {/* Action Footer */}
      <footer className="w-full pt-4 pb-2">
        {stage >= 2 ? (
          <button
            id="btn-utility-next"
            type="button"
            onClick={handleNext}
            className="w-full py-4 px-6 bg-neutral-100 hover:bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide rounded-lg transition-colors duration-200 cursor-pointer text-center animate-fade-in"
          >
            ¿Y entonces?
          </button>
        ) : (
          <div className="min-h-14" />
        )}
      </footer>
    </div>
  );
};
