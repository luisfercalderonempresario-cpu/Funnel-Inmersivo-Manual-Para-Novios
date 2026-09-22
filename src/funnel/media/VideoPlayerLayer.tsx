/**
 * MPN - Video Player Layer
 * Persistent background/foreground video element enabling seamless preloading,
 * direct user gesture playback, and zero latency transitions.
 */

import React, { useEffect } from "react";
import { VIDEO_ASSETS } from "../config/assetRegistry";
import { useMedia } from "./MediaContext";
import { useFunnel } from "../state/FunnelContext";

export const VideoPlayerLayer: React.FC = () => {
  const { videoRef } = useMedia();
  const { state } = useFunnel();

  // SINGLE SOURCE OF TRUTH: visible ONLY when canonical active screen is VIDEO
  const isVideoScreen = state.currentScreen === "S01_02_VIDEO";

  // Guarantee playback pauses whenever leaving the VIDEO screen
  useEffect(() => {
    if (!isVideoScreen && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [isVideoScreen, videoRef]);

  return (
    <div
      id="persistent-video-layer"
      aria-hidden={!isVideoScreen}
      className={`fixed inset-0 z-10 flex items-center justify-center bg-black transition-opacity duration-300 ${
        isVideoScreen
          ? "opacity-100 visible pointer-events-auto"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div className="relative w-full h-full max-w-[calc(100dvh*9/16)] max-h-[100dvh] aspect-[9/16] overflow-hidden bg-black flex items-center justify-center">
        <video
          id="mpn-video-player"
          ref={videoRef}
          src={VIDEO_ASSETS.S01_CASE}
          preload="auto"
          playsInline
          webkit-playsinline="true"
          disablePictureInPicture
          controls={false}
          className="w-full h-full object-cover select-none block"
        />
      </div>
    </div>
  );
};

