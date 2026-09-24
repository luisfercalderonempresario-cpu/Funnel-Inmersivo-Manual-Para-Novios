/**
 * S07_01_SETUP — Volvamos una última vez a ese martes
 * Prepares the user for the demonstration without revealing Contexto™,
 * apps, product, price, or trial.
 * Tracks sequence_07_started once on logic entry.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S07Setup: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const [stage, setStage] = useState<number>(0);
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "sequence_07_started",
        sequence: "S07_Y_SI_EXISTIERA",
        screen: "S07_01_SETUP",
      });
    }

    const t1 = setTimeout(() => setStage(1), 900);
    const t2 = setTimeout(() => setStage(2), 2000);
    const t3 = setTimeout(() => setStage(3), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleContinue = () => {
    setCurrentScreen("S07_02_DEMONSTRATION");
  };

  return (
    <div
      id="screen-s07-01-setup"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="s07-setup-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Narrative Body */}
      <main className="flex-1 flex flex-col justify-center py-10 space-y-6">
        <p
          id="s07-setup-lead"
          className="text-neutral-300 text-lg sm:text-xl font-light tracking-wide leading-relaxed"
        >
          Volvamos una última vez a ese martes.
        </p>

        {stage >= 1 && (
          <div className="space-y-3 animate-fade-in transition-all duration-700">
            <p className="text-neutral-400 text-sm font-mono uppercase tracking-widest">
              Ella dice:
            </p>
            <div className="border-l-2 border-white/70 pl-4 py-1">
              <blockquote className="text-white text-2xl sm:text-3xl font-light italic tracking-tight">
                &ldquo;Estoy cansada.&rdquo;
              </blockquote>
            </div>
          </div>
        )}

        {stage >= 2 && (
          <p
            id="s07-setup-contrast"
            className="text-neutral-300 text-lg sm:text-xl font-light tracking-wide pt-4 animate-fade-in transition-all duration-700"
          >
            Pero esta vez…
          </p>
        )}

        {stage >= 3 && (
          <div className="border-l-2 border-white/90 pl-4 py-1 animate-fade-in transition-all duration-700">
            <p
              id="s07-setup-punchline"
              className="text-white text-xl sm:text-2xl font-normal tracking-tight leading-snug"
            >
              él tiene algo que antes no tenía.
            </p>
          </div>
        )}
      </main>

      {/* CTA Footer */}
      <footer className="pt-6">
        {stage >= 3 ? (
          <button
            id="btn-s07-setup-view"
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-lg cursor-pointer animate-fade-in flex items-center justify-center gap-2"
          >
            <span>VER</span>
          </button>
        ) : (
          <div className="h-14" aria-hidden="true" />
        )}
      </footer>
    </div>
  );
};
