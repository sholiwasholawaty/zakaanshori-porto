import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contact, pricing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing \u2014 Zaka Anshori",
  description: "Pilihan harga: Terima Beres (managed) dan Full Custom Development.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">{pricing.title}</h1>
        <p className="mt-4 max-w-xl text-xl tracking-tight text-fg/55 sm:text-2xl">{pricing.subtitle}</p>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {pricing.plans.map((plan) => (
            <li key={plan.id} className="flex flex-col rounded-lg border border-fg/10 bg-fg/[0.015] p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium tracking-tight">{plan.name}</h2>
                <span className="rounded-full border border-fg/20 px-2.5 py-0.5 font-mono text-[10px] text-muted">
                  {plan.tag}
                </span>
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{plan.audience}</p>

              <dl className="mt-8 divide-y divide-fg/10 border-y border-fg/10">
                {plan.prices.map((p) => (
                  <div key={p.label} className="py-4">
                    <dt className="text-xs text-muted">{p.label}</dt>
                    <dd className="mt-1 text-2xl font-medium tracking-tight">{p.value}</dd>
                    {p.hint && <p className="mt-1 text-xs text-muted">{p.hint}</p>}
                  </div>
                ))}
              </dl>

              <ul className="mt-6 space-y-3 text-sm">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-fg/80">
                    <Check size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-fg/60" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={contact.href}
                className="group mt-8 inline-flex items-center gap-2 self-start text-sm"
              >
                {contact.label}
                <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-xl text-xs leading-relaxed text-muted">{pricing.note}</p>
      </main>
      <Footer />
    </>
  );
}
