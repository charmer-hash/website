"use client";

import { motion } from "framer-motion";
import { type RefObject, useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";

type Anchor = "top" | "right" | "bottom" | "left" | "center";

type Point = {
  x: number;
  y: number;
};

type BeamGeometry = {
  path: string;
  start: Point;
  end: Point;
};

function getAnchorPoint(
  rect: DOMRect,
  containerRect: DOMRect,
  anchor: Anchor,
): Point {
  const left = rect.left - containerRect.left;
  const top = rect.top - containerRect.top;

  switch (anchor) {
    case "top":
      return { x: left + rect.width / 2, y: top };
    case "right":
      return { x: left + rect.width, y: top + rect.height / 2 };
    case "bottom":
      return { x: left + rect.width / 2, y: top + rect.height };
    case "left":
      return { x: left, y: top + rect.height / 2 };
    case "center":
    default:
      return { x: left + rect.width / 2, y: top + rect.height / 2 };
  }
}

export type AnimatedBeamProps = {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  fromAnchor?: Anchor;
  toAnchor?: Anchor;
  curvature?: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
  pathWidth?: number;
  pathColor?: string;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  beamLength?: number;
  className?: string;
};

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  fromAnchor = "center",
  toAnchor = "center",
  curvature = 80,
  duration = 5,
  delay = 0,
  reverse = false,
  pathWidth = 2,
  pathColor = "rgba(148, 163, 184, 0.28)",
  pathOpacity = 1,
  gradientStartColor = "#38bdf8",
  gradientStopColor = "#f8fafc",
  beamLength = 22,
  className,
}: AnimatedBeamProps) {
  const [geometry, setGeometry] = useState<BeamGeometry | null>(null);
  const gradientId = useId().replace(/:/g, "");
  const filterId = `${gradientId}-glow`;

  useEffect(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;

    if (!container || !from || !to) {
      return;
    }

    const updateBeam = () => {
      const containerRect = container.getBoundingClientRect();
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();

      const start = getAnchorPoint(fromRect, containerRect, fromAnchor);
      const end = getAnchorPoint(toRect, containerRect, toAnchor);
      const deltaX = end.x - start.x;
      const deltaY = end.y - start.y;
      const distance = Math.hypot(deltaX, deltaY) || 1;
      const normalX = -deltaY / distance;
      const normalY = deltaX / distance;
      const curveDirection = reverse ? -1 : 1;
      const control = {
        x: start.x + deltaX / 2 + normalX * curvature * curveDirection,
        y: start.y + deltaY / 2 + normalY * curvature * curveDirection,
      };

      setGeometry({
        start,
        end,
        path: `M ${start.x},${start.y} Q ${control.x},${control.y} ${end.x},${end.y}`,
      });
    };

    updateBeam();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateBeam)
        : null;

    observer?.observe(container);
    observer?.observe(from);
    observer?.observe(to);
    window.addEventListener("resize", updateBeam);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateBeam);
    };
  }, [containerRef, curvature, fromAnchor, fromRef, reverse, toAnchor, toRef]);

  if (!geometry) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={geometry.start.x}
          y1={geometry.start.y}
          x2={geometry.end.x}
          y2={geometry.end.y}
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="45%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={geometry.path}
        fill="none"
        stroke={pathColor}
        strokeLinecap="round"
        strokeOpacity={pathOpacity}
        strokeWidth={pathWidth}
      />

      <motion.path
        d={geometry.path}
        animate={{ strokeDashoffset: reverse ? beamLength * 6 : -beamLength * 6 }}
        fill="none"
        filter={`url(#${filterId})`}
        pathLength={100}
        stroke={`url(#${gradientId})`}
        strokeDasharray={`${beamLength} ${100 - beamLength}`}
        strokeLinecap="round"
        strokeWidth={pathWidth}
        transition={{
          delay,
          duration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </svg>
  );
}
