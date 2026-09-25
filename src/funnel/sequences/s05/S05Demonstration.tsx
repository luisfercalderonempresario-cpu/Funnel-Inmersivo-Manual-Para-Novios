/**
 * S05_04_DEMONSTRATION — Demostración
 * Demonstrates the core mental transformation:
 * VER → REACCIONAR
 * transforms gracefully into:
 * VER → COMPRENDER → RESPONDER
 * "Ese espacio entre ver y reaccionar importa."
 * "No garantiza que siempre sepas qué hacer. Pero puede ayudarte a asumir menos antes de hacerlo."
 */

import React, { useEffect, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S05Demonstration: React.FC = () => {
  const { setCurrentScreen } = useFunnel();

  // Reveal stages:
  // 0: Initial recap ("Al principio viste una señal... «Estoy cansada.»")
  // 1: Interpration & context steps ("Tuviste que interpretarla... Después apareció más contexto...")
  // 2: Climax statement ("Ese espacio entre ver y reaccionar importa.")
  // 3: Mechanism transform (VER -> COMPRENDER -> RESPONDER)
  // 4: Final nuance & CTA ("No garantiza que siempre sepas qué hacer...")
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 2000);
    const t3 = setTimeout(() => setStage(3), 3200);
    const t4 = setTimeout(() => setStage(4), 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleUnderstand = () => {
    setCurrentScreen("S05_05_BELIEF_SHIFT");
  };

  return (
    <div
      id="screen-s05-04-demonstration"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="demo-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 flex flex-col gap-6">
        {/* Step-by-step recap */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 animate-fade-in">
            <p className="text-sm text-neutral-400 font-light">
              Al principio viste una señal.
            </p>
            <p className="text-xl sm:text-2xl font-medium text-white italic">
              «Estoy cansada.»
            </p>
          </div>

          {stage >= 1 && (
            <div className="flex flex-col gap-2.5 pt-1 text-sm sm:text-base text-neutral-300 font-light animate-fade-in">
              <span className="text-neutral-500 font-mono text-xs">↓</span>
              <p>Tuviste que interpretarla.</p>
              <span className="text-neutral-500 font-mono text-xs">↓</span>
              <p>Después apareció más contexto.</p>
              <span className="text-neutral-500 font-mono text-xs">↓</span>
              <p className="text-white font-normal">
                Y pudiste decidir con más información.
              </p>
            </div>
          )}
        </div>

        {/* Climax Statement */}
        {stage >= 2 && (
          <div className="pt-3 animate-fade-in">
            <h2
              id="demo-climax-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight"
            >
              Ese espacio entre ver y reaccionar importa.
            </h2>
          </div>
        )}

        {/* Visual Diagram Transformation */}
        {stage >= 3 && (
          <div
            id="demo-mechanism-box"
            className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col gap-4 animate-fade-in"
          >
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono leading-relaxed">
              Y ese espacio cambia la dinámica así:
            </span>

            {/* Before pattern (faded / sober) */}
            <div className="flex items-center justify-between px-3 py-2 rounded bg-neutral-950/60 border border-neutral-800/60 opacity-50 text-xs font-mono tracking-wider">
              <span className="text-neutral-400">VER</span>
              <span className="text-neutral-400">→</span>
              <span className="text-neutral-400">REACCIONAR</span>
            </div>

            {/* After pattern (highlighted with breathing room) */}
            <div className="flex items-center justify-between px-3 py-3 rounded bg-neutral-800/80 border border-neutral-700 text-xs sm:text-sm font-mono tracking-wider text-white shadow-inner">
              <span className="font-semibold text-neutral-300">VER</span>
              <span className="text-neutral-400">→</span>
              <span className="font-semibold text-white px-2 py-0.5 rounded bg-neutral-700/80 border border-neutral-600">
                COMPRENDER
              </span>
              <span className="text-neutral-400">→</span>
              <span className="font-semibold text-neutral-300">RESPONDER</span>
            </div>
          </div>
        )}

        {/* Nuance */}
        {stage >= 4 && (
          <div className="flex flex-col gap-2 pt-1 border-t border-neutral-850 animate-fade-in">
            <p className="text-sm sm:text-base text-neutral-400 font-light">
              No garantiza que siempre sepas qué hacer.
            </p>
            <p className="text-base sm:text-lg text-neutral-200 font-normal leading-snug">
              Pero puede ayudarte a asumir menos antes de hacerlo.
            </p>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="w-full min-h-16 flex items-center justify-center pb-2">
        {stage >= 4 && (
          <button
            id="btn-demo-understand"
            type="button"
            onClick={handleUnderstand}
            className="w-full py-4 bg-white text-neutral-950 font-medium text-base rounded-md hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg animate-fade-in"
          >
            Entiendo
          </button>
        )}
      </footer>
    </div>
  );
};
