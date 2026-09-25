/**
 * S02_06_EXIT — Lo que no viste
 * Cinematic closure and cliffhanger for Sequence 02:
 * "Había algo de ese martes que él no sabía.
 *  Tú tampoco.
 *  Hay algo que no viste."
 * Stable endpoint for Sequence 02.
 */

import React, { useEffect, useRef, useState } from "react";
import { useFunnel } from "../../state/FunnelContext";

export const S02Exit: React.FC = () => {
  const { markSequence02Completed, setCurrentScreen } = useFunnel();
  const hasCompletedRef = useRef<boolean>(false);
  const [showContinue, setShowContinue] = useState<boolean>(false);

  useEffect(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    // Marks sequence02Completed and fires tracking events once
    markSequence02Completed();

    // Breathing room (~1s after text is fully visible), then reveal [CONTINUAR]
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 1800);

    return () => {
      clearTimeout(timer);
    };
  }, [markSequence02Completed]);

  return (
    <div
      id="screen-s02-06-exit"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-10 sm:py-14 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="exit-s02-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Cinematic Revelation */}
      <main className="my-auto py-12 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center gap-6 animate-fade-in max-w-sm">
          <p
            id="exit-s02-phrase-1"
            className="text-xl sm:text-2xl font-light text-neutral-300 tracking-tight leading-relaxed"
          >
            Había algo de ese martes que él no sabía.
          </p>

          <p
            id="exit-s02-phrase-2"
            className="text-xl sm:text-2xl font-light text-neutral-400 tracking-tight leading-relaxed"
          >
            Tú tampoco.
          </p>

          <p
            id="exit-s02-phrase-cliffhanger"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight pt-4"
          >
            Hay algo que no viste.
          </p>
        </div>
      </main>

      {/* Footer with manual continue */}
      <footer className="w-full min-h-12 pb-2">
        {showContinue && (
          <div className="animate-fade-in">
            <button
              id="btn-s02-exit-continue"
              type="button"
              onClick={() => setCurrentScreen("S03_01_SLEEP_CONTEXT")}
              className="w-full py-4 px-6 rounded-lg bg-white text-neutral-950 font-medium text-sm sm:text-base tracking-wide hover:bg-neutral-200 active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
            >
              CONTINUAR
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};
