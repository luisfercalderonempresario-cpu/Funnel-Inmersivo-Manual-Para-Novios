/**
 * S04_02_CYCLE_EXPLAINED — El ciclo menstrual
 * Explains conceptually:
 * "Sí.
 *  Y hay algo importante:
 *  El ciclo menstrual no son solamente los días en que tiene su periodo.
 *  MENSTRUAL → FOLICULAR → OVULATORIA → LÚTEA
 *  A lo largo del ciclo ocurren cambios hormonales y fisiológicos."
 * Strictly editorial, no fixed days, no mood stereotypes.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S04CycleExplained: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);

  // Progressive reveal (0: Sí, 1: Premise, 2: 4 Phases, 3: Biology takeaway)
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "cycle_explanation_viewed",
        sequence: "S04_LA_PIEZA_INESPERADA",
        screen: "S04_02_CYCLE_EXPLAINED",
      });
    }

    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 1600);
    const t3 = setTimeout(() => setStage(3), 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleNext = () => {
    setCurrentScreen("S04_03_GUARDRAIL");
  };

  return (
    <div
      id="screen-s04-02-cycle-explained"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="cycle-explained-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 flex flex-col gap-6">
        <p
          id="cycle-affirmation"
          className="text-xl sm:text-2xl font-light text-neutral-200 animate-fade-in"
        >
          Sí.
        </p>

        {stage >= 1 && (
          <div className="flex flex-col gap-2.5 animate-fade-in">
            <p
              id="cycle-explained-lead"
              className="text-xs sm:text-sm uppercase tracking-widest text-neutral-400 font-mono"
            >
              Y hay algo importante
            </p>
            <h1
              id="cycle-not-only-period"
              className="text-xl sm:text-2xl font-medium text-white tracking-tight leading-snug"
            >
              El ciclo menstrual no son solamente los días en que tiene su periodo.
            </h1>
          </div>
        )}

        {/* Editorial Phase Progression (No days, no emotions, sober lines) */}
        {stage >= 2 && (
          <div
            id="cycle-phases-editorial"
            className="my-3 p-5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 flex flex-col gap-3.5 animate-fade-in"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
              Fases continuas
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { name: "MENSTRUAL", order: "01" },
                { name: "FOLICULAR", order: "02" },
                { name: "OVULATORIA", order: "03" },
                { name: "LÚTEA", order: "04" },
              ].map((phase, idx) => (
                <div
                  key={phase.name}
                  id={`cycle-phase-${phase.name.toLowerCase()}`}
                  className="p-3 bg-neutral-950/80 border border-neutral-800/60 rounded flex flex-col justify-between h-20 transition-colors"
                  style={{
                    animationDelay: `${idx * 150}ms`,
                  }}
                >
                  <span className="text-[10px] font-mono text-neutral-400">
                    {phase.order}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-200">
                    {phase.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1 pt-1 font-mono">
              <span>← Progresión continua</span>
              <span>Ciclo completo →</span>
            </div>
          </div>
        )}

        {stage >= 3 && (
          <p
            id="cycle-physiological-changes"
            className="text-sm sm:text-base font-light text-neutral-300 leading-relaxed animate-fade-in"
          >
            A lo largo del ciclo ocurren cambios hormonales y fisiológicos.
          </p>
        )}
      </main>

      {/* Action Footer */}
      <footer className="w-full pt-4 pb-2">
        {stage >= 3 ? (
          <button
            id="btn-cycle-understood"
            type="button"
            onClick={handleNext}
            className="w-full py-4 px-6 bg-neutral-100 hover:bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide rounded-lg transition-colors duration-200 cursor-pointer text-center animate-fade-in"
          >
            Entiendo
          </button>
        ) : (
          <div className="min-h-14" />
        )}
      </footer>
    </div>
  );
};
