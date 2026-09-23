/**
 * S06_01_PERSONALIZE — Piensa en ella
 * Directly continues the emotional transfer:
 * "No pienses en el caso anterior."
 * "Piensa en una situación real entre ustedes."
 * "Algún momento en que notaste que algo era diferente…"
 * "pero no estabas completamente seguro de qué estaba pasando."
 * CTA: [La tengo]
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S06Personalize: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "sequence_06_started",
        sequence: "S06_AHORA_PIENSA_EN_ELLA",
        screen: "S06_01_PERSONALIZE",
      });
      trackEvent({
        event: "personal_reflection_prompted",
        sequence: "S06_AHORA_PIENSA_EN_ELLA",
        screen: "S06_01_PERSONALIZE",
      });
    }

    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 1900);
    const t3 = setTimeout(() => setStage(3), 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleContinue = () => {
    setCurrentScreen("S06_02_RECOGNITION");
  };

  return (
    <div
      id="screen-s06-01-personalize"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="personalize-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Narrative Area */}
      <main className="flex-1 flex flex-col justify-center py-10 space-y-8">
        {/* Step 0: Disengage from fictional case */}
        <p
          id="personalize-line-1"
          className="text-neutral-400 text-base sm:text-lg font-light tracking-wide transition-opacity duration-700"
        >
          No pienses en el caso anterior.
        </p>

        {/* Step 1: Real situation */}
        {stage >= 1 && (
          <p
            id="personalize-line-2"
            className="text-white text-xl sm:text-2xl font-light leading-relaxed tracking-tight transition-opacity duration-700 animate-fade-in"
          >
            Piensa en una situación real entre ustedes.
          </p>
        )}

        {/* Step 2 & 3: Subtle, evocative context gap */}
        {stage >= 2 && (
          <div className="space-y-4 pt-2 border-l border-neutral-800/80 pl-4 sm:pl-5 transition-opacity duration-700 animate-fade-in">
            <p
              id="personalize-line-3"
              className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed"
            >
              Algún momento en que notaste que algo era diferente…
            </p>
            {stage >= 3 && (
              <p
                id="personalize-line-4"
                className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed animate-fade-in"
              >
                pero no estabas completamente seguro de qué estaba pasando.
              </p>
            )}
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      <footer className="pt-6">
        <button
          id="btn-personalize-continue"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-lg cursor-pointer"
        >
          La tengo
        </button>
      </footer>
    </div>
  );
};
