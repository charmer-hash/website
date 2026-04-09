import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Gaoyuan",
  description: "关于 AI 产品、Agent 工作流和个人表达的文章列表。",
};

export const dynamic = "force-static";

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const restPosts = featuredPost
    ? posts.filter((post) => post.slug !== featuredPost.slug)
    : [];

  return (
    <div className="py-10 sm:py-14">
      <section className="border-b border-sky-100/80 pb-10 sm:pb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/88 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-sky-700 shadow-sm">
            <BookOpen className="size-3.5 text-sky-600" />
            Blog
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.8rem]">
            关于 AI 产品、系统设计和个人判断的文章目录。
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-[1.02rem]">
            我把长文、实验记录和方法论整理在这里。整体会尽量保持简洁，像一份持续更新的阅读目录。
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="mt-8 h-11 rounded-full border-white/80 bg-white/84 text-slate-900 shadow-[0_12px_28px_rgba(148,163,184,0.1)] hover:bg-white"
          >
            <Link href="/">
              返回首页
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {featuredPost ? (
        <section className="pt-10 sm:pt-12">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <div className="text-[0.72rem] uppercase tracking-[0.24em] text-slate-400">
                Featured
              </div>
              <h2 className="mt-2 text-[1.65rem] font-semibold tracking-tight text-slate-950">
                推荐阅读
              </h2>
            </div>
          </div>

          <PostCard post={featuredPost} featured />
        </section>
      ) : null}

      <section className="pt-10 sm:pt-12">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-[0.72rem] uppercase tracking-[0.24em] text-slate-400">
              Archive
            </div>
            <h2 className="mt-2 text-[1.65rem] font-semibold tracking-tight text-slate-950">
              全部文章
            </h2>
          </div>
          <div className="text-sm text-slate-400">{posts.length} 篇</div>
        </div>

        {posts.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {(featuredPost ? restPosts : posts).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-white/80 bg-white/82 p-8 text-slate-600 shadow-[0_16px_40px_rgba(148,163,184,0.1)]">
            还没有文章，直接在 `content/blog` 里新增 Markdown 文件即可。
          </div>
        )}
      </section>
    </div>
  );
}
