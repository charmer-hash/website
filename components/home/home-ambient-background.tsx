"use client";

import { useEffect, useRef } from "react";

type Orb = {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  phase: number;
};

const ORB_COLORS = [
  "125, 211, 252",
  "191, 219, 254",
  "253, 230, 138",
  "220, 252, 231",
  "255, 255, 255",
];

function createOrbs(width: number, height: number): Orb[] {
  return Array.from({ length: 5 }, (_, index) => ({
    x: width * (0.16 + index * 0.17),
    y: height * (0.18 + (index % 3) * 0.2),
    radius: 260 + ((index * 37) % 90),
    vx: (index % 2 === 0 ? 1 : -1) * (0.022 + index * 0.005),
    vy: (index % 2 === 0 ? -1 : 1) * (0.02 + index * 0.004),
    color: ORB_COLORS[index % ORB_COLORS.length],
    alpha: 0.08 + (index % 3) * 0.012,
    phase: index * 1.4,
  }));
}

export function HomeAmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let orbs: Orb[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      orbs = createOrbs(width, height);
    };

    const drawGrid = () => {
      const cell = 96;
      const gridMask = context.createLinearGradient(0, 0, 0, height);
      gridMask.addColorStop(0, "rgba(255,255,255,1)");
      gridMask.addColorStop(0.48, "rgba(255,255,255,0.72)");
      gridMask.addColorStop(0.72, "rgba(255,255,255,0.26)");
      gridMask.addColorStop(1, "rgba(255,255,255,0)");

      context.save();
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = "rgba(148, 163, 184, 0.14)";
      context.lineWidth = 1.05;

      for (let x = 0; x <= width; x += cell) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y <= height; y += cell) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      context.strokeStyle = "rgba(148, 163, 184, 0.24)";
      context.lineWidth = 1.2;

      for (let x = 0; x <= width; x += cell * 4) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y <= height; y += cell * 4) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      context.globalCompositeOperation = "destination-in";
      context.fillStyle = gridMask;
      context.fillRect(0, 0, width, height);
      context.restore();
    };

      const draw = () => {
      context.clearRect(0, 0, width, height);

      const base = context.createLinearGradient(0, 0, 0, height);
      base.addColorStop(0, "#fcfeff");
      base.addColorStop(0.42, "#f9fbff");
      base.addColorStop(1, "#f6f9fd");
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = "lighter";
      context.filter = "blur(118px)";

      const time = performance.now() * 0.00025;

      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius * 0.2 || orb.x > width + orb.radius * 0.2) {
          orb.vx *= -1;
        }

        if (orb.y < -orb.radius * 0.2 || orb.y > height + orb.radius * 0.2) {
          orb.vy *= -1;
        }

        const gradient = context.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius,
        );

        const pulse = 0.94 + Math.sin(time * 4.4 + orb.phase) * 0.08;
        const alpha = orb.alpha * pulse;

        gradient.addColorStop(0, `rgba(${orb.color}, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(${orb.color}, ${alpha * 0.72})`);
        gradient.addColorStop(0.62, `rgba(${orb.color}, ${alpha * 0.18})`);
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`);

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        context.fill();
      }

      const sweepX = width * (0.5 + Math.sin(time * 1.1) * 0.08);
      const sweepY = height * (0.4 + Math.cos(time * 0.82) * 0.06);
      const sweep = context.createRadialGradient(
        sweepX,
        sweepY,
        0,
        sweepX,
        sweepY,
        Math.max(width, height) * 0.42,
      );
      sweep.addColorStop(0, "rgba(255,255,255,0.18)");
      sweep.addColorStop(0.32, "rgba(191,219,254,0.08)");
      sweep.addColorStop(0.56, "rgba(253,230,138,0.04)");
      sweep.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = sweep;
      context.fillRect(0, 0, width, height);

      context.restore();

      context.save();
      context.globalCompositeOperation = "source-over";
      context.filter = "blur(0px)";

      for (const orb of orbs) {
        const outline = context.createRadialGradient(
          orb.x,
          orb.y,
          orb.radius * 0.46,
          orb.x,
          orb.y,
          orb.radius * 0.88,
        );

        outline.addColorStop(0, "rgba(255,255,255,0)");
        outline.addColorStop(0.58, `rgba(${orb.color}, 0.02)`);
        outline.addColorStop(0.82, `rgba(${orb.color}, 0.08)`);
        outline.addColorStop(1, "rgba(255,255,255,0)");

        context.fillStyle = outline;
        context.beginPath();
        context.arc(orb.x, orb.y, orb.radius * 0.92, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();

      context.save();
      const focusX = width * (0.54 + Math.sin(time * 0.35) * 0.012);
      const focusY = height * (0.36 + Math.cos(time * 0.28) * 0.012);
      const focusPulse = 0.92 + Math.sin(time * 1.8) * 0.06;

      const innerHalo = context.createRadialGradient(
        focusX,
        focusY,
        0,
        focusX,
        focusY,
        Math.max(width, height) * (0.24 * focusPulse),
      );
      innerHalo.addColorStop(0, "rgba(255,255,255,0.38)");
      innerHalo.addColorStop(0.2, "rgba(255,255,255,0.24)");
      innerHalo.addColorStop(0.5, "rgba(191,219,254,0.11)");
      innerHalo.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = innerHalo;
      context.fillRect(0, 0, width, height);

      const outerHalo = context.createRadialGradient(
        focusX,
        focusY,
        Math.max(width, height) * 0.08,
        focusX,
        focusY,
        Math.max(width, height) * (0.52 * (0.98 + Math.cos(time * 1.2) * 0.03)),
      );
      outerHalo.addColorStop(0, "rgba(255,255,255,0.09)");
      outerHalo.addColorStop(0.46, "rgba(186,230,253,0.065)");
      outerHalo.addColorStop(0.78, "rgba(255,255,255,0.025)");
      outerHalo.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = outerHalo;
      context.fillRect(0, 0, width, height);

      const sideHaloX = width * (0.71 + Math.cos(time * 0.42) * 0.02);
      const sideHaloY = height * (0.3 + Math.sin(time * 0.36) * 0.02);
      const sideHalo = context.createRadialGradient(
        sideHaloX,
        sideHaloY,
        0,
        sideHaloX,
        sideHaloY,
        Math.max(width, height) * 0.18,
      );
      sideHalo.addColorStop(0, "rgba(255,255,255,0.16)");
      sideHalo.addColorStop(0.34, "rgba(196,181,253,0.08)");
      sideHalo.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = sideHalo;
      context.fillRect(0, 0, width, height);

      const sweepAngle = time * 0.6;
      const sweepStartX = width * (0.22 + Math.cos(sweepAngle) * 0.06);
      const sweepStartY = height * (0.16 + Math.sin(sweepAngle * 0.7) * 0.04);
      const sweepEndX = width * (0.92 + Math.cos(sweepAngle + Math.PI) * 0.05);
      const sweepEndY = height * (0.66 + Math.sin(sweepAngle * 0.85 + 1.2) * 0.04);
      const shimmer = context.createLinearGradient(
        sweepStartX,
        sweepStartY,
        sweepEndX,
        sweepEndY,
      );
      shimmer.addColorStop(0, "rgba(255,255,255,0)");
      shimmer.addColorStop(0.42, "rgba(255,255,255,0.06)");
      shimmer.addColorStop(0.5, "rgba(186,230,253,0.08)");
      shimmer.addColorStop(0.58, "rgba(255,255,255,0.05)");
      shimmer.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = shimmer;
      context.fillRect(0, 0, width, height);
      context.restore();

      context.save();
      context.globalCompositeOperation = "soft-light";
      const veil = context.createLinearGradient(0, 0, width, height);
      veil.addColorStop(0, "rgba(255,255,255,0.16)");
      veil.addColorStop(0.45, "rgba(186,230,253,0.04)");
      veil.addColorStop(1, "rgba(255,255,255,0.1)");
      context.fillStyle = veil;
      context.fillRect(0, 0, width, height);
      context.restore();

      drawGrid();

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-90"
      aria-hidden="true"
    />
  );
}
