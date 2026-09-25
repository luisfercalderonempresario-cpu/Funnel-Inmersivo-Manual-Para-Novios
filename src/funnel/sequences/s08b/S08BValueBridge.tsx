/**
 * S08B_07_VALUE_BRIDGE — Puente de valor según respuesta en la prueba
 * Adapta el copy narrativo al feedback que Andrés dio en S08_08_VALUE sin alterar oferta ni precio.
 */

import React from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S08BValueBridge: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const response = state.trialValueResponse;

  const handleContinue = () => {
    setCurrentScreen("S08B_08_OFFER");
  };

  const renderContent = () => {
    switch (response) {
      case "yes":
        return (
          <>
            <p className="text-neutral-400 text-xs font-mono uppercase tracking-wider">
              Y RECUERDA QUE DESPUÉS DE PROBARLO DIJISTE: &lsquo;SÍ.&rsquo;
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
              Ya viste cómo una pequeña pieza de contexto podría ayudarte en esos momentos en que no sabes muy bien qué hacer.
            </h1>
            <div className="pt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p className="text-white">
                Ahora puedes tener Contexto™ disponible para los próximos.
              </p>
            </div>
          </>
        );

      case "probably":
        return (
          <>
            <p className="text-neutral-400 text-xs font-mono uppercase tracking-wider">
              DESPUÉS DE PROBARLO DIJISTE: &lsquo;PROBABLEMENTE.&rsquo;
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
              Una sola orientación no tiene que demostrarlo todo.
            </h1>
            <div className="space-y-4 pt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p className="text-neutral-300">
                Pero ya viste una forma diferente de acercarte:
              </p>
              <p className="text-white font-medium">
                menos suposiciones, mejores preguntas y más espacio para escucharla.
              </p>
              <p className="text-neutral-400">
                Contexto™ convierte esa idea en algo que puedes consultar cuando lo necesites.
              </p>
            </div>
          </>
        );

      case "unsure":
        return (
          <>
            <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
              Una prueba no tiene que decidirlo todo.
            </h1>
            <div className="space-y-4 pt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p className="text-neutral-300">
                Es razonable que una sola orientación no sea suficiente para saber si algo así te servirá en tu relación.
              </p>
              <p className="text-white font-medium">
                Pero ahora sabes exactamente qué intenta hacer Contexto™:
              </p>
              <p className="text-neutral-400">
                darte un poco más de contexto antes de reaccionar.
              </p>
              <p className="text-neutral-300 pt-2">
                Si quieres seguir explorándolo, este es el acceso disponible ahora.
              </p>
            </div>
          </>
        );

      default:
        return (
          <>
            <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
              Ya viste cómo funciona Contexto™.
            </h1>
            <div className="pt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p className="text-white">
                Si quieres tenerlo disponible para otros momentos, este es el acceso disponible ahora.
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div
      id="screen-s08b-07-value-bridge"
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
            VALOR EXPERIMENTADO
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-auto py-8 space-y-4 animate-fade-in">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="space-y-4 pb-4 sm:pb-6">
        <button
          id="btn-s08b-value-bridge-continue"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
        >
          VER ACCESO
        </button>
      </footer>
    </div>
  );
};
