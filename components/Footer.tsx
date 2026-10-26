import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6">
      <div className="flex items-center justify-between border-t border-fg/10 py-8 text-xs">
        <span className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-tighter">ZA</span>
          <span className="text-fg/80">{site.name}</span>
        </span>
        <a href={`https://${site.domain}`} className="text-muted transition-colors hover:text-fg">
          {site.domain}
        </a>
      </div>
    </footer>
  );
}
