/**
 * S08B_10_FINAL_CLOSE — Cierre final
 * Conecta todo el arco desde el Caso inicial ("Estoy cansada") hasta la decisión consciente.
 */

import React, { useEffect, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { OFFER_CONFIG } from "../../config/offerConfig";

export const S08BFinalClose: React.FC = () => {
  const { initiateCheckout } = useFunnel();
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 1600);
    const t3 = setTimeout(() => setStage(3), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handlePurchase = () => {
    initiateCheckout("final_close");
  };

  return (
    <div
      id="screen-s08b-10-final-close"
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
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            EL CASO COMPLETO
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 space-y-6 animate-fade-in">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Desde aquel:
          </p>
          <p className="text-xl sm:text-2xl text-white font-serif italic">
            &ldquo;Estoy cansada.&rdquo;
          </p>
          <p className="text-neutral-300 text-sm sm:text-base pt-2">
            nunca se trató de encontrar la respuesta perfecta.
          </p>
        </div>

        {stage >= 1 && (
          <div className="space-y-2 animate-fade-in">
            <p className="text-neutral-400 text-sm">
              Se trataba de algo mucho más pequeño:
            </p>
            <div className="space-y-1 text-sm sm:text-base text-neutral-300 font-medium pl-3 border-l-2 border-neutral-700">
              <p>Ver.</p>
              <p>No asumir demasiado rápido.</p>
              <p>Buscar contexto.</p>
              <p>Escuchar.</p>
              <p className="text-neutral-400">Y entonces…</p>
              <p className="text-white font-semibold">responder.</p>
            </div>
          </div>
        )}

        {stage >= 2 && (
          <div className="space-y-2 text-neutral-300 text-xs sm:text-sm leading-relaxed animate-fade-in">
            <p>No necesitas adivinarla mejor.</p>
            <p>No necesitas tener siempre la respuesta correcta.</p>
            <p className="text-white font-medium">
              Puedes empezar teniendo un poco más de contexto.
            </p>
          </div>
        )}

        {stage >= 3 && (
          <div className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-xl text-center space-y-1 animate-fade-in">
            <h2 className="text-lg font-serif text-white tracking-wide">
              {OFFER_CONFIG.PRODUCT_NAME}
            </h2>
            <p className="text-xs text-neutral-300 italic">
              Comprender antes de reaccionar.
            </p>
            <div className="pt-2 text-xs font-mono text-neutral-400">
              Precio de Fundador · {OFFER_CONFIG.FOUNDER_PRICE} · {OFFER_CONFIG.PAYMENT_MODEL}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="space-y-2 pb-4 sm:pb-6">
        <button
          id="btn-s08b-final-close-purchase"
          type="button"
          onClick={handlePurchase}
          className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
        >
          QUIERO CONTEXTO™
        </button>

        <p className="text-center text-[11px] text-neutral-400">
          Incluye actualizaciones y mejoras futuras de Contexto™ + garantía de {OFFER_CONFIG.GUARANTEE_DAYS} días.
        </p>
      </footer>
    </div>
  );
};
