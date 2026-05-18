"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── 1. Falling Rain / Matrix Rain ───
function drawRain(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  const isThumb = w < 200;
  const fontSize = isThumb ? 12 : 20;
  const cols = Math.floor(w / fontSize);

  if (!state.initialized || state.columns !== cols) {
    const oldDrops = state.drops || [];
    state.columns = cols;
    state.drops = Array.from({ length: cols }, (_, i) => 
      i < oldDrops.length ? oldDrops[i] : Math.random() * -100
    ); 
    state.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン";
    state.frameCount = 0;
    state.initialized = true;
  }

  state.frameCount++;

  // Fade background slightly on every frame to create trails
  ctx.fillStyle = "rgba(15, 23, 42, 0.035)";
  ctx.fillRect(0, 0, w, h);

  // Update position less frequently for the discrete "matrix" feel
  if (state.frameCount % 2 === 0) {
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = "center";
    
    for (let i = 0; i < state.drops.length; i++) {
      const char = state.chars[Math.floor(Math.random() * state.chars.length)];
      
      const x = i * fontSize + fontSize / 2;
      const y = state.drops[i] * fontSize;

      // Draw the character
      if (Math.random() > 0.85) {
        ctx.fillStyle = "#bae6fd"; // Bright cyan for some heads
      } else {
        ctx.fillStyle = "#0284c7"; // Deep blue like the image
      }
      
      ctx.fillText(char, x, y);

      // Reset drop to top randomly when it crosses screen
      if (y > h && Math.random() > 0.975) {
        state.drops[i] = 0;
      } else {
        state.drops[i]++;
      }
    }
  }
}

// ─── 2. Nebula / Galaxy Clouds ───
function drawNebula(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  if (!state.t) state.t = 0;
  state.t += 0.003;
  ctx.fillStyle = "rgba(15, 23, 42, 0.09)";
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 5; i++) {
    const cx = w * 0.5 + Math.sin(state.t + i * 1.3) * w * 0.3;
    const cy = h * 0.5 + Math.cos(state.t * 0.7 + i) * h * 0.25;
    const r = 120 + Math.sin(state.t + i) * 40;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    const hue = (200 + i * 35 + state.t * 10) % 360;
    g.addColorStop(0, `hsla(${hue},80%,50%,0.06)`);
    g.addColorStop(1, `hsla(${hue},80%,50%,0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  
  // Floating classic orbs / network particles
  if (!state.orbs) {
    state.orbs = Array.from({ length: 45 }, () => ({
      x: Math.random() * w, y: Math.random() * h, 
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8,
    }));
  }
  
  // Draw connecting lines
  ctx.lineWidth = 0.6;
  for (let i = 0; i < state.orbs.length; i++) {
    for (let j = i + 1; j < state.orbs.length; j++) {
      const dx = state.orbs[i].x - state.orbs[j].x;
      const dy = state.orbs[i].y - state.orbs[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(state.orbs[i].x, state.orbs[i].y);
        ctx.lineTo(state.orbs[j].x, state.orbs[j].y);
        ctx.strokeStyle = `rgba(180, 220, 255, ${0.25 * (1 - dist / 140)})`;
        ctx.stroke();
      }
    }
  }

  // Draw orbs
  state.orbs.forEach((o: any) => {
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220, 240, 255, 0.7)`;
    ctx.fill();
    
    // Core glow
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r * 3, 0, Math.PI * 2);
    const glow = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 3);
    glow.addColorStop(0, `rgba(180, 220, 255, 0.4)`);
    glow.addColorStop(1, `rgba(180, 220, 255, 0)`);
    ctx.fillStyle = glow;
    ctx.fill();

    o.x += o.vx;
    o.y += o.vy;
    
    if (o.x < 0 || o.x > w) o.vx *= -1;
    if (o.y < 0 || o.y > h) o.vy *= -1;
  });

  // stars
  if (!state.stars) state.stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * w, y: Math.random() * h, s: Math.random() * 1.5, p: Math.random() * Math.PI * 2,
  }));
  state.stars.forEach((s: any) => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.sin(state.t * 2 + s.p) * 0.3})`;
    ctx.fill();
  });
}

// ─── 5. Shooting Stars / Comets ───
function drawComets(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  if (!state.comets) {
    state.comets = Array.from({ length: 6 }, () => newComet(w, h));
    state.stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w, y: Math.random() * h, s: Math.random() * 1.5, p: Math.random() * 6.28,
    }));
    state.t = 0;
  }
  state.t += 0.01;
  ctx.fillStyle = "rgba(15, 23, 42, 0.13)";
  ctx.fillRect(0, 0, w, h);
  state.stars.forEach((s: any) => {
    ctx.beginPath(); ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.sin(state.t * 2 + s.p) * 0.2})`; ctx.fill();
  });
  state.comets.forEach((c: any, i: number) => {
    ctx.beginPath(); ctx.moveTo(c.x, c.y);
    ctx.lineTo(c.x - c.vx * 30, c.y - c.vy * 30);
    const g = ctx.createLinearGradient(c.x, c.y, c.x - c.vx * 30, c.y - c.vy * 30);
    g.addColorStop(0, "rgba(100,220,255,0.8)"); g.addColorStop(1, "rgba(100,220,255,0)");
    ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200,240,255,0.9)"; ctx.fill();
    c.x += c.vx; c.y += c.vy;
    if (c.x > w + 50 || c.y > h + 50 || c.x < -50 || c.y < -50) state.comets[i] = newComet(w, h);
  });
}
function newComet(w: number, h: number) {
  const a = -0.3 - Math.random() * 0.7;
  return { x: Math.random() * w * 0.8, y: -10, vx: Math.cos(a) * (3 + Math.random() * 3), vy: -Math.sin(a) * (3 + Math.random() * 3) };
}

