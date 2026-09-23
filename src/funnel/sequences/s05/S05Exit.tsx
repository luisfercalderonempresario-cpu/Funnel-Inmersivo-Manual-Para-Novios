/**
 * S05_06_EXIT — Salida S05
 * Closes Sequence 05 and shifts psychology from the fictional couple to his real relationship:
 * "Todo esto ocurrió en un caso que te puse yo.
 *  Pero probablemente no necesitas imaginar demasiado para encontrar algo parecido.
 *  Tal vez alguna vez viste algo en ella…
 *  y tuviste que decidir qué significaba sin tener toda la información.
 *  Ahora deja este caso por un momento.
 *  Piensa en ella."
 * Stable endpoint for Sequence 05 QA.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S05Exit: React.FC = () => {
  const { markSequence05Completed } = useFunnel();
  const hasCompletedRef = useRef<boolean>(false);
  const isDev = Boolean(import.meta.env.DEV);

  // Progressive reveal stages
  // 0: Case acknowledgment ("Todo esto ocurrió en un caso que te puse yo...")
  // 1: Personal echo ("Tal vez alguna vez viste algo en ella...")
  // 2: The Shift ("Ahora deja este caso por un momento... Piensa en ella.")
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      markSequence05Completed();
    }

    const t1 = setTimeout(() => setStage(1), 1000);
    const t2 = setTimeout(() => setStage(2), 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [markSequence05Completed]);

  return (
    <div
      id="screen-s05-06-exit"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="exit-s05-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="my-auto py-8 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p
            id="exit-s05-case-origin"
            className="text-sm sm:text-base font-light text-neutral-400 leading-relaxed animate-fade-in"
          >
            Todo esto ocurrió en un caso que te puse yo.
          </p>
          <p
            id="exit-s05-case-parallel"
            className="text-base sm:text-lg font-light text-neutral-300 leading-relaxed animate-fade-in"
          >
            Pero probablemente no necesitas imaginar demasiado para encontrar algo parecido.
          </p>
        </div>

        {stage >= 1 && (
          <div className="flex flex-col gap-2 pt-2 border-l border-neutral-700 pl-3 animate-fade-in">
            <p className="text-base sm:text-lg font-normal text-neutral-200">
              Tal vez alguna vez viste algo en ella…
            </p>
            <p className="text-sm sm:text-base font-light text-neutral-400 leading-relaxed">
              y tuviste que decidir qué significaba sin tener toda la información.
            </p>
          </div>
        )}

        {stage >= 2 && (
          <div className="pt-6 flex flex-col gap-4 animate-fade-in">
            <p
              id="exit-s05-leave-case"
              className="text-lg sm:text-xl font-light text-neutral-300"
            >
              Ahora deja este caso por un momento.
            </p>
            <h1
              id="exit-s05-climax"
              className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight"
            >
              Piensa en ella.
            </h1>
          </div>
        )}

        {/* Stable QA Boundary Indicator */}
        {isDev && (
          <div
            id="dev-s05-boundary-indicator"
            className="mt-8 p-4 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-400 text-xs text-center space-y-1.5"
          >
            <p className="font-mono text-emerald-400 font-semibold">
              S05_COMPLETED_SUCCESSFULLY
            </p>
            <p className="font-sans text-neutral-400">
              Secuencia 05 completada. Pantalla final estable para QA. S06 se integrará en la siguiente fase.
            </p>
          </div>
        )}
      </main>

      {/* Stable Empty Footer */}
      <footer className="w-full min-h-12 pb-2" />
    </div>
  );
};
