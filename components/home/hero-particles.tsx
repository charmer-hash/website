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
          value: 42,
          density: { enable: true, width: 800, height: 800 },
        },
        color: { value: ["#93c5fd", "#a7f3d0", "#fcd34d", "#ffffff"] },
        opacity: {
          value: { min: 0.03, max: 0.11 },
          animation: { enable: true, speed: 0.22, minimumValue: 0.02 },
        },
        size: { value: { min: 1, max: 2.8 } },
        move: {
          enable: true,
          speed: 0.26,
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: { default: "out" as const },
        },
        links: {
          enable: true,
          distance: 124,
          color: "#cbd5e1",
          opacity: 0.08,
          width: 0.6,
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
              opacity: 0.12,
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
      className="pointer-events-none absolute inset-0 -z-10 size-full opacity-70"
      options={options}
    />
  );
}
