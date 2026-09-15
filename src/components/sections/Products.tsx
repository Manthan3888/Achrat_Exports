"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Info,
  MapPin,
  MessageSquareQuote,
  Package,
  Scale,
  ScrollText,
  Ship,
  X,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { productCategories, products, type Product } from "@/lib/data";
import { waLink } from "@/lib/site";

export function inquireAbout(productName: string) {
  window.dispatchEvent(
    new CustomEvent<string>("achrat:inquire", { detail: productName })
  );
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function Products() {
  const [category, setCategory] = useState<(typeof productCategories)[number]>("All");
  const [active, setActive] = useState<Product | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const visible = products.filter((p) => category === "All" || p.category === category);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

  return (
    <section id="products" className="relative overflow-hidden bg-harbor-900 py-24 md:py-32" aria-labelledby="products-title">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(70%_50%_at_50%_0%,black,transparent)]" aria-hidden="true" />

      <div className="shell relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            dark
            eyebrow="Product Portfolio"
            number="02"
            title={
              <span id="products-title">
                Sourced with intent,{" "}
                <em className="text-gilt font-light italic">graded for export.</em>
              </span>
            }
            lead="Six traded verticals, each with vetted origins, destination-market compliance and packaging tailored to the buyer’s program."
          />

          {/* category tabs */}
          <Reveal delay={200} className="flex flex-wrap gap-2">
            {productCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full border px-4.5 py-2.5 text-[0.78rem] font-semibold tracking-wide transition-all duration-300 ${
                  category === c
                    ? "border-brass-400 bg-gradient-to-br from-brass-300 to-brass-500 text-harbor-950 shadow-[0_10px_26px_-10px_rgba(201,162,75,0.8)]"
                    : "border-ivory-100/15 text-ivory-100/65 hover:border-brass-500/50 hover:text-brass-300"
                }`}
              >
                {c}
              </button>
            ))}
          </Reveal>
        </div>

        {/* grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3" role="list">
          {visible.map((p, i) => (
            <article
              role="listitem"
              key={`${category}-${p.slug}`}
              style={{ animationDelay: `${i * 80}ms` }}
              className="card-hover group animate-fade-in flex flex-col overflow-hidden rounded-2xl border border-ivory-100/10 bg-harbor-850/70 backdrop-blur-sm [animation-duration:0.7s]"
            >
              <div className="img-zoom relative h-52 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-harbor-900/85 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="rounded-full bg-harbor-950/70 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-brass-300 backdrop-blur-md border border-brass-500/30">
                    {p.category}
                  </span>
                  <span className="rounded-full bg-harbor-950/70 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-ivory-100/75 backdrop-blur-md border border-ivory-100/15">
                    {p.hs}
                  </span>
                </div>
                <h3 className="absolute bottom-4 left-5 right-5 font-display text-[1.35rem] font-medium leading-snug text-ivory-50">
                  {p.name}
                </h3>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <p className="text-sm leading-relaxed text-ivory-100/62">{p.tagline}</p>

                <div className="space-y-2 text-[0.78rem]">
                  <p className="flex items-center gap-2 text-ivory-100/55">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-brass-500" aria-hidden="true" />
                    <span><span className="text-ivory-100/35">Origin —</span> {p.origin}</span>
                  </p>
                  <p className="flex items-center gap-2 text-ivory-100/55">
                    <Globe2 className="h-3.5 w-3.5 shrink-0 text-brass-500" aria-hidden="true" />
                    <span><span className="text-ivory-100/35">To —</span> {p.destinations.join(", ")}</span>
                  </p>
                  <p className="flex items-center gap-2 text-ivory-100/55">
                    <Scale className="h-3.5 w-3.5 shrink-0 text-brass-500" aria-hidden="true" />
                    <span><span className="text-ivory-100/35">MOQ —</span> {p.moq}</span>
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActive(p)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-ivory-100/15 px-4 py-2.5 text-[0.78rem] font-semibold text-ivory-100/85 transition-colors hover:border-brass-500/60 hover:text-brass-300"
                  >
                    Specifications
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => inquireAbout(p.name)}
                    className="btn-sheen inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-br from-brass-300 to-brass-500 px-4 py-2.5 text-[0.78rem] font-semibold text-harbor-950"
                  >
                    Send Inquiry
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* honesty note */}
        <Reveal delay={140} variant="fade">
          <p className="mt-12 flex max-w-3xl items-start gap-3 text-xs leading-relaxed text-ivory-100/40">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brass-500/70" aria-hidden="true" />
            Specifications shown are indicative of commonly traded export grades.
            Final grade confirmation, current pricing, lab reports and samples are
            shared against each specific inquiry.
          </p>
        </Reveal>
      </div>

      {/* ------------------------------ modal ------------------------------ */}
      {active && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-harbor-950/80 p-4 backdrop-blur-md md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} specifications`}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="animate-fade-in relative grid w-full max-w-4xl overflow-hidden rounded-2xl border border-ivory-100/12 bg-harbor-850 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] outline-none md:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative hidden min-h-[420px] md:block">
              <Image src={active.image} alt="" fill sizes="40vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-harbor-900/70 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-5 left-5 flex gap-2">
                <span className="rounded-full border border-brass-500/40 bg-harbor-950/70 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-brass-300 backdrop-blur-md">
                  {active.category}
                </span>
                <span className="rounded-full border border-ivory-100/20 bg-harbor-950/70 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-ivory-100/75 backdrop-blur-md">
                  {active.hs}
                </span>
              </div>
            </div>

            <div className="max-h-[85vh] overflow-y-auto p-7 md:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-brass-400">Export Specification</p>
                  <h3 className="mt-3 font-display text-2xl font-medium text-ivory-50 md:text-3xl">
                    {active.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close specifications"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ivory-100/15 text-ivory-100/70 transition-colors hover:border-brass-500/60 hover:text-brass-300"
                >
                  <X className="h-4.5 w-4.5" aria-hidden="true" />
                </button>
              </div>

              <dl className="mt-7 divide-y divide-ivory-100/10 border-y border-ivory-100/10">
                {active.specs.map((s) => (
                  <div key={s.k} className="grid grid-cols-[38%_62%] gap-3 py-3 text-sm">
                    <dt className="text-ivory-100/45">{s.k}</dt>
                    <dd className="font-medium text-ivory-100/90">{s.v}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-6 space-y-3 text-[0.85rem]">
                <li className="flex items-start gap-3 text-ivory-100/70">
                  <Package className="mt-0.5 h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  <span><strong className="font-semibold text-ivory-100">Packaging:</strong> {active.packaging}</span>
                </li>
                <li className="flex items-start gap-3 text-ivory-100/70">
                  <Scale className="mt-0.5 h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  <span><strong className="font-semibold text-ivory-100">Minimum order:</strong> {active.moq}</span>
                </li>
                <li className="flex items-start gap-3 text-ivory-100/70">
                  <Ship className="mt-0.5 h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  <span><strong className="font-semibold text-ivory-100">Incoterms:</strong> {active.incoterms}</span>
                </li>
                <li className="flex items-start gap-3 text-ivory-100/70">
                  <ScrollText className="mt-0.5 h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  <span><strong className="font-semibold text-ivory-100">Origin:</strong> {active.origin}</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Magnetic className="flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      inquireAbout(active.name);
                    }}
                    className="btn-sheen flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-brass-300 to-brass-500 px-6 py-3.5 text-sm font-semibold text-harbor-950"
                  >
                    Request Quote
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </Magnetic>
                <a
                  href={waLink(`Hello Achrat Exports, I'm interested in ${active.name}. Please share specifications and pricing.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory-100/20 px-6 py-3.5 text-sm font-semibold text-ivory-100 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
                >
                  <MessageSquareQuote className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
