import { ArrowRight, MessageSquare, Share2, Users } from "lucide-react";
import { products } from "@/lib/content";
import { NetworkArt, RoundtableArt, WaveArt } from "./ProductArt";

const visuals = {
  crm: { Icon: Share2, Art: WaveArt },
  hrm: { Icon: Users, Art: NetworkArt },
  roundtable: { Icon: MessageSquare, Art: RoundtableArt },
} as const;

export default function Products() {
  return (
    <section id="products" className="scroll-mt-16 border-b border-fg/10 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-center justify-between text-[11px] tracking-[0.2em] text-muted">
          <h2>SELECTED PRODUCTS</h2>
          <span className="flex items-center gap-3 tracking-normal">
            01 <span className="h-px w-8 bg-fg/30" /> 03
          </span>
        </div>

        <ul className="grid gap-5 md:grid-cols-3">
          {products.map((p) => {
            const { Icon, Art } = visuals[p.id];
            return (
              <li key={p.id} className="flex flex-col overflow-hidden rounded-lg border border-fg/10 bg-fg/[0.015]">
                <div className="p-7 pb-0">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-fg/25">
                    <Icon size={18} strokeWidth={1.4} />
                  </span>
                  <h3 className="mt-5 text-xl font-medium tracking-tight">{p.title}</h3>
                  <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">{p.desc}</p>
                  <a
                    href={p.href}
                    aria-label={`Open ${p.title}`}
                    className="mt-5 grid h-7 w-7 place-items-center rounded-full border border-fg/30 transition-colors hover:bg-fg hover:text-bg"
                  >
                    <ArrowRight size={13} strokeWidth={1.6} />
                  </a>
                </div>
                <div className="relative mt-3 h-52 [mask-image:linear-gradient(to_bottom,transparent,#000_22%)]">
                  <Art />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
