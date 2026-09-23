/**
 * S04_05_ASK_BETTER — Mejores preguntas
 * Translates context into concrete behavioral difference:
 * "Antes, él vio: «Estoy cansada.»
 *  Y su cabeza intentó completar lo que faltaba: «¿Será por mí?»
 *  Pero si recuerdas que puede haber más contexto…
 *  DE: «¿Qué le pasa?» A: «¿Cómo te sientes hoy?»
 *  DE: «¿Qué debería hacer?» A: «¿Quieres que te escuche, que te ayude con algo o prefieres descansar?»
 *  No se trata de adivinar mejor.
 *  Se trata de asumir menos."
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S04AskBetter: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);

  // Progressive reveal (0: Initial recall, 1: Contrast 1 & 2, 2: The Core Shift)
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "ask_better_viewed",
        sequence: "S04_LA_PIEZA_INESPERADA",
        screen: "S04_05_ASK_BETTER",
      });
    }

    const t1 = setTimeout(() => setStage(1), 1000);
    const t2 = setTimeout(() => setStage(2), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleNext = () => {
    setCurrentScreen("S04_06_BELIEF_CHECK");
  };

  return (
    <div
      id="screen-s04-05-ask-better"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="ask-better-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 flex flex-col gap-6">
        {/* Prior Mental Sequence */}
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
            Antes, él vio:
          </p>
          <p className="text-lg sm:text-xl font-light text-neutral-200 pl-3 border-l border-neutral-700">
            «Estoy cansada.»
          </p>
          <div className="pt-2 flex flex-col gap-1">
            <p className="text-xs text-neutral-400 font-light">
              Y su cabeza intentó completar lo que faltaba:
            </p>
            <p className="text-sm sm:text-base font-light text-neutral-300 italic pl-3 border-l border-neutral-800">
              «¿Será por mí?»
            </p>
          </div>
        </div>

        {/* Contrasts: From reaction to curiosity */}
        {stage >= 1 && (
          <div className="flex flex-col gap-3.5 animate-fade-in">
            <p className="text-sm font-medium text-neutral-300">
              Pero si recuerdas que puede haber más contexto…
            </p>

            {/* Contrast 1 */}
            <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="font-mono text-neutral-400">DE</span>
                <span className="line-through decoration-neutral-600">
                  «¿Qué le pasa?»
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base text-white font-medium pl-1">
                <span className="font-mono text-emerald-400 text-xs">A</span>
                <span>«¿Cómo te sientes hoy?»</span>
              </div>
            </div>

            {/* Contrast 2 */}
            <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="font-mono text-neutral-400">DE</span>
                <span className="line-through decoration-neutral-600">
                  «¿Qué debería hacer?»
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm sm:text-base text-white font-medium pl-1">
                <span className="font-mono text-emerald-400 text-xs pt-0.5">A</span>
                <span className="leading-snug">
                  «¿Quieres que te escuche, que te ayude con algo o prefieres descansar?»
                </span>
              </div>
            </div>
          </div>
        )}

        {/* The Epiphany */}
        {stage >= 2 && (
          <div className="pt-2 flex flex-col gap-1.5 animate-fade-in">
            <p
              id="ask-better-reveal-1"
              className="text-base sm:text-lg text-neutral-300 font-light"
            >
              No se trata de adivinar mejor.
            </p>
            <h1
              id="ask-better-reveal-2"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight"
            >
              Se trata de asumir menos.
            </h1>
          </div>
        )}
      </main>

      {/* Action Footer */}
      <footer className="w-full pt-4 pb-2">
        {stage >= 2 ? (
          <button
            id="btn-ask-better-next"
            type="button"
            onClick={handleNext}
            className="w-full py-4 px-6 bg-neutral-100 hover:bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide rounded-lg transition-colors duration-200 cursor-pointer text-center animate-fade-in"
          >
            Entiendo
          </button>
        ) : (
          <div className="min-h-14" />
        )}
      </footer>
    </div>
  );
};
