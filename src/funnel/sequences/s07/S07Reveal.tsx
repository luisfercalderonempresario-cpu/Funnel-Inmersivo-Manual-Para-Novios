/**
 * S07_06_REVEAL — Revelación Formal de la Marca
 * Formal introduction of Contexto™:
 * "Comprender antes de reaccionar."
 * Tracks contexto_revealed once when brand appears.
 * Strict guardrails: NO pricing, NO checkout, NO plans, NO sales hype.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S07Reveal: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const [stage, setStage] = useState<number>(0);
  const hasTrackedRevealRef = useRef<boolean>(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 900);
    const t2 = setTimeout(() => setStage(2), 2200);
    const t3 = setTimeout(() => {
      setStage(3);
      if (!hasTrackedRevealRef.current) {
        hasTrackedRevealRef.current = true;
        trackEvent({
          event: "contexto_revealed",
          sequence: "S07_Y_SI_EXISTIERA",
          screen: "S07_06_REVEAL",
        });
      }
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleContinue = () => {
    setCurrentScreen("S07_07_PERSONAL_VALUE");
  };

  return (
    <div
      id="screen-s07-06-reveal"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Subtle Brand Header */}
      <header className="pt-2">
        <span
          id="s07-reveal-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Narrative Reveal */}
      <main className="flex-1 flex flex-col justify-center py-10 space-y-8 text-center">
        <p
          id="s07-reveal-lead"
          className="text-neutral-400 text-lg sm:text-xl font-light tracking-wide leading-relaxed"
        >
          Hay algo que todavía no te he dicho.
        </p>

        {stage >= 1 && (
          <p
            id="s07-reveal-lead2"
            className="text-neutral-300 text-lg sm:text-xl font-light tracking-wide animate-fade-in transition-all duration-700"
          >
            Eso que acabas de ver…
          </p>
        )}

        {stage >= 2 && (
          <p
            id="s07-reveal-lead3"
            className="text-white text-xl sm:text-2xl font-light tracking-tight italic animate-fade-in transition-all duration-700"
          >
            ya existe.
          </p>
        )}

        {stage >= 3 && (
          <div
            id="s07-reveal-brand-container"
            className="pt-6 space-y-4 animate-fade-in transition-all duration-1000"
          >
            <h1
              id="s07-brand-contexto-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.2em] text-white select-none"
            >
              CONTEXTO<span className="text-xl align-super">™</span>
            </h1>
            <p
              id="s07-brand-contexto-tagline"
              className="text-neutral-300 text-base sm:text-lg font-light tracking-widest italic"
            >
              &ldquo;Comprender antes de reaccionar.&rdquo;
            </p>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="pt-6">
        {stage >= 3 ? (
          <button
            id="btn-s07-reveal-continue"
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-lg cursor-pointer animate-fade-in"
          >
            ¿CÓMO ME AYUDARÍA?
          </button>
        ) : (
          <div className="h-14" aria-hidden="true" />
        )}
      </footer>
    </div>
  );
};
