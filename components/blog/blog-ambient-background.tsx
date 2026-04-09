"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
};

function createDots(width: number, height: number) {
  const spacing = width < 768 ? 28 : 34;
  const insetX = width < 768 ? 14 : 18;
  const insetY = width < 768 ? 14 : 18;
  const dots: Dot[] = [];

  for (let y = insetY; y <= height - insetY; y += spacing) {
    for (let x = insetX; x <= width - insetX; x += spacing) {
      dots.push({
        x,
        y,
        radius: width < 768 ? 1.05 : 1.15,
        alpha: 0.18 + ((x + y) % (spacing * 3)) / (spacing * 18),
      });
    }
  }

  return dots;
}

export function BlogAmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let frame = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = createDots(width, height);
    };

    const draw = () => {
      const time = performance.now() * 0.001;

      context.clearRect(0, 0, width, height);

      const base = context.createLinearGradient(0, 0, 0, height);
      base.addColorStop(0, "rgba(255,255,255,0.76)");
      base.addColorStop(0.48, "rgba(250,252,255,0.62)");
      base.addColorStop(1, "rgba(244,248,252,0.3)");
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);

      const scanX = width * (0.12 + (Math.sin(time * 0.16) * 0.5 + 0.5) * 0.76);
      const scan = context.createLinearGradient(scanX - 80, 0, scanX + 80, 0);
      scan.addColorStop(0, "rgba(255,255,255,0)");
      scan.addColorStop(0.48, "rgba(191,219,254,0.045)");
      scan.addColorStop(0.5, "rgba(191,219,254,0.11)");
      scan.addColorStop(0.52, "rgba(191,219,254,0.045)");
      scan.addColorStop(1, "rgba(255,255,255,0)");

      context.fillStyle = scan;
      context.fillRect(0, 0, width, height);

      for (const dot of dots) {
        const emphasis = Math.max(0, 1 - Math.abs(dot.x - scanX) / 120);
        const alpha = dot.alpha + emphasis * 0.18;

        context.fillStyle = `rgba(148, 163, 184, ${alpha})`;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        context.fill();
      }

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("resize", resize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
    </div>
  );
}
