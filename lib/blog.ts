import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { cache } from "react";
import "server-only";

const blogContentDir = path.join(process.cwd(), "content", "blog");
const defaultAccent = "from-sky-400/30 via-cyan-300/10 to-transparent";

export type BlogPostFrontmatter = {
  title: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  eyebrow: string;
  featured?: boolean;
  tags: string[];
  accent: string;
  hero: {
    kicker: string;
    summary: string;
  };
};

export type BlogPost = BlogPostFrontmatter & {
  slug: string;
  content: string;
};

type RawFrontmatter = Partial<BlogPostFrontmatter>;
type RawHero = Partial<BlogPostFrontmatter["hero"]>;

export const getAllPosts = cache(function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogContentDir)) {
    return [];
  }

  return fs
    .readdirSync(blogContentDir)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(blogContentDir, fileName);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      const slug = path.basename(fileName, ".md");

      return normalizePost(slug, content.trim(), data as RawFrontmatter);
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getFeaturedPost() {
  return getAllPosts().find((post) => post.featured) ?? getAllPosts()[0];
}

export function getRelatedPosts(slug: string, limit = 2) {
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function normalizePost(slug: string, content: string, data: RawFrontmatter): BlogPost {
  const title = toNonEmptyString(data.title) ?? getMarkdownTitle(content) ?? humanizeSlug(slug);
  const excerpt =
    toNonEmptyString(data.excerpt) ?? getExcerptFromContent(content) ?? `${title} 的内容摘要。`;
  const description = toNonEmptyString(data.description) ?? excerpt;
  const publishedAt = resolvePublishedAt(data.publishedAt);
  const readingTime = toNonEmptyString(data.readingTime) ?? estimateReadingTime(content);
  const category = toNonEmptyString(data.category) ?? "Notes";
  const eyebrow = toNonEmptyString(data.eyebrow) ?? `Essay ${publishedAt.slice(5).replace("-", ".")}`;
  const accent = toNonEmptyString(data.accent) ?? defaultAccent;
  const heroData: RawHero =
    data.hero && typeof data.hero === "object" ? (data.hero as RawHero) : {};
  const heroKicker =
    toNonEmptyString(heroData.kicker) ?? excerpt;
  const heroSummary =
    toNonEmptyString(heroData.summary) ?? description;

  return {
    slug,
    title,
    excerpt,
    description,
    publishedAt,
    readingTime,
    category,
    eyebrow,
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [],
    accent,
    hero: {
      kicker: heroKicker,
      summary: heroSummary,
    },
    content,
  };
}

function resolvePublishedAt(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string" && value.trim()) {
    const normalized = value.trim().toLowerCase();

    if (normalized === "today" || normalized === "now" || normalized === "current") {
      return new Date().toISOString().slice(0, 10);
    }

    return value.trim();
  }

  return new Date().toISOString().slice(0, 10);
}

function toNonEmptyString(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function getMarkdownTitle(content: string) {
  const match = content.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || null;
}

function getExcerptFromContent(content: string) {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => !block.startsWith("#"))
    .filter((block) => !block.startsWith("!"))
    .map(stripMarkdown)
    .map((block) => block.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const firstParagraph = paragraphs[0];
  if (!firstParagraph) {
    return null;
  }

  return firstParagraph.length > 120 ? `${firstParagraph.slice(0, 117)}...` : firstParagraph;
}

function estimateReadingTime(content: string) {
  const text = stripMarkdown(content);
  const wordCount = text
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));

  return `${minutes} min read`;
}

function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~]/g, "")
    .trim();
}

function humanizeSlug(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
