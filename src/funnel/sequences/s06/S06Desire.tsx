/**
 * S06_03_DESIRE — Deseo
 * "Si pudieras mejorar una sola cosa…"
 * "¿cuál elegirías?"
 * 5 structured choices without letters or judgment.
 * Robust mobile text wrap on "Saber cuándo acercarme y cuándo darle espacio."
 * Saves desiredTransformation before navigating to S06_04_REFLECTION.
 */

import React, { useState } from "react";
import { useFunnel } from "../../state/FunnelContext";
import { DesiredTransformation } from "../../state/funnelTypes";

interface DesireOption {
  id: NonNullable<DesiredTransformation>;
  label: string;
}

export const DESIRE_OPTIONS: DesireOption[] = [
  { id: "understand_better", label: "Entenderla mejor." },
  { id: "listen_better", label: "Escucharla mejor." },
  { id: "react_calmly", label: "Reaccionar con más calma." },
  { id: "approach_or_space", label: "Saber cuándo acercarme y cuándo darle espacio." },
  { id: "feel_supported", label: "Hacerla sentir más acompañada." },
];

export const S06Desire: React.FC = () => {
  const { state, setDesiredTransformation, setCurrentScreen } = useFunnel();
  const [selectedId, setSelectedId] = useState<DesiredTransformation>(
    state.desiredTransformation
  );

  const handleSelect = (option: DesireOption) => {
    setSelectedId(option.id);
    setDesiredTransformation(option.id, option.label);
  };

  const handleContinue = () => {
    if (!selectedId) return;
    setCurrentScreen("S06_04_REFLECTION");
  };

  return (
    <div
      id="screen-s06-03-desire"
      className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-8 sm:py-12 max-w-lg mx-auto select-none"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Brand Header */}
      <header className="pt-2">
        <span
          id="desire-brand-label"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium select-none"
        >
          MANUAL PARA NOVIOS
        </span>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center py-6 space-y-6 sm:space-y-7">
        {/* Prompt Header */}
        <div className="space-y-1.5">
          <p
            id="desire-lead-line"
            className="text-neutral-400 text-sm sm:text-base font-light tracking-wide"
          >
            Si pudieras mejorar una sola cosa en tu relación…
          </p>
          <h1
            id="desire-title"
            className="text-white text-2xl sm:text-3xl font-light tracking-tight leading-snug"
          >
            ¿cuál elegirías?
          </h1>
        </div>

        {/* 5 Desire Options */}
        <div
          id="desire-options-list"
          role="radiogroup"
          aria-label="Opciones de deseo personal"
          className="space-y-2.5 sm:space-y-3"
        >
          {DESIRE_OPTIONS.map((option) => {
            const isSelected = selectedId === option.id;
            return (
              <button
                key={option.id}
                id={`btn-desire-opt-${option.id}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelect(option)}
                className={`w-full py-3.5 sm:py-4 px-4 sm:px-5 rounded-md border text-left text-sm sm:text-base font-light leading-relaxed transition-all duration-200 cursor-pointer flex items-center justify-between min-h-[56px] ${
                  isSelected
                    ? "bg-neutral-900 border-white/60 text-white shadow-md ring-1 ring-white/20"
                    : "bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900/40"
                }`}
              >
                <span className="pr-3 flex-1 break-words">{option.label}</span>
                <span
                  className={`w-4 h-4 rounded-full border transition-all flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "border-white bg-white"
                      : "border-neutral-700 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="pt-4 sm:pt-6">
        {selectedId ? (
          <button
            id="btn-desire-continue"
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-950 font-medium text-base rounded-md transition-all duration-200 shadow-lg cursor-pointer animate-fade-in"
          >
            Continúa
          </button>
        ) : (
          <div className="h-14" aria-hidden="true" />
        )}
      </footer>
    </div>
  );
};
