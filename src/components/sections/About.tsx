import Image from "next/image";
import { ArrowUpRight, Check, Compass } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import Counter from "@/components/ui/Counter";
import { stats } from "@/lib/data";

const highlights = [
  "India-headquartered with a Middle-East trade desk",
  "Multi-vertical: agro, spices, textiles & handicrafts",
  "Pre-qualified, audit-verified supplier network",
  "Documentation engineered for first-time clearance",
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ivory-50 py-24 md:py-32" aria-labelledby="about-title">
      <div className="shell grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <div>
          <SectionHeading
            eyebrow="About Achrat Exports"
            number="01"
            title={
              <span id="about-title">
                A trading house measured by{" "}
                <em className="font-light italic text-brass-600">cargoes delivered,</em>{" "}
                not promises made.
              </span>
            }
          />
          <Reveal delay={220}>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-600">
              From our headquarters in Mumbai and a dedicated desk in Dubai, we
              manage the full arc of international trade — sourcing at origin,
              quality at the factory gate, paperwork before it’s asked for, and
              freight that arrives when the contract says it will.
            </p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-600">
              We work as an extension of our buyers’ procurement teams and our
              suppliers’ export desks — one accountable partner across time
              zones, currencies and customs regimes.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal as="li" key={h} delay={280 + i * 70} variant="up">
                <span className="flex items-start gap-3 text-sm font-medium text-ink-900">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-harbor-900">
                    <Check className="h-3 w-3 text-brass-400" aria-hidden="true" />
                  </span>
                  {h}
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={520}>
            <a
              href="#why-us"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-harbor-900 transition-colors hover:text-brass-600"
            >
              <span className="border-b border-brass-500/60 pb-0.5">See how we work</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        {/* imagery */}
        <Reveal variant="right" delay={150} className="relative">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-40 w-40 rounded-tl-[2rem] border-l-2 border-t-2 border-brass-500/50" aria-hidden="true" />
            <figure className="img-zoom relative overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(11,21,32,0.5)]">
              <Parallax speed={0.1}>
                <Image
                  src="/images/about-operations.jpg"
                  alt="Achrat Exports operations team inspecting export cartons inside a modern warehouse"
                  width={880}
                  height={1040}
                  className="h-auto w-full scale-[1.12] object-cover"
                />
              </Parallax>
            </figure>

            {/* floating badge */}
            <div className="glass-panel absolute -bottom-8 -left-4 max-w-[240px] rounded-2xl p-5 shadow-[0_30px_60px_-25px_rgba(3,8,14,0.7)] md:-left-12">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brass-500/15">
                  <Compass className="h-5 w-5 text-brass-400" aria-hidden="true" />
                </span>
                <p className="font-display text-lg leading-tight text-ivory-50">
                  Mumbai HQ
                  <span className="block text-xs font-sans font-normal text-ivory-100/55">+ Dubai trade desk</span>
                </p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ivory-100/55">
                Two desks, one accountable contract — covering IST and GST business hours.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* counters */}
      <div className="shell mt-24 md:mt-32">
        <Reveal variant="fade">
          <div className="grid grid-cols-2 gap-y-10 border-y border-ink-900/10 py-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 text-center md:text-left ${
                  i > 0 ? "md:border-l md:border-ink-900/10" : ""
                }`}
              >
                <p className="font-display text-4xl font-medium text-harbor-900 md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ink-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
