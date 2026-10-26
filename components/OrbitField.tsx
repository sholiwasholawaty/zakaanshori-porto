"use client";

import { useEffect, useRef } from "react";

// Ukuran orbit relatif terhadap radius kanvas (R). rot dalam radian.
const ORBITS = [
  { a: 0.98, b: 0.58, rot: -0.35 },
  { a: 0.84, b: 0.72, rot: 0.9 },
  { a: 1.0, b: 0.42, rot: 0.3 },
  { a: 0.66, b: 0.52, rot: -1.1 },
  { a: 0.5, b: 0.36, rot: 0.6 },
];

const NODES = [
  { label: ["Build", "Products"], orbit: 2, angle: 4.5, speed: 0.045, r: 7 },
  { label: ["AI", "Systems"], orbit: 0, angle: 0.15, speed: -0.035, r: 11 },
  { label: ["Real", "Impact"], orbit: 1, angle: 1.0, speed: 0.03, r: 12 },
  { label: ["Better", "Together"], orbit: 3, angle: 3.7, speed: -0.04, r: 14 },
  { label: ["Explore", "Ideas"], orbit: 1, angle: 4.2, speed: 0.03, r: 11 },
];

// Pseudo-random deterministik supaya tampilan konsisten tiap load.
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function OrbitField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rand = rng(7);
    const nodes = NODES.map((n) => ({ ...n }));
    const particles = Array.from({ length: 70 }, () => ({
      orbit: Math.floor(rand() * ORBITS.length),
      angle: rand() * Math.PI * 2,
      speed: (rand() - 0.5) * 0.12,
      size: 0.6 + rand() * 1.4,
      alpha: 0.25 + rand() * 0.6,
    }));

    let w = 0, h = 0, raf = 0, last = performance.now();
    let visible = true;
    let fg = "245 245 245";
    let bg = "5 5 5";
    const tilt = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const col = (rgb: string, a: number) => `rgb(${rgb} / ${a})`;
    const readTheme = () => {
      const s = getComputedStyle(document.documentElement);
      fg = s.getPropertyValue("--fg").trim() || fg;
      bg = s.getPropertyValue("--bg").trim() || bg;
    };

    const pointOn = (o: (typeof ORBITS)[number], ang: number, R: number) => {
      const x = Math.cos(ang) * o.a * R;
      const y = Math.sin(ang) * o.b * R;
      const c = Math.cos(o.rot), s = Math.sin(o.rot);
      return [x * c - y * s, x * s + y * c] as const;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = (Math.min(w, h) / 2) * 0.8;
      const cx = w / 2, cy = h / 2;

      // orbit
      ORBITS.forEach((o, i) => {
        const ox = tilt.x * R * 0.02 * (i + 1);
        const oy = tilt.y * R * 0.02 * (i + 1);
        ctx.beginPath();
        ctx.ellipse(cx + ox, cy + oy, o.a * R, o.b * R, o.rot, 0, Math.PI * 2);
        ctx.strokeStyle = col(fg, 0.13);
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // partikel
      particles.forEach((p) => {
        const [x, y] = pointOn(ORBITS[p.orbit], p.angle, R);
        ctx.beginPath();
        ctx.arc(cx + x + tilt.x * R * 0.03, cy + y + tilt.y * R * 0.03, p.size, 0, Math.PI * 2);
        ctx.fillStyle = col(fg, p.alpha);
        ctx.fill();
      });

      // garis dari pusat ke node
      const pts = nodes.map((n) => {
        const [x, y] = pointOn(ORBITS[n.orbit], n.angle, R);
        return { n, x: cx + x + tilt.x * R * 0.05, y: cy + y + tilt.y * R * 0.05 };
      });
      pts.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = col(fg, 0.1);
        ctx.stroke();
      });

      // inti
      const cr = R * 0.2;
      const glow = ctx.createRadialGradient(cx, cy, cr * 0.5, cx, cy, cr * 2.6);
      glow.addColorStop(0, col(fg, 0.2));
      glow.addColorStop(1, col(fg, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, cr * 2.6, 0, Math.PI * 2);
      ctx.fill();

      const core = ctx.createRadialGradient(cx - cr * 0.35, cy - cr * 0.5, cr * 0.05, cx, cy, cr);
      core.addColorStop(0, col(fg, 0.38));
      core.addColorStop(0.55, col(bg, 0.95));
      core.addColorStop(1, col(bg, 1));
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();
      ctx.strokeStyle = col(fg, 0.45);
      ctx.stroke();

      // node berlabel
      ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textBaseline = "middle";
      pts.forEach(({ n, x, y }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, n.r);
        g.addColorStop(0, col(fg, 0.95));
        g.addColorStop(0.35, col(fg, 0.55));
        g.addColorStop(1, col(fg, 0.12));
        ctx.beginPath();
        ctx.arc(x, y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        if (n.r > 9) {
          ctx.beginPath();
          ctx.arc(x, y, n.r * 1.9, 0, Math.PI * 2);
          ctx.strokeStyle = col(fg, 0.2);
          ctx.stroke();
        }

        const textW = Math.max(...n.label.map((l) => ctx.measureText(l).width));
        const gap = n.r * (n.r > 9 ? 1.9 : 1) + 10;
        let right = x >= cx;
        if (right && x + gap + textW > w - 2) right = false;
        if (!right && x - gap - textW < 2) right = true;
        ctx.textAlign = right ? "left" : "right";
        ctx.fillStyle = col(fg, 0.7);
        n.label.forEach((line, i) => {
          ctx.fillText(line, x + (right ? gap : -gap), y + (i - (n.label.length - 1) / 2) * 14);
        });
      });
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible && !document.hidden) {
        nodes.forEach((n) => (n.angle += n.speed * dt));
        particles.forEach((p) => (p.angle += p.speed * dt));
        const k = Math.min(1, dt * 3);
        tilt.x += (target.x - tilt.x) * k;
        tilt.y += (target.y - tilt.y) * k;
        draw();
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    readTheme();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const themeObserver = new MutationObserver(() => {
      readTheme();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);

    if (!reduce) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0"
      role="img"
      aria-label="Orbit diagram around the ZA mark: Build Products, AI Systems, Real Impact, Better Together, Explore Ideas"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <span className="text-2xl font-semibold tracking-tighter sm:text-3xl">ZA</span>
      </div>
    </div>
  );
}
