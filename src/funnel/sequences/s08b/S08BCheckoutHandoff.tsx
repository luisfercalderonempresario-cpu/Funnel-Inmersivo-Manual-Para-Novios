/**
 * S08B_11_CHECKOUT_HANDOFF — Handoff a checkout de Hotmart
 * Estado técnico que gestiona la salida segura hacia Hotmart.
 * Dispara 'checkout_started' al ejecutar el handoff.
 * No dispara 'purchase_completed' bajo ninguna circunstancia.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";
import { OFFER_CONFIG } from "../../config/offerConfig";

export const S08BCheckoutHandoff: React.FC = () => {
  const { state } = useFunnel();
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const hasStartedRef = useRef<boolean>(false);
  const isDev = Boolean(import.meta.env.DEV);

  const executeHandoff = () => {
    try {
      if (!hasStartedRef.current) {
        hasStartedRef.current = true;
        trackEvent({
          event: "checkout_started",
          sequence: "S08B_OFFER",
          screen: "S08B_11_CHECKOUT_HANDOFF",
          metadata: {
            checkoutSource: state.checkoutSource,
            desiredTransformation: state.desiredTransformation,
            trialValueResponse: state.trialValueResponse,
            productValueExperienced: state.productValueExperienced,
          },
        });
      }
      setRedirecting(true);
      setErrorOccurred(false);

      // En entorno de producción navegamos en la misma ventana a Hotmart sin parámetros sensibles
      window.location.href = OFFER_CONFIG.CHECKOUT_URL;
    } catch (err) {
      console.error("[MPN Checkout Handoff Error]:", err);
      setErrorOccurred(true);
      setRedirecting(false);
    }
  };

  useEffect(() => {
    // En producción ejecutamos el handoff con una breve pausa técnica fluida (~1.2s)
    // En DEV permitimos inspección sin expulsar automáticamente al preview si el dev lo prefiere
    if (!isDev) {
      const timer = setTimeout(() => {
        executeHandoff();
      }, 1200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDev]);

  return (
    <div
      id="screen-s08b-11-checkout-handoff"
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
            {OFFER_CONFIG.PRODUCT_NAME}
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            CHECKOUT SEGURO
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-8 space-y-6 text-center animate-fade-in">
        {!errorOccurred ? (
          <>
            <div className="flex justify-center py-4">
              <div className="w-12 h-12 rounded-full border-2 border-neutral-700 border-t-white animate-spin" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
                Preparando tu acceso…
              </h1>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Serás dirigido al checkout seguro para completar tu compra.
              </p>
            </div>

            <div className="pt-4 text-xs font-mono text-neutral-400">
              Hotmart Checkout · Pago seguro cifrado
            </div>

            {/* DEV Control Panel */}
            {isDev && (
              <div
                id="dev-handoff-inspector"
                className="mt-6 p-4 bg-neutral-900 border border-neutral-700 rounded-lg text-left font-mono text-xs space-y-3"
              >
                <div className="text-amber-400 font-bold">
                  [DEV QA] Handoff Inspector (Modo Seguro de Pruebas)
                </div>
                <div className="text-neutral-300 space-y-1 text-[11px]">
                  <div>Destination: <span className="text-white truncate block">{OFFER_CONFIG.CHECKOUT_URL}</span></div>
                  <div>Source: <span className="text-emerald-400 font-semibold">{state.checkoutSource || "none"}</span></div>
                  <div>Status: {redirecting ? "Redirecting..." : "Paused in DEV for inspection"}</div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={executeHandoff}
                    className="flex-1 py-2 px-3 bg-white text-neutral-950 font-bold rounded hover:bg-neutral-200 cursor-pointer text-center"
                  >
                    PROBAR REDIRECCIÓN A HOTMART
                  </button>
                  <button
                    type="button"
                    onClick={() => setErrorOccurred(true)}
                    className="py-2 px-3 bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700 cursor-pointer"
                  >
                    SIMULAR ERROR
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Error Fallback (Section 44) */
          <div className="space-y-4 animate-fade-in">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-xl font-bold">
              !
            </div>
            <h1 className="text-xl sm:text-2xl text-white font-serif">
              No pudimos abrir el checkout.
            </h1>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Tu progreso sigue guardado.
            </p>
            <div className="pt-4">
              <button
                id="btn-s08b-checkout-retry"
                type="button"
                onClick={executeHandoff}
                className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
              >
                INTENTAR DE NUEVO
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="space-y-2 pb-4 sm:pb-6 text-center text-xs text-neutral-400">
        <span>Garantía de {OFFER_CONFIG.GUARANTEE_DAYS} días · Soporte oficial</span>
      </footer>
    </div>
  );
};
