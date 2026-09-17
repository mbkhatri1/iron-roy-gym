import { motion } from 'framer-motion';
import { SceneFrame, SidebarRail, TopBar, MiniAreaChart, MicroLabel } from './shared';

export function Scene6() {
  return (
    <SceneFrame className="bg-[#f8f3e8]" accent="#b7a7e8">
      <div className="absolute inset-[5vmin] flex overflow-hidden rounded-[2vmin] border border-[#19202d]/10 bg-[#f8f3e8] shadow-[0_2vmin_6vmin_rgba(25,32,45,.12)]">
        <SidebarRail active="Reports" />
        <div className="min-w-0 flex-1"><TopBar title="Reports" />
          <div className="px-[3.5vmin] py-[3.5vmin]">
            <div className="flex items-end justify-between"><div><MicroLabel>MAKE THE NEXT CALL</MicroLabel><h2 className="mt-[.8vmin] text-[4.8vmin] font-extrabold tracking-[-.08em]">Reports.</h2><p className="mt-[.8vmin] text-[1.65vmin] text-[#19202d]/50">Turn the month into a sharper next move.</p></div><div className="rounded-[.9vmin] bg-[#b7a7e8] px-[1.8vmin] py-[1.1vmin] text-[1.25vmin] font-extrabold">EXPORT PDF ↗</div></div>
            <div className="mt-[3vmin] grid grid-cols-[1.35fr_.85fr] gap-[1.2vmin]">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .65 }} className="h-[28vmin] rounded-[1.2vmin] border border-[#19202d]/10 bg-[#fdfbf5] p-[2.2vmin]"><div className="flex items-start justify-between"><div><h3 className="text-[1.85vmin] font-extrabold">Revenue pulse</h3><p className="mt-[.5vmin] text-[1.3vmin] text-[#19202d]/45">Collected revenue · last 6 months</p></div><span className="font-mono text-[1.1vmin] text-[#28967e]">+8.4% GROWTH</span></div><div className="mt-[4vmin] h-[16vmin]"><MiniAreaChart color="#b7a7e8" points="0,76 12,72 25,58 38,62 51,44 64,36 77,42 90,15 100,21" /></div></motion.div>
              <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .55, duration: .75 }} className="relative h-[28vmin] overflow-hidden rounded-[1.2vmin] bg-[#c8e83e] p-[2.2vmin]"><div className="absolute -bottom-[6vmin] -right-[2vmin] h-[22vmin] w-[22vmin] rounded-full border-[.35vmin] border-[#19202d]/18" /><h3 className="relative text-[1.85vmin] font-extrabold">Member mix</h3><p className="relative mt-[.5vmin] text-[1.3vmin] text-[#19202d]/58">Current plans by member count</p><div className="relative mt-[3vmin] flex items-center gap-[2.5vmin]"><div className="relative grid h-[14vmin] w-[14vmin] place-items-center rounded-full" style={{ background: 'conic-gradient(#19202d 0 52%, #8bd9d2 52% 78%, #e88b42 78% 91%, #f8f3e8 91% 100%)' }}><div className="grid h-[9.4vmin] w-[9.4vmin] place-items-center rounded-full bg-[#c8e83e]"><span className="text-[3.1vmin] font-extrabold">1.2k</span></div></div><div className="space-y-[1vmin] font-mono text-[1.1vmin]"><div><i className="mr-[.7vmin] inline-block h-[.8vmin] w-[.8vmin] rounded-full bg-[#19202d]" />OPEN GYM <strong>52%</strong></div><div><i className="mr-[.7vmin] inline-block h-[.8vmin] w-[.8vmin] rounded-full bg-[#8bd9d2]" />PERFORMANCE <strong>26%</strong></div><div><i className="mr-[.7vmin] inline-block h-[.8vmin] w-[.8vmin] rounded-full bg-[#e88b42]" />UNLIMITED <strong>13%</strong></div></div></div></motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .75, duration: .6 }} className="mt-[1.2vmin] flex items-center justify-between rounded-[1.2vmin] border border-[#19202d]/10 bg-[#19202d] px-[2.2vmin] py-[1.8vmin] text-[#f8f3e8]"><div><p className="text-[1.6vmin] font-extrabold">Your clearest signal this month</p><p className="mt-[.4vmin] text-[1.2vmin] text-[#f8f3e8]/48">Performance plans grew 11% after the new member intro flow.</p></div><span className="font-mono text-[1.2vmin] text-[#c8e83e]">INSIGHT 03 / 03</span></motion.div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}