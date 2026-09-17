import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Pause, Play, Repeat, Volume2, VolumeX } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const SCENE_DETAILS: Record<string, { title: string; filePath: string }> = {
  intro: { title: 'Iron Roy Gym', filePath: 'src/components/video/video_scenes/Scene1.tsx' },
  overview: { title: 'At a glance', filePath: 'src/components/video/video_scenes/Scene2.tsx' },
  members: { title: 'Members', filePath: 'src/components/video/video_scenes/Scene3.tsx' },
  attendance: { title: 'Attendance', filePath: 'src/components/video/video_scenes/Scene4.tsx' },
  payments: { title: 'Payments', filePath: 'src/components/video/video_scenes/Scene5.tsx' },
  reports: { title: 'Reports', filePath: 'src/components/video/video_scenes/Scene6.tsx' },
  close: { title: 'Run the floor', filePath: 'src/components/video/video_scenes/Scene7.tsx' },
};

function announceSceneSelection(index: number, sceneKeys: string[]) {
  const key = sceneKeys[index];
  const details = SCENE_DETAILS[key];
  if (!details?.filePath) return;
  window.parent.postMessage({
    type: 'REPLIT_VIDEO_SCENE_SELECTED',
    payload: {
      sceneIndex: index,
      sceneCount: sceneKeys.length,
      sceneTitle: details.title || key,
      filePath: details.filePath,
      lineNumber: 1,
    },
  }, '*');
}

function formatPlaybackTime(durationMs: number) {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;
}

function PlaybackStatus({
  sceneKeys, activeIndex, activeDuration, activeStartTime, totalDuration, tick, paused, onJumpTo,
}: {
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  activeStartTime: number;
  totalDuration: number;
  tick: number;
  paused: boolean;
  onJumpTo: (index: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedBaseRef = useRef(0);

  useEffect(() => {
    setElapsed(0);
    elapsedBaseRef.current = 0;
  }, [tick]);

  useEffect(() => {
    if (paused) return undefined;
    const startedAt = performance.now();
    const id = window.setInterval(() => {
      setElapsed(elapsedBaseRef.current + performance.now() - startedAt);
    }, 60);
    return () => {
      window.clearInterval(id);
      elapsedBaseRef.current += performance.now() - startedAt;
    };
  }, [tick, paused]);

  const progress = activeDuration > 0 ? Math.min(1, elapsed / activeDuration) : 0;
  const totalElapsed = Math.min(totalDuration, activeStartTime + Math.min(elapsed, activeDuration));

  return (
    <>
      <div className="flex min-w-0 flex-1 items-center gap-1">
        {sceneKeys.map((key, index) => (
          <button
            key={key}
            onClick={() => onJumpTo(index)}
            className="relative h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/20"
            aria-label={`Jump to scene ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <span className="absolute inset-y-0 left-0 rounded-full bg-white/90" style={{ width: `${index === activeIndex ? progress * 100 : 0}%` }} />
          </button>
        ))}
      </div>
      <span className="shrink-0 font-mono text-[10px] text-white/65">{activeIndex + 1}/{sceneKeys.length}</span>
      <span className="shrink-0 font-mono text-[10px] tabular-nums text-white/75">{formatPlaybackTime(totalElapsed)} / {formatPlaybackTime(totalDuration)}</span>
    </>
  );
}

function ControlBar({
  collapsed, locked, paused, muted, sceneKeys, activeIndex, activeDuration, activeStartTime, totalDuration, tick,
  onTogglePause, onToggleLock, onToggleMuted, onJumpTo, onToggleCollapsed,
}: {
  collapsed: boolean;
  locked: boolean;
  paused: boolean;
  muted: boolean;
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  activeStartTime: number;
  totalDuration: number;
  tick: number;
  onTogglePause: () => void;
  onToggleLock: () => void;
  onToggleMuted: () => void;
  onJumpTo: (index: number) => void;
  onToggleCollapsed: () => void;
}) {
  return (
    <div className={`flex items-center gap-2 bg-[#19202d]/90 px-3 py-2.5 backdrop-blur-md transition-all duration-200 ${collapsed ? 'pointer-events-none translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
      <button onClick={onTogglePause} className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white" title={paused ? 'Play' : 'Pause'} aria-label={paused ? 'Play' : 'Pause'}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
      <button onClick={onToggleLock} className={`rounded-md p-2 ${locked ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`} title="Loop current scene" aria-label="Loop current scene" aria-pressed={locked}><Repeat size={16} /></button>
      <button onClick={onToggleMuted} className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white" title={muted ? 'Unmute' : 'Mute'} aria-label={muted ? 'Unmute' : 'Mute'}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
      <div className="h-5 w-px bg-white/15" aria-hidden="true" />
      <PlaybackStatus sceneKeys={sceneKeys} activeIndex={activeIndex} activeDuration={activeDuration} activeStartTime={activeStartTime} totalDuration={totalDuration} tick={tick} paused={paused} onJumpTo={onJumpTo} />
      <button onClick={onToggleCollapsed} className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white" title="Hide controls" aria-label="Hide controls"><ChevronDown size={16} /></button>
    </div>
  );
}

export default function VideoWithControls() {
  const isIframed = typeof window !== 'undefined' && window.self !== window.top;
  const [muted, setMuted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tapPinned, setTapPinned] = useState(false);
  const sensorRef = useRef<HTMLDivElement | null>(null);
  const controls = useSceneControls(SCENE_DURATIONS);

  const handleJumpTo = useCallback((index: number) => {
    controls.jumpTo(index);
    announceSceneSelection(index, controls.sceneKeys);
  }, [controls]);

  useEffect(() => {
    if (!controls.paused) return undefined;
    const frozen = document.getAnimations().filter((animation) => animation.playState === 'running');
    frozen.forEach((animation) => animation.pause());
    return () => frozen.forEach((animation) => animation.play());
  }, [controls.paused]);

  useEffect(() => {
    if (!(collapsed && tapPinned)) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && sensorRef.current && !sensorRef.current.contains(event.target as Node)) setTapPinned(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [collapsed, tapPinned]);

  if (!isIframed) return <VideoTemplate />;

  const visible = !collapsed || hovering || tapPinned;
  return (
    <div className="relative h-screen w-full">
      <VideoTemplate key={controls.mountKey} durations={controls.durations} loop paused={controls.paused} muted={muted} onSceneChange={controls.onSceneChange} />
      <div
        ref={sensorRef}
        className="absolute inset-x-0 bottom-0 z-50 flex h-1/4 flex-col justify-end"
        onPointerEnter={(event) => event.pointerType === 'mouse' && setHovering(true)}
        onPointerLeave={(event) => event.pointerType === 'mouse' && setHovering(false)}
        onPointerDown={(event) => event.pointerType !== 'mouse' && collapsed && setTapPinned(true)}
      >
        <div className="flex-1" aria-hidden="true" />
        <div className={visible ? '' : 'pointer-events-none'}>
          <ControlBar
            collapsed={!visible}
            locked={controls.locked}
            paused={controls.paused}
            muted={muted}
            sceneKeys={controls.sceneKeys}
            activeIndex={controls.activeIndex}
            activeDuration={controls.activeDuration}
            activeStartTime={controls.activeStartTime}
            totalDuration={controls.totalDuration}
            tick={controls.tick}
            onTogglePause={controls.togglePause}
            onToggleLock={controls.toggleLock}
            onToggleMuted={() => setMuted((value) => !value)}
            onJumpTo={handleJumpTo}
            onToggleCollapsed={() => {
              setCollapsed((value) => !value);
              setHovering(false);
              setTapPinned(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}