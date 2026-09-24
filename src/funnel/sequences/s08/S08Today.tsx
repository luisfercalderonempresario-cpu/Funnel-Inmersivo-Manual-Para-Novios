/**
 * S08_07_TODAY — Contexto de Hoy
 * The core product interface experience: calm, clean, authoritative without assumptions.
 */

import React, { useEffect, useRef } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { getPhaseContent, COMMON_CONTEXTO_PRINCIPLE } from "../../config/phaseContent";
import { trackEvent } from "../../tracking/trackEvent";

export const S08Today: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);

  const phase = state.estimatedPhase ?? "luteal";
  const cycleDay = state.estimatedCycleDay ?? 23;
  const isExample = Boolean(state.exampleMode);
  const isApproximate = state.inputConfidence === "approximate";

  const content = getPhaseContent(phase);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "today_context_viewed",
        sequence: "S08_PRUEBA_REAL",
        screen: "S08_07_TODAY",
        metadata: {
          estimatedPhase: phase,
          estimatedCycleDay: cycleDay,
          inputConfidence: state.inputConfidence,
          exampleMode: isExample,
        },
      });
    }
  }, [phase, cycleDay, state.inputConfidence, isExample]);

  const handleUnderstood = () => {
    setCurrentScreen("S08_08_VALUE");
  };

  return (
    <div
      id="screen-s08-07-today"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-5 py-6 sm:py-10 max-w-lg mx-auto"
      style={{
        paddingTop: "max(1.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Product App Header */}
      <header className="border-b border-neutral-800 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-wider text-white">
              CONTEXTO™
            </span>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
              HOY
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400">
            {isExample ? "MODO EJEMPLO" : "ORIENTACIÓN DIARIA"}
          </span>
        </div>
        <p className="text-xs text-neutral-400 mt-1 italic">
          “Comprender antes de reaccionar.”
        </p>
      </header>

      {/* Main Content Area */}
      <main className="py-6 space-y-6 animate-fade-in">
        {/* Reference Banner Card */}
        <section
          id="today-reference-card"
          className={`p-4 rounded-xl border space-y-2.5 ${
            isExample
              ? "bg-amber-950/20 border-amber-800/60"
              : "bg-neutral-900/80 border-neutral-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                isExample
                  ? "bg-amber-900/60 text-amber-200 border border-amber-700/80"
                  : "bg-neutral-800 text-neutral-300 border border-neutral-700"
              }`}
            >
              {isExample ? "EJEMPLO" : "ESTIMADO"}
            </span>

            <span className="text-xs font-mono text-neutral-400">
              {isExample
                ? "Ciclo de prueba"
                : isApproximate
                ? "Referencia aproximada"
                : "Referencia calculada"}
            </span>
          </div>

          <div>
            <h2 className="text-lg font-serif text-white">
              {content.phaseName}
            </h2>
            <p className="text-xs font-mono text-neutral-400">
              {isExample
                ? "Día 23 de un ciclo de ejemplo"
                : `Día ${cycleDay} del ciclo estimado`}
            </p>
          </div>

          {isExample && (
            <p className="text-xs text-amber-200/90 leading-relaxed border-t border-amber-800/40 pt-2">
              Esta información no está calculada con datos de tu pareja. Solo queremos mostrarte cómo funciona Contexto™.
            </p>
          )}

          {!isExample && isApproximate && (
            <p className="text-xs text-neutral-400 leading-relaxed border-t border-neutral-800 pt-2">
              Usaste una referencia aproximada, por lo que esta estimación tiene menor precisión.
            </p>
          )}

          <p className="text-[11px] text-neutral-500 leading-normal pt-1">
            Estimación basada en los datos proporcionados. Los ciclos pueden variar de una persona a otra y de un ciclo a otro.
          </p>
        </section>

        {/* 1. TU CONTEXTO DE HOY */}
        <section id="section-context-today" className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            1. Tu contexto de hoy
          </h3>
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-2">
            {content.contextToday.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-neutral-200 text-xs sm:text-sm leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* 2. MODO DE CONEXIÓN */}
        <section id="section-connection-mode" className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            2. Modo de conexión
          </h3>
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-1">
            <p className="text-sm font-medium text-white">
              {content.connectionMode.title}
            </p>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {content.connectionMode.text}
            </p>
          </div>
        </section>

        {/* 3. HOY PUEDES PROBAR */}
        <section id="section-try-today" className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            3. Hoy puedes probar
          </h3>
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg">
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {content.tryToday}
            </p>
          </div>
        </section>

        {/* 4. EVITA */}
        <section id="section-avoid" className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            4. Evita
          </h3>
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-2">
            {content.avoid.map((item, idx) => (
              <p
                key={idx}
                className="text-neutral-300 text-xs sm:text-sm leading-relaxed"
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* 5. SI NO SABES QUÉ HACER */}
        <section id="section-if-lost" className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            5. Si no sabes qué hacer
          </h3>
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg">
            <p className="text-white text-xs sm:text-sm font-medium leading-relaxed">
              {content.ifLostWhatToDo}
            </p>
          </div>
        </section>

        {/* 6. PRINCIPIO CONTEXTO™ */}
        <section id="section-principle" className="space-y-2">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1 text-center">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              {COMMON_CONTEXTO_PRINCIPLE.title}
            </h4>
            {COMMON_CONTEXTO_PRINCIPLE.lines.map((line, idx) => (
              <p
                key={idx}
                className="text-neutral-300 text-xs leading-relaxed italic"
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* Closing in Example Mode */}
        {isExample && (
          <div className="p-4 bg-neutral-900/90 border border-neutral-800 rounded-lg space-y-1.5 text-center animate-fade-in">
            <p className="text-white text-xs sm:text-sm font-medium">
              Este fue solo un ejemplo.
            </p>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Con una fecha de referencia, Contexto™ puede preparar una orientación estimada para el momento actual de su ciclo.
            </p>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="pt-2 pb-4 sm:pb-6">
        <button
          id="btn-today-understood"
          type="button"
          onClick={handleUnderstood}
          className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-xl cursor-pointer flex items-center justify-center gap-2"
        >
          <span>ENTENDIDO</span>
        </button>
      </footer>
    </div>
  );
};
