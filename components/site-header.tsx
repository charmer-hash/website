"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-5 pt-5 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <header className="flex items-center rounded-full border border-white/65 bg-white/58 px-3 py-3 shadow-[0_14px_40px_rgba(148,163,184,0.16)] backdrop-blur-xl md:px-4">
          <nav className="flex items-center rounded-full border border-white/70 bg-white/55 p-1 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 transition",
                    isActive
                      ? "bg-white/90 font-medium text-slate-950 shadow-[0_6px_18px_rgba(148,163,184,0.16)]"
                      : "text-slate-500 hover:bg-white/70 hover:text-slate-950",
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
      </div>
    </div>
  );
}
