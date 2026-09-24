/**
 * S08B_03_EXPANSION — Expansión de valor
 * Representa la síntesis de lo probado (HOY) e introduce la continuidad del producto.
 */

import React, { useEffect, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S08BExpansion: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t = setTimeout(() => setStage(1), 800);
    return () => clearTimeout(t);
  }, []);

  const handleContinue = () => {
    setCurrentScreen("S08B_04_PRODUCT");
  };

  return (
    <div
      id="screen-s08b-03-expansion"
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
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            LO QUE ACABAS DE PROBAR
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-8 space-y-6 animate-fade-in">
        {/* Compact Representation of HOY */}
        <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span>✓</span>
            <span>HOY</span>
          </div>
          <p className="text-white text-base leading-relaxed">
            Una orientación breve para ayudarte a comprender mejor el momento antes de reaccionar.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <p className="text-neutral-400 text-base leading-relaxed">
            Ese es el corazón de Contexto™.
          </p>

          {stage >= 1 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-neutral-400 text-base leading-relaxed">
                Pero no tiene por qué quedarse en una sola consulta.
              </p>
              <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug pt-2">
                Contexto™ puede acompañarte más allá de HOY.
              </h1>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="space-y-4 pb-4 sm:pb-6">
        <button
          id="btn-s08b-expansion-continue"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
        >
          VER CONTEXTO™ COMPLETO
        </button>
      </footer>
    </div>
  );
};
