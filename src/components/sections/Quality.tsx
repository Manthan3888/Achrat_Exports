import { BadgeCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { complianceBadges, qualitySteps } from "@/lib/data";

export default function Quality() {
  return (
    <section id="quality" className="relative overflow-hidden bg-harbor-900 py-24 md:py-32" aria-labelledby="quality-title">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_50%_at_50%_100%,black,transparent)]" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          dark
          eyebrow="Quality & Compliance"
          number="06"
          title={
            <span id="quality-title">
              Five gates between a good product{" "}
              <em className="text-gilt font-light italic">and a delivered one.</em>
            </span>
          }
          lead="Every consignment passes the same five gates — no shortcuts for familiar suppliers, no exceptions for urgent sailings."
        />

        {/* process steps */}
        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          <span className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brass-500/35 to-transparent lg:block" aria-hidden="true" />
          {qualitySteps.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 110} variant="up" className="relative">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-brass-500/45 bg-harbor-850 font-display text-lg font-semibold text-brass-400 shadow-[0_0_0_6px_rgba(201,162,75,0.07)]">
                    {s.step}
                  </span>
                  <span className="hairline flex-1 lg:hidden" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-medium text-ivory-50">{s.title}</h3>
                <p className="text-[0.84rem] leading-relaxed text-ivory-100/55">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* compliance badges */}
        <Reveal delay={140} variant="fade" className="mt-20">
          <div className="rounded-2xl border border-ivory-100/10 bg-harbor-850/60 p-8 backdrop-blur-sm md:p-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h3 className="font-display text-xl font-medium text-ivory-50 md:text-2xl">
                Registration & compliance framework
              </h3>
              <p className="text-xs text-ivory-100/40">
                Certificates & registration numbers shared during due diligence.
              </p>
            </div>
            <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {complianceBadges.map((b, i) => (
                <li
                  key={b}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="flex items-center gap-3 rounded-xl border border-ivory-100/10 bg-harbor-900/60 px-4 py-3.5 text-[0.8rem] font-medium text-ivory-100/75 transition-colors duration-300 hover:border-brass-500/40 hover:text-ivory-50"
                >
                  <BadgeCheck className="h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
