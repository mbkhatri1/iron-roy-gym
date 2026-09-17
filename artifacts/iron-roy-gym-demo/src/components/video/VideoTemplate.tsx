import { useEffect, useRef } from 'react';
import {
  SafeFrame,
  VideoCanvas,
  VideoPausedContext,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';
import { Scene7 } from './video_scenes/Scene7';

export const SCENE_DURATIONS = {
  intro: 3800,
  overview: 4700,
  members: 4700,
  attendance: 4300,
  payments: 4400,
  reports: 4600,
  close: 3900,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '1:1';
const SCENE_COMPONENTS = {
  intro: Scene1,
  overview: Scene2,
  members: Scene3,
  attendance: Scene4,
  payments: Scene5,
  reports: Scene6,
  close: Scene7,
};
const SCENE_START_SEC: Record<string, number> = (() => {
  const result: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, duration] of Object.entries(SCENE_DURATIONS)) {
    result[key] = cumulativeMs / 1000;
    cumulativeMs += duration;
  }
  return result;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSceneKeyRef = useRef<string | null>(null);
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey as keyof typeof SCENE_COMPONENTS];
  const backgroundPosition = [
    { x: '0%', y: '0%', scale: 1, background: '#19202d' },
    { x: '-8%', y: '5%', scale: 1.08, background: '#f8f3e8' },
    { x: '8%', y: '-5%', scale: 1.1, background: '#f8f3e8' },
    { x: '-5%', y: '7%', scale: 1.05, background: '#f8f3e8' },
    { x: '6%', y: '-4%', scale: 1.08, background: '#19202d' },
    { x: '-4%', y: '3%', scale: 1.06, background: '#f8f3e8' },
    { x: '0%', y: '0%', scale: 1, background: '#c8e83e' },
  ][Math.max(0, sceneIndex)];

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    if (paused) {
      audio.pause();
      return;
    }
    if (lastSceneKeyRef.current !== currentSceneKey) {
      lastSceneKeyRef.current = currentSceneKey;
      const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
      if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) audio.currentTime = targetTime;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted, paused]);

  return (
    <VideoPausedContext.Provider value={paused}>
      <VideoCanvas aspectRatio={VIDEO_ASPECT_RATIO} className="video-stage" style={{ backgroundColor: backgroundPosition.background }}>
        <motion.div className="pointer-events-none absolute -left-[18vmin] -top-[12vmin] h-[58vmin] w-[58vmin] rounded-full border-[.35vmin] border-[#19202d]/10" animate={{ x: backgroundPosition.x, y: backgroundPosition.y, scale: backgroundPosition.scale, rotate: sceneIndex * 18 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
        <motion.div className="pointer-events-none absolute right-[-14vmin] bottom-[-18vmin] h-[50vmin] w-[50vmin] rounded-full border-[.25vmin] border-[#19202d]/10" animate={{ x: sceneIndex % 2 ? '-3%' : '4%', y: sceneIndex % 3 ? '-2%' : '4%', rotate: sceneIndex * -22 }} transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }} />
        <SafeFrame className="relative z-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {SceneComponent && <SceneComponent key={currentSceneKey} />}
          </AnimatePresence>
        </SafeFrame>
        <div className="pointer-events-none absolute bottom-[2.8vmin] left-1/2 z-50 flex -translate-x-1/2 items-center gap-[1vmin] whitespace-nowrap font-mono text-[1.05vmin] tracking-[.15em] text-[#19202d]/35"><span className="h-[.6vmin] w-[.6vmin] rounded-full bg-[#19202d]/40" />IRON ROY / OPERATING SYSTEM FOR YOUR GYM</div>
        <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`} preload="auto" autoPlay muted={muted} />
      </VideoCanvas>
    </VideoPausedContext.Provider>
  );
}