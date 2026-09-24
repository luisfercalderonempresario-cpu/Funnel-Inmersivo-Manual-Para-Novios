/**
 * S07_08_EXIT — Salida de S07 e Invitación a la Prueba Real
 * Transitions from narrative demonstration to user trial invitation.
 * Automatically marks S07 completed and tracks:
 * - sequence_07_completed (once)
 * - trial_invitation_viewed (once)
 * The [PROBAR CONTEXTO™] button remains safely in place without breaking navigation
 * (awaiting S08 implementation in subsequent cycle).
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S07Exit: React.FC = () => {
  const { markSequence07Completed, startTrial } = useFunnel();
  const [stage, setStage] = useState<number>(0);
  const hasCompletedRef = useRef<boolean>(false);
  const hasTrackedInviteRef = useRef<boolean>(false);
  const isDev = Boolean(import.meta.env.DEV);

  useEffect(() => {
    // Complete S07 automatically upon legitimate arrival at S07_08_EXIT
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      markSequence07Completed();
    }

    if (!hasTrackedInviteRef.current) {
      hasTrackedInviteRef.current = true;
      trackEvent({
        event: "trial_invitation_viewed",
        sequence: "S07_Y_SI_EXISTIERA",
        screen: "S07_08_EXIT",
      });
    }

    const t1 = setTimeout(() => setStage(1), 900);
    const t2 = setTimeout(() => setStage(2), 2200);
    const t3 = setTimeout(() => setStage(3), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [markSequence07Completed]);

  const handleTrialClick = () => {
    startTrial();
  };

  return (
    <div
      id="screen-s07-08-exit"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="s07-exit-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Narrative Area */}
      <main className="flex-1 flex flex-col justify-center py-10 space-y-6">
        <p
          id="s07-exit-lead"
          className="text-neutral-400 text-lg sm:text-xl font-light tracking-wide leading-relaxed"
        >
          Pero hay algo más importante.
        </p>

        {stage >= 1 && (
          <p
            id="s07-exit-line2"
            className="text-neutral-300 text-lg sm:text-xl font-light tracking-wide animate-fade-in transition-all duration-700"
          >
            No quiero que me creas porque acabas de verlo en una historia.
          </p>
        )}

        {stage >= 2 && (
          <div className="border-l-2 border-white pl-5 sm:pl-6 py-1 animate-fade-in transition-all duration-700">
            <h1
              id="s07-exit-core-invite"
              className="text-white text-2xl sm:text-3xl font-light tracking-tight leading-snug"
            >
              Quiero que lo pruebes con tu propio contexto.
            </h1>
          </div>
        )}

        {stage >= 3 && (
          <div
            id="s07-exit-brand-card"
            className="pt-6 space-y-2 text-center animate-fade-in transition-all duration-700"
          >
            <p className="text-2xl sm:text-3xl font-light tracking-[0.2em] text-white">
              CONTEXTO<span className="text-sm align-super">™</span>
            </p>
            <p className="text-neutral-400 text-sm font-light italic">
              &ldquo;Comprender antes de reaccionar.&rdquo;
            </p>
          </div>
        )}
      </main>

      {/* Footer Area with Trial CTA */}
      <footer className="pt-6 flex flex-col gap-3">
        {stage >= 2 && (
          <div className="w-full space-y-3 animate-fade-in">
            <button
              id="btn-s07-try-contexto"
              type="button"
              onClick={handleTrialClick}
              className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <span>PROBAR CONTEXTO™</span>
            </button>
          </div>
        )}

        {isDev ? (
          <div
            id="dev-s07-qa-indicator"
            className="p-3 rounded bg-neutral-900/60 border border-neutral-800 text-[11px] font-mono text-neutral-400 text-center select-none"
          >
            [DEV QA] Fin de Secuencia 07 — S07_08_EXIT (Endpoint completado con éxito)
          </div>
        ) : (
          <div className="h-4" aria-hidden="true" />
        )}
      </footer>
    </div>
  );
};
