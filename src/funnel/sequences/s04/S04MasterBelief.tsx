/**
 * S04_07_MASTER_BELIEF — Creencia maestra
 * Culmination of the psychological paradigm shift:
 * "Quédate con esto.
 *  El ciclo no te dice cómo se siente ella.
 *  Te recuerda que quizá todavía no tienes todo el contexto.
 *  Y cuando tienes más contexto…
 *  puedes comprender antes de reaccionar."
 * No commercial CTA, no brand trademark.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S04MasterBelief: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);

  // Progressive reveal (0: Lead, 1: Negation, 2: Purpose, 3: The climax)
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "master_belief_viewed",
        sequence: "S04_LA_PIEZA_INESPERADA",
        screen: "S04_07_MASTER_BELIEF",
      });
    }

    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 1800);
    const t3 = setTimeout(() => setStage(3), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleNext = () => {
    setCurrentScreen("S04_08_EXIT");
  };

  return (
    <div
      id="screen-s04-07-master-belief"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="master-belief-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="my-auto py-8 flex flex-col gap-7">
        <span
          id="master-belief-caption"
          className="text-xs uppercase tracking-widest text-neutral-400 font-mono"
        >
          Quédate con esto
        </span>

        {stage >= 1 && (
          <h1
            id="master-belief-line-1"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug animate-fade-in"
          >
            El ciclo no te dice cómo se siente ella.
          </h1>
        )}

        {stage >= 2 && (
          <p
            id="master-belief-line-2"
            className="text-lg sm:text-xl font-light text-neutral-300 tracking-tight leading-relaxed animate-fade-in"
          >
            Te recuerda que quizá todavía no tienes todo el contexto.
          </p>
        )}

        {stage >= 3 && (
          <div className="pt-4 flex flex-col gap-2 animate-fade-in">
            <p className="text-sm uppercase tracking-wider text-neutral-400 font-mono">
              Y cuando tienes más contexto…
            </p>
            <p
              id="master-belief-culmination"
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug py-3 px-4 rounded-lg bg-neutral-900/60 border border-neutral-800"
            >
              puedes comprender antes de reaccionar.
            </p>
          </div>
        )}
      </main>

      {/* Action Footer */}
      <footer className="w-full pt-4 pb-2">
        {stage >= 3 ? (
          <button
            id="btn-master-belief-back-to-case"
            type="button"
            onClick={handleNext}
            className="w-full py-4 px-6 bg-neutral-100 hover:bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide rounded-lg transition-colors duration-200 cursor-pointer text-center animate-fade-in"
          >
            Volvamos al caso
          </button>
        ) : (
          <div className="min-h-14" />
        )}
      </footer>
    </div>
  );
};
