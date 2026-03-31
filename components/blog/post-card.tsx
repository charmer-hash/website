import Link from "next/link";

import { cn } from "@/lib/utils";
import { type BlogPost, formatBlogDate } from "@/lib/blog";

type PostCardProps = {
  post: BlogPost;
  featured?: boolean;
  className?: string;
};

export function PostCard({ post, featured = false, className }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/82 p-5 shadow-[0_16px_40px_rgba(148,163,184,0.1)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(148,163,184,0.14)]",
        featured && "p-6 sm:p-7",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-30",
          post.accent,
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.82),transparent_30%)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
          <span>{post.eyebrow}</span>
          <span>{post.category}</span>
        </div>

        <div className="mt-6 space-y-3">
          <h2
            className={cn(
              "max-w-xl text-[1.4rem] font-semibold tracking-tight text-slate-950",
              featured && "text-[1.9rem] sm:text-[2.25rem]",
            )}
          >
            {post.title}
          </h2>
          <p
            className={cn(
              "max-w-2xl text-sm leading-7 text-slate-600",
              featured && "max-w-2xl text-[0.98rem] sm:text-base",
            )}
          >
            {post.excerpt}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200/90 bg-white/72 px-3 py-1 text-[0.72rem] text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-8 text-sm text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-950 transition group-hover:translate-x-1">
            阅读全文
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
