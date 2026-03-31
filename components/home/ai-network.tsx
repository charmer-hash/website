"use client";

import { forwardRef, useRef } from "react";
import {
  Bot,
  Database,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  Workflow,
} from "lucide-react";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

type BeamCardProps = {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "sky" | "mist" | "slate";
  className?: string;
};

const toneMap: Record<BeamCardProps["tone"], string> = {
  sky: "border-sky-200/90 bg-white/88 shadow-[0_18px_36px_rgba(56,189,248,0.1)]",
  mist: "border-sky-100/90 bg-white/84 shadow-[0_16px_34px_rgba(125,211,252,0.08)]",
  slate:
    "border-slate-200/90 bg-white/88 shadow-[0_18px_36px_rgba(148,163,184,0.1)]",
};

const BeamCard = forwardRef<HTMLDivElement, BeamCardProps>(
  ({ title, subtitle, icon: Icon, tone, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-[1.35rem] border px-3.5 py-3.5 backdrop-blur-xl",
          toneMap[tone],
          className,
        )}
      >
        <div className="flex items-start gap-3">
          <div className="rounded-[1rem] border border-white/80 bg-slate-50/90 p-2">
            <Icon className="size-4 text-slate-800" />
          </div>
          <div>
            <div className="text-[0.92rem] font-semibold text-slate-950">{title}</div>
            <div className="mt-1 text-[0.72rem] leading-5 text-slate-500">{subtitle}</div>
          </div>
        </div>
      </div>
    );
  },
);

BeamCard.displayName = "BeamCard";

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
      className="relative isolate h-[28rem] overflow-hidden rounded-[2rem] border border-white/80 bg-[radial-gradient(circle_at_50%_18%,rgba(125,211,252,0.24),transparent_24%),radial-gradient(circle_at_50%_82%,rgba(191,219,254,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,248,255,0.93))] p-5 shadow-[0_30px_90px_rgba(56,189,248,0.08)] sm:h-[32rem] md:h-[35rem] md:p-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/50 blur-3xl" />
      <div className="absolute left-8 top-8 text-[0.72rem] font-semibold tracking-[0.28em] text-sky-700 uppercase">
        Animated Beam
      </div>
      <div className="absolute right-8 top-8 rounded-full border border-slate-200/80 bg-white/82 px-3 py-1 text-xs text-slate-500 backdrop-blur">
        Magic UI showcase
      </div>

      <BeamCard
        ref={topLeftRef}
        title="Intent"
        subtitle="user goal"
        icon={Sparkles}
        tone="sky"
        className="absolute left-8 top-24 w-34 md:left-10 md:w-36"
      />
      <BeamCard
        ref={leftRef}
        title="Context"
        subtitle="memory layer"
        icon={Database}
        tone="mist"
        className="absolute left-3 top-1/2 w-34 -translate-y-1/2 md:left-6 md:w-36"
      />
      <BeamCard
        ref={bottomLeftRef}
        title="Guardrails"
        subtitle="safe actions"
        icon={ShieldCheck}
        tone="slate"
        className="absolute bottom-10 left-10 w-36 md:bottom-14 md:left-16 md:w-38"
      />

      <BeamCard
        ref={topRightRef}
        title="Routing"
        subtitle="model choice"
        icon={Workflow}
        tone="mist"
        className="absolute right-8 top-24 w-34 md:right-10 md:w-36"
      />
      <BeamCard
        ref={rightRef}
        title="Output"
        subtitle="product surface"
        icon={WandSparkles}
        tone="sky"
        className="absolute right-3 top-1/2 w-34 -translate-y-1/2 md:right-6 md:w-36"
      />
      <BeamCard
        ref={bottomRightRef}
        title="Agent"
        subtitle="tool execution"
        icon={Bot}
        tone="slate"
        className="absolute bottom-10 right-10 w-36 md:bottom-14 md:right-16 md:w-38"
      />

      <div
        ref={centerRef}
        className="absolute left-1/2 top-1/2 w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-[1.8rem] border border-sky-200/90 bg-white/94 px-5 py-6 text-center shadow-[0_0_0_1px_rgba(14,165,233,0.04),0_30px_80px_rgba(125,211,252,0.18)] backdrop-blur-xl md:w-[16.5rem]"
      >
        <div className="mx-auto inline-flex size-13 items-center justify-center rounded-[1.2rem] border border-sky-100 bg-linear-to-br from-sky-50 to-white">
          <Bot className="size-6 text-sky-700" />
        </div>
        <div className="mt-4 text-[0.72rem] font-semibold tracking-[0.28em] text-slate-400 uppercase">
          AI Core
        </div>
        <div className="mt-3 text-[1.15rem] font-semibold tracking-tight text-slate-950">
          Magic UI Beam
        </div>
        <p className="mt-3 text-[0.92rem] leading-7 text-slate-600">
          这里只做纯展示，用流动的 beam 把 AI 系统感表达出来。
        </p>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={topLeftRef}
        toRef={centerRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={54}
        pathColor="rgba(148,163,184,0.14)"
        gradientStartColor="#38bdf8"
        gradientStopColor="#e0f2fe"
        duration={5.2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leftRef}
        toRef={centerRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={24}
        pathColor="rgba(148,163,184,0.14)"
        gradientStartColor="#7dd3fc"
        gradientStopColor="#e0f2fe"
        delay={0.35}
        duration={5.6}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bottomLeftRef}
        toRef={centerRef}
        fromAnchor="top"
        toAnchor="bottom"
        curvature={-46}
        pathColor="rgba(148,163,184,0.14)"
        gradientStartColor="#93c5fd"
        gradientStopColor="#e2e8f0"
        delay={0.7}
        duration={5.8}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={topRightRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={46}
        pathColor="rgba(148,163,184,0.14)"
        gradientStartColor="#60a5fa"
        gradientStopColor="#dbeafe"
        delay={0.2}
        duration={5.1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={rightRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={16}
        pathColor="rgba(148,163,184,0.14)"
        gradientStartColor="#7dd3fc"
        gradientStopColor="#e0f2fe"
        delay={0.55}
        duration={5.4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={bottomRightRef}
        fromAnchor="bottom"
        toAnchor="left"
        curvature={-42}
        pathColor="rgba(148,163,184,0.14)"
        gradientStartColor="#93c5fd"
        gradientStopColor="#e2e8f0"
        delay={0.9}
        duration={6}
      />
    </div>
  );
}
