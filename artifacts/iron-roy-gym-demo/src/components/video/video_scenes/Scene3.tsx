import { motion } from 'framer-motion';
import { SceneFrame, SidebarRail, TopBar, Avatar, MicroLabel } from './shared';

const members = [
  ['Maya Chen', 'IR-1048', 'Open Gym', 'Active', 'Oct 14, 2025', '#c8e83e'],
  ['Owen Carter', 'IR-1032', 'Performance', 'Expiring', 'Oct 19, 2025', '#8bd9d2'],
  ['Priya Shah', 'IR-0987', 'Unlimited', 'Active', 'Nov 03, 2025', '#e88b42'],
  ['Noah Williams', 'IR-0971', 'Open Gym', 'Active', 'Nov 16, 2025', '#b7a7e8'],
];

export function Scene3() {
  return (
    <SceneFrame className="bg-[#f8f3e8]" accent="#8bd9d2">
      <div className="absolute inset-[5vmin] flex overflow-hidden rounded-[2vmin] border border-[#19202d]/10 bg-[#f8f3e8] shadow-[0_2vmin_6vmin_rgba(25,32,45,.12)]">
        <SidebarRail active="Members" />
        <div className="min-w-0 flex-1"><TopBar title="Members" />
          <div className="px-[3.5vmin] py-[3.5vmin]">
            <div className="flex items-end justify-between"><div><MicroLabel>PEOPLE</MicroLabel><h2 className="mt-[.8vmin] text-[4.8vmin] font-extrabold tracking-[-.08em]">Members.</h2><p className="mt-[.8vmin] text-[1.65vmin] text-[#19202d]/50">Every relationship, renewal, and visit in one clear place.</p></div><div className="rounded-[.9vmin] bg-[#c8e83e] px-[2vmin] py-[1.2vmin] text-[1.55vmin] font-extrabold">+ Add member</div></div>
            <motion.div initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .35, duration: .65 }} className="mt-[3.5vmin] overflow-hidden rounded-[1.3vmin] border border-[#19202d]/10 bg-[#fdfbf5]">
              <div className="flex items-center gap-[1.5vmin] border-b border-[#19202d]/10 p-[1.5vmin]"><div className="flex-1 rounded-[.8vmin] border border-[#19202d]/12 px-[1.3vmin] py-[1vmin] text-[1.35vmin] text-[#19202d]/38">⌕ Search by name, email or member ID</div><div className="rounded-[.8vmin] border border-[#19202d]/12 px-[1.3vmin] py-[1vmin] font-mono text-[1.2vmin]">ALL MEMBERS⌄</div></div>
              <div className="grid grid-cols-[1.55fr_1fr_.8fr_1fr_1fr] border-b border-[#19202d]/10 px-[2vmin] py-[1.3vmin] font-mono text-[1.1vmin] uppercase tracking-[.12em] text-[#19202d]/42"><span>Member</span><span>Plan</span><span>Status</span><span>Expires</span><span>Trainer</span></div>
              {members.map(([name, id, plan, status, expires, color], i) => <motion.div key={id} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .48 + i * .1, duration: .45 }} className="grid grid-cols-[1.55fr_1fr_.8fr_1fr_1fr] items-center border-b border-[#19202d]/8 px-[2vmin] py-[1.65vmin] last:border-0"><div className="flex items-center gap-[1.2vmin]"><Avatar initials={name.split(' ').map(n => n[0]).join('')} color={color} /><div><div className="text-[1.45vmin] font-extrabold">{name}</div><div className="font-mono text-[1.05vmin] text-[#19202d]/42">{id}</div></div></div><span className="text-[1.35vmin] font-semibold">{plan}</span><span className={`w-fit rounded-full px-[1vmin] py-[.55vmin] text-[1.05vmin] font-extrabold ${status === 'Expiring' ? 'bg-[#f5dfbb] text-[#9a5f23]' : 'bg-[#c8e83e]/50 text-[#355007]'}`}>{status}</span><span className="font-mono text-[1.15vmin] text-[#19202d]/52">{expires}</span><span className="text-[1.3vmin] text-[#19202d]/52">{i === 1 ? 'M. Okafor' : i === 2 ? 'J. Reyes' : 'Unassigned'}</span></motion.div>)}
            </motion.div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}