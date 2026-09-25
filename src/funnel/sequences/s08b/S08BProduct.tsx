/**
 * S08B_04_PRODUCT — Contexto™ completo
 * Presenta con sobriedad los componentes reales del producto.
 * Emite 'product_expansion_viewed' una única vez.
 */

import React, { useEffect, useRef } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S08BProduct: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "product_expansion_viewed",
        sequence: "S08B_OFFER",
        screen: "S08B_04_PRODUCT",
        metadata: {
          desiredTransformation: state.desiredTransformation,
          trialValueResponse: state.trialValueResponse,
        },
      });
    }
  }, [state.desiredTransformation, state.trialValueResponse]);

  const handleContinue = () => {
    setCurrentScreen("S08B_05_GUARDRAIL");
  };

  return (
    <div
      id="screen-s08b-04-product"
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
            PRODUCTO COMPLETO
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
            Contexto™
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Una herramienta breve para tener más contexto cuando lo necesites.
          </p>
        </div>

        {/* 4 Core Blocks */}
        <div className="space-y-3.5 pt-2">
          {/* 1. HOY */}
          <div className="p-4 bg-neutral-900/70 border border-neutral-800 rounded-lg space-y-1">
            <h2 className="text-white text-sm font-semibold tracking-wide">
              HOY
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm font-medium">
              Una orientación para el momento actual.
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Fase estimada, contexto, modo de conexión, una acción que puedes probar, algo que conviene evitar y una pregunta para cuando no sepas qué hacer.
            </p>
          </div>

          {/* 2. PERSONALIZACIÓN */}
          <div className="p-4 bg-neutral-900/70 border border-neutral-800 rounded-lg space-y-1">
            <h2 className="text-white text-sm font-semibold tracking-wide">
              PERSONALIZACIÓN
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm font-medium">
              Un contexto más cercano a su realidad.
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Ajusta la referencia disponible para mejorar la orientación sin convertir una estimación en una certeza.
            </p>
          </div>

          {/* 3. HISTORIAL */}
          <div className="p-4 bg-neutral-900/70 border border-neutral-800 rounded-lg space-y-1">
            <h2 className="text-white text-sm font-semibold tracking-wide">
              HISTORIAL
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm font-medium">
              No empezar desde cero cada vez.
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Contexto™ conserva la información que proporcionas para que no tengas que empezar desde cero y pueda ofrecerte una orientación cada vez más contextualizada a su relación.
            </p>
          </div>

          {/* 4. NUEVAS ORIENTACIONES */}
          <div className="p-4 bg-neutral-900/70 border border-neutral-800 rounded-lg space-y-1">
            <h2 className="text-white text-sm font-semibold tracking-wide">
              NUEVAS ORIENTACIONES
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm font-medium">
              Más formas de comprender antes de reaccionar.
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Contexto™, preguntas y pequeñas acciones que iremos ampliando para diferentes momentos.
            </p>
          </div>
        </div>

        {/* Closing Copy */}
        <div className="pt-2 space-y-2 text-neutral-400 text-xs sm:text-sm leading-relaxed">
          <p>Todo diseñado para consultarse en menos de 2 minutos al día.</p>
          <p>Porque la idea no es que pases más tiempo en una app.</p>
          <p className="text-neutral-300 font-medium">
            Es ayudarte a llegar mejor a la conversación que realmente importa y evitar que reacciones mal.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="space-y-4 pb-4 sm:pb-6">
        <button
          id="btn-s08b-product-continue"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
        >
          ENTIENDO
        </button>
      </footer>
    </div>
  );
};
