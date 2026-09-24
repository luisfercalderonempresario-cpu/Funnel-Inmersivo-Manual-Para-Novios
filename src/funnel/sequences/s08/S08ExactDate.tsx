/**
 * S08_03_EXACT_DATE — Entrada de Fecha Exacta
 * Native date picker with calendar bounds, privacy badge, and safety recovery for day > 28.
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { getTodayLocalDateString } from "../../utils/cycleCalculations";

export const S08ExactDate: React.FC = () => {
  const { state, submitExactDate, selectExampleMode, setCurrentScreen } = useFunnel();
  const [selectedDate, setSelectedDate] = useState<string>(
    state.lastPeriodStartDate ?? ""
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [outOfRangeRecovery, setOutOfRangeRecovery] = useState<boolean>(
    typeof state.estimatedCycleDay === "number" && state.estimatedCycleDay > 28
  );

  const todayStr = getTodayLocalDateString();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setErrorMessage(null);
    setOutOfRangeRecovery(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      setErrorMessage("Selecciona una fecha para continuar.");
      return;
    }

    const result = submitExactDate(selectedDate);

    if (!result.valid) {
      setErrorMessage(
        result.errorMessage ?? "No pudimos usar esa fecha. Revísala e inténtalo de nuevo."
      );
      return;
    }

    if (result.isOutOfRange) {
      setOutOfRangeRecovery(true);
      return;
    }

    setCurrentScreen("S08_06_PREPARING");
  };

  const handleUseExample = () => {
    selectExampleMode();
    setCurrentScreen("S08_06_PREPARING");
  };

  const handleChangeDate = () => {
    setOutOfRangeRecovery(false);
    setSelectedDate("");
  };

  // Recovery State if Day > 28 (Section 14)
  if (outOfRangeRecovery) {
    return (
      <div
        id="screen-s08-03-exact-date-recovery"
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
              La fecha ingresada ya supera el ciclo estimado de 28 días que usamos para esta prueba.
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
              id="btn-exact-recovery-change"
              type="button"
              onClick={handleChangeDate}
              className="w-full py-3.5 px-6 bg-white hover:bg-neutral-100 text-neutral-950 font-medium text-sm rounded-md transition-all cursor-pointer"
            >
              CAMBIAR FECHA
            </button>
            <button
              id="btn-exact-recovery-example"
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
      id="screen-s08-03-exact-date"
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
            ¿Qué día comenzó su último periodo?
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed font-sans">
            No tiene que ser perfecto. Si recuerdas el día aproximado, también sirve.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="period-date-input"
              className="block text-xs font-mono uppercase tracking-wider text-neutral-400"
            >
              Primer día del último periodo
            </label>
            <input
              id="period-date-input"
              type="date"
              max={todayStr}
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full px-4 py-3.5 bg-neutral-900 border border-neutral-700 focus:border-white focus:outline-none rounded-lg text-white font-mono text-base transition-colors"
            />
          </div>

          {errorMessage && (
            <div
              id="date-error-message"
              className="p-3 bg-red-950/40 border border-red-800/80 rounded-md text-red-300 text-xs leading-relaxed animate-fade-in"
            >
              {errorMessage}
            </div>
          )}

          {/* Privacy reassurance */}
          <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-lg">
            <p className="text-neutral-400 text-xs leading-relaxed">
              Esta fecha solo se usa para calcular la estimación de hoy. No la compartimos ni la guardamos en servidores externos.
            </p>
          </div>

          <div className="pt-2">
            <button
              id="btn-submit-exact-date"
              type="submit"
              className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-xl cursor-pointer"
            >
              CALCULAR ORIENTACIÓN
            </button>
          </div>
        </form>
      </main>

      {/* Footer Navigation */}
      <footer className="pb-4 sm:pb-6">
        <button
          id="btn-exact-date-back"
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
