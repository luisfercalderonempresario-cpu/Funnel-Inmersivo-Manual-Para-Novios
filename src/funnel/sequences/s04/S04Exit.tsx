/**
 * S04_08_EXIT — Salida S04
 * Closes Sequence 04 and recovers initial decision framing:
 * "Al principio te puse exactamente en su lugar.
 *  Viste lo que él vio.
 *  Y tuviste que decidir con la misma información incompleta.
 *  Pero ahora sabes algo que al principio no sabías.
 *  Si volvieras a ese martes…
 *  ¿harías lo mismo?
 *  Volvamos al principio."
 * Stable endpoint for Sequence 04 QA.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S04Exit: React.FC = () => {
  const { markSequence04Completed } = useFunnel();
  const hasCompletedRef = useRef<boolean>(false);
  const isDev = Boolean(import.meta.env.DEV);

  // Progressive reveal (0: Initial, 1: Context delta, 2: The Core Question)
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      markSequence04Completed();
    }

    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [markSequence04Completed]);

  return (
    <div
      id="screen-s04-08-exit"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="exit-s04-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="my-auto py-8 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p
            id="exit-s04-recap-1"
            className="text-sm sm:text-base font-light text-neutral-400 leading-relaxed animate-fade-in"
          >
            Al principio te puse exactamente en su lugar.
          </p>
          <p
            id="exit-s04-recap-2"
            className="text-base sm:text-lg font-light text-neutral-300 leading-relaxed animate-fade-in"
          >
            Viste lo que él vio.
          </p>
          <p
            id="exit-s04-recap-3"
            className="text-sm sm:text-base font-light text-neutral-400 leading-relaxed animate-fade-in"
          >
            Y tuviste que decidir con la misma información incompleta.
          </p>
        </div>

        {stage >= 1 && (
          <p
            id="exit-s04-delta"
            className="text-base sm:text-lg font-normal text-neutral-200 border-l border-neutral-700 pl-3 animate-fade-in"
          >
            Pero ahora sabes algo que al principio no sabías.
          </p>
        )}

        {stage >= 2 && (
          <div className="pt-4 flex flex-col gap-4 animate-fade-in">
            <p className="text-xl sm:text-2xl font-light text-neutral-300">
              Si volvieras a ese martes…
            </p>
            <h1
              id="exit-s04-question"
              className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight"
            >
              ¿harías lo mismo?
            </h1>
            <p
              id="exit-s04-return-prompt"
              className="text-sm uppercase tracking-widest text-neutral-400 font-mono pt-3"
            >
              Volvamos al principio.
            </p>
          </div>
        )}

        {/* Stable QA Boundary Indicator */}
        {isDev && (
          <div
            id="dev-s04-boundary-indicator"
            className="mt-6 p-4 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-400 text-xs text-center space-y-1.5"
          >
            <p className="font-mono text-emerald-400 font-semibold">
              S04_COMPLETED_SUCCESSFULLY
            </p>
            <p className="font-sans text-neutral-400">
              Secuencia 04 completada. Pantalla final estable para QA. S05 se integrará en la siguiente fase.
            </p>
          </div>
        )}
      </main>

      {/* Stable Empty Footer */}
      <footer className="w-full min-h-12 pb-2" />
    </div>
  );
};
