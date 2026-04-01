import {
  ArrowRight,
  Brain,
  BrainCircuit,
  Cpu,
  Eye,
  Layers,
  Network,
  ShieldCheck,
  Sparkles,
  Waypoints,
  Zap,
} from "lucide-react";

import { AiNetwork } from "@/components/home/ai-network";
import { HomeAmbientBackground } from "@/components/home/home-ambient-background";
import { HeroOrbScene } from "@/components/home/hero-orb-scene";
import { HeroParticles } from "@/components/home/hero-particles";
import { ScrollReveal } from "@/components/home/scroll-reveal";
import { TypingHero } from "@/components/home/typing-hero";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

const surfaceClass =
  "border border-white/80 bg-white/78 shadow-[0_18px_44px_rgba(148,163,184,0.12)] backdrop-blur-sm";
const softSurfaceClass =
  "border border-white/80 bg-white/82 shadow-[0_18px_44px_rgba(148,163,184,0.1)] backdrop-blur-sm";

const worldview = [
  {
    title: "我做什么",
    description:
      "我主要关注 AI 产品、智能体系统和更贴近真实使用场景的交互体验。",
    icon: Brain,
  },
  {
    title: "我怎么想",
    description:
      "我更在意上下文、工具、边界和反馈，而不只是模型本身有多强。",
    icon: ShieldCheck,
  },
  {
    title: "为什么做这个站",
    description:
      "我希望把自己的方法、兴趣和关于 AI 的判断长期沉淀在这里。",
    icon: Eye,
  },
];

const principles = [
  {
    title: "先定义问题，再选择模型",
    description:
      "我不会把 prompt 当解决方案起点。先拆出目标、失败模式、上下文来源和评价标准，模型只是其中一个执行部件。",
    icon: BrainCircuit,
  },
  {
    title: "把工具链并入智能链",
    description:
      "检索、执行、校验、回退和日志要一起出现。AI 只有和工具链连起来，才不会停留在静态演示。",
    icon: Cpu,
  },
  {
    title: "保留人类的确认权",
    description:
      "我更相信可控的人机协作，而不是伪装成全自动。高风险节点应该有明确暂停与确认。",
    icon: Waypoints,
  },
  {
    title: "让系统能被观察和迭代",
    description:
      "没有观测、评测与反馈，AI 体验无法持续改进。可追踪性不是运维细节，而是产品质量的一部分。",
    icon: Zap,
  },
];

const capabilityClusters = [
  {
    title: "Agent 设计与编排",
    body: "多步骤任务拆解、工具路由、状态设计、失败恢复与上下文继承。",
    icon: Network,
  },
  {
    title: "知识系统与 RAG",
    body: "从索引、召回到引用展示，确保答案不仅能生成，还能被验证。",
    icon: Layers,
  },
  {
    title: "安全、评测与护栏",
    body: "离线 eval、线上监测、提示注入防御、权限边界与风险前移。",
    icon: ShieldCheck,
  },
];

