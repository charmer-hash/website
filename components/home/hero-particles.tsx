"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";

export function HeroParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 120,
      detectRetina: true,
      particles: {
        number: {
          value: 64,
          density: { enable: true, width: 800, height: 800 },
        },
        color: { value: ["#38bdf8", "#22c55e", "#818cf8", "#fb923c"] },
        opacity: {
          value: { min: 0.04, max: 0.18 },
          animation: { enable: true, speed: 0.3, minimumValue: 0.03 },
        },
        size: { value: { min: 1, max: 3.6 } },
        move: {
          enable: true,
          speed: 0.45,
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: { default: "out" as const },
        },
        links: {
          enable: true,
          distance: 118,
          color: "#93c5fd",
          opacity: 0.14,
          width: 0.8,
        },
      },
      interactivity: {
        events: {
          resize: { enable: true },
          onHover: { enable: true, mode: "grab" as const },
        },
        modes: {
          grab: {
            distance: 150,
            links: {
              opacity: 0.18,
            },
          },
        },
      },
    }),
    [],
  );

  if (!ready) {
    return null;
  }

  return (
    <Particles
      id="hero-particles"
      className="pointer-events-none absolute inset-0 -z-10 size-full opacity-90"
      options={options}
    />
  );
}
