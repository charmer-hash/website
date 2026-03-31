import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ReactElement } from "react";

import { MermaidDiagram } from "@/components/blog/mermaid-diagram";
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
  const { content } = await compileMDX({
    source: post.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: {
      h2: (props) => (
        <h2
          className="mt-12 text-2xl font-semibold tracking-tight text-slate-950 first:mt-0"
          {...props}
        />
      ),
      p: (props) => (
        <p className="text-base leading-8 text-slate-700" {...props} />
      ),
      h3: (props) => (
        <h3 className="mt-8 text-xl font-semibold tracking-tight text-slate-950" {...props} />
      ),
      pre: ({ children }) => {
        const child = children as ReactElement<{ className?: string; children?: string }>;
        const className = child?.props?.className ?? "";

        if (className.includes("language-mermaid")) {
          return <MermaidDiagram chart={String(child.props.children ?? "").trim()} />;
        }

        return (
          <pre className="overflow-x-auto rounded-[1.4rem] border border-slate-200 bg-slate-950 px-5 py-4 text-sm leading-7 text-slate-100 shadow-[0_16px_36px_rgba(15,23,42,0.12)]">
            {children}
          </pre>
        );
      },
      code: (props) => (
        <code
          className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800"
          {...props}
        />
      ),
      ul: (props) => <ul className="my-6 list-disc space-y-3 pl-6" {...props} />,
      ol: (props) => <ol className="my-6 list-decimal space-y-3 pl-6" {...props} />,
      li: (props) => (
        <li className="text-base leading-8 text-slate-700 marker:text-slate-400" {...props} />
      ),
      table: (props) => (
        <div className="my-8 overflow-x-auto rounded-[1.5rem] border border-slate-200/90 bg-white shadow-[0_14px_34px_rgba(148,163,184,0.08)]">
          <table
            className="min-w-full border-collapse text-left text-[0.92rem] leading-7 text-slate-700"
            {...props}
          />
        </div>
      ),
      thead: (props) => <thead className="bg-slate-50/90 text-slate-950" {...props} />,
      tbody: (props) => <tbody className="divide-y divide-slate-200" {...props} />,
      tr: (props) => <tr className="divide-x divide-slate-200" {...props} />,
      th: (props) => (
        <th
          className="px-5 py-4 text-[0.8rem] font-semibold tracking-[0.08em] text-slate-500 uppercase whitespace-nowrap"
          {...props}
        />
      ),
      td: (props) => <td className="px-5 py-4 align-top leading-7 text-slate-700" {...props} />,
      hr: (props) => <hr className="my-10 border-slate-200" {...props} />,
      blockquote: (props) => (
        <blockquote
          className="my-8 border-l-2 border-sky-300 pl-5 text-base leading-8 text-slate-600"
          {...props}
        />
      ),
      strong: (props) => <strong className="font-semibold text-slate-950" {...props} />,
      a: (props) => (
        <a
          className="text-sky-700 underline decoration-sky-200 underline-offset-4"
          {...props}
        />
      ),
    },
  });

  return (
    <div className="py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_17rem] lg:gap-10">
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

          <div
            className={`mt-8 rounded-[1.75rem] bg-white/82 p-6 sm:p-8 lg:p-10 xl:px-12 ${surfaceClass}`}
          >
            <div className="max-w-none space-y-5">
              {content}
            </div>
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
