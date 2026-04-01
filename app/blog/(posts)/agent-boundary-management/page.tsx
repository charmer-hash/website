import { BlogPostTemplate, getBlogPostMetadata } from "@/app/blog/post-page-template";

export const dynamic = "force-static";

export async function generateMetadata() {
  return getBlogPostMetadata("agent-boundary-management");
}

export default function Page() {
  return <BlogPostTemplate slug="agent-boundary-management" />;
}
