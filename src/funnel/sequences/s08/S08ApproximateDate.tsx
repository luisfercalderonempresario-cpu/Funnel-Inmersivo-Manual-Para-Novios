/**
 * S08_04_APPROXIMATE_DATE — Entrada de Fecha Aproximada
 * 4 week options with cycle calculations and safety recovery for 4 weeks (day > 28).
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S08ApproximateDate: React.FC = () => {
  const {
    selectApproximateWeeks,
    selectExampleMode,
    setCurrentScreen,
  } = useFunnel();
  const [showFourWeeksRecovery, setShowFourWeeksRecovery] = useState<boolean>(false);

  const handleSelectWeeks = (weeks: 1 | 2 | 3 | 4) => {
    if (weeks === 4) {
      // Trigger recovery state according to Section 16
      selectApproximateWeeks(4);
      setShowFourWeeksRecovery(true);
      return;
    }

    selectApproximateWeeks(weeks);
    setCurrentScreen("S08_06_PREPARING");
  };

  const handleUseExample = () => {
    selectExampleMode();
    setCurrentScreen("S08_06_PREPARING");
  };

  const handleChangeReference = () => {
    setShowFourWeeksRecovery(false);
  };

  if (showFourWeeksRecovery) {
    return (
      <div
        id="screen-s08-04-approx-recovery"
        className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
        style={{
          paddingTop: "max(2rem, env(safe-area-inset-top))",
          paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
        }}
      >
        <header className="pt-2">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              CONTEXTO™
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
              REFERENCIA
            </span>
          </div>
        </header>

        <main className="my-auto py-6 space-y-6 animate-fade-in">
          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl text-white font-serif leading-snug">
              Necesitamos una referencia más reciente.
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Con una referencia aproximada de 4 semanas, ya estaríamos fuera del ciclo de 28 días que usamos para esta prueba.
            </p>
          </div>

          <div className="space-y-3 text-neutral-400 text-xs sm:text-sm leading-relaxed p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg">
            <p>
              Eso no significa que haya ningún problema. Los ciclos pueden tener duraciones diferentes.
            </p>
            <p className="text-neutral-300 font-medium">
              Simplemente no queremos inventar en qué momento del ciclo se encuentra.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              id="btn-approx-recovery-change"
              type="button"
              onClick={handleChangeReference}
              className="w-full py-3.5 px-6 bg-white hover:bg-neutral-100 text-neutral-950 font-medium text-sm rounded-md transition-all cursor-pointer"
            >
              CAMBIAR REFERENCIA
            </button>
            <button
              id="btn-approx-recovery-example"
              type="button"
              onClick={handleUseExample}
              className="w-full py-3.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-medium text-sm rounded-md transition-all cursor-pointer"
            >
              VER UN EJEMPLO
            </button>
          </div>
        </main>

        <footer className="pb-4 sm:pb-6">
          <button
            type="button"
            onClick={() => setCurrentScreen("S08_02_DATE_KNOWLEDGE")}
            className="text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-wider"
          >
            ← Volver a opciones
          </button>
        </footer>
      </div>
    );
  }

  return (
    <div
      id="screen-s08-04-approximate-date"
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
            PASO 2 DE 2
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 space-y-6 animate-fade-in">
        <div className="space-y-3">
          <h1 className="text-xl sm:text-2xl text-white font-serif leading-snug">
            ¿Más o menos cuántas semanas hace?
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed font-sans">
            Usaremos una estimación aproximada para preparar la orientación de hoy.
          </p>
        </div>

        {/* 4 Approximate Options */}
        <div className="space-y-3 pt-2">
          <button
            id="btn-approx-1-week"
            type="button"
            onClick={() => handleSelectWeeks(1)}
            className="w-full text-left p-4 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-200 transition-all duration-200 cursor-pointer flex items-center justify-between"
          >
            <span className="text-sm sm:text-base font-medium">
              Hace 1 semana.
            </span>
            <span className="text-neutral-500 text-xs font-mono">~7 días</span>
          </button>

          <button
            id="btn-approx-2-weeks"
            type="button"
            onClick={() => handleSelectWeeks(2)}
            className="w-full text-left p-4 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-200 transition-all duration-200 cursor-pointer flex items-center justify-between"
          >
            <span className="text-sm sm:text-base font-medium">
              Hace 2 semanas.
            </span>
            <span className="text-neutral-500 text-xs font-mono">~14 días</span>
          </button>

          <button
            id="btn-approx-3-weeks"
            type="button"
            onClick={() => handleSelectWeeks(3)}
            className="w-full text-left p-4 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-200 transition-all duration-200 cursor-pointer flex items-center justify-between"
          >
            <span className="text-sm sm:text-base font-medium">
              Hace 3 semanas.
            </span>
            <span className="text-neutral-500 text-xs font-mono">~21 días</span>
          </button>

          <button
            id="btn-approx-4-weeks"
            type="button"
            onClick={() => handleSelectWeeks(4)}
            className="w-full text-left p-4 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-200 transition-all duration-200 cursor-pointer flex items-center justify-between"
          >
            <span className="text-sm sm:text-base font-medium">
              Hace 4 semanas.
            </span>
            <span className="text-neutral-500 text-xs font-mono">~28 días</span>
          </button>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="pb-4 sm:pb-6">
        <button
          id="btn-approx-back"
          type="button"
          onClick={() => setCurrentScreen("S08_02_DATE_KNOWLEDGE")}
          className="text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-wider"
        >
          ← Volver
        </button>
      </footer>
    </div>
  );
};
