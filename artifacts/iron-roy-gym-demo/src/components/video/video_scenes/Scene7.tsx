import { motion } from 'framer-motion';
import { SceneFrame, LogoLockup, MicroLabel } from './shared';

export function Scene7() {
  return (
    <SceneFrame className="bg-[#c8e83e] text-[#19202d]" accent="#19202d">
      <motion.div className="absolute -left-[12vmin] -top-[8vmin] h-[54vmin] w-[54vmin] rounded-full border-[.35vmin] border-[#19202d]/16" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute -bottom-[18vmin] -right-[13vmin] h-[55vmin] w-[55vmin] rounded-full border-[.25vmin] border-[#19202d]/18" animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute left-[9vmin] top-[9vmin]"><LogoLockup /></div>
      <div className="absolute left-[9vmin] top-[31vmin]"><MicroLabel>THE FRONT DESK, FINALLY CLEAR</MicroLabel><motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .7 }} className="mt-[1.5vmin] max-w-[72vmin] text-[9.5vmin] font-extrabold leading-[.86] tracking-[-.1em]">More gym.<br /><span className="text-[#f8f3e8]">Less admin.</span></motion.h2><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }} className="mt-[3.2vmin] text-[2vmin] font-semibold text-[#19202d]/62">Iron Roy Gym Management Platform</motion.p></div>
      <motion.div className="absolute bottom-[9vmin] right-[9vmin] flex items-center gap-[1vmin] font-mono text-[1.3vmin] tracking-[.12em]" animate={{ opacity: [0.5, 1, .5] }} transition={{ duration: 2.5, repeat: Infinity }}><span className="h-[1vmin] w-[1vmin] rounded-full bg-[#19202d]" /> BUILT FOR THE PEOPLE BEHIND THE FLOOR</motion.div>
    </SceneFrame>
  );
}