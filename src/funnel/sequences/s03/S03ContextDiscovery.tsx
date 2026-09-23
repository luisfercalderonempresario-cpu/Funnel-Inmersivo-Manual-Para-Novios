/**
 * S03_06_CONTEXT_DISCOVERY — Eso es contexto
 * The core revelation of S03:
 * "Eso es contexto." (concept, no trademark)
 * "No te dice exactamente cómo se siente."
 * "Te recuerda que puede haber más detrás de lo que estás viendo."
 * "Comprender no es adivinar mejor. Es asumir menos."
 */

import React, { useEffect, useRef } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S03ContextDiscovery: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;

    // Track context_mechanism_exposed exactly once
    trackEvent({
      event: "context_mechanism_exposed",
      sequence: "S03_LO_QUE_NO_VISTE",
      screen: "S03_06_CONTEXT_DISCOVERY",
    });
  }, []);

  const handleContinue = () => {
    setCurrentScreen("S03_07_EXIT");
  };

  return (
    <div
      id="screen-s03-06-context-discovery"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="context-discovery-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Revelation */}
      <main className="my-auto py-8 flex flex-col gap-8 animate-fade-in">
        {/* Core Hierarchy Headline */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.15em] text-neutral-400 font-medium">
            El principio
          </span>
          <h1
            id="context-discovery-headline"
            className="text-3xl sm:text-4xl font-light text-white tracking-tight leading-tight"
          >
            Eso es contexto.
          </h1>
        </div>

        {/* Narrative Guardrail Blocks */}
        <div className="space-y-4">
          <div
            id="context-guardrail-block"
            className="p-5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 space-y-3"
          >
            <p
              id="context-guardrail-line1"
              className="text-lg sm:text-xl font-light text-neutral-300 tracking-tight leading-relaxed"
            >
              No te dice exactamente cómo se siente.
            </p>
            <p
              id="context-guardrail-line2"
              className="text-lg sm:text-xl font-normal text-white tracking-tight leading-relaxed"
            >
              Te recuerda que puede haber más detrás de lo que estás viendo.
            </p>
          </div>

          {/* Secondary Subdued Reflection */}
          <div
            id="context-principle-reflection"
            className="pt-2 pl-4 border-l-2 border-neutral-700 space-y-1.5"
          >
            <p className="text-base sm:text-lg font-light text-neutral-400 tracking-tight">
              Comprender no es adivinar mejor.
            </p>
            <p className="text-base sm:text-lg font-medium text-neutral-200 tracking-tight">
              Es asumir menos.
            </p>
          </div>
        </div>
      </main>

      {/* Action Footer */}
      <footer className="w-full pt-4 pb-2">
        <button
          id="btn-context-discovery-continue"
          type="button"
          onClick={handleContinue}
          className="w-full h-14 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-semibold text-base rounded-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          Continúa
        </button>
      </footer>
    </div>
  );
};
