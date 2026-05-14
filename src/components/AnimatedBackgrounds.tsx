import { useEffect, useRef, useCallback } from "react";

// ─── 1. Falling Rain / Matrix Rain ───
function drawRain(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  if (!state.drops) {
    state.drops = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      speed: 1 + Math.random() * 3, len: 10 + Math.random() * 20,
      alpha: 0.3 + Math.random() * 0.5,
    }));
  }
  ctx.fillStyle = "rgba(10,14,20,0.15)";
  ctx.fillRect(0, 0, w, h);
  state.drops.forEach((d: any) => {
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x, d.y + d.len);
    ctx.strokeStyle = `rgba(56,200,248,${d.alpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    d.y += d.speed;
    if (d.y > h) { d.y = -d.len; d.x = Math.random() * w; }
  });
}

// ─── 2. Nebula / Galaxy Clouds ───
function drawNebula(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  if (!state.t) state.t = 0;
  state.t += 0.003;
  ctx.fillStyle = "rgba(5,5,15,0.08)";
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

// ─── 3. Glowing Sphere / Orb ───
function drawSphere(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  if (!state.t) state.t = 0;
  state.t += 0.008;
  ctx.fillStyle = "rgba(10,8,18,0.12)";
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  const baseR = Math.min(w, h) * 0.18;
  for (let ring = 0; ring < 4; ring++) {
    const r = baseR + ring * 30 + Math.sin(state.t + ring) * 10;
    const g = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
    const hue = 25 + ring * 10 + Math.sin(state.t) * 10;
    g.addColorStop(0, `hsla(${hue},80%,55%,${0.12 - ring * 0.02})`);
    g.addColorStop(1, `hsla(${hue},70%,30%,0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  }
  // orbiting particles
  for (let i = 0; i < 20; i++) {
    const a = state.t * (0.5 + i * 0.1) + i * 0.31;
    const dist = baseR + 20 + i * 5 + Math.sin(state.t + i) * 15;
    const px = cx + Math.cos(a) * dist;
    const py = cy + Math.sin(a) * dist * 0.6;
    ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,180,100,${0.4 + Math.sin(state.t + i) * 0.3})`;
    ctx.fill();
  }
}

// ─── 4. Aurora Borealis ───
function drawAurora(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  if (!state.t) state.t = 0;
  state.t += 0.005;
  ctx.fillStyle = "rgba(5,8,20,0.1)";
  ctx.fillRect(0, 0, w, h);
  for (let band = 0; band < 3; band++) {
    ctx.beginPath();
    const baseY = h * (0.25 + band * 0.15);
    ctx.moveTo(0, baseY);
    for (let x = 0; x <= w; x += 8) {
      const y = baseY + Math.sin(x * 0.005 + state.t * (1 + band * 0.3)) * 40
        + Math.sin(x * 0.01 + state.t * 0.7) * 20;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    const hue = 140 + band * 40 + Math.sin(state.t) * 20;
    const g = ctx.createLinearGradient(0, baseY - 60, 0, baseY + 120);
    g.addColorStop(0, `hsla(${hue},80%,50%,0)`);
    g.addColorStop(0.3, `hsla(${hue},80%,50%,0.08)`);
    g.addColorStop(0.6, `hsla(${hue},80%,40%,0.04)`);
    g.addColorStop(1, `hsla(${hue},80%,40%,0)`);
    ctx.fillStyle = g; ctx.fill();
  }
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
  ctx.fillStyle = "rgba(5,5,18,0.12)";
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
  ctx.fillStyle = "rgba(5,10,15,0.15)";
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
  ctx.fillStyle = "rgba(8,12,22,0.1)";
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

// ─── 8. Waveform / Sound Waves ───
function drawWaves(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  if (!state.t) state.t = 0;
  state.t += 0.015;
  ctx.fillStyle = "rgba(8,10,25,0.12)";
  ctx.fillRect(0, 0, w, h);
  for (let wave = 0; wave < 5; wave++) {
    ctx.beginPath();
    const cy = h / 2;
    for (let x = 0; x <= w; x += 3) {
      const y = cy + Math.sin(x * 0.008 + state.t * (1.5 + wave * 0.2) + wave * 0.8) * (30 + wave * 15)
        + Math.sin(x * 0.015 + state.t) * 10;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    const hue = 180 + wave * 25;
    ctx.strokeStyle = `hsla(${hue},80%,55%,${0.15 - wave * 0.02})`;
    ctx.lineWidth = 2; ctx.stroke();
  }
}

// ─── 9. O'zbek-Islom (Real mandala rotating + 3D lanterns swaying) ───
function drawUzbekIslamic(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  if (!state.t) state.t = 0;
  state.t += 0.007;
  const t = state.t;

  // ── Load images once ──
  if (!state.mandala) {
    const img = new Image();
    img.onload = () => { state.mandala = img; };
    img.src = '/bg/mandala.jpg';
  }
  if (!state.lanternImg) {
    const img = new Image();
    img.onload = () => { state.lanternImg = img; };
    img.src = '/bg/lantern.jpg';
  }

  // ── Dark background (deep warm night) ──
  ctx.fillStyle = 'rgba(4,3,12,0.18)';
  ctx.fillRect(0, 0, w, h);

  // ── Ambient warm sky gradient (bottom only) ──
  const skyGrad = ctx.createLinearGradient(0, h * 0.5, 0, h);
  skyGrad.addColorStop(0, 'rgba(40,15,5,0)');
  skyGrad.addColorStop(1, 'rgba(80,30,10,0.25)');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, h * 0.5, w, h * 0.5);

  // ── Rotating mandala (center, using real image) ──
  const mSize = Math.min(w, h) * 0.88;
  const mx = w / 2, my = h / 2;
  ctx.save();
  ctx.translate(mx, my);
  ctx.rotate(t * 0.08); // slow rotation
  ctx.globalAlpha = 0.55;
  // Blend mode to make it glow on dark bg
  ctx.globalCompositeOperation = 'screen';
  if (state.mandala) {
    ctx.drawImage(state.mandala, -mSize / 2, -mSize / 2, mSize, mSize);
  } else {
    // Fallback: draw placeholder ring while loading
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, mSize / 2, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  ctx.restore();

  // ── Lantern data (3D positions: x, depth 0=far 1=near, phase) ──
  if (!state.ldata) {
    state.ldata = [
      // left side lanterns
      { baseX: w * 0.04, baseY: h * 0.06, depth: 0.55, phase: 0.0,  scaleX: 1 },
      { baseX: w * 0.14, baseY: h * 0.02, depth: 0.75, phase: 1.3,  scaleX: 1 },
      { baseX: w * 0.22, baseY: h * 0.10, depth: 0.45, phase: 2.5,  scaleX: 1 },
      // right side lanterns
      { baseX: w * 0.96, baseY: h * 0.06, depth: 0.55, phase: 0.6,  scaleX: -1 },
      { baseX: w * 0.86, baseY: h * 0.02, depth: 0.75, phase: 1.9,  scaleX: -1 },
      { baseX: w * 0.78, baseY: h * 0.10, depth: 0.45, phase: 3.1,  scaleX: -1 },
    ];
  }

  state.ldata.forEach((ln: any) => {
    const sway = Math.sin(t * 0.65 + ln.phase) * 12 * ln.depth;   // wind sway
    const bob  = Math.sin(t * 0.4  + ln.phase + 1) * 4 * ln.depth; // slight up-down

    const lx = ln.baseX + sway;
    const ly = ln.baseY + bob;

    // 3D scale based on depth
    const sc   = 0.32 + ln.depth * 0.52;         // 0.32 (far) .. 0.84 (near)
    const lh   = (state.lanternImg ? 190 : 95) * sc;

    // perspective skew — deeper = less skew
    const skewAngle = Math.sin(t * 0.65 + ln.phase) * 0.05 * (1 - ln.depth * 0.5);

    // Rope from top anchor to lantern top
    const ropeLen = 60 * sc;
    const ropeX   = lx + sway * 0.3;
    ctx.save();
    ctx.strokeStyle = `rgba(180,130,60,${0.5 * sc})`;
    ctx.lineWidth = 1.5 * sc;
    ctx.beginPath();
    ctx.moveTo(ln.baseX, 0); // anchor at top edge
    // Catenary-like curve
    ctx.quadraticCurveTo(
      ln.baseX + sway * 0.6, ly - ropeLen * 0.4,
      lx, ly
    );
    ctx.stroke();
    ctx.restore();

    // Draw lantern image with 3D transform
    ctx.save();
    ctx.translate(lx, ly);
    ctx.transform(1, skewAngle, 0, 1, 0, 0); // shear for sway tilt
    ctx.scale(sc * ln.scaleX, sc); // mirror for right side
    ctx.globalAlpha = 0.72 + ln.depth * 0.2;

    if (state.lanternImg) {
      // Clip to rounded rect for nice 3D look
      ctx.beginPath();
      const lhalf = 120 / 2;
      const lhHalf = 190 / 2;
      ctx.roundRect(-lhalf, -lhHalf, 120, 190, 12);
      ctx.clip();
      ctx.drawImage(state.lanternImg, -lhalf, -lhHalf, 120, 190);
    }

    ctx.globalAlpha = 1;
    ctx.restore();

    // Glow halo under lantern (warm flicker)
    const flicker = 0.65 + Math.sin(t * 4.2 + ln.phase) * 0.25 + Math.sin(t * 7.8 + ln.phase) * 0.1;
    const glowR = 90 * sc * flicker;
    const gx = lx, gy = ly + lh * 0.25;
    const gGrad = ctx.createRadialGradient(gx, gy, 0, gx, gy, glowR);
    gGrad.addColorStop(0,   `rgba(255,190,60,${0.28 * flicker * sc})`);
    gGrad.addColorStop(0.4, `rgba(230,110,20,${0.14 * flicker * sc})`);
    gGrad.addColorStop(1,   `rgba(180,50,5,0)`);
    ctx.fillStyle = gGrad;
    ctx.beginPath();
    ctx.arc(gx, gy, glowR, 0, Math.PI * 2);
    ctx.fill();
  });
}


// ─── Master list ───
export const bgAnimations = [
  { name: "Yomg'ir", draw: drawRain, color: "#0af" },
  { name: "Tumanlik", draw: drawNebula, color: "#6366f1" },
  { name: "Shar", draw: drawSphere, color: "#f97316" },
  { name: "Shimol Nuri", draw: drawAurora, color: "#22c55e" },
  { name: "Yulduzlar", draw: drawComets, color: "#38bdf8" },
  { name: "Grid", draw: drawGrid, color: "#06b6d4" },
  { name: "Pufaklar", draw: drawBubbles, color: "#8b5cf6" },
  { name: "To'lqinlar", draw: drawWaves, color: "#14b8a6" },
  { name: "O'zbek-Islom", draw: drawUzbekIslamic, color: "#d4a017" },
];

// ─── Canvas Component ───
export function AnimatedBg({ index }: { index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<any>({});
  const rafRef = useRef<number>(0);

  const anim = bgAnimations[index];

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    anim.draw(ctx, canvas.width, canvas.height, stateRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }, [anim]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; stateRef.current = {}; };
    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, [loop]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}

// ─── Thumbnail preview (small canvas for footer selector) ───
export function AnimatedBgThumb({ index, size = 40 }: { index: number; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<any>({});
  const rafRef = useRef<number>(0);

  const anim = bgAnimations[index];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size * 2;
    canvas.height = size * 2;
    stateRef.current = {};

    const loop = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      anim.draw(ctx, canvas.width, canvas.height, stateRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [anim, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="absolute inset-0 rounded-lg"
    />
  );
}
