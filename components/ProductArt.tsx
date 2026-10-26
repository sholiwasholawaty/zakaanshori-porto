import { Atom, Bot, Brain, Cpu, MessageSquare, Sparkles, Zap } from "lucide-react";

function Chip({ children, x, y }: { children: React.ReactNode; x: string; y: string }) {
  return (
    <span
      className="absolute whitespace-nowrap rounded border border-fg/20 bg-bg/80 px-2 py-0.5 text-[10px] text-fg/80 backdrop-blur-sm"
      style={{ left: x, top: y }}
    >
      {children}
    </span>
  );
}

/* Sales & CRM: lembaran titik bergelombang */
export function WaveArt() {
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  const cols = 44, rows = 9;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = (i / (cols - 1)) * 300;
      const y = 78 + j * 9 + Math.sin(i * 0.26 + j * 0.42) * 15;
      dots.push({
        x: +x.toFixed(1),
        y: +y.toFixed(1),
        r: +(0.6 + (j / rows) * 0.9).toFixed(2),
        o: +(0.2 + (j / rows) * 0.7).toFixed(2),
      });
    }
  }
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 300 190" className="text-fg absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="currentColor" opacity={d.o} />
        ))}
      </svg>
      <Chip x="62%" y="12%">Lead</Chip>
      <Chip x="74%" y="30%">Follow-up</Chip>
      <Chip x="14%" y="38%">CRM</Chip>
      <Chip x="44%" y="48%">CRM</Chip>
      <Chip x="70%" y="64%">Report</Chip>
    </div>
  );
}

/* HRM: bola jaringan + aliran garis */
export function NetworkArt() {
  const N = 48;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pts = Array.from({ length: N }, (_, i) => {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    return { x: Math.cos(th) * rad, y, z: Math.sin(th) * rad };
  });
  const S = 58, cx = 100, cy = 108;
  const proj = pts.map((p) => ({
    x: +(cx + p.x * S).toFixed(1),
    y: +(cy + p.y * S).toFixed(1),
    d: +((p.z + 1) / 2).toFixed(2),
  }));
  const lines: [number, number][] = [];
  for (let a = 0; a < N; a++)
    for (let b = a + 1; b < N; b++) {
      const dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y, dz = pts[a].z - pts[b].z;
      if (dx * dx + dy * dy + dz * dz < 0.32) lines.push([a, b]);
    }
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 300 190" className="text-fg absolute inset-0 h-full w-full" aria-hidden>
        <g className="spin-slow" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          {lines.map(([a, b], i) => (
            <line key={i} x1={proj[a].x} y1={proj[a].y} x2={proj[b].x} y2={proj[b].y} stroke="currentColor" strokeOpacity={0.18} strokeWidth={0.6} />
          ))}
          {proj.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={1 + p.d * 1.3} fill="currentColor" opacity={0.25 + p.d * 0.7} />
          ))}
        </g>
        {[0, 1, 2, 3, 4].map((k) => (
          <path
            key={k}
            d={`M 150 ${112 + k * 2} C 190 ${70 + k * 14}, 230 ${150 - k * 12}, 300 ${100 + k * 5}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.15 + k * 0.04}
            strokeWidth={0.7}
          />
        ))}
      </svg>
      <Chip x="62%" y="12%">Recruitment</Chip>
      <Chip x="68%" y="28%">Attendance</Chip>
      <Chip x="70%" y="46%">Performance</Chip>
      <Chip x="62%" y="68%">Payroll</Chip>
    </div>
  );
}

/* AI Roundtable: percakapan di tengah, model mengorbit */
const tiles = [
  { Icon: Sparkles, x: "36%", y: "8%" },
  { Icon: Bot, x: "74%", y: "14%" },
  { Icon: Brain, x: "10%", y: "30%" },
  { Icon: Cpu, x: "86%", y: "52%" },
  { Icon: Atom, x: "13%", y: "62%" },
  { Icon: Zap, x: "56%", y: "76%" },
];
export function RoundtableArt() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 300 190" className="text-fg absolute inset-0 h-full w-full" aria-hidden>
        <ellipse cx="150" cy="104" rx="132" ry="58" fill="none" stroke="currentColor" strokeOpacity={0.14} />
        <ellipse cx="150" cy="104" rx="96" ry="40" fill="none" stroke="currentColor" strokeOpacity={0.12} />
        <ellipse cx="150" cy="104" rx="58" ry="24" fill="currentColor" fillOpacity={0.04} stroke="currentColor" strokeOpacity={0.3} />
      </svg>
      <div className="absolute left-1/2 top-[54%] grid h-9 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-fg/30 bg-bg/80">
        <MessageSquare size={14} strokeWidth={1.4} />
      </div>
      {tiles.map(({ Icon, x, y }, i) => (
        <span
          key={i}
          className="drift absolute grid h-8 w-8 place-items-center rounded-lg border border-fg/20 bg-fg/[0.06] text-fg/80"
          style={{ left: x, top: y, animationDelay: `${i * 0.7}s` }}
        >
          <Icon size={14} strokeWidth={1.4} />
        </span>
      ))}
    </div>
  );
}
