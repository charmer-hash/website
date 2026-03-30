import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  formatBlogDate,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";

const surfaceClass =
  "border border-white/80 bg-white/78 shadow-[0_18px_44px_rgba(148,163,184,0.12)] backdrop-blur-sm";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | BTY",
    };
  }

  return {
    title: `${post.title} | BTY Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <div className="py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
        <article>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft className="size-4" />
            返回博客列表
          </Link>

          <header className={`mt-6 rounded-[1.75rem] p-6 sm:p-8 ${surfaceClass}`}>
            <div className="text-xs uppercase tracking-[0.24em] text-sky-700">
              {post.eyebrow} · {post.category}
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              {post.hero.kicker}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              {post.hero.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4" />
                {post.readingTime}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className={`mt-8 rounded-[1.75rem] bg-white/82 p-6 sm:p-8 lg:p-10 ${surfaceClass}`}>
            <div className="space-y-12">
              {post.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-12 rounded-[1.75rem] border border-slate-200 bg-slate-50/75 p-6">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Key Takeaways
              </div>
              <div className="mt-5 grid gap-3">
                {post.takeaways.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white bg-white px-4 py-3 text-sm leading-7 text-slate-700 shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className={`rounded-[1.75rem] p-5 ${surfaceClass}`}>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Reading context
            </div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <p>这篇文章属于 {post.category} 主题。</p>
              <p>写法偏方法论拆解，适合和产品设计、工作流设计一起看。</p>
            </div>
          </div>

          <div className={`rounded-[1.75rem] p-5 ${surfaceClass}`}>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Continue reading
            </div>
            <div className="mt-4 space-y-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {relatedPost.category}
                  </div>
                  <div className="mt-2 text-sm font-semibold leading-6 text-slate-950">
                    {relatedPost.title}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">
                    {relatedPost.excerpt}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 w-full rounded-full border-white/80 bg-white/78 text-slate-950 shadow-[0_12px_28px_rgba(148,163,184,0.12)] hover:bg-white"
          >
            <Link href="/blog">
              查看更多文章
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
