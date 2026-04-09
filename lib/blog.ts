import { blogPosts } from "@/lib/generated/blog.generated";

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

export function getAllPosts(): BlogPost[] {
  return blogPosts
    .map((post) => ({
      ...post,
      tags: [...post.tags],
      hero: { ...post.hero },
    }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

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
