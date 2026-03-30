"use client";

import { forwardRef, useRef } from "react";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

type NodeCardProps = {
  title: string;
  description: string;
  tone: "sky" | "emerald" | "amber" | "violet";
  className?: string;
};

const toneClasses: Record<NodeCardProps["tone"], string> = {
  sky: "border-sky-200/90 bg-white/88 shadow-[0_20px_45px_rgba(14,165,233,0.08)]",
  emerald:
    "border-emerald-200/90 bg-white/88 shadow-[0_20px_45px_rgba(16,185,129,0.08)]",
  amber:
    "border-amber-200/90 bg-white/88 shadow-[0_20px_45px_rgba(245,158,11,0.08)]",
  violet:
    "border-violet-200/90 bg-white/88 shadow-[0_20px_45px_rgba(139,92,246,0.08)]",
};

const NodeCard = forwardRef<HTMLDivElement, NodeCardProps>(
  ({ title, description, tone, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-36 rounded-[1.6rem] border px-4 py-3 backdrop-blur-xl md:w-40",
          toneClasses[tone],
          className,
        )}
      >
        <div className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-400">
          Node
        </div>
        <div className="mt-2 text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-xs leading-5 text-slate-600">{description}</div>
      </div>
    );
  },
);

NodeCard.displayName = "NodeCard";

export function AiNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const memoryRef = useRef<HTMLDivElement>(null);
  const routingRef = useRef<HTMLDivElement>(null);
  const toolRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  const beamPath = "rgba(100, 116, 139, 0.22)";
  const beamEnd = "#f8fafc";

  return (
    <div
      ref={containerRef}
      className="relative isolate h-[28rem] overflow-hidden rounded-[2rem] border border-white/80 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.28),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(240,249,255,0.92))] p-5 shadow-[0_30px_90px_rgba(56,189,248,0.12)] sm:h-[32rem] md:h-[36rem] md:p-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />
      <div className="absolute -left-16 top-10 size-40 rounded-full bg-sky-200/45 blur-3xl" />
      <div className="absolute -right-10 bottom-10 size-40 rounded-full bg-violet-200/35 blur-3xl" />
      <div className="absolute inset-x-6 top-6 flex items-start justify-between text-xs uppercase tracking-[0.3em] text-slate-400 md:inset-x-8 md:top-8">
        <span>AI Operating Fabric</span>
        <span>Intent to delivery</span>
      </div>

      <NodeCard
        ref={inputRef}
        title="Intent Capture"
        description="理解目标、约束和上下文来源，不让输入停留在模糊描述。"
        tone="sky"
        className="absolute left-2 top-14 md:left-6 md:top-20"
      />
      <NodeCard
        ref={memoryRef}
        title="Memory Layer"
        description="沉淀长期记忆与会话上下文，让系统逐步形成连续性。"
        tone="emerald"
        className="absolute left-0 top-[44%] md:left-4"
      />
      <NodeCard
        ref={toolRef}
        title="Eval & Tools"
        description="检索、执行、验证与回退机制一起工作，而不是只做生成。"
        tone="amber"
        className="absolute left-10 bottom-8 md:left-14 md:bottom-12"
      />
      <NodeCard
        ref={routingRef}
        title="Model Routing"
        description="根据任务成本、延迟和风险切换不同模型与策略。"
        tone="violet"
        className="absolute right-0 top-18 md:right-6 md:top-24"
      />
      <NodeCard
        ref={researchRef}
        title="Guardrails"
        description="限制越权、提示注入和不稳定输出，把风险前置。"
        tone="sky"
        className="absolute right-3 top-[46%] md:right-8"
      />
      <NodeCard
        ref={productRef}
        title="Product Surface"
        description="把智能能力翻译成可理解、可确认、可维护的体验。"
        tone="emerald"
        className="absolute right-6 bottom-10 md:right-14 md:bottom-14"
      />

      <div
        ref={coreRef}
        className="absolute left-1/2 top-1/2 w-48 -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-sky-200/90 bg-white/95 px-5 py-5 text-slate-900 shadow-[0_0_0_1px_rgba(14,165,233,0.08),0_26px_70px_rgba(14,165,233,0.16)] backdrop-blur-xl md:w-52"
      >
        <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-sky-700">
          AI Core
        </div>
        <div className="mt-4 text-lg font-semibold leading-tight">
          把模型、工具、评测与界面编排成同一个系统
        </div>
        <div className="mt-3 text-sm leading-6 text-slate-600">
          真正的 AI 产品不是聊天框，而是一套能稳定处理上下文、风险与结果质量的操作层。
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={inputRef}
        toRef={coreRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={48}
        pathColor={beamPath}
        gradientStopColor={beamEnd}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={memoryRef}
        toRef={coreRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={28}
        delay={0.4}
        gradientStartColor="#10b981"
        pathColor={beamPath}
        gradientStopColor={beamEnd}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={toolRef}
        toRef={coreRef}
        fromAnchor="top"
        toAnchor="bottom"
        curvature={-42}
        delay={0.8}
        gradientStartColor="#f59e0b"
        pathColor={beamPath}
        gradientStopColor={beamEnd}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={coreRef}
        toRef={routingRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={40}
        delay={0.2}
        gradientStartColor="#8b5cf6"
        pathColor={beamPath}
        gradientStopColor={beamEnd}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={coreRef}
        toRef={researchRef}
        fromAnchor="right"
        toAnchor="left"
        curvature={16}
        delay={0.6}
        pathColor={beamPath}
        gradientStopColor={beamEnd}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={coreRef}
        toRef={productRef}
        fromAnchor="bottom"
        toAnchor="left"
        curvature={-36}
        delay={1}
        gradientStartColor="#22c55e"
        pathColor={beamPath}
        gradientStopColor={beamEnd}
        duration={6}
      />

      <div className="absolute bottom-4 left-1/2 flex max-w-[90%] -translate-x-1/2 items-center gap-3 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] text-slate-500 backdrop-blur md:bottom-6">
        <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.65)]" />
        Beam 代表意图、记忆、工具和产品反馈在系统里的流动
      </div>
    </div>
  );
}
