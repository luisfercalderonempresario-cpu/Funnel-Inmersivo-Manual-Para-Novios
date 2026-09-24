/**
 * S08B_08_OFFER — Oferta Contexto™
 * Primera pantalla comercial donde se revela el precio y elementos de acceso.
 * Dispara 'offer_viewed' una única vez.
 */

import React, { useEffect, useRef } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { OFFER_CONFIG } from "../../config/offerConfig";

export const S08BOffer: React.FC = () => {
  const { markOfferViewed, initiateCheckout, setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      markOfferViewed();
    }
  }, [markOfferViewed]);

  const handlePurchase = () => {
    initiateCheckout("offer");
  };

  const handleViewGuarantee = () => {
    setCurrentScreen("S08B_09_GUARANTEE");
  };

  return (
    <div
      id="screen-s08b-08-offer"
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
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-medium">
            PRECIO DE FUNDADOR
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 space-y-6 animate-fade-in">
        {/* Hero */}
        <div className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono uppercase tracking-wider text-amber-300">
            PRECIO DE FUNDADOR
          </div>
          <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
            Aprende a comprender antes de reaccionar.
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Lleva contigo la herramienta que acabas de probar y úsala cuando necesites un poco más de contexto.
          </p>
        </div>

        {/* Inclusiones */}
        <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-xl space-y-4">
          <h2 className="text-white text-xs font-mono uppercase tracking-wider font-semibold border-b border-neutral-800 pb-2">
            TU ACCESO INCLUYE
          </h2>

          <div className="space-y-3.5 text-xs sm:text-sm">
            {/* Item 1 */}
            <div className="space-y-0.5">
              <p className="text-white font-medium">
                ✓ Acceso a Contexto™
              </p>
              <p className="text-neutral-400 text-[13px] leading-relaxed">
                La experiencia que acabas de probar y las herramientas disponibles dentro de la Micro-App.
              </p>
            </div>

            {/* Item 2 */}
            <div className="space-y-0.5">
              <p className="text-white font-medium">
                ✓ Guía de Inicio Contexto™
              </p>
              <p className="text-neutral-400 text-[13px] leading-relaxed">
                Para que sepas cómo utilizar la herramienta desde el primer día.
              </p>
            </div>

            {/* Item 3 */}
            <div className="space-y-0.5">
              <p className="text-white font-medium">
                ✓ Bono: Guía para conocer el primer día de su última menstruación
              </p>
              <p className="text-neutral-400 text-[13px] leading-relaxed">
                Para ayudarte a conseguir una referencia más precisa de forma respetuosa.
              </p>
            </div>

            {/* Item 4 */}
            <div className="space-y-0.5">
              <p className="text-white font-medium">
                ✓ Actualizaciones y mejoras futuras de Contexto™
              </p>
              <p className="text-neutral-400 text-[13px] leading-relaxed">
                Si Contexto™ mejora o aumenta de precio, tu acceso no cambia y no pagas la diferencia.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Box */}
        <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl text-center space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            PRECIO DE FUNDADOR
          </span>
          <div className="text-3xl sm:text-4xl font-serif text-white font-semibold">
            {OFFER_CONFIG.FOUNDER_PRICE}
          </div>
          <div className="text-xs sm:text-sm text-neutral-300 font-medium">
            {OFFER_CONFIG.PAYMENT_MODEL}.
          </div>
          <div className="text-xs text-neutral-400">
            Sin suscripción mensual.
          </div>
        </div>
      </main>

      {/* Footer & Actions */}
      <footer className="space-y-3 pb-4 sm:pb-6">
        <button
          id="btn-s08b-offer-purchase"
          type="button"
          onClick={handlePurchase}
          className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
        >
          QUIERO CONTEXTO™
        </button>

        <p className="text-center text-[11px] text-neutral-400 font-mono">
          Pago procesado de forma segura a través de Hotmart.
        </p>

        <div className="pt-1 text-center">
          <button
            id="btn-s08b-offer-view-guarantee"
            type="button"
            onClick={handleViewGuarantee}
            className="text-xs text-neutral-400 hover:text-neutral-200 underline underline-offset-4 cursor-pointer transition-colors py-1"
          >
            VER GARANTÍA
          </button>
        </div>
      </footer>
    </div>
  );
};
