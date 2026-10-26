import { site } from "@/lib/content";
import OrbitField from "./OrbitField";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-4 px-6 py-12 lg:grid-cols-[1fr_1.15fr]">
        <div className="relative z-10">
          <h1 className="rise text-5xl font-semibold tracking-tight sm:text-6xl" style={delay(100)}>
            {site.name}.
          </h1>
          <p className="rise mt-3 text-2xl font-medium tracking-tight text-fg/60 sm:text-3xl" style={delay(280)}>
            {site.headline}
          </p>
          <p className="rise mt-1 text-2xl tracking-tight text-fg/45 sm:text-3xl" style={delay(460)}>
            {site.tagline}
          </p>
        </div>

        <div className="rise relative mx-auto aspect-square w-full max-w-[640px]" style={delay(300)}>
          <OrbitField />
        </div>
      </div>

      <a
        href="#products"
        className="absolute bottom-8 left-6 hidden items-end gap-3 text-[11px] leading-tight text-muted transition-colors hover:text-fg md:flex lg:left-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        <span className="h-10 w-px bg-fg/30" />
        <span>
          Scroll
          <br />
          to explore
        </span>
      </a>
    </section>
  );
}
