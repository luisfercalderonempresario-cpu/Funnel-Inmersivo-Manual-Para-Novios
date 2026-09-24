/**
 * S08B_05_GUARDRAIL — Límites éticos de Contexto™
 * Establece con claridad y firmeza lo que la herramienta nunca hará.
 */

import React, { useEffect, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S08BGuardrail: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleContinue = () => {
    setCurrentScreen("S08B_06_BONUS");
  };

  return (
    <div
      id="screen-s08b-05-guardrail"
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
            LÍMITES
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-8 space-y-6 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
          Hay algo que Contexto™ nunca hará.
        </h1>

        {stage >= 1 && (
          <div className="space-y-3 text-neutral-300 text-sm sm:text-base leading-relaxed animate-fade-in">
            <p className="text-neutral-300">
              No te dirá cómo &ldquo;es&rdquo; ella.
            </p>
            <p className="text-neutral-300">
              No decidirá qué siente.
            </p>
            <p className="text-neutral-300">
              No convertirá su ciclo en una explicación para todo.
            </p>
            <div className="pt-2">
              <p className="text-neutral-400">
                Y nunca tendrá más autoridad sobre ella…
              </p>
              <p className="text-white font-medium text-base sm:text-lg">
                que ella misma.
              </p>
            </div>
          </div>
        )}

        {stage >= 2 && (
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-2 animate-fade-in">
            <p className="text-neutral-300 text-sm">
              Contexto™ te da una pieza más.
            </p>
            <p className="text-white text-sm sm:text-base font-medium">
              La conversación con ella completa el contexto.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="space-y-4 pb-4 sm:pb-6">
        <button
          id="btn-s08b-guardrail-continue"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
        >
          ESO ES LO QUE BUSCO
        </button>
      </footer>
    </div>
  );
};
