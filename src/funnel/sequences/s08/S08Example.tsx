/**
 * S08_05_EXAMPLE — Modo Ejemplo
 * Explains and enters the illustrative demonstration with day 23 luteal phase.
 */

import React from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S08Example: React.FC = () => {
  const { selectExampleMode, setCurrentScreen } = useFunnel();

  const handleStartExample = () => {
    selectExampleMode();
    setCurrentScreen("S08_06_PREPARING");
  };

  return (
    <div
      id="screen-s08-05-example"
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
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
            MODO EJEMPLO
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 space-y-6 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-xl sm:text-2xl text-white font-serif leading-snug">
            Está bien.
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-sans">
            No necesitas conocer la fecha para ver cómo funciona.
          </p>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Podemos mostrarte un ejemplo.
          </p>
        </div>

        {/* Clear boundary card */}
        <div className="p-4 bg-neutral-900/70 border border-neutral-800 rounded-lg space-y-2">
          <p className="text-white text-xs sm:text-sm font-medium">
            Este ejemplo NO estará calculado con datos de tu pareja.
          </p>
          <p className="text-neutral-400 text-xs leading-relaxed">
            Solo sirve para mostrarte cómo se ve y cómo se siente Contexto™ en la práctica.
          </p>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="space-y-4 pb-4 sm:pb-6">
        <button
          id="btn-example-start"
          type="button"
          onClick={handleStartExample}
          className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-xl cursor-pointer"
        >
          VER EJEMPLO
        </button>

        <button
          id="btn-example-back"
          type="button"
          onClick={() => setCurrentScreen("S08_02_DATE_KNOWLEDGE")}
          className="block text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-wider"
        >
          ← Volver a opciones
        </button>
      </footer>
    </div>
  );
};
