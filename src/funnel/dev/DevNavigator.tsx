/**
 * MPN - DEV NAVIGATOR
 * Architectural QA & rapid screen inspection tool.
 * Strictly gated to `import.meta.env.DEV` - NEVER compiled or rendered in production.
 */

import React, { useState } from "react";
import { useFunnel } from "../state/FunnelContext";
import {
  FUNNEL_SCREENS,
  FUNNEL_SEQUENCES,
  SCREEN_ORDER,
  ScreenId,
} from "../config/screenRegistry";
import { DEV_PRESETS } from "./devPresets";

export const DevNavigator: React.FC = () => {
  // Never render in production
  if (!import.meta.env.DEV) {
    return null;
  }

  return <DevNavigatorPanel />;
};

const DevNavigatorPanel: React.FC = () => {
  const {
    state,
    setCurrentScreen,
    navigateToNextScreen,
    navigateToPrevScreen,
    resetS01,
    resetFunnel,
    applyPreset,
  } = useFunnel();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedScreenId, setSelectedScreenId] = useState<ScreenId>(
    state.currentScreen
  );
  const [selectedPreset, setSelectedPreset] = useState<string>("FRESH");

  React.useEffect(() => {
    setSelectedScreenId(state.currentScreen);
  }, [state.currentScreen]);

  const handleGoToScreen = () => {
    setCurrentScreen(selectedScreenId, { isDev: true });
  };

  const handleApplyPreset = () => {
    applyPreset(selectedPreset);
    const target = DEV_PRESETS[selectedPreset]?.targetScreen;
    if (target) {
      setSelectedScreenId(target);
      setCurrentScreen(target, { isDev: true });
    }
  };

  return (
    <aside
      id="mpn-dev-navigator"
      aria-label="Herramientas de Desarrollo MPN"
      className="fixed bottom-3 right-3 z-50 select-none font-mono text-xs"
    >
      {/* Collapsed Pill Trigger */}
      {!isOpen && (
        <button
          id="btn-dev-toggle-open"
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-3 py-1.5 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer transition-colors backdrop-blur-md"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold tracking-wider">MPN DEV</span>
        </button>
      )}

      {/* Expanded QA Panel */}
      {isOpen && (
        <div
          id="dev-navigator-panel"
          className="w-80 sm:w-96 bg-neutral-950/95 border border-neutral-800 rounded-lg shadow-2xl p-4 text-neutral-300 backdrop-blur-md flex flex-col gap-3.5 animate-fade-in"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-white tracking-wide">
                MPN — DEV NAVIGATOR
              </span>
            </div>
            <button
              id="btn-dev-toggle-close"
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white px-2 py-0.5 rounded hover:bg-neutral-800 text-xs cursor-pointer"
            >
              [CERRAR]
            </button>
          </div>

          {/* Sequence Info */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase text-neutral-400 font-semibold">
              Sequence:
            </span>
            <div className="text-neutral-200 font-medium bg-neutral-900/80 px-2 py-1 rounded border border-neutral-800/60">
              {FUNNEL_SEQUENCES[state.currentSequence]?.name || state.currentSequence}
            </div>
          </div>

          {/* Screen Selector & GO */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase text-neutral-400 font-semibold">
              Screen Direct Access:
            </span>
            <div className="flex gap-2">
              <select
                id="dev-select-screen"
                value={selectedScreenId}
                onChange={(e) => setSelectedScreenId(e.target.value as ScreenId)}
                className="flex-1 bg-neutral-900 border border-neutral-700/80 rounded px-2 py-1.5 text-neutral-200 text-xs focus:outline-none focus:border-neutral-400"
              >
                {SCREEN_ORDER.map((sId) => (
                  <option key={sId} value={sId}>
                    {FUNNEL_SCREENS[sId].id} — {FUNNEL_SCREENS[sId].name}
                  </option>
                ))}
              </select>
              <button
                id="btn-dev-goto-screen"
                type="button"
                onClick={handleGoToScreen}
                className="px-3 py-1.5 bg-neutral-200 hover:bg-white text-neutral-950 font-bold rounded cursor-pointer transition-colors"
              >
                IR
              </button>
            </div>
          </div>

          {/* Presets Selector & Load */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase text-neutral-400 font-semibold">
              State Preset:
            </span>
            <div className="flex gap-2">
              <select
                id="dev-select-preset"
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value)}
                className="flex-1 bg-neutral-900 border border-neutral-700/80 rounded px-2 py-1.5 text-neutral-200 text-xs focus:outline-none focus:border-neutral-400"
              >
                {Object.values(DEV_PRESETS).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <button
                id="btn-dev-apply-preset"
                type="button"
                onClick={handleApplyPreset}
                className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold rounded cursor-pointer transition-colors"
              >
                CARGAR
              </button>
            </div>
          </div>

          {/* Navigation Controls (Anterior / Siguiente) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id="btn-dev-prev"
              type="button"
              onClick={() => navigateToPrevScreen(true)}
              className="py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded text-center text-neutral-300 font-medium cursor-pointer"
            >
              ← ANTERIOR
            </button>
            <button
              id="btn-dev-next"
              type="button"
              onClick={() => navigateToNextScreen(true)}
              className="py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded text-center text-neutral-300 font-medium cursor-pointer"
            >
              SIGUIENTE →
            </button>
          </div>

          {/* Current State Inspector */}
          <div className="bg-neutral-900/90 rounded border border-neutral-800/80 p-2.5 flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-neutral-400">Current Screen ID:</span>
              <span className="text-emerald-400 font-semibold">{state.currentScreen}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">caseStarted:</span>
              <span className="text-neutral-200">{String(state.caseStarted)}</span>
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-neutral-400">initialDecision:</span>
              <span className="text-neutral-200 truncate">
                {state.initialDecision
                  ? `[${state.initialDecision.id}] "${state.initialDecision.label}"`
                  : "null"}
              </span>
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-neutral-400">initialInterpretation:</span>
              <span className="text-neutral-200 truncate">
                {state.initialInterpretation
                  ? `[${state.initialInterpretation.id}] "${state.initialInterpretation.label}"`
                  : "null"}
              </span>
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-neutral-400">problemOriginGuess:</span>
              <span className="text-neutral-200 truncate">
                {state.problemOriginGuess
                  ? `[${state.problemOriginGuess.id}] "${state.problemOriginGuess.label}"`
                  : "null"}
              </span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">sequence02Completed:</span>
              <span className="text-neutral-200">{String(Boolean(state.sequence02Completed))}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">sleepContextShift:</span>
              <span className="text-neutral-200">{state.sleepContextShift ?? "null"}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">contextChangesAction:</span>
              <span className="text-neutral-200">{state.contextChangesAction ?? "null"}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">sequence03Completed:</span>
              <span className="text-neutral-200">{String(Boolean(state.sequence03Completed))}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">cycleUnderstanding:</span>
              <span className="text-neutral-200">{state.cycleUnderstanding ?? "null"}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">sequence04Completed:</span>
              <span className="text-neutral-200">{String(Boolean(state.sequence04Completed))}</span>
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-neutral-400">secondDecision:</span>
              <span className="text-neutral-200 truncate">
                {state.secondDecision
                  ? `[${state.secondDecision.id}] "${state.secondDecision.label}"`
                  : "null"}
              </span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">beliefShift:</span>
              <span className="text-neutral-200">{state.beliefShift ?? "null"}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">sequence05Completed:</span>
              <span className="text-neutral-200">{String(Boolean(state.sequence05Completed))}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">personalProblemRecognition:</span>
              <span className="text-neutral-200">{state.personalProblemRecognition ?? "null"}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">desiredTransformation:</span>
              <span className="text-neutral-200">{state.desiredTransformation ?? "null"}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">sequence06Completed:</span>
              <span className="text-neutral-200">{String(Boolean(state.sequence06Completed))}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">toolInterest:</span>
              <span className="text-neutral-200">{state.toolInterest ?? "null"}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">toolInterestConcern:</span>
              <span className="text-neutral-200">{state.toolInterestConcern ?? "null"}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">sequence07Completed:</span>
              <span className="text-neutral-200">{String(Boolean(state.sequence07Completed))}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">trialStarted:</span>
              <span className="text-neutral-200">{String(Boolean(state.trialStarted))}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">dateKnowledge:</span>
              <span className="text-neutral-200">{state.dateKnowledge ?? "null"}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">cycleDay / phase:</span>
              <span className="text-neutral-200">
                {state.estimatedCycleDay !== null ? `Day ${state.estimatedCycleDay}` : "null"} / {state.estimatedPhase ?? "null"}
              </span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">inputConfidence / example:</span>
              <span className="text-neutral-200">
                {state.inputConfidence ?? "null"} / {String(Boolean(state.exampleMode))}
              </span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">trialValueResponse:</span>
              <span className="text-neutral-200">{state.trialValueResponse ?? "null"}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">productValueExperienced:</span>
              <span className="text-neutral-200">{String(Boolean(state.productValueExperienced))}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">trialCompleted:</span>
              <span className="text-emerald-400 font-semibold">{String(Boolean(state.trialCompleted))}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">offerStarted:</span>
              <span className="text-neutral-200">{String(Boolean(state.offerStarted))}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">offerViewed:</span>
              <span className="text-neutral-200">{String(Boolean(state.offerViewed))}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-400">checkoutIntent / source:</span>
              <span className="text-neutral-200">
                {String(Boolean(state.checkoutIntent))} / {state.checkoutSource ?? "null"}
              </span>
            </div>
          </div>

          {/* Reset Controls */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-800/80">
            <button
              id="btn-dev-reset-s01"
              type="button"
              onClick={resetS01}
              className="py-1.5 bg-neutral-900 hover:bg-amber-950/40 border border-neutral-800 hover:border-amber-700/50 text-amber-300/90 text-center rounded cursor-pointer transition-colors"
            >
              RESET S01
            </button>
            <button
              id="btn-dev-reset-funnel"
              type="button"
              onClick={resetFunnel}
              className="py-1.5 bg-neutral-900 hover:bg-rose-950/40 border border-neutral-800 hover:border-rose-700/50 text-rose-300/90 text-center rounded cursor-pointer transition-colors"
            >
              RESET FUNNEL
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
