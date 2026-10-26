import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="scroll-mt-16">
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-6 pt-20 md:grid-cols-[1fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-sm md:mx-0">
          <Image
            src="/zaka.png"
            alt="Portrait of Zaka Anshori"
            width={325}
            height={286}
            priority={false}
            className="h-auto w-full [mask-image:linear-gradient(to_bottom,#000_75%,transparent)]"
          />
        </div>

        <div className="pb-16 md:pb-24">
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
            {site.aboutTitle}
            <br />
            <span className="text-fg/55">{site.aboutSubtitle}</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{site.aboutBody}</p>
          <a
            href={site.aboutHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 text-sm"
          >
            More about me
            <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
