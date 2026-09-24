/**
 * S06_05_EXIT — Salida S06
 * Closes Sequence 06 with the high-potency question:
 * "Entonces déjame preguntarte algo."
 * Pause.
 * "¿Y si pudieras tener ese contexto en menos de 2 minutos al día?"
 * Left open to breathe.
 * NO answers, NO options, NO Contexto™, NO app revealed.
 * Stable QA endpoint.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S06Exit: React.FC = () => {
  const { markSequence06Completed, setCurrentScreen } = useFunnel();
  const hasCompletedRef = useRef<boolean>(false);
  const isDev = Boolean(import.meta.env.DEV);
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      markSequence06Completed();
    }

    const t = setTimeout(() => {
      setStage(1);
    }, 1200);

    return () => clearTimeout(t);
  }, [markSequence06Completed]);

  return (
    <div
      id="screen-s06-05-exit"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="exit-s06-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Narrative Area */}
      <main className="flex-1 flex flex-col justify-center py-12 space-y-8">
        {/* Intro lead line */}
        <p
          id="exit-s06-lead"
          className="text-neutral-400 text-lg sm:text-xl font-light tracking-wide transition-opacity duration-700"
        >
          Entonces déjame preguntarte algo.
        </p>

        {/* Master Open Question */}
        {stage >= 1 && (
          <div className="pt-4 border-l-2 border-white/80 pl-5 sm:pl-6 animate-fade-in transition-all duration-700">
            <h1
              id="exit-s06-core-question"
              className="text-white text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-relaxed sm:leading-tight"
            >
              ¿Y si pudieras tener ese contexto en menos de 2 minutos al día?
            </h1>
          </div>
        )}
      </main>

      {/* Footer Area: Breathing space / CTA to S07 */}
      <footer className="pt-6 flex flex-col gap-3">
        {stage >= 1 && (
          <button
            id="btn-s06-exit-continue"
            type="button"
            onClick={() => setCurrentScreen("S07_01_SETUP")}
            className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-lg cursor-pointer animate-fade-in"
          >
            Quiero verlo
          </button>
        )}
        {isDev ? (
          <div
            id="dev-s06-qa-indicator"
            className="p-3 rounded bg-neutral-900/60 border border-neutral-800 text-[11px] font-mono text-neutral-400 text-center select-none"
          >
            [DEV QA] Fin de Secuencia 06 — S06_05_EXIT → [Quiero verlo] entra a S07
          </div>
        ) : (
          <div className="h-4" aria-hidden="true" />
        )}
      </footer>
    </div>
  );
};
