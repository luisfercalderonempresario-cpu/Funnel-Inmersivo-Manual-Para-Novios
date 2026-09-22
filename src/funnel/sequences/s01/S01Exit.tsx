/**
 * S01_05_EXIT — Salida de S01
 * Cinematographic closure: "Tiene sentido." -> [breve pausa] -> "Veamos qué pasa."
 * Completes S01_EL_CASO sequence and marks technical boundary.
 */

import React, { useEffect, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S01Exit: React.FC = () => {
  const { completeSequence, setCurrentScreen } = useFunnel();
  const [phase, setPhase] = useState<"sense" | "pause" | "reveal">("sense");

  useEffect(() => {
    // Record sequence completion
    completeSequence("S01_EL_CASO");

    // Phase 1: "Tiene sentido." for 1.2s
    const timer1 = setTimeout(() => {
      setPhase("pause");
    }, 1200);

    // Phase 2: brief silent dark beat for 600ms, then Phase 3: "Veamos qué pasa."
    const timer2 = setTimeout(() => {
      setPhase("reveal");
    }, 1800);

    // Seamless bridge to S02 Continuation (1.4s after "Veamos qué pasa." is revealed)
    const timer3 = setTimeout(() => {
      setCurrentScreen("S02_01_CONTINUATION");
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [completeSequence, setCurrentScreen]);

  return (
    <div
      id="screen-s01-05-exit"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-10 sm:py-14 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="exit-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Closure Narrative Beat */}
      <main className="my-auto py-12 flex flex-col items-center justify-center text-center">
        {phase === "sense" && (
          <p
            id="exit-phrase-sense"
            className="text-2xl sm:text-3xl font-light text-neutral-200 tracking-tight animate-fade-in"
          >
            Tiene sentido.
          </p>
        )}

        {phase === "pause" && (
          <div className="h-10 w-full" aria-hidden="true" />
        )}

        {phase === "reveal" && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <p
              id="exit-phrase-reveal"
              className="text-2xl sm:text-3xl font-normal text-white tracking-tight"
            >
              Veamos qué pasa.
            </p>
          </div>
        )}
      </main>

      <footer className="w-full min-h-12 pb-2" />
    </div>
  );
};
