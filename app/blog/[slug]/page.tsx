import { BlogPostTemplate, getBlogPostMetadata } from "@/app/blog/post-page-template";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  return getBlogPostMetadata(slug);
}

export default async function Page(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  return <BlogPostTemplate slug={slug} />;
}
