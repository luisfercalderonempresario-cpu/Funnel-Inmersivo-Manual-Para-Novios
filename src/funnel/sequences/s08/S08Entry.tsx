/**
 * S08_01_ENTRY — Entrada a la Prueba Real de Contexto™
 * Fast, functional transition from storytelling to product utility.
 */

import React from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S08Entry: React.FC = () => {
  const { setCurrentScreen } = useFunnel();

  const handleContinue = () => {
    setCurrentScreen("S08_02_DATE_KNOWLEDGE");
  };

  return (
    <div
      id="screen-s08-01-entry"
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
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            PRUEBA
          </span>
        </div>
      </header>

      {/* Main Copy */}
      <main className="my-auto py-8 space-y-8 animate-fade-in">
        <div className="space-y-4">
          <p className="text-xl sm:text-2xl text-white font-serif leading-snug">
            Para mostrarte cómo funciona en la práctica…
          </p>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-sans">
            vamos a preparar una orientación para el día de hoy.
          </p>
        </div>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          Para eso solo necesitamos un dato.
        </p>

        {/* Micro-reassurance card */}
        <div className="p-4 bg-neutral-900/70 border border-neutral-800 rounded-lg">
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            No necesitas registrarte ni crear una cuenta para esta prueba.
          </p>
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="pb-4 sm:pb-6">
        <button
          id="btn-s08-entry-continue"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-xl cursor-pointer flex items-center justify-center gap-2"
        >
          <span>CONTINUAR</span>
        </button>
      </footer>
    </div>
  );
};
