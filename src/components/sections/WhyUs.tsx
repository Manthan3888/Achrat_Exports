import { FileCheck2, Handshake, Headset, Route, SearchCheck, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { pillars } from "@/lib/data";

const icons = [ShieldCheck, FileCheck2, Route, SearchCheck, Handshake, Headset];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative bg-ivory-50 py-24 md:py-32" aria-labelledby="why-title">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Why Choose Us"
          number="05"
          title={
            <span id="why-title">
              The difference is in{" "}
              <em className="font-light italic text-brass-600">the discipline.</em>
            </span>
          }
          lead="Anyone can book a container. We make sure what’s inside it clears, sells and reorders."
          className="max-w-2xl"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p.title} delay={(i % 3) * 90} variant="fade" className="h-full">
                <article className="group relative flex h-full flex-col gap-4 bg-ivory-50 p-8 transition-colors duration-500 hover:bg-harbor-900">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-brass-600/25 bg-brass-500/10 text-brass-600 transition-colors duration-500 group-hover:border-brass-400/40">
                      <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs tracking-widest text-ink-400 transition-colors duration-500 group-hover:text-ivory-100/30" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-[1.3rem] font-medium text-ink-900 transition-colors duration-500 group-hover:text-ivory-50">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-600 transition-colors duration-500 group-hover:text-ivory-100/60">
                    {p.copy}
                  </p>
                  <span className="hairline mt-auto opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
