/**
 * S08_06_PREPARING — Preparando Contexto
 * Fast, elegant transition showing deterministic calculation progression.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S08Preparing: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "trial_context_prepared",
        sequence: "S08_PRUEBA_REAL",
        screen: "S08_06_PREPARING",
        metadata: {
          confidence: state.inputConfidence,
          exampleMode: state.exampleMode,
          phase: state.estimatedPhase,
          cycleDay: state.estimatedCycleDay,
        },
      });
    }

    // Progression expectation timings (2.8s total, in 2.5–3.0s target)
    const t1 = setTimeout(() => setPhaseIndex(1), 800);
    const t2 = setTimeout(() => setPhaseIndex(2), 1800);
    const t3 = setTimeout(() => {
      setCurrentScreen("S08_07_TODAY");
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [state.inputConfidence, state.exampleMode, state.estimatedPhase, state.estimatedCycleDay, setCurrentScreen]);

  return (
    <div
      id="screen-s08-06-preparing"
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
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 animate-pulse">
            CALCULANDO…
          </span>
        </div>
      </header>

      {/* Main Progression */}
      <main className="my-auto py-8 space-y-6 animate-fade-in">
        <div className="space-y-4">
          <p className="text-xl sm:text-2xl text-white font-serif leading-snug">
            {state.exampleMode
              ? "Preparando un ejemplo de Contexto™…"
              : "Preparando tu contexto de hoy…"}
          </p>

          <div className="space-y-2 pt-4">
            {!state.exampleMode && (
              <div
                className={`text-sm font-mono transition-opacity duration-300 flex items-center gap-2 ${
                  phaseIndex >= 1 ? "text-neutral-300 opacity-100" : "opacity-0"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Estimando el momento del ciclo…</span>
              </div>
            )}

            <div
              className={`text-sm font-mono transition-opacity duration-300 flex items-center gap-2 ${
                phaseIndex >= (state.exampleMode ? 1 : 2)
                  ? "text-neutral-300 opacity-100"
                  : "opacity-0"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Preparando una orientación…</span>
            </div>
          </div>
        </div>

        {/* Minimal progress line */}
        <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-[pulse_1s_ease-in-out_infinite]" style={{ width: "85%" }} />
        </div>
      </main>

      {/* Footer spacer */}
      <footer className="pb-4 sm:pb-6" />
    </div>
  );
};
