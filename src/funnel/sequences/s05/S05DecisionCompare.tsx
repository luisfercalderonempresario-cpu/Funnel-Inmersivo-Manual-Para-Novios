/**
 * S05_03_DECISION_COMPARE — Comparación de decisión
 * Compares the first decision (S01) with the second decision (S05).
 * Three possible branches:
 * A) CHANGED: "Cambiaste tu respuesta. Pero la escena era la misma. Lo que cambió fue el contexto..."
 * B) SAME: "Elegiste lo mismo que al principio... La acción puede ser la misma. La comprensión desde la que la eliges puede ser diferente."
 * C) NO INITIAL: Fallback when initialDecision was not recorded.
 * Both outcomes are equally valid and treated with identical dignity.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { getDecisionChanged } from "../../state/funnelTypes";
import { trackEvent } from "../../tracking/trackEvent";

export const S05DecisionCompare: React.FC = () => {
  const { state, setCurrentScreen } = useFunnel();
  const { initialDecision, secondDecision } = state;
  const hasTrackedRef = useRef<boolean>(false);

  // Progressive reveal stage (0: choices shown, 1: core insight, 2: cta ready)
  const [stage, setStage] = useState<number>(0);

  const decisionChanged = getDecisionChanged(initialDecision, secondDecision);
  const isChangedBranch = decisionChanged === true;
  const isSameBranch = decisionChanged === false;
  const isFallbackBranch = decisionChanged === null;

  useEffect(() => {
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;

    trackEvent({
      event: "decision_comparison_viewed",
      sequence: "S05_VUELVE_A_MIRAR",
      screen: "S05_03_DECISION_COMPARE",
      metadata: {
        initialDecisionId: initialDecision?.id ?? null,
        secondDecisionId: secondDecision?.id ?? null,
        decisionChanged,
      },
    });

    const t1 = setTimeout(() => setStage(1), 900);
    const t2 = setTimeout(() => setStage(2), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [initialDecision, secondDecision, decisionChanged]);

  const handleContinue = () => {
    setCurrentScreen("S05_04_DEMONSTRATION");
  };

  return (
    <div
      id="screen-s05-03-decision-compare"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Header */}
      <header className="pt-2">
        <span
          id="compare-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="my-auto py-6 flex flex-col gap-6">
        {/* BRANCH A: CHANGED */}
        {isChangedBranch && (
          <div className="flex flex-col gap-5">
            {/* Comparison Cards */}
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800">
                <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium block mb-1">
                  Al principio elegiste:
                </span>
                <p className="text-neutral-300 font-light text-base">
                  «{initialDecision?.label}»
                </p>
              </div>

              <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-700">
                <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium block mb-1">
                  Ahora elegiste:
                </span>
                <p className="text-white font-normal text-base sm:text-lg">
                  «{secondDecision?.label}»
                </p>
              </div>
            </div>

            {/* Core Reflection */}
            {stage >= 1 && (
              <div className="pt-2 flex flex-col gap-3.5 animate-fade-in">
                <h2
                  id="compare-changed-headline"
                  className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
                >
                  Cambiaste tu respuesta.
                </h2>
                <p className="text-base text-neutral-400 font-light">
                  Pero la escena era la misma.
                </p>
              </div>
            )}

            {stage >= 2 && (
              <div className="pt-2 border-t border-neutral-800 animate-fade-in">
                <p
                  id="compare-changed-insight"
                  className="text-lg sm:text-xl font-normal text-neutral-200 leading-snug"
                >
                  Lo que cambió fue el contexto que tenías para decidir.
                </p>
              </div>
            )}
          </div>
        )}

        {/* BRANCH B: SAME / NO CAMBIÓ */}
        {isSameBranch && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2
                id="compare-same-headline"
                className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
              >
                Elegiste lo mismo que al principio.
              </h2>
            </div>

            <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-700">
              <p className="text-white font-normal text-base sm:text-lg">
                «{secondDecision?.label}»
              </p>
            </div>

            {stage >= 1 && (
              <div className="pt-2 flex flex-col gap-3 animate-fade-in">
                <p className="text-base text-neutral-400 font-light leading-relaxed">
                  Pero esta vez decidiste sabiendo algo que antes no sabías.
                </p>
                <p className="text-base text-neutral-400 font-light">
                  La acción puede ser la misma.
                </p>
              </div>
            )}

            {stage >= 2 && (
              <div className="pt-2 border-t border-neutral-800 animate-fade-in">
                <p
                  id="compare-same-insight"
                  className="text-lg sm:text-xl font-normal text-neutral-200 leading-snug"
                >
                  La comprensión desde la que la eliges puede ser diferente.
                </p>
              </div>
            )}
          </div>
        )}

        {/* BRANCH C: FALLBACK WITHOUT INITIAL DECISION */}
        {isFallbackBranch && (
          <div className="flex flex-col gap-5">
            <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-700">
              <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium block mb-1">
                Tu decisión:
              </span>
              <p className="text-white font-normal text-base sm:text-lg">
                «{secondDecision?.label ?? "Acción seleccionada"}»
              </p>
            </div>

            {stage >= 1 && (
              <div className="pt-2 flex flex-col gap-3 animate-fade-in">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Esta vez tomaste una decisión con más contexto que al comienzo del caso.
                </h2>
                <p className="text-base text-neutral-400 font-light">
                  No siempre necesitas cambiar lo que haces.
                </p>
              </div>
            )}

            {stage >= 2 && (
              <div className="pt-2 border-t border-neutral-800 animate-fade-in">
                <p className="text-lg sm:text-xl font-normal text-neutral-200 leading-snug">
                  También puede cambiar la comprensión desde la que decides.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer with CTA */}
      <footer className="w-full min-h-16 flex items-center justify-center pb-2">
        <button
          id="btn-compare-continue"
          type="button"
          onClick={handleContinue}
          className="w-full py-4 bg-white text-neutral-950 font-medium text-base rounded-md hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg"
        >
          Continúa
        </button>
      </footer>
    </div>
  );
};
