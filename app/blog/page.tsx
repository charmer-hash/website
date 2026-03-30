import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";

const surfaceClass =
  "border border-white/80 bg-white/78 shadow-[0_18px_44px_rgba(148,163,184,0.12)] backdrop-blur-sm";

export const metadata: Metadata = {
  title: "Blog | BTY",
  description: "关于 AI 产品、Agent 工作流和个人表达的文章列表。",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const restPosts = posts.filter((post) => post.slug !== featuredPost.slug);

  return (
    <div className="py-10 sm:py-14">
      <section className="grid gap-8 border-b border-sky-100/80 pb-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/88 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-sky-700 shadow-sm">
            <BookOpen className="size-3.5 text-sky-600" />
            Essays & Notes
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            一个围绕 AI 系统、产品判断和长期写作的文章库。
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            这里收录我的长文、实验记录和方法论拆解。列表页像目录，详情页像阅读器，目标不是堆内容，而是逐步构成一套清晰的工作语境。
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className={`rounded-[1.75rem] p-4 ${surfaceClass}`}>
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Posts</div>
              <div className="mt-2 text-3xl font-semibold text-slate-950">{posts.length}</div>
            </div>
            <div className={`rounded-[1.75rem] p-4 ${surfaceClass}`}>
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Themes</div>
              <div className="mt-2 text-3xl font-semibold text-slate-950">3</div>
            </div>
            <div className={`rounded-[1.75rem] p-4 ${surfaceClass}`}>
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Tone</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">Clear, applied, opinionated</div>
            </div>
          </div>
        </div>

        <div className={`rounded-[1.75rem] p-6 sm:p-7 ${surfaceClass}`}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-emerald-600">
            <Sparkles className="size-3.5 text-emerald-500" />
            Editorial direction
          </div>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
            <p>我更关心 AI 如何进入真实产品，而不只是停留在功能演示。</p>
            <p>所以这里的文章会同时讨论交互、系统边界、工作流、内容结构，以及人在回路中的位置。</p>
            <p>它既是博客，也是这个个人网站真正的核心界面。</p>
          </div>
          <Button
            asChild
            size="lg"
            className="mt-8 h-11 rounded-full bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] hover:bg-slate-800"
          >
            <Link href="/">
              返回首页
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="pt-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Featured essay
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              本周主推文章
            </h2>
          </div>
        </div>

        <PostCard post={featuredPost} featured />
      </section>

      <section className="pt-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Archive
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              全部文章
            </h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {restPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
