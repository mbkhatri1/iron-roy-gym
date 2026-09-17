import { motion } from 'framer-motion';
import { SceneFrame, SidebarRail, TopBar, MiniAreaChart, MicroLabel } from './shared';

export function Scene4() {
  return (
    <SceneFrame className="bg-[#f8f3e8]" accent="#c8e83e">
      <div className="absolute inset-[5vmin] flex overflow-hidden rounded-[2vmin] border border-[#19202d]/10 bg-[#f8f3e8] shadow-[0_2vmin_6vmin_rgba(25,32,45,.12)]">
        <SidebarRail active="Attendance" />
        <div className="min-w-0 flex-1"><TopBar title="Attendance" />
          <div className="px-[3.5vmin] py-[3.5vmin]">
            <div className="flex items-end justify-between"><div><MicroLabel>FLOOR TRAFFIC</MicroLabel><h2 className="mt-[.8vmin] text-[4.8vmin] font-extrabold tracking-[-.08em]">Attendance.</h2><p className="mt-[.8vmin] text-[1.65vmin] text-[#19202d]/50">See who’s in, who’s training, and when your floor moves.</p></div><div className="rounded-[.9vmin] border border-[#19202d]/12 bg-[#fdfbf5] px-[1.7vmin] py-[1.1vmin] font-mono text-[1.15vmin]">OCT 14, 2025⌄</div></div>
            <div className="mt-[3vmin] grid grid-cols-3 gap-[1.2vmin]"><div className="rounded-[1.2vmin] bg-[#19202d] p-[2vmin] text-[#f8f3e8]"><span className="font-mono text-[1.2vmin] uppercase tracking-[.12em] text-[#f8f3e8]/45">Checked in</span><div className="mt-[1.3vmin] text-[4.7vmin] font-extrabold tracking-[-.08em]">176</div><span className="text-[1.25vmin] text-[#c8e83e]">+14% vs last Tuesday</span></div><div className="rounded-[1.2vmin] border border-[#19202d]/10 bg-[#fdfbf5] p-[2vmin]"><span className="font-mono text-[1.2vmin] uppercase tracking-[.12em] text-[#19202d]/45">Peak hour</span><div className="mt-[1.3vmin] text-[4.7vmin] font-extrabold tracking-[-.08em]">6–7<span className="text-[2vmin]">PM</span></div><span className="text-[1.25vmin] text-[#19202d]/50">42 people on floor</span></div><div className="rounded-[1.2vmin] border border-[#19202d]/10 bg-[#fdfbf5] p-[2vmin]"><span className="font-mono text-[1.2vmin] uppercase tracking-[.12em] text-[#19202d]/45">Avg. visit</span><div className="mt-[1.3vmin] text-[4.7vmin] font-extrabold tracking-[-.08em]">58<span className="text-[2vmin]">m</span></div><span className="text-[1.25vmin] text-[#28967e]">↗ 6 min this month</span></div></div>
            <motion.div initial={{ scaleY: .8, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: .35, duration: .7 }} className="mt-[1.2vmin] h-[27vmin] rounded-[1.2vmin] border border-[#19202d]/10 bg-[#fdfbf5] p-[2.2vmin]"><div className="flex items-start justify-between"><div><h3 className="text-[1.85vmin] font-extrabold">Floor traffic</h3><p className="mt-[.5vmin] text-[1.3vmin] text-[#19202d]/45">Check-ins by day · this week</p></div><div className="flex items-center gap-[1.5vmin] font-mono text-[1.1vmin] text-[#19202d]/48"><span className="flex items-center gap-[.6vmin]"><i className="h-[.8vmin] w-[.8vmin] rounded-full bg-[#c8e83e]" /> CHECK-INS</span><span className="flex items-center gap-[.6vmin]"><i className="h-[.8vmin] w-[.8vmin] rounded-full bg-[#8bd9d2]" /> CAPACITY</span></div></div><div className="mt-[2vmin] h-[15vmin]"><MiniAreaChart color="#8bd9d2" points="0,68 12,58 25,64 38,32 51,48 64,22 77,39 90,15 100,27" /></div></motion.div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}