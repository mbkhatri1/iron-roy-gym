import { motion } from 'framer-motion';
import { SceneFrame, SidebarRail, TopBar, MicroLabel } from './shared';

const payments = [
  ['Maya Chen', 'Open Gym · Monthly', '$89', 'Paid', '#c8e83e'],
  ['Owen Carter', 'Performance · Quarterly', '$260', 'Pending', '#f5dfbb'],
  ['Priya Shah', 'Unlimited · Monthly', '$129', 'Paid', '#8bd9d2'],
  ['Noah Williams', 'Open Gym · Monthly', '$89', 'Paid', '#b7a7e8'],
];

export function Scene5() {
  return (
    <SceneFrame className="bg-[#19202d] text-[#f8f3e8]" dark accent="#e88b42">
      <div className="absolute left-[7vmin] top-[7vmin]"><MicroLabel light>THE MONEY LAYER</MicroLabel><h2 className="mt-[1.2vmin] max-w-[52vmin] text-[7.3vmin] font-extrabold leading-[.92] tracking-[-.09em]">Payments that<br /><span className="text-[#c8e83e]">keep moving.</span></h2><p className="mt-[2.6vmin] max-w-[42vmin] text-[1.8vmin] leading-[1.4] text-[#f8f3e8]/58">Know what’s collected, what’s pending, and what needs your attention.</p></div>
      <motion.div className="absolute right-[7vmin] top-[10vmin] w-[47vmin] rounded-[1.5vmin] border border-[#f8f3e8]/14 bg-[#313a47]/78 p-[2vmin] shadow-[0_2vmin_7vmin_rgba(0,0,0,.18)]" initial={{ x: 40, rotate: 3, opacity: 0 }} animate={{ x: 0, rotate: 0, opacity: 1 }} transition={{ delay: .35, duration: .8, ease: [0.16, 1, 0.3, 1] }}>
        <div className="flex items-start justify-between"><div><MicroLabel light>OCTOBER 2025</MicroLabel><p className="mt-[1.2vmin] text-[5.5vmin] font-extrabold tracking-[-.09em]">$42.8k</p><span className="font-mono text-[1.15vmin] text-[#c8e83e]">COLLECTED THIS MONTH ↗</span></div><div className="grid h-[5.8vmin] w-[5.8vmin] place-items-center rounded-[1vmin] bg-[#e88b42] text-[#19202d]"><span className="text-[2.8vmin] font-extrabold">$</span></div></div>
        <div className="my-[2vmin] h-px bg-[#f8f3e8]/10" />
        <div className="space-y-[.7vmin]">{payments.map(([name, plan, amount, status, color], i) => <motion.div key={name} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .65 + i * .1 }} className="flex items-center gap-[1.2vmin] rounded-[.9vmin] bg-[#19202d]/35 px-[1.1vmin] py-[1.1vmin]"><span className="grid h-[3.4vmin] w-[3.4vmin] place-items-center rounded-full text-[1.15vmin] font-extrabold text-[#19202d]" style={{ background: color }}>{name.split(' ').map(n => n[0]).join('')}</span><div className="min-w-0 flex-1"><p className="truncate text-[1.3vmin] font-extrabold">{name}</p><p className="truncate text-[1.05vmin] text-[#f8f3e8]/45">{plan}</p></div><span className="text-[1.5vmin] font-extrabold">{amount}</span><span className={`rounded-full px-[.8vmin] py-[.45vmin] font-mono text-[.95vmin] ${status === 'Paid' ? 'bg-[#c8e83e]/18 text-[#c8e83e]' : 'bg-[#e88b42]/20 text-[#e88b42]'}`}>{status}</span></motion.div>)}</div>
      </motion.div>
      <motion.div className="absolute bottom-[8vmin] left-[7vmin] flex items-center gap-[1.2vmin] font-mono text-[1.3vmin] text-[#f8f3e8]/38" animate={{ x: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }}><span className="h-[.8vmin] w-[.8vmin] rounded-full bg-[#e88b42]" /> AUTO-MATCHED TO YOUR MEMBERS</motion.div>
    </SceneFrame>
  );
}