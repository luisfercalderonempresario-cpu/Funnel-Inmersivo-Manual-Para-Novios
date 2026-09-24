/**
 * S07_03_MECHANISM — El Mecanismo
 * Deconstructs what happened in the demonstration without branding or causal claims.
 * Highlights:
 * MENOS SUPOSICIONES ↓ MEJORES PREGUNTAS ↓ MÁS ESPACIO PARA ESCUCHARLA
 * Tracks solution_demonstration_viewed once.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S07Mechanism: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const [stage, setStage] = useState<number>(0);
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "solution_demonstration_viewed",
        sequence: "S07_Y_SI_EXISTIERA",
        screen: "S07_03_MECHANISM",
      });
    }

    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 1800);
    const t3 = setTimeout(() => setStage(3), 3000);
    const t4 = setTimeout(() => setStage(4), 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleContinue = () => {
    setCurrentScreen("S07_04_INTEREST");
  };

  return (
    <div
      id="screen-s07-03-mechanism"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="s07-mechanism-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center py-8 space-y-6">
        <div className="space-y-3">
          <p
            id="s07-mech-line1"
            className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed"
          >
            La escena era la misma.
          </p>

          {stage >= 1 && (
            <div className="space-y-1 animate-fade-in transition-all duration-700">
              <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
                Ella seguía diciendo:
              </p>
              <p className="text-white text-xl sm:text-2xl font-light italic pl-3 border-l border-white/50">
                &ldquo;Estoy cansada.&rdquo;
              </p>
            </div>
          )}
        </div>

        {stage >= 2 && (
          <div className="space-y-3 pt-2 animate-fade-in transition-all duration-700">
            <p
              id="s07-mech-line2"
              className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed"
            >
              Pero esta vez él no respondió solamente desde lo que interpretó.
            </p>
            <p
              id="s07-mech-line3"
              className="text-white text-base sm:text-lg font-medium leading-relaxed"
            >
              Tenía una pieza más de contexto antes de hacerlo.
            </p>
          </div>
        )}

        {stage >= 3 && (
          <div className="space-y-4 pt-3 animate-fade-in transition-all duration-700">
            <div className="border-l-2 border-white/70 pl-4 py-1 space-y-1">
              <p className="text-neutral-400 text-sm sm:text-base font-light">
                Eso no le dijo cómo se sentía ella.
              </p>
              <p className="text-white text-lg sm:text-xl font-medium tracking-tight">
                Le dio una forma diferente de acercarse.
              </p>
            </div>

            {/* Visual Conceptual: Flow Diagram */}
            <div
              id="s07-mech-conceptual-flow"
              className="my-5 p-5 bg-neutral-900/60 border border-neutral-800 rounded-lg flex flex-col items-center gap-2.5 text-center"
            >
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-300 uppercase">
                MENOS SUPOSICIONES
              </span>
              <span className="text-neutral-500 text-xs font-mono">↓</span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase">
                MEJORES PREGUNTAS
              </span>
              <span className="text-neutral-500 text-xs font-mono">↓</span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-300 uppercase">
                MÁS ESPACIO PARA ESCUCHARLA
              </span>
            </div>
          </div>
        )}

        {stage >= 4 && (
          <div className="space-y-2 pt-2 animate-fade-in transition-all duration-700">
            <p className="text-neutral-400 text-sm sm:text-base font-light">
              No se trata de saber exactamente qué hacer.
            </p>
            <p className="text-white text-base sm:text-lg font-normal">
              Se trata de empezar la conversación con un poco más de contexto.
            </p>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="pt-6">
        {stage >= 3 ? (
          <button
            id="btn-s07-mechanism-continue"
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-lg cursor-pointer animate-fade-in"
          >
            ENTIENDO
          </button>
        ) : (
          <div className="h-14" aria-hidden="true" />
        )}
      </footer>
    </div>
  );
};
