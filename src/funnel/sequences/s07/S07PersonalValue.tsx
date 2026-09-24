/**
 * S07_07_PERSONAL_VALUE — Valor Personal
 * Bridges Contexto™ to the user's specific desiredTransformation chosen in S06.
 * Fallback included if desiredTransformation === null.
 * Tracks personal_value_viewed once.
 */

import React, { useEffect, useRef } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S07PersonalValue: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "personal_value_viewed",
        sequence: "S07_Y_SI_EXISTIERA",
        screen: "S07_07_PERSONAL_VALUE",
        metadata: {
          desiredTransformation: state.desiredTransformation ?? "none",
        },
      });
    }
  }, [state.desiredTransformation]);

  const handleContinue = () => {
    setCurrentScreen("S07_08_EXIT");
  };

  const renderContentForDesire = () => {
    switch (state.desiredTransformation) {
      case "understand_better":
        return (
          <div className="space-y-4">
            <h2 className="text-white text-2xl sm:text-3xl font-light tracking-tight border-l-2 border-white/90 pl-4 py-1">
              Entenderla mejor.
            </h2>
            <div className="space-y-3 pt-2 text-neutral-300 text-base leading-relaxed">
              <p>
                Contexto™ puede darte una pieza más de contexto antes de sacar conclusiones.
              </p>
              <p className="text-neutral-400 text-sm">
                No para decirte cómo se siente.
              </p>
              <p className="text-white font-medium">
                Para ayudarte a asumir menos y preguntar mejor.
              </p>
            </div>
          </div>
        );

      case "listen_better":
        return (
          <div className="space-y-4">
            <h2 className="text-white text-2xl sm:text-3xl font-light tracking-tight border-l-2 border-white/90 pl-4 py-1">
              Escucharla mejor.
            </h2>
            <div className="space-y-3 pt-2 text-neutral-300 text-base leading-relaxed">
              <p>
                Contexto™ puede ayudarte a llegar a la conversación con menos suposiciones y mejores preguntas.
              </p>
              <p className="text-white font-medium">
                Lo que ella te diga sigue siendo lo más importante.
              </p>
            </div>
          </div>
        );

      case "react_calmly":
        return (
          <div className="space-y-4">
            <h2 className="text-white text-2xl sm:text-3xl font-light tracking-tight border-l-2 border-white/90 pl-4 py-1">
              Reaccionar con más calma.
            </h2>
            <div className="space-y-3 pt-2 text-neutral-300 text-base leading-relaxed">
              <p>
                Contexto™ puede ayudarte a crear un pequeño espacio entre lo que ocurre y cómo respondes.
              </p>
              <p className="text-white font-medium">
                Más contexto antes de reaccionar.
              </p>
            </div>
          </div>
        );

      case "approach_or_space":
        return (
          <div className="space-y-4">
            <h2 className="text-white text-2xl sm:text-3xl font-light tracking-tight border-l-2 border-white/90 pl-4 py-1">
              Saber cuándo acercarte y cuándo darle espacio.
            </h2>
            <div className="space-y-3 pt-2 text-neutral-300 text-base leading-relaxed">
              <p>
                Contexto™ puede darte una orientación para acercarte con más criterio.
              </p>
              <p className="text-white font-medium">
                Sin reemplazar lo que ella te diga sobre lo que necesita.
              </p>
            </div>
          </div>
        );

      case "feel_supported":
        return (
          <div className="space-y-4">
            <h2 className="text-white text-2xl sm:text-3xl font-light tracking-tight border-l-2 border-white/90 pl-4 py-1">
              Hacerla sentir más acompañada.
            </h2>
            <div className="space-y-3 pt-2 text-neutral-300 text-base leading-relaxed">
              <p>
                Contexto™ puede sugerirte formas pequeñas de estar presente sin asumir qué necesita.
              </p>
              <p className="text-white font-medium">
                Ella sigue teniendo la última palabra sobre cómo quiere ser acompañada.
              </p>
            </div>
          </div>
        );

      default:
        // Graceful fallback for null or missing selection
        return (
          <div className="space-y-4">
            <h2 className="text-white text-2xl sm:text-3xl font-light tracking-tight border-l-2 border-white/90 pl-4 py-1">
              Tener más contexto.
            </h2>
            <div className="space-y-3 pt-2 text-neutral-300 text-base leading-relaxed">
              <p>
                Contexto™ fue pensado para algo simple: darte una pieza más de contexto antes de reaccionar.
              </p>
              <p className="text-neutral-400 text-sm">
                No para predecirla.
              </p>
              <p className="text-white font-medium">
                Para ayudarte a asumir menos y conversar mejor.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      id="screen-s07-07-personal-value"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="s07-personal-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Narrative */}
      <main className="flex-1 flex flex-col justify-center py-8 space-y-6">
        <p
          id="s07-personal-lead"
          className="text-neutral-400 text-sm sm:text-base font-light uppercase tracking-wider"
        >
          Hace un momento elegiste:
        </p>

        {renderContentForDesire()}

        <p
          id="s07-personal-bridge"
          className="text-neutral-400 text-sm sm:text-base font-light pt-4 border-t border-neutral-800/80 leading-relaxed"
        >
          Contexto™ fue pensado para ayudarte a acercarte a eso de una forma práctica.
        </p>
      </main>

      {/* Footer CTA */}
      <footer className="pt-6">
        <button
          id="btn-s07-personal-continue"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-lg cursor-pointer animate-fade-in"
        >
          QUIERO PROBARLO
        </button>
      </footer>
    </div>
  );
};
