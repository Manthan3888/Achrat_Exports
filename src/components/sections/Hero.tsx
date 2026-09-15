"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, BadgeCheck, Ship } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import Parallax from "@/components/ui/Parallax";
import { stats } from "@/lib/data";

const D = "[animation-duration:1.1s]";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden"
      aria-label="Welcome to Achrat Exports"
    >
      {/* backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <Parallax speed={0.22} className="absolute -inset-y-16 inset-x-0">
          <Image
            src="/images/hero-port.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-harbor-950/92 via-harbor-950/55 to-harbor-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-harbor-950 via-harbor-950/20 to-harbor-950/50" />
        <div className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_30%_45%,black,transparent)]" />
      </div>

      {/* content */}
      <div className="shell relative flex flex-1 items-center pb-28 pt-40 md:pb-36">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="max-w-3xl">
            <p className={`animate-fade-in ${D} eyebrow flex flex-wrap items-center gap-3 text-brass-400`}>
              <span className="hairline w-10" aria-hidden="true" />
              International Trading House · Mumbai ⇄ The World
            </p>

            <h1 className="mt-7 font-display text-[clamp(2.9rem,7.2vw,5.9rem)] font-medium leading-[1.02] tracking-[-0.015em] text-ivory-50">
              <span className="block overflow-hidden">
                <span className={`animate-fade-in block ${D} [animation-delay:0.15s]`}>
                  Connecting Quality
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className={`animate-fade-in block ${D} [animation-delay:0.28s]`}>
                  with <em className="text-gilt font-light italic">Global Markets.</em>
                </span>
              </span>
            </h1>

            <p className={`animate-fade-in ${D} mt-7 max-w-xl text-[1.02rem] leading-relaxed text-ivory-100/70 [animation-delay:0.42s] md:text-lg`}>
              Achrat Exports sources, certifies and ships export-grade agro
              products, spices, textiles and handicrafts from India to{" "}
              <span className="text-brass-300">25+ markets</span> — and brings the
              world’s best industrial goods to Indian shores.
            </p>

            <div className={`animate-fade-in ${D} mt-10 flex flex-wrap items-center gap-4 [animation-delay:0.55s]`}>
              <Magnetic>
                <a
                  href="#contact"
                  className="btn-sheen group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-brass-300 to-brass-500 px-8 py-4 text-sm font-semibold text-harbor-950 shadow-[0_18px_45px_-14px_rgba(201,162,75,0.75)] transition-shadow hover:shadow-[0_24px_60px_-14px_rgba(201,162,75,0.9)]"
                >
                  Get a Quote
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#products"
                  className="inline-flex items-center gap-2.5 rounded-full border border-ivory-100/25 px-8 py-4 text-sm font-semibold text-ivory-100 backdrop-blur-sm transition-colors duration-300 hover:border-brass-400/70 hover:text-brass-300"
                >
                  Explore Products
                </a>
              </Magnetic>
            </div>

            {/* stat strip */}
            <dl className={`animate-fade-in ${D} mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-ivory-100/12 pt-8 [animation-delay:0.7s]`}>
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dt className="order-2 mt-1 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-ivory-100/45">
                    {s.label}
                  </dt>
                  <dd className="order-1 font-display text-2xl font-medium text-ivory-50 md:text-3xl">
                    {s.value}
                    <span className="text-brass-400">{s.suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* floating shipment card */}
          <div className={`animate-fade-in ${D} hidden [animation-delay:0.85s] lg:block`}>
            <div className="animate-float-y">
              <figure className="glass-panel relative mx-auto max-w-[380px] rounded-2xl p-7 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]" aria-label="Sample live trade lane: Mumbai to Jebel Ali">
                {["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((pos) => (
                  <span key={pos} className={`absolute h-3.5 w-3.5 border-brass-500/70 ${pos}`} aria-hidden="true" />
                ))}
                <figcaption className="flex items-center justify-between">
                  <span className="eyebrow text-brass-400">Live Lane · Sea</span>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                </figcaption>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[0.68rem] tracking-widest text-ivory-100/45">BOM</p>
                    <p className="font-display text-xl text-ivory-50">Mumbai</p>
                  </div>
                  <Ship className="mb-1 h-5 w-5 text-brass-400" strokeWidth={1.5} aria-hidden="true" />
                  <div className="text-right">
                    <p className="font-mono text-[0.68rem] tracking-widest text-ivory-100/45">JEA</p>
                    <p className="font-display text-xl text-ivory-50">Jebel Ali</p>
                  </div>
                </div>

                <svg viewBox="0 0 300 44" className="mt-2 w-full" aria-hidden="true">
                  <path d="M4 34 C 80 6, 220 6, 296 30" stroke="rgba(236,211,160,0.25)" strokeWidth="1.2" fill="none" />
                  <path d="M4 34 C 80 6, 220 6, 296 30" stroke="#C9A24B" strokeWidth="1.4" fill="none" className="arc-anim" />
                  <circle cx="4" cy="34" r="3" fill="#C9A24B" />
                  <circle cx="296" cy="30" r="3" fill="#DFBA74" />
                </svg>

                <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-ivory-100/10 pt-5 text-center">
                  {[
                    ["Transit", "3–4 days"],
                    ["Terms", "FOB · CIF"],
                    ["Mode", "FCL / LCL"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-ivory-100/40">{k}</dt>
                      <dd className="mt-1 text-xs font-semibold text-ivory-100">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["BL", "COO", "Phyto", "Fumigation"].map((doc) => (
                    <span key={doc} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-emerald-300">
                      <BadgeCheck className="h-3 w-3" aria-hidden="true" /> {doc}
                    </span>
                  ))}
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        className="group absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory-100/50 transition-colors hover:text-brass-300 md:flex"
        aria-label="Scroll to About section"
      >
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.4em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
