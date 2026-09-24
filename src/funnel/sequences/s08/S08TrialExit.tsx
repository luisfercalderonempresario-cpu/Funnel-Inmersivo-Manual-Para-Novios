/**
 * S08_09_TRIAL_EXIT — Salida de S08-A (Prueba Real)
 * Terminal boundary of S08-A. Concludes trial experience with dignity and calm.
 * Freezes here without offer, pricing, or checkout.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S08TrialExit: React.FC = () => {
  const { markTrialCompleted, startOffer } = useFunnel();
  const [stage, setStage] = useState<number>(0);
  const hasCompletedRef = useRef<boolean>(false);
  const isDev = Boolean(import.meta.env.DEV);

  useEffect(() => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      markTrialCompleted();
    }

    const t1 = setTimeout(() => setStage(1), 700);
    const t2 = setTimeout(() => setStage(2), 1800);
    const t3 = setTimeout(() => setStage(3), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [markTrialCompleted]);

  return (
    <div
      id="screen-s08-09-trial-exit"
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
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-500">
            PRUEBA COMPLETADA
          </span>
        </div>
      </header>

      {/* Main Copy Sequences */}
      <main className="my-auto py-8 space-y-8 animate-fade-in">
        <div className="space-y-4">
          <p className="text-neutral-400 text-sm font-mono uppercase tracking-wider">
            Resumen de la experiencia
          </p>
          <h1 className="text-xl sm:text-2xl text-white font-serif leading-snug">
            Lo que acabas de ver es una pequeña parte de Contexto™.
          </h1>
        </div>

        {stage >= 1 && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-neutral-300 text-base leading-relaxed">
              Una orientación breve.
            </p>
            <p className="text-white text-lg font-serif leading-relaxed">
              Para ayudarte a comprender un poco más…
            </p>
            <p className="text-neutral-400 text-base leading-relaxed">
              antes de reaccionar.
            </p>
          </div>
        )}

        {stage >= 2 && (
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg text-center animate-fade-in">
            <p className="text-white text-sm sm:text-base font-medium">
              Esto fue solo HOY.
            </p>
          </div>
        )}
      </main>

      {/* Terminal Footer with S08-B Connection CTA */}
      <footer className="space-y-4 pb-4 sm:pb-6">
        <button
          id="btn-s08-view-offer-inclusion"
          type="button"
          onClick={startOffer}
          className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
        >
          VER QUÉ MÁS INCLUYE
        </button>

        {isDev && (
          <div
            id="dev-s08-qa-indicator"
            className="p-3 rounded bg-neutral-900/60 border border-neutral-800 text-[11px] font-mono text-neutral-400 text-center select-none"
          >
            [DEV QA] S08_09_TRIAL_EXIT — Pulsa &apos;VER QUÉ MÁS INCLUYE&apos; para entrar a S08-B (Oferta)
          </div>
        )}
      </footer>
    </div>
  );
};
