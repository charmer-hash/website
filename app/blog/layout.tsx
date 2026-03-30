import { SiteHeader } from "@/components/site-header";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#f8fbff] text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.28),transparent_24%),radial-gradient(circle_at_85%_16%,rgba(196,181,253,0.18),transparent_22%),linear-gradient(180deg,#f8fbff_0%,#f6fbff_42%,#eef7ff_100%)]" />
      <SiteHeader />

      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-30 lg:px-10">
        {children}
      </div>
    </main>
  );
}
