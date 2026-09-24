/**
 * S08B_02_PERSONAL_GOAL — Conexión con el objetivo personal
 * Conecta la oferta con la transformación elegida por el usuario en S06.
 * Incluye fallback sobrio si no existe dato previo.
 */

import React from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S08BPersonalGoal: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const goal = state.desiredTransformation;

  const handleContinue = () => {
    setCurrentScreen("S08B_03_EXPANSION");
  };

  const renderContent = () => {
    switch (goal) {
      case "understand_better":
        return (
          <>
            <p className="text-neutral-400 text-sm font-mono uppercase tracking-wider">
              Dijiste que te gustaría:
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
              Entenderla mejor.
            </h1>
            <div className="space-y-4 pt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p className="text-neutral-400">
                Contexto™ no puede hacerlo por ti.
              </p>
              <p className="text-white">
                Pero puede ayudarte a llegar a esas conversaciones con menos suposiciones y un poco más de contexto.
              </p>
            </div>
          </>
        );

      case "listen_better":
        return (
          <>
            <p className="text-neutral-400 text-sm font-mono uppercase tracking-wider">
              Dijiste que te gustaría:
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
              Escucharla mejor.
            </h1>
            <div className="space-y-4 pt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p className="text-neutral-400">
                Contexto™ puede ayudarte a llegar con menos conclusiones anticipadas y una mejor pregunta…
              </p>
              <p className="text-white">
                para que después puedas escuchar lo que realmente tiene que decirte.
              </p>
            </div>
          </>
        );

      case "react_calmly":
        return (
          <>
            <p className="text-neutral-400 text-sm font-mono uppercase tracking-wider">
              Dijiste que te gustaría:
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
              Reaccionar con más calma.
            </h1>
            <div className="space-y-4 pt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p className="text-neutral-400">
                Contexto™ busca crear un pequeño espacio entre lo que ves…
              </p>
              <p className="text-neutral-400">
                y la forma en que respondes.
              </p>
              <p className="text-white font-medium">
                Un espacio para comprender primero.
              </p>
            </div>
          </>
        );

      case "approach_or_space":
        return (
          <>
            <p className="text-neutral-400 text-sm font-mono uppercase tracking-wider">
              Dijiste que te gustaría:
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
              Saber cuándo acercarte y cuándo darle espacio.
            </h1>
            <div className="space-y-4 pt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p className="text-neutral-400">
                Contexto™ no puede decidir eso por ella.
              </p>
              <p className="text-white">
                Pero puede ayudarte a asumir menos, preguntar mejor y dejar que ella te muestre qué necesita.
              </p>
            </div>
          </>
        );

      case "feel_supported":
        return (
          <>
            <p className="text-neutral-400 text-sm font-mono uppercase tracking-wider">
              Dijiste que te gustaría:
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
              Hacerla sentir acompañada.
            </h1>
            <div className="space-y-4 pt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p className="text-neutral-400">
                Contexto™ puede darte pequeñas formas de estar presente…
              </p>
              <p className="text-white">
                sin asumir de antemano lo que necesita.
              </p>
            </div>
          </>
        );

      default:
        // Fallback cuando no existe selección previa (Section 17)
        return (
          <>
            <h1 className="text-2xl sm:text-3xl text-white font-serif leading-snug">
              No necesitas tener siempre la respuesta correcta.
            </h1>
            <div className="space-y-4 pt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p className="text-white">
                A veces basta con tener un poco más de contexto antes de responder.
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div
      id="screen-s08b-02-personal-goal"
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
            ANTES DIJISTE ALGO IMPORTANTE
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
          id="btn-s08b-goal-continue"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
        >
          QUIERO VERLO
        </button>
      </footer>
    </div>
  );
};
