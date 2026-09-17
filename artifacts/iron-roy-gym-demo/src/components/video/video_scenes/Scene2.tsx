import { motion } from 'framer-motion';
import { SceneFrame, SidebarRail, TopBar, MetricCard, MiniAreaChart, MicroLabel } from './shared';

export function Scene2() {
  return (
    <SceneFrame className="bg-[#f8f3e8]" accent="#c8e83e">
      <div className="absolute inset-[5vmin] flex overflow-hidden rounded-[2vmin] border border-[#19202d]/10 bg-[#f8f3e8] shadow-[0_2vmin_6vmin_rgba(25,32,45,.12)]">
        <SidebarRail active="Overview" />
        <div className="min-w-0 flex-1">
          <TopBar title="Overview" />
          <div className="px-[3.5vmin] py-[3.5vmin]">
            <motion.div initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .35, duration: .6 }}>
              <MicroLabel>MONDAY, OCTOBER 14</MicroLabel><h2 className="mt-[.8vmin] text-[4.8vmin] font-extrabold tracking-[-.08em]">Good morning, Jordan.</h2><p className="mt-[.8vmin] text-[1.65vmin] text-[#19202d]/50">Here’s the pulse at 10:42 AM.</p>
            </motion.div>
            <div className="mt-[3vmin] grid grid-cols-4 gap-[1.2vmin]">
              <MetricCard label="Active members" value="1,284" detail="1,410 total" delay={.45} />
              <MetricCard label="Today’s attendance" value="176" detail="checked in" accent="#8bd9d2" delay={.52} />
              <MetricCard label="Monthly revenue" value="$42.8k" detail="$3,240 pending" accent="#e88b42" delay={.59} />
              <MetricCard label="Net income" value="$31.6k" detail="$11,240 expenses" accent="#19202d" delay={.66} />
            </div>
            <div className="mt-[2vmin] grid grid-cols-[1.35fr_.85fr] gap-[1.2vmin]">
              <div className="h-[27vmin] rounded-[1.2vmin] border border-[#19202d]/10 bg-[#fdfbf5] p-[2.2vmin]">
                <div className="flex items-start justify-between"><div><h3 className="text-[1.85vmin] font-extrabold">Revenue pulse</h3><p className="mt-[.5vmin] text-[1.3vmin] text-[#19202d]/45">Collected revenue · last 6 months</p></div><span className="rounded-[.7vmin] border border-[#19202d]/12 px-[1vmin] py-[.7vmin] font-mono text-[1.1vmin]">THIS YEAR⌄</span></div>
                <div className="mt-[2.8vmin] h-[14.5vmin]"><MiniAreaChart /></div>
              </div>
              <div className="relative h-[27vmin] overflow-hidden rounded-[1.2vmin] bg-[#19202d] p-[2.2vmin] text-[#f8f3e8]"><div className="absolute -right-[5vmin] top-[2vmin] h-[19vmin] w-[19vmin] rounded-full border-[.25vmin] border-[#8bd9d2]/35" /><h3 className="relative text-[1.85vmin] font-extrabold">Today at a glance</h3><p className="relative mt-[.7vmin] text-[1.3vmin] text-[#f8f3e8]/52">Front desk focus</p><div className="relative mt-[3vmin] space-y-[1.2vmin]"><div className="border-l-[.45vmin] border-[#c8e83e] pl-[1.2vmin]"><p className="text-[2.7vmin] font-extrabold">24</p><p className="font-mono text-[1.1vmin] uppercase text-[#f8f3e8]/50">renewals due</p></div><div className="border-l-[.45vmin] border-[#8bd9d2] pl-[1.2vmin]"><p className="text-[2.7vmin] font-extrabold">08</p><p className="font-mono text-[1.1vmin] uppercase text-[#f8f3e8]/50">new enquiries</p></div></div></div>
            </div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}