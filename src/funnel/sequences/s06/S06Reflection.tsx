/**
 * S06_04_REFLECTION — Reflexión
 * Reflects the user's chosen desiredTransformation with high dignification.
 * Includes natural grammar inline mapping:
 * "Y acabas de decir que te gustaría..."
 * [DESEO ELEGIDO]
 * CTA: [Continúa] -> S06_05_EXIT
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

interface ReflectionContent {
  title: string;
  line1: string;
  line2: string;
  inline: string;
}

const REFLECTION_MAP: Record<string, ReflectionContent> = {
  understand_better: {
    title: "Entenderla mejor.",
    line1: "No tener que adivinar qué pasa cada vez.",
    line2: "Tener un poco más de contexto antes de sacar conclusiones.",
    inline: "entenderla mejor",
  },
  listen_better: {
    title: "Escucharla mejor.",
    line1: "No entrar inmediatamente en modo solución.",
    line2: "Entender primero qué necesita de ti en ese momento.",
    inline: "escucharla mejor",
  },
  react_calmly: {
    title: "Reaccionar con más calma.",
    line1: "Tener un pequeño espacio entre lo que ocurre…",
    line2: "y cómo respondes.",
    inline: "reaccionar con más calma",
  },
  approach_or_space: {
    title: "Saber cuándo acercarte y cuándo darle espacio.",
    line1: "No desde una fórmula.",
    line2: "Desde una mejor lectura del momento y lo que ella te diga.",
    inline: "saber cuándo acercarte y cuándo darle espacio",
  },
  feel_supported: {
    title: "Hacerla sentir más acompañada.",
    line1: "No necesariamente haciendo más.",
    line2: "A veces, entendiendo mejor cómo estar ahí.",
    inline: "hacerla sentir más acompañada",
  },
};

const FALLBACK_REFLECTION: ReflectionContent = {
  title: "Hay algo que te gustaría hacer un poco mejor en tu relación.",
  line1: "Y no necesitas tener todas las respuestas para empezar.",
  line2: "",
  inline: "hacer algo mejor en tu relación",
};

export const S06Reflection: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const hasTrackedRef = useRef<boolean>(false);
  const [stage, setStage] = useState<number>(0);

  const reflection = state.desiredTransformation
    ? REFLECTION_MAP[state.desiredTransformation] || FALLBACK_REFLECTION
    : FALLBACK_REFLECTION;

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent({
        event: "desired_transformation_reflected",
        sequence: "S06_AHORA_PIENSA_EN_ELLA",
        screen: "S06_04_REFLECTION",
        value: state.desiredTransformation ?? "fallback",
      });
    }

    const t1 = setTimeout(() => setStage(1), 900);
    const t2 = setTimeout(() => setStage(2), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [state.desiredTransformation]);

  const handleContinue = () => {
    setCurrentScreen("S06_05_EXIT");
  };

  return (
    <div
      id="screen-s06-04-reflection"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="reflection-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center py-6 space-y-7">
        {/* Part 1: High hierarchy chosen desire */}
        <div className="space-y-3">
          <h1
            id="reflection-chosen-title"
            className="text-white text-2xl sm:text-3xl font-light tracking-tight leading-snug"
          >
            {reflection.title}
          </h1>

          <div
            id="reflection-custom-echo"
            className="space-y-2 border-l border-neutral-800/80 pl-4 text-neutral-300 text-base sm:text-lg font-light leading-relaxed pt-1"
          >
            <p>{reflection.line1}</p>
            {reflection.line2 && <p className="text-neutral-400">{reflection.line2}</p>}
          </div>
        </div>

        {/* Part 2: Normalization */}
        {stage >= 1 && (
          <div
            id="reflection-normalization"
            className="space-y-2 text-neutral-400 text-sm sm:text-base font-light leading-relaxed pt-2 animate-fade-in"
          >
            <p>No necesitas convertirte en experto en relaciones para mejorar eso.</p>
            <p>Tampoco necesitas acertar siempre.</p>
          </div>
        )}

        {/* Part 3: Climax connection */}
        {stage >= 2 && (
          <div
            id="reflection-climax"
            className="pt-3 border-t border-neutral-800/70 space-y-4 animate-fade-in"
          >
            <p className="text-white text-lg sm:text-xl font-light leading-relaxed">
              Pero sí ayudaría tener un poco más de contexto antes de reaccionar.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 text-neutral-400 text-base font-light">
              <span>Y acabas de decir que te gustaría</span>
              <span
                id="reflection-inline-desire"
                className="text-white font-medium underline underline-offset-4 decoration-neutral-600"
              >
                {reflection.inline}.
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="pt-4 sm:pt-6">
        <button
          id="btn-reflection-continue"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-lg cursor-pointer"
        >
          Continúa
        </button>
      </footer>
    </div>
  );
};
