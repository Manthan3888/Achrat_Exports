import { ArrowUpRight, Container, Factory, Landmark, Warehouse } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { importSolutions } from "@/lib/data";

const icons = [Factory, Container, Landmark, Warehouse];

export default function ImportSolutions() {
  return (
    <section id="import-solutions" className="relative overflow-hidden bg-harbor-950 py-24 md:py-32" aria-labelledby="imports-title">
      {/* ambience */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-harbor-600/25 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-brass-600/12 blur-[150px]" />
      </div>

      <div className="shell relative">
        <SectionHeading
          dark
          eyebrow="Import Solutions"
          number="04"
          title={
            <span id="imports-title">
              Trade runs both ways.{" "}
              <em className="text-gilt font-light italic">So do we.</em>
            </span>
          }
          lead="Beyond exports, our import desk sources machinery, industrial inputs and raw materials into India — with the same discipline on the inbound lane."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {importSolutions.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={s.title} delay={i * 90} variant="up">
                <article className="card-hover group relative h-full overflow-hidden rounded-2xl border border-ivory-100/10 bg-harbor-850/60 p-8 backdrop-blur-sm">
                  <span className="absolute -right-2 -top-4 font-display text-[6.5rem] font-semibold leading-none text-ivory-100/[0.045] transition-colors duration-500 group-hover:text-brass-500/10" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-brass-500/30 bg-brass-500/10 text-brass-400">
                    <Icon className="h-5.5 w-5.5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-medium text-ivory-50 md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory-100/58">
                    {s.copy}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* sourcing strip */}
        <Reveal delay={160} variant="fade">
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-ivory-100/10 bg-harbor-900/70 p-7 md:flex-row md:items-center">
            <div>
              <p className="eyebrow text-brass-400">Sourcing corridors</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["China", "Germany", "Japan", "South Korea", "UAE", "USA", "Vietnam"].map((c) => (
                  <span key={c} className="rounded-full border border-ivory-100/15 px-3.5 py-1.5 text-xs font-medium text-ivory-100/70">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <Magnetic>
              <a
                href="#contact"
                className="btn-sheen group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-brass-500/50 px-6 py-3.5 text-sm font-semibold text-brass-300 transition-colors hover:bg-brass-500/10"
              >
                Discuss an Import Brief
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
