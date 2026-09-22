/**
 * MPN - Media Controller & Audio Gestures
 * Manages the canonical S01 video element, strictly adhering to autoplay audio policies,
 * playsInline, explicit gestures, fallbacks, and auto-advance upon completion.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { VIDEO_ASSETS } from "../config/assetRegistry";
import { trackEvent } from "../tracking/trackEvent";

export type PlaybackStatus =
  | "idle"
  | "preparing"
  | "playing"
  | "paused"
  | "completed"
  | "audio_blocked"
  | "load_error";

export interface MediaContextValue {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  status: PlaybackStatus;
  hasAudioStarted: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playWithAudioGesture: () => Promise<boolean>;
  retryPlayback: () => Promise<boolean>;
  resetPlayback: () => void;
  markVideoCompleted: () => void;
}

const MediaContext = createContext<MediaContextValue | null>(null);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [hasAudioStarted, setHasAudioStarted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const startPlaybackWithAudio = useCallback(async (): Promise<boolean> => {
    const video = videoRef.current;
    if (!video) return false;

    try {
      // Rule U: explicitly configure audio & inline playback inside user gesture
      video.muted = false;
      video.volume = 1;
      video.playsInline = true;
      video.removeAttribute("controls");
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");

      setStatus("preparing");

      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
      }

      // Playback successfully started with audio
      setStatus("playing");
      setHasAudioStarted(true);

      trackEvent({
        event: "case_started",
        sequence: "S01_EL_CASO",
        screen: "S01_01_INTRO",
      });

      trackEvent({
        event: "audio_playback_started",
        sequence: "S01_EL_CASO",
        screen: "S01_02_VIDEO",
        value: "unmuted",
      });

      trackEvent({
        event: "video_started",
        sequence: "S01_EL_CASO",
        screen: "S01_02_VIDEO",
        metadata: { asset: VIDEO_ASSETS.S01_CASE },
      });

      return true;
    } catch (err: unknown) {
      console.warn("[MPN Media] Playback gesture failed:", err);

      // Distinguish between audio permission block and media load/source error
      const isMediaError =
        video.error !== null ||
        (err instanceof DOMException &&
          (err.name === "NotSupportedError" || err.name === "NetworkError"));

      if (isMediaError) {
        setStatus("load_error");
      } else {
        // NotAllowedError: browser rejected audible autoplay
        setStatus("audio_blocked");
      }
      return false;
    }
  }, []);

  const retryPlayback = useCallback(async (): Promise<boolean> => {
    const video = videoRef.current;
    if (!video) return false;

    if (video.error) {
      video.load();
    }
    return startPlaybackWithAudio();
  }, [startPlaybackWithAudio]);

  const resetPlayback = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (e) {
        // ignore
      }
    }
    setStatus("idle");
    setCurrentTime(0);
  }, []);

  const markVideoCompleted = useCallback(() => {
    setStatus("completed");
    trackEvent({
      event: "video_completed",
      sequence: "S01_EL_CASO",
      screen: "S01_02_VIDEO",
    });
  }, []);

  const isPlaying = status === "playing";

  return (
    <MediaContext.Provider
      value={{
        videoRef,
        status,
        hasAudioStarted,
        isPlaying,
        currentTime,
        duration,
        playWithAudioGesture: startPlaybackWithAudio,
        retryPlayback,
        resetPlayback,
        markVideoCompleted,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export function useMedia(): MediaContextValue {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
}
