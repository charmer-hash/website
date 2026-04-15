"use client";

import { forwardRef, useRef } from "react";
import {
  BrainCircuit,
  Cpu,
  Database,
  Eye,
  Play,
  Wrench,
  Workflow,
} from "lucide-react";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

type BeamNodeProps = {
  icon: React.ComponentType<{ className?: string }>;
  tone: "sky" | "mist" | "slate" | "core";
  size?: "sm" | "lg";
  label?: string;
  className?: string;
};

const toneMap: Record<BeamNodeProps["tone"], string> = {
  sky: "border-sky-200/70 bg-white/85 shadow-[0_20px_45px_rgba(56,189,248,0.14)]",
  mist: "border-slate-200/80 bg-white/80 shadow-[0_18px_40px_rgba(148,163,184,0.12)]",
  slate:
    "border-slate-300/80 bg-slate-50/90 shadow-[0_18px_36px_rgba(100,116,139,0.12)]",
  core: "border-sky-200/80 bg-white/95 shadow-[0_30px_80px_rgba(56,189,248,0.18)]",
};

const sizeMap = {
  sm: {
    shell: "size-14 rounded-[1.35rem]",
    inner: "size-10 rounded-[1rem]",
    icon: "size-5",
  },
  lg: {
    shell: "size-24 rounded-[2rem]",
    inner: "size-16 rounded-[1.4rem]",
    icon: "size-8",
  },
};

const BeamNode = forwardRef<HTMLDivElement, BeamNodeProps>(
  ({ icon: Icon, tone, size = "sm", label, className }, ref) => {
    const classes = sizeMap[size];

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center border backdrop-blur-xl",
          classes.shell,
          toneMap[tone],
          className,
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center border border-white/80 bg-linear-to-br from-white to-sky-50/70",
            classes.inner,
          )}
        >
          <Icon className={cn(classes.icon, "text-slate-800")} />
        </div>
        {label ? (
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.68rem] font-medium tracking-[0.12em] text-slate-500 uppercase">
            {label}
          </div>
        ) : null}
      </div>
    );
  },
);

BeamNode.displayName = "BeamNode";

export function AiNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative isolate h-[24rem] overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:h-[28rem] md:h-[31rem] md:p-6"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:68px_68px] opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/80 blur-3xl md:h-80 md:w-80" />
      <div className="absolute inset-x-0 top-6 text-center text-[0.68rem] font-semibold tracking-[0.34em] text-sky-700/80 uppercase">
        AI Agent
      </div>

      <BeamNode
        ref={topLeftRef}
        icon={BrainCircuit}
        tone="sky"
        label="LLM"
        className="absolute left-8 top-20 md:left-16 md:top-24"
      />
      <BeamNode
        ref={leftRef}
        icon={Database}
        tone="mist"
        label="Memory"
        className="absolute left-2 top-1/2 -translate-y-1/2 md:left-8"
      />
      <BeamNode
        ref={bottomLeftRef}
        icon={Eye}
        tone="slate"
        label="Observation"
        className="absolute bottom-8 left-10 md:bottom-12 md:left-20"
      />

      <BeamNode
        ref={topRightRef}
        icon={Workflow}
        tone="mist"
        label="Planning"
        className="absolute right-8 top-20 md:right-16 md:top-24"
      />
      <BeamNode
        ref={rightRef}
        icon={Wrench}
        tone="sky"
        label="Tools"
        className="absolute right-2 top-1/2 -translate-y-1/2 md:right-8"
      />
      <BeamNode
        ref={bottomRightRef}
        icon={Play}
        tone="slate"
        label="Action"
        className="absolute bottom-8 right-10 md:bottom-12 md:right-20"
      />

      <BeamNode
        ref={centerRef}
        icon={Cpu}
        tone="core"
        size="lg"
        label="Agent Core"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={topLeftRef}
        toRef={centerRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={-30}
        pathColor="rgba(14,165,233,0.22)"
        pathWidth={2}
        pathOpacity={0.9}
        reverse={true}
        gradientStartColor="#0ea5e9"
        gradientStopColor="#7dd3fc"
        beamLength={20}
        delay={0}
        duration={5.1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leftRef}
        toRef={centerRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={0}
        reverse={true}
        pathColor="rgba(14,165,233,0.2)"
        pathWidth={2}
        pathOpacity={0.85}
        gradientStartColor="#38bdf8"
        gradientStopColor="#bae6fd"
        beamLength={20}
        delay={0}
        duration={5.1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bottomLeftRef}
        toRef={centerRef}
        fromAnchor="top"
        toAnchor="left"
        curvature={30}
        reverse={true}
        pathColor="rgba(59,130,246,0.2)"
        pathWidth={2}
        pathOpacity={0.85}
        gradientStartColor="#60a5fa"
        gradientStopColor="#bfdbfe"
        beamLength={20}
        delay={0}
        duration={5.1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={topRightRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={30}
        pathColor="rgba(37,99,235,0.22)"
        pathWidth={2}
        pathOpacity={0.9}
        gradientStartColor="#2563eb"
        gradientStopColor="#93c5fd"
        beamLength={20}
        delay={0}
        duration={5.1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={rightRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={0}
        pathColor="rgba(14,165,233,0.2)"
        pathWidth={2}
        pathOpacity={0.85}
        gradientStartColor="#0ea5e9"
        gradientStopColor="#67e8f9"
        beamLength={20}
        delay={0}
        duration={5.1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={bottomRightRef}
        fromAnchor="right"
        toAnchor="top"
        curvature={-30}
        pathColor="rgba(59,130,246,0.2)"
        pathWidth={2}
        pathOpacity={0.85}
        gradientStartColor="#3b82f6"
        gradientStopColor="#bfdbfe"
        beamLength={20}
        delay={0}
        duration={5.1}
      />
    </div>
  );
}
