/**
 * S08B_01_BRIDGE — Puente a la oferta
 * Conecta la experiencia de "Esto fue solo HOY" con la necesidad de contexto continuo.
 * No vende todavía.
 */

import React, { useEffect, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S08BBridge: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleContinue = () => {
    setCurrentScreen("S08B_02_PERSONAL_GOAL");
  };

  return (
    <div
      id="screen-s08b-01-bridge"
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
            MÁS ALLÁ DE HOY
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-8 space-y-8 animate-fade-in">
        <div className="space-y-3">
          <p className="text-2xl sm:text-3xl text-white font-serif leading-snug">
            Pero mañana el contexto puede ser diferente.
          </p>
        </div>

        {stage >= 1 && (
          <div className="space-y-4 text-neutral-300 text-base sm:text-lg leading-relaxed animate-fade-in">
            <p className="text-neutral-400">
              Y la próxima vez que notes que algo cambió…
            </p>
            <p className="text-white font-medium">
              probablemente no necesites adivinar mejor.
            </p>
            <p className="text-neutral-300">
              Necesites un poco más de contexto.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="space-y-4 pb-4 sm:pb-6">
        {stage >= 2 && (
          <button
            id="btn-s08b-bridge-continue"
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center animate-fade-in"
          >
            CONTINUAR
          </button>
        )}
      </footer>
    </div>
  );
};
