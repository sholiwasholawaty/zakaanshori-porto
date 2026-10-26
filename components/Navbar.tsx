"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "products", label: "Products", href: "/#products" },
  { id: "about", label: "About", href: "/#about" },
  { id: "pricing", label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [spy, setSpy] = useState<string>("products");

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSpy(e.target.id)),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ["products", "about"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const active = pathname === "/pricing" ? "pricing" : spy;

  return (
    <header className="sticky top-0 z-30 border-b border-transparent bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-tighter">ZA</span>
          <span className="hidden text-sm text-fg/80 sm:inline">{site.name}</span>
        </Link>
        <nav className="flex items-center gap-5 text-xs">
          {links.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className={`relative pb-1 transition-colors ${
                active === l.id ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {l.label}
              {active === l.id && (
                <>
                  <span className="absolute -right-2.5 top-1/2 h-1 w-1 -translate-y-[60%] rounded-full bg-fg" />
                  <span className="absolute inset-x-0 bottom-0 h-px bg-fg/70" />
                </>
              )}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
