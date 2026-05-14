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

// ─── 9. Islom Fonari & Mandala ───
function drawUzbekIslamic(ctx: CanvasRenderingContext2D, w: number, h: number, state: any) {
  if (!state.t) state.t = 0;
  state.t += 0.006;
  const t = state.t;

  // ════════════════════════════════
  // 1. BACKGROUND — deep dark warm
  // ════════════════════════════════
  ctx.fillStyle = 'rgba(8,4,2,0.2)';
  ctx.fillRect(0, 0, w, h);

  // Left warm glow atmosphere (lantern light spill)
  const atmGrad = ctx.createRadialGradient(w * 0.18, h * 0.35, 0, w * 0.18, h * 0.35, w * 0.55);
  const flicAtm = 0.18 + Math.sin(t * 1.8) * 0.04 + Math.sin(t * 3.1) * 0.02;
  atmGrad.addColorStop(0,   `rgba(160,70,10,${flicAtm})`);
  atmGrad.addColorStop(0.45,`rgba(80,25,5,${flicAtm * 0.5})`);
  atmGrad.addColorStop(1,   `rgba(0,0,0,0)`);
  ctx.fillStyle = atmGrad;
  ctx.fillRect(0, 0, w, h);

  // ════════════════════════════════
  // 2. MANDALA — bottom-right, partially visible, slowly rotating
  // ════════════════════════════════
  const mR = Math.min(w, h) * 0.54;        // radius of full mandala
  const mCx = w + mR * 0.08;               // center pushed right so ~half visible
  const mCy = h + mR * 0.08;               // center pushed down so ~half visible

  ctx.save();
  ctx.translate(mCx, mCy);
  ctx.rotate(t * 0.04);                    // very slow clockwise rotation

  // Helper: draw one ring of petal-shapes
  const drawPetalRing = (r: number, petals: number, petalW: number, color: string, alpha: number) => {
    ctx.beginPath();
    for (let i = 0; i < petals; i++) {
      const a0 = (i / petals) * Math.PI * 2;
      const a1 = ((i + 0.5) / petals) * Math.PI * 2;
      const a2 = ((i + 1) / petals) * Math.PI * 2;
      // outer petal arc
      const ox = Math.cos(a1) * (r + petalW);
      const oy = Math.sin(a1) * (r + petalW);
      ctx.moveTo(Math.cos(a0) * r, Math.sin(a0) * r);
      ctx.quadraticCurveTo(ox, oy, Math.cos(a2) * r, Math.sin(a2) * r);
    }
    ctx.strokeStyle = color.replace('A', `${alpha})`);
    ctx.lineWidth = 0.9;
    ctx.stroke();
  };

  // Helper: star polygon
  const drawStarPoly = (r: number, pts: number, innerR: number, rot: number, color: string, alpha: number, lw: number) => {
    ctx.beginPath();
    for (let i = 0; i < pts * 2; i++) {
      const a = (i / (pts * 2)) * Math.PI * 2 + rot;
      const rr = i % 2 === 0 ? r : innerR;
      const px = Math.cos(a) * rr, py = Math.sin(a) * rr;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(${color},${alpha})`;
    ctx.lineWidth = lw;
    ctx.stroke();
  };

  // --- Outermost border ring ---
  ctx.beginPath();
  ctx.arc(0, 0, mR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(140,90,40,0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // --- Ring layers (outside to inside) ---
  const layers = [
    { r: mR * 0.95, petals: 24, pw: mR * 0.04, col: '120,75,30,', al: 0.28 },
    { r: mR * 0.82, petals: 20, pw: mR * 0.05, col: '150,100,40,', al: 0.30 },
    { r: mR * 0.68, petals: 16, pw: mR * 0.06, col: '170,120,50,', al: 0.32 },
    { r: mR * 0.54, petals: 12, pw: mR * 0.07, col: '180,130,55,', al: 0.34 },
    { r: mR * 0.40, petals: 10, pw: mR * 0.06, col: '190,140,60,', al: 0.35 },
    { r: mR * 0.28, petals: 8,  pw: mR * 0.05, col: '200,150,65,', al: 0.38 },
  ];

  layers.forEach(({ r, petals, pw, col, al }) => {
    // Petal ring
    ctx.beginPath();
    for (let i = 0; i < petals; i++) {
      const a0 = (i / petals) * Math.PI * 2;
      const a1 = ((i + 0.5) / petals) * Math.PI * 2;
      const a2 = ((i + 1) / petals) * Math.PI * 2;
      const ox = Math.cos(a1) * (r + pw);
      const oy = Math.sin(a1) * (r + pw);
      ctx.moveTo(Math.cos(a0) * r, Math.sin(a0) * r);
      ctx.quadraticCurveTo(ox, oy, Math.cos(a2) * r, Math.sin(a2) * r);
    }
    ctx.strokeStyle = `rgba(${col}${al})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Inner ring line
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.96, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${col}${al * 0.6})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Decorative star at this ring
    drawStarPoly(r * 0.9, petals / 2, r * 0.75, Math.PI / petals, col + '1', al * 0.5, 0.5);
  });

  // --- Inner detail rings (concentric circles with dots) ---
  for (let ri = 3; ri <= 8; ri++) {
    const rr = mR * (ri * 0.035);
    const dots = ri * 4;
    ctx.beginPath();
    ctx.arc(0, 0, rr, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(160,110,45,${0.15 + ri * 0.02})`;
    ctx.lineWidth = 0.4;
    ctx.stroke();
    // Dots on ring
    for (let d = 0; d < dots; d++) {
      const da = (d / dots) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(Math.cos(da) * rr, Math.sin(da) * rr, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,130,55,${0.3 + ri * 0.02})`;
      ctx.fill();
    }
  }

  // --- Center rosette ---
  const centerR = mR * 0.14;
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * centerR, Math.sin(a) * centerR);
    ctx.strokeStyle = 'rgba(200,150,60,0.4)';
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, centerR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(210,160,65,0.45)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();

  // ════════════════════════════════
  // 3. LANTERNS — 4 lanterns with perspective
  // ════════════════════════════════

  // Calculate base scale
  const baseScale = Math.max(w / 1000, h / 800, 1.0);
  const lanterns = [
    { ax: w * 0.12, ay: -h * 0.02, sz: baseScale * 1.6, ph: 0.0 },   // Front-left, large
    { ax: w * 0.26, ay: -h * 0.03, sz: baseScale * 1.1, ph: 1.4 },   // Middle, medium
    { ax: w * 0.38, ay: -h * 0.05, sz: baseScale * 0.7, ph: 2.7 },   // Back-right, small
    { ax: w * 0.04, ay: -h * 0.04, sz: baseScale * 0.5, ph: 4.1 },   // Far-back-left, tiny
  ];

  // Helper: draw one hexagonal lantern
  const drawLantern = (cx: number, cy: number, sz: number, flicker: number, phase: number) => {
    const bw = 46 * sz;  // body width (hex)
    const bh = 62 * sz;  // body height
    const hw = bw * 0.52; // half-width

    // ── Glow spread underneath ──
    const glowR = bw * 3.2 * flicker;
    const glowGrad = ctx.createRadialGradient(cx, cy + bh * 0.3, 0, cx, cy + bh * 0.3, glowR);
    glowGrad.addColorStop(0,   `rgba(255,180,40,${0.45 * flicker})`);
    glowGrad.addColorStop(0.3, `rgba(210,100,15,${0.25 * flicker})`);
    glowGrad.addColorStop(0.7, `rgba(140,50,5,${0.10 * flicker})`);
    glowGrad.addColorStop(1,   `rgba(80,20,0,0)`);
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(cx, cy + bh * 0.3, glowR, 0, Math.PI * 2);
    ctx.fill();

    // ── Hexagonal lantern body (6 sides) ──
    const hex = (cx2: number, cy2: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
        i === 0 ? ctx.moveTo(cx2 + r * Math.cos(a), cy2 + r * Math.sin(a))
                : ctx.lineTo(cx2 + r * Math.cos(a), cy2 + r * Math.sin(a));
      }
      ctx.closePath();
    };

    const bodyY = cy + bh * 0.1;

    // Metal frame fill (dark)
    hex(cx, bodyY, bw * 0.52);
    const bodyGrad = ctx.createRadialGradient(cx - hw * 0.3, bodyY - bh * 0.1, 0, cx, bodyY, bw * 0.65);
    bodyGrad.addColorStop(0, `rgba(255,200,80,${0.85 * flicker})`);
    bodyGrad.addColorStop(0.35, `rgba(200,120,20,${0.6 * flicker})`);
    bodyGrad.addColorStop(0.8, `rgba(50,25,8,0.9)`);
    bodyGrad.addColorStop(1,   `rgba(20,10,3,0.95)`);
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Metal bars (hexagonal outline)
    hex(cx, bodyY, bw * 0.52);
    ctx.strokeStyle = `rgba(30,15,5,0.92)`;
    ctx.lineWidth = sz * 2.5;
    ctx.stroke();

    // Decorative inner hex
    hex(cx, bodyY, bw * 0.35);
    ctx.strokeStyle = `rgba(60,35,12,0.7)`;
    ctx.lineWidth = sz * 1.2;
    ctx.stroke();

    // Vertical bars across the hex
    for (let b = -1; b <= 1; b++) {
      ctx.beginPath();
      ctx.moveTo(cx + b * hw * 0.45, bodyY - bh * 0.42);
      ctx.lineTo(cx + b * hw * 0.45, bodyY + bh * 0.42);
      ctx.strokeStyle = `rgba(25,12,4,0.8)`;
      ctx.lineWidth = sz * 1.5;
      ctx.stroke();
    }

    // Top cap (pyramid shape)
    ctx.beginPath();
    ctx.moveTo(cx - hw * 0.6, bodyY - bh * 0.42);
    ctx.lineTo(cx,            cy - bh * 0.02);
    ctx.lineTo(cx + hw * 0.6, bodyY - bh * 0.42);
    ctx.closePath();
    ctx.fillStyle = 'rgba(22,11,4,0.95)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(50,28,8,0.9)';
    ctx.lineWidth = sz * 1.5;
    ctx.stroke();

    // Top knob
    ctx.beginPath();
    ctx.arc(cx, cy - bh * 0.01, sz * 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(40,22,7,0.95)';
    ctx.fill();

    // Bottom pointed tip
    ctx.beginPath();
    ctx.moveTo(cx - hw * 0.5, bodyY + bh * 0.42);
    ctx.lineTo(cx,             cy + bh * 0.72);
    ctx.lineTo(cx + hw * 0.5, bodyY + bh * 0.42);
    ctx.closePath();
    ctx.fillStyle = 'rgba(20,10,3,0.95)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(45,24,7,0.9)';
    ctx.lineWidth = sz * 1.2;
    ctx.stroke();

    // Inner flame (bright flicker)
    const fCx = cx, fCy = bodyY + sz * 2;
    const flameGrad = ctx.createRadialGradient(fCx, fCy, 0, fCx, fCy, bw * 0.28);
    flameGrad.addColorStop(0,   `rgba(255,240,160,${flicker})`);
    flameGrad.addColorStop(0.4, `rgba(255,180,40,${0.8 * flicker})`);
    flameGrad.addColorStop(1,   `rgba(200,80,10,0)`);
    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.arc(fCx, fCy, bw * 0.28, 0, Math.PI * 2);
    ctx.fill();
  };

  lanterns.forEach((ln) => {
    // Slower flicker
    const flicker = 0.75 + Math.sin(t * 1.5 + ln.ph) * 0.15 + Math.sin(t * 3.2 + ln.ph) * 0.1;
    // Slower, wider sway
    const swayAng = Math.sin(t * 0.4 + ln.ph) * 0.08 + Math.sin(t * 0.9 + ln.ph) * 0.03;
    const chainLen = h * (0.15 + ln.sz * 0.05);

    // Chain (series of short segments to simulate links)
    const chainLinks = Math.floor(chainLen / (8 * ln.sz));
    for (let cl = 0; cl < chainLinks; cl++) {
      const prog = cl / chainLinks;
      const cx2 = ln.ax + Math.sin(swayAng * prog * 12) * chainLen * 0.08 * prog;
      const cy2 = ln.ay + prog * chainLen;
      ctx.beginPath();
      ctx.arc(cx2, cy2, ln.sz * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(50,28,8,${0.7 - prog * 0.3})`;
      ctx.fill();
    }

    // Lantern center
    const endX = ln.ax + Math.sin(swayAng * 12) * chainLen * 0.08;
    const endY = ln.ay + chainLen;
    drawLantern(endX, endY, ln.sz, flicker, ln.ph);
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
