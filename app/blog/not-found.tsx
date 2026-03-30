import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function BlogNotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/80 bg-white/80 p-8 text-center shadow-[0_18px_44px_rgba(148,163,184,0.12)] backdrop-blur sm:p-10">
        <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
          404 · Article Missing
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          这篇文章暂时不存在，或者还没有发布。
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          你可以先回到博客列表继续浏览，或者回首页看看这整个站点现在是怎么组织 AI 内容的。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="h-11 rounded-full bg-slate-950 text-white hover:bg-slate-800"
          >
            <Link href="/blog">返回博客</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 rounded-full border-white/80 bg-white text-slate-950 hover:bg-slate-50"
          >
            <Link href="/">回到首页</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