const processFlow = [
  {
    step: "01",
    title: "理解任务",
    body: "判断场景是内容生成、操作代理、知识问答，还是复杂流程执行，避免一开始就用同一种 AI 形态硬套所有问题。",
    icon: BrainCircuit,
  },
  {
    step: "02",
    title: "定义边界",
    body: "明确系统能做什么、不能做什么，哪里允许自动推进，哪里必须等待确认，把高风险点先画出来。",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "组织链路",
    body: "把模型、记忆、工具、检索、评测和界面连成一条顺畅链路，让用户感受到的是完整体验，而不是碎片能力。",
    icon: Network,
  },
  {
    step: "04",
    title: "持续迭代",
    body: "通过日志、实验、人工反馈和数据回流收敛系统表现，让 AI 不只是首屏惊艳，而是长期可靠。",
    icon: Sparkles,
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#f8fbff] text-slate-950">
      <HomeAmbientBackground />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[min(88vh,760px)]">
        <HeroParticles />
      </div>

      <SiteHeader />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-24 pt-28 sm:px-8 sm:pt-30 lg:px-10">
        <section className="flex flex-1 flex-col gap-12 py-14 lg:gap-14 lg:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-sky-200/80 bg-white/88 px-3 py-1 text-xs font-medium tracking-[0.18em] text-sky-800 uppercase shadow-sm">
              About this site
            </div>

            <TypingHero
              text="我在做真正能被使用的 AI 产品与智能体体验。"
              speed={62}
              className="mt-6 max-w-5xl text-[2.35rem] leading-[1.02] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[3.3rem] lg:text-[4.1rem] lg:whitespace-nowrap"
            />

            <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-slate-600 sm:text-[1.08rem] sm:leading-9">
              这里是我的个人官网，用来整理我对 AI 产品、系统设计和交互体验的理解。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] hover:bg-slate-800"
              >
                <a href="#system-map">
                  看 AI 系统图
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-full border-white/80 bg-white/82 text-slate-900 shadow-[0_12px_28px_rgba(148,163,184,0.12)] hover:bg-white"
              >
                <a href="mailto:hello@gaoyuan.design">合作 / 交流</a>
              </Button>
            </div>
          </div>

          <ScrollReveal delay={0.12} y={28} className="w-full">
            <HeroOrbScene />
          </ScrollReveal>
        </section>

        <section className="grid gap-4 border-t border-sky-100/80 py-16 md:grid-cols-3">
          {worldview.map(({ title, description, icon: Icon }, index) => (
            <ScrollReveal key={title} delay={index * 0.08}>
              <article className={`h-full rounded-[1.75rem] p-6 ${surfaceClass}`}>
                <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <Icon className="size-5 text-sky-600" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </section>

        <section
          id="system-map"
          className="grid gap-8 border-t border-sky-100/80 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center"
        >
          <ScrollReveal>
            <div className="max-w-lg">
              <div className="text-sm font-semibold tracking-[0.22em] text-sky-700 uppercase">
                AI System Map
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                我更习惯把 AI 看成一个系统。
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                对我来说，模型、工具、记忆、边界和界面必须一起被设计。
              </p>

              <div className="mt-8 grid gap-4">
                {capabilityClusters.map(({ title, body, icon: Icon }, index) => (
                  <ScrollReveal key={title} delay={index * 0.08}>
                    <div className={`rounded-[1.5rem] p-5 ${softSurfaceClass}`}>
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                          <Icon className="size-4.5 text-indigo-600" />
                        </div>
                        <div className="text-base font-semibold text-slate-950">
                          {title}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <AiNetwork />
          </ScrollReveal>
        </section>

        <section
          id="principles"
          className="border-t border-sky-100/80 py-16"
        >
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="text-sm font-semibold tracking-[0.22em] text-sky-700 uppercase">
                Principles
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                这是我常用的几个判断原则。
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {principles.map(({ title, description, icon: Icon }, index) => (
              <ScrollReveal key={title} delay={index * 0.08}>
                <article className={`h-full rounded-[1.75rem] p-6 ${surfaceClass}`}>
                  <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <Icon className="size-5 text-sky-600" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="border-t border-sky-100/80 py-16">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="text-sm font-semibold tracking-[0.22em] text-sky-700 uppercase">
                Operating Flow
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                从想法到落地，我通常按这个顺序推进。
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                理解问题，定义边界，组织链路，然后持续迭代。
              </p>
            </div>
          </ScrollReveal>

          <div className="relative mt-12 space-y-0">
            <div
              className="absolute top-6 bottom-6 left-[1.15rem] hidden w-px bg-gradient-to-b from-sky-200 via-indigo-200 to-emerald-200 md:block"
              aria-hidden
            />
            <div className="grid gap-6 md:gap-8">
              {processFlow.map(({ step, title, body, icon: Icon }, i) => (
                <ScrollReveal key={step} delay={i * 0.08}>
                  <div className="relative grid gap-4 md:grid-cols-[auto_1fr] md:items-start md:gap-10">
                    <div className="flex items-start gap-4 md:block">
                      <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-white text-sm font-semibold text-sky-800 shadow-sm">
                        {step}
                      </div>
                      <div className="my-2 h-px flex-1 bg-slate-200 md:hidden" aria-hidden />
                    </div>
                    <article className={`rounded-[1.5rem] bg-gradient-to-br from-white via-white to-sky-50/70 p-6 md:p-8 ${softSurfaceClass}`}>
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                          <Icon className="size-5 text-violet-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-950">
                          {title}
                        </h3>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                        {body}
                      </p>
                    </article>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <ScrollReveal>
          <footer className={`mt-6 rounded-[2rem] px-6 py-10 text-center ${surfaceClass}`}>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600">
              如果你也在思考 AI 如何从模型能力，变成可依赖、可维护、能真正服务用户的产品系统，欢迎和我聊聊具体场景。
            </p>
            <Button
              asChild
              className="mt-6 rounded-full bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] hover:bg-slate-800"
              size="lg"
            >
              <a href="mailto:hello@gaoyuanAI.design">
                hello@ai.design
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </footer>
        </ScrollReveal>
      </div>
    </main>
  );
}
