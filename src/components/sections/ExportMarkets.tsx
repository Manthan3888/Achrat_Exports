import { ArrowRight, MapPinned, Ship } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { regions } from "@/lib/data";

export default function ExportMarkets() {
  return (
    <section id="markets" className="relative overflow-hidden bg-ivory-100 py-24 md:py-32" aria-labelledby="markets-title">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Export Markets"
            number="03"
            title={
              <span id="markets-title">
                Six regions, sixty-plus lanes —{" "}
                <em className="font-light italic text-brass-600">one accountable desk.</em>
              </span>
            }
            lead="Indian origin travels to buyers across the GCC, Europe, the Americas, Asia-Pacific and Africa — on schedules we publicly commit to."
          />
          <Reveal delay={220}>
            <a
              href="#global-presence"
              className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-harbor-900 transition-colors hover:text-brass-600"
            >
              <span className="border-b border-brass-500/60 pb-0.5">View the interactive map</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {regions.map((r, i) => (
            <Reveal key={r.id} delay={i * 80} variant="up">
              <article className="card-hover group flex h-full flex-col rounded-2xl border border-ink-900/10 bg-ivory-50 p-6 shadow-[0_10px_30px_-18px_rgba(11,21,32,0.25)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-brass-600/25 bg-brass-500/10 text-brass-600">
                    <MapPinned className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs tracking-widest text-ink-400">
                    {String(r.countries.length).padStart(2, "0")}{" "}
                    {r.countries.length === 1 ? "COUNTRY" : "COUNTRIES"}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[1.45rem] font-medium text-ink-900">
                  {r.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{r.blurb}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {r.countries.map((c) => (
                    <span
                      key={c.iso}
                      className="rounded-full border border-ink-900/12 px-2.5 py-1 text-[0.68rem] font-medium text-ink-600 transition-colors group-hover:border-brass-600/30"
                    >
                      {c.name}
                    </span>
                  ))}
                </div>

                <div className="mt-auto space-y-2 border-t border-ink-900/10 pt-5 [margin-top:1.75rem]">
                  {r.lanes.map((lane) => (
                    <p key={lane} className="flex items-center gap-2 font-mono text-[0.7rem] tracking-wide text-ink-400">
                      <Ship className="h-3.5 w-3.5 shrink-0 text-brass-600" aria-hidden="true" />
                      {lane}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} variant="fade">
          <p className="mt-10 text-xs text-ink-400">
            Indicative mainline transit times, port-to-port. Door and DDP programs
            quoted per shipment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