// ─── 6. Digital Grid / Tron ───
function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  if (!state.t) state.t = 0;
  state.t += 0.01;
  ctx.fillStyle = "rgba(15, 23, 42, 0.16)";
  ctx.fillRect(0, 0, w, h);
  const spacing = 50;
  const alpha = 0.08 + Math.sin(state.t) * 0.03;
  ctx.strokeStyle = `rgba(0,200,220,${alpha})`; ctx.lineWidth = 0.5;
  for (let x = 0; x <= w; x += spacing) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y <= h; y += spacing) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  // pulse lines
  for (let i = 0; i < 3; i++) {
    const py = ((state.t * 80 + i * 200) % (h + 100)) - 50;
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py);
    ctx.strokeStyle = `rgba(0,220,255,${0.2})`; ctx.lineWidth = 1; ctx.stroke();
  }
  // glowing nodes
  if (!state.nodes) state.nodes = Array.from({ length: 12 }, () => ({
    x: Math.floor(Math.random() * (w / spacing)) * spacing,
    y: Math.floor(Math.random() * (h / spacing)) * spacing, p: Math.random() * 6.28,
  }));
  state.nodes.forEach((n: any) => {
    const glow = 0.3 + Math.sin(state.t * 3 + n.p) * 0.3;
    ctx.beginPath(); ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,220,255,${glow})`; ctx.fill();
    ctx.beginPath(); ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,220,255,${glow * 0.2})`; ctx.fill();
  });
}

