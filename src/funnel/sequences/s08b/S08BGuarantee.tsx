/**
 * S08B_09_GUARANTEE — Garantía de 7 días
 * Reduce el riesgo con sobriedad y transparencia.
 * Dispara 'guarantee_viewed' una única vez.
 */

import React, { useEffect, useRef } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S08BGuarantee: React.FC = () => {
  const { state, initiateCheckout, setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "guarantee_viewed",
        sequence: "S08B_OFFER",
        screen: "S08B_09_GUARANTEE",
        metadata: {
          desiredTransformation: state.desiredTransformation,
          trialValueResponse: state.trialValueResponse,
        },
      });
    }
  }, [state.desiredTransformation, state.trialValueResponse]);

  const handlePurchase = () => {
    initiateCheckout("guarantee");
  };

  const handleContinue = () => {
    setCurrentScreen("S08B_10_FINAL_CLOSE");
  };

  return (
    <div
      id="screen-s08b-09-guarantee"
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
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            TRANSPARENCIA
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 space-y-6 animate-fade-in">
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
            Pruébalo durante 7 días.
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Queremos que puedas conocer Contexto™ en tu propia relación, no decidir solamente por lo que viste aquí.
          </p>
        </div>

        <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>GARANTÍA DE 7 DÍAS</span>
          </div>

          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Si durante ese periodo decides que Contexto™ no es para ti, puedes solicitar el reembolso de acuerdo con las condiciones de la garantía.
          </p>

          <div className="pt-2 border-t border-neutral-800/80 text-xs sm:text-sm space-y-1">
            <p className="text-neutral-400">La idea es sencilla:</p>
            <p className="text-white font-medium">úsalo y decide con experiencia propia.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="space-y-3 pb-4 sm:pb-6">
        <button
          id="btn-s08b-guarantee-purchase"
          type="button"
          onClick={handlePurchase}
          className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
        >
          QUIERO PROBAR CONTEXTO™
        </button>

        <div className="pt-1 text-center">
          <button
            id="btn-s08b-guarantee-continue"
            type="button"
            onClick={handleContinue}
            className="text-xs text-neutral-400 hover:text-neutral-200 underline underline-offset-4 cursor-pointer transition-colors py-1"
          >
            CONTINUAR
          </button>
        </div>
      </footer>
    </div>
  );
};
