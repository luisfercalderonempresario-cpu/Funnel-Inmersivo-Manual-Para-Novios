/**
 * S04_01_MISSING_PIECE — La pieza que faltaba
 * The core revelation:
 * "Ya viste dos cosas que él no sabía.
 *  Cómo había dormido.
 *  Lo que había pasado en su trabajo.
 *  Pero había otra información que tampoco estaba considerando.
 *  Su ciclo menstrual."
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { trackEvent } from "../../tracking/trackEvent";

export const S04MissingPiece: React.FC = () => {
  const { setCurrentScreen } = useFunnel();
  const hasTrackedStartRef = useRef<boolean>(false);
  const hasTrackedPieceRef = useRef<boolean>(false);

  // Progressive narrative reveal stages (0: initial, 1: sleep & work, 2: anticipation, 3: reveal)
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true;
      trackEvent({
        event: "sequence_04_started",
        sequence: "S04_LA_PIEZA_INESPERADA",
        screen: "S04_01_MISSING_PIECE",
      });
    }

    const t1 = setTimeout(() => setStage(1), 700);
    const t2 = setTimeout(() => setStage(2), 1700);
    const t3 = setTimeout(() => {
      setStage(3);
      if (!hasTrackedPieceRef.current) {
        hasTrackedPieceRef.current = true;
        trackEvent({
          event: "cycle_piece_revealed",
          sequence: "S04_LA_PIEZA_INESPERADA",
          screen: "S04_01_MISSING_PIECE",
        });
      }
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleNext = () => {
    setCurrentScreen("S04_02_CYCLE_EXPLAINED");
  };

  return (
    <div
      id="screen-s04-01-missing-piece"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="missing-piece-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Progressive Narrative Body */}
      <main className="my-auto py-8 flex flex-col justify-center gap-7">
        {/* Step 1: Recap */}
        <p
          id="missing-piece-lead"
          className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed animate-fade-in"
        >
          Ya viste dos cosas que él no sabía.
        </p>

        {/* Step 2: Previous pieces */}
        {stage >= 1 && (
          <div className="flex flex-col gap-2 pl-4 border-l border-neutral-800 animate-fade-in">
            <p
              id="missing-piece-sleep"
              className="text-neutral-300 text-sm sm:text-base font-light"
            >
              Cómo había dormido.
            </p>
            <p
              id="missing-piece-work"
              className="text-neutral-300 text-sm sm:text-base font-light"
            >
              Lo que había pasado en su trabajo.
            </p>
          </div>
        )}

        {/* Step 3: Pivot */}
        {stage >= 2 && (
          <p
            id="missing-piece-pivot"
            className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed pt-2 animate-fade-in"
          >
            Pero había otra información que tampoco estaba considerando.
          </p>
        )}

        {/* Step 4: The Revelation (maximum hierarchy and breathing room) */}
        {stage >= 3 && (
          <div className="pt-8 pb-4 flex flex-col gap-3 animate-fade-in">
            <span
              id="missing-piece-caption"
              className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono"
            >
              La pieza que faltaba
            </span>
            <h1
              id="missing-piece-revelation"
              className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight"
            >
              Su ciclo menstrual.
            </h1>
          </div>
        )}
      </main>

      {/* Action Footer */}
      <footer className="w-full pt-4 pb-2">
        {stage >= 3 ? (
          <button
            id="btn-cycle-inquiry"
            type="button"
            onClick={handleNext}
            className="w-full py-4 px-6 bg-neutral-100 hover:bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide rounded-lg transition-colors duration-200 cursor-pointer text-center animate-fade-in"
          >
            ¿Su ciclo?
          </button>
        ) : (
          <div className="min-h-14" />
        )}
      </footer>
    </div>
  );
};