// ─── 7. Floating Bubbles ───
function drawBubbles(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  if (!state.bubbles) {
    state.bubbles = Array.from({ length: 30 }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: 5 + Math.random() * 30,
      vx: (Math.random() - 0.5) * 0.5, vy: -0.3 - Math.random() * 0.7,
      hue: 180 + Math.random() * 60,
    }));
  }
  ctx.fillStyle = "rgba(15, 23, 42, 0.11)";
  ctx.fillRect(0, 0, w, h);
  state.bubbles.forEach((b: any) => {
    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(${b.hue},70%,60%,0.3)`; ctx.lineWidth = 1; ctx.stroke();
    const g = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
    g.addColorStop(0, `hsla(${b.hue},70%,70%,0.1)`);
    g.addColorStop(1, `hsla(${b.hue},70%,40%,0.02)`);
    ctx.fillStyle = g; ctx.fill();
    b.x += b.vx; b.y += b.vy;
    if (b.y < -b.r) { b.y = h + b.r; b.x = Math.random() * w; }
  });
}

// ─── Master list ───
export interface BgAnimationType {
  name: string;
  type: "canvas" | "video";
  draw?: (ctx: CanvasRenderingContext2D, w: number, h: number, state: any) => void;
  videoSrc?: string;
  color: string;
}

export const bgAnimations: BgAnimationType[] = [
  { name: "Yomg'ir", type: "canvas", draw: drawRain, color: "#0af" },
  { name: "Kosmos Oqimi", type: "video", videoSrc: "/bg/133268-756249042.mp4", color: "#ec4899" },
  { name: "Tumanlik", type: "canvas", draw: drawNebula, color: "#6366f1" },
  { name: "Kiber Tarmoq", type: "video", videoSrc: "/bg/202963-919289028.mp4", color: "#3b82f6" },
  { name: "Yulduzlar", type: "canvas", draw: drawComets, color: "#38bdf8" },
  { name: "Abstrakt To'lqin", type: "video", videoSrc: "/bg/202965-919289035.mp4", color: "#10b981" },
  { name: "Grid", type: "canvas", draw: drawGrid, color: "#06b6d4" },
  { name: "Raqamli Oqim", type: "video", videoSrc: "/bg/205172-926480911.mp4", color: "#f59e0b" },
  { name: "Pufaklar", type: "canvas", draw: drawBubbles, color: "#8b5cf6" },
];


// ─── Master Background Component ───
export function AnimatedBg({ index }: { index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<any>({});
  const rafRef = useRef<number>(0);

  const anim = bgAnimations[index] || bgAnimations[0];

  const loop = useCallback(() => {
    if (anim.type !== "canvas" || !anim.draw) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    anim.draw(ctx, canvas.width, canvas.height, stateRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }, [anim]);

  useEffect(() => {
    if (anim.type !== "canvas") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { 
      canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight; 
      stateRef.current = {}; 
    };
    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(loop);
    return () => { 
      cancelAnimationFrame(rafRef.current); 
      window.removeEventListener("resize", resize); 
    };
  }, [loop, anim.type]);

  if (anim.type === "video") {
    const isBrightBg = index === 1 || index === 5 || index === 7;
    return (
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          key={anim.videoSrc}
          src={anim.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isBrightBg ? "opacity-45" : "opacity-55"
          }`}
        />
        {/* Adaptive overlay: higher dimming and blur for bright backgrounds to ensure text readability */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ${
            isBrightBg 
              ? "bg-black/60 backdrop-blur-[1.5px]" 
              : "bg-background/10 backdrop-blur-[0.5px]"
          }`} 
        />
      </div>
    );
  }

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}

// ─── Thumbnail preview (small canvas/video for footer selector) ───
export function AnimatedBgThumb({ index, size = 40 }: { index: number; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<any>({});
  const rafRef = useRef<number>(0);

  const anim = bgAnimations[index] || bgAnimations[0];

  useEffect(() => {
    if (anim.type !== "canvas" || !anim.draw) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size * 2;
    canvas.height = size * 2;
    stateRef.current = {};

    const loop = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      anim.draw!(ctx, canvas.width, canvas.height, stateRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [anim, size]);

  if (anim.type === "video") {
    return (
      <div 
        style={{ width: size, height: size }}
        className="absolute inset-0 rounded-lg overflow-hidden flex items-center justify-center bg-black/50"
      >
        <video
          src={anim.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-125"
        />
        {/* A tiny color mask in the thumbnail representing the theme */}
        <div 
          className="absolute inset-0 opacity-15" 
          style={{ backgroundColor: anim.color }}
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="absolute inset-0 rounded-lg"
    />
  );
}
