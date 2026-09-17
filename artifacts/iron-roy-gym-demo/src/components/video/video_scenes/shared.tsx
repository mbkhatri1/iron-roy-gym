import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const baseUrl = import.meta.env.BASE_URL;
export const logoSrc = `${baseUrl}logo.svg`;

export function LogoLockup({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <div className="flex items-center gap-[1.2vmin]">
      <img src={logoSrc} alt="Iron Roy Gym" className={compact ? 'h-[5vmin] w-auto' : 'h-[6.2vmin] w-auto'} />
      {compact && <span className={`font-display text-[2.6vmin] font-extrabold tracking-[-.06em] ${dark ? 'text-[#f8f3e8]' : 'text-[#19202d]'}`}>Iron Roy Gym<span className="text-[#c8e83e]">.</span></span>}
    </div>
  );
}

export function SceneFrame({ children, dark = false, accent = '#c8e83e', className = '' }: { children: ReactNode; dark?: boolean; accent?: string; className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: dark ? '#19202d' : 'transparent' }}
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: .72, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute left-0 top-0 h-[.45vmin] w-[26vmin]" style={{ background: accent }} />
      {children}
    </motion.div>
  );
}

export function MicroLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`font-mono text-[1.45vmin] uppercase tracking-[.18em] ${light ? 'text-[#f8f3e8]/55' : 'text-[#19202d]/55'}`}>{children}</span>;
}

export function SidebarRail({ active = 'Overview' }: { active?: string }) {
  const items = ['Overview', 'Members', 'Attendance', 'Payments', 'Trainers', 'Expenses', 'Reports'];
  return (
    <div className="flex h-full w-[21%] shrink-0 flex-col bg-[#19202d] px-[2.4vmin] py-[2.8vmin] text-[#f8f3e8]">
      <LogoLockup dark />
      <div className="mt-[7vmin] space-y-[1.5vmin]">
        <MicroLabel light>Workspace</MicroLabel>
        <div className="mt-[2vmin] space-y-[.75vmin]">
          {items.map((item, index) => (
            <div key={item} className={`flex items-center gap-[1.2vmin] rounded-[1vmin] px-[1.35vmin] py-[1.2vmin] ${item === active ? 'bg-[#c8e83e] text-[#19202d]' : 'text-[#f8f3e8]/58'}`}>
              <span className={`h-[1.15vmin] w-[1.15vmin] rounded-[.25vmin] ${item === active ? 'bg-[#19202d]' : 'border border-[#f8f3e8]/32'}`} />
              <span className="text-[1.55vmin] font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto rounded-[1.2vmin] border border-[#f8f3e8]/12 bg-[#313a47]/45 p-[1.6vmin]">
        <div className="flex items-center gap-[.8vmin] text-[#c8e83e]"><span className="h-[1vmin] w-[1vmin] rounded-full bg-[#c8e83e]" /><span className="font-mono text-[1.2vmin] uppercase tracking-[.12em]">Live workspace</span></div>
        <p className="mt-[1vmin] text-[1.4vmin] leading-[1.45] text-[#f8f3e8]/52">One clear view for the front desk.</p>
      </div>
    </div>
  );
}

export function TopBar({ title, crumb = 'Iron Roy Gym' }: { title: string; crumb?: string }) {
  return (
    <div className="flex h-[12%] items-center justify-between border-b border-[#19202d]/10 px-[3.5vmin]">
      <div><MicroLabel>{crumb}</MicroLabel><h3 className="mt-[.45vmin] text-[2.6vmin] font-extrabold tracking-[-.06em]">{title}</h3></div>
      <div className="flex items-center gap-[1.7vmin]">
        <div className="h-[3.8vmin] w-[3.8vmin] rounded-full border border-[#19202d]/10 bg-[#eee7d8]" />
        <div className="hidden text-right sm:block"><div className="text-[1.45vmin] font-extrabold">Jordan Reyes</div><div className="font-mono text-[1.1vmin] text-[#19202d]/45">Owner · Iron Roy</div></div>
      </div>
    </div>
  );
}

export function MetricCard({ label, value, detail, accent = '#c8e83e', delay = 0 }: { label: string; value: string; detail: string; accent?: string; delay?: number }) {
  return (
    <motion.div className="rounded-[1.2vmin] border border-[#19202d]/10 bg-[#fdfbf5] p-[2vmin]" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay, duration: .55, ease: [0.16, 1, 0.3, 1] }}>
      <div className="flex items-start justify-between"><span className="text-[1.5vmin] font-bold text-[#19202d]/58">{label}</span><span className="h-[3vmin] w-[3vmin] rounded-[.8vmin]" style={{ background: `${accent}66` }} /></div>
      <div className="mt-[1.4vmin] text-[3.55vmin] font-extrabold tracking-[-.08em]">{value}</div>
      <div className="mt-[1.1vmin] flex items-center gap-[.8vmin] font-mono text-[1.15vmin] text-[#19202d]/45"><span className="text-[#28967e]">↗ 8.4%</span>{detail}</div>
    </motion.div>
  );
}

export function MiniAreaChart({ color = '#c8e83e', points = '0,76 12,62 25,68 38,44 51,53 64,28 77,36 90,16 100,22' }: { color?: string; points?: string }) {
  return (
    <div className="relative h-full min-h-[14vmin]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs><linearGradient id={`g-${color.replace('#', '')}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".35" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
        <polygon points={`0,100 ${points} 100,100`} fill={`url(#g-${color.replace('#', '')})`} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="2.2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="absolute inset-x-0 bottom-[-1vmin] flex justify-between font-mono text-[1.1vmin] text-[#19202d]/42"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span></div>
    </div>
  );
}

export function Avatar({ initials, color = '#c8e83e' }: { initials: string; color?: string }) {
  return <span className="grid h-[4.2vmin] w-[4.2vmin] shrink-0 place-items-center rounded-full text-[1.35vmin] font-extrabold text-[#19202d]" style={{ background: color }}>{initials}</span>;
}