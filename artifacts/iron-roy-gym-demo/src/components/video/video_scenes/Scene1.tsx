import { motion } from 'framer-motion';
import { SceneFrame, LogoLockup, MicroLabel } from './shared';

export function Scene1() {
  return (
    <SceneFrame className="bg-[#19202d] text-[#f8f3e8]" dark accent="#c8e83e">
      <motion.div className="absolute -right-[16vmin] -top-[10vmin] h-[55vmin] w-[55vmin] rounded-full border-[.35vmin] border-[#8bd9d2]/30" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute -right-[8vmin] top-[3vmin] h-[38vmin] w-[38vmin] rounded-full border-[.2vmin] border-[#c8e83e]/45" animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute left-[9vmin] top-[9vmin]"><LogoLockup dark /></div>
      <div className="absolute bottom-[12vmin] left-[9vmin] max-w-[76vmin]">
        <motion.div initial={{ width: 0 }} animate={{ width: '13vmin' }} transition={{ delay: .3, duration: .45 }} className="mb-[2.5vmin] h-[.55vmin] bg-[#c8e83e]" />
        <motion.h1 initial={{ opacity: 0, y: 26, skewY: 3 }} animate={{ opacity: 1, y: 0, skewY: 0 }} transition={{ delay: .4, duration: .85, ease: [0.16, 1, 0.3, 1] }} className="font-display text-[10.5vmin] font-extrabold leading-[.87] tracking-[-.09em]">Run the<br /><span className="text-[#c8e83e]">whole gym.</span></motion.h1>
        <motion.p initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.05, duration: .6 }} className="mt-[3.2vmin] max-w-[54vmin] text-[2.15vmin] leading-[1.35] text-[#f8f3e8]/68">The operator’s view for memberships, money, and momentum.</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.55 }} className="mt-[6vmin] flex items-center gap-[1.4vmin]"><MicroLabel light>IRON ROY / GYM MANAGEMENT PLATFORM</MicroLabel><span className="h-[.7vmin] w-[.7vmin] rounded-full bg-[#c8e83e]" /></motion.div>
      </div>
      <motion.div className="absolute bottom-[9vmin] right-[9vmin] font-mono text-[1.3vmin] text-[#f8f3e8]/35" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>01 / 07</motion.div>
    </SceneFrame>
  );
}