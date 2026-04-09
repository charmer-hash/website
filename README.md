# Website

这个项目现在使用 Next.js 的纯静态导出模式。

## 内容维护

博客内容只需要维护 [`content/blog`](/Users/bty/Desktop/website/content/blog) 里的 Markdown 文件。

- 文件名就是文章 `slug`
- 构建前会自动生成 [`lib/generated/blog.generated.ts`](/Users/bty/Desktop/website/lib/generated/blog.generated.ts)
- 不需要手动编辑 generated 文件

## 本地开发

```bash
pnpm dev
```

## 静态构建

```bash
pnpm build
```

构建完成后，静态站点产物会输出到 `out/`。

## 本地预览静态站点

```bash
pnpm preview:static
```

## 部署

把 `out/` 目录部署到任意静态托管平台即可，例如：

- Cloudflare Pages
- Netlify
- Vercel Static Hosting
- Nginx / OSS / S3 + CDN

如果你使用 Cloudflare Pages，把 `out/` 作为发布目录即可，不再需要 OpenNext 或 Worker。
