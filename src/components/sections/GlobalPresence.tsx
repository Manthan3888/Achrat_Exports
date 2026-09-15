"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Compass, Ship } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { hubs, regions } from "@/lib/data";
import { arcPath, countries, graticule, MAP_H, MAP_W, project } from "@/lib/world";

const INDIA_ISO = "356";

const labelledHubs = new Set([
  "Jebel Ali",
  "Rotterdam",
  "New York",
  "Singapore",
  "Sydney",
  "Santos",
]);

type Tip = { x: number; y: number; name: string } | null;

export default function GlobalPresence() {
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [tip, setTip] = useState<Tip>(null);
  const [inView, setInView] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const servedSet = useMemo(
    () => new Set(regions.flatMap((r) => r.countries.map((c) => c.iso))),
    []
  );
  const activeSet = useMemo(() => {
    if (activeRegion === "all") return servedSet;
    const region = regions.find((r) => r.id === activeRegion);
    return new Set(region ? region.countries.map((c) => c.iso) : []);
  }, [activeRegion, servedSet]);

  const activeRegionData = regions.find((r) => r.id === activeRegion);

  const arcs = useMemo(() => {
    const from: [number, number] = [hubs.mumbai.lon, hubs.mumbai.lat];
    return hubs.destinations.map((h) => ({
      name: h.name,
      d: arcPath(from, [h.lon, h.lat], 0.14),
      pos: project(h.lon, h.lat),
    }));
  }, []);

  const hq = project(hubs.mumbai.lon, hubs.mumbai.lat);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setInView(true),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function moveTip(e: React.PointerEvent, name: string) {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top, name });
  }

  const totalMarkets = regions.reduce((n, r) => n + r.countries.length, 0);

  return (
    <section
      id="global-presence"
      className="relative overflow-hidden bg-ivory-50 py-24 md:py-32"
      aria-labelledby="global-title"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Global Presence"
          number="07"
          title={
            <span id="global-title">
              Where Indian origin meets{" "}
              <em className="font-light italic text-brass-600">world demand.</em>
            </span>
          }
          lead="An interactive view of our active trade corridors — hover a market, filter a region, follow the lanes out of Mumbai."
        />

        {/* region filter */}
        <Reveal delay={180} className="mt-12">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter markets by region">
            {[{ id: "all", name: "All Regions" }, ...regions].map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={activeRegion === r.id}
                onClick={() => setActiveRegion(r.id)}
                className={`rounded-full border px-4 py-2 text-[0.74rem] font-semibold tracking-wide transition-all duration-300 ${
                  activeRegion === r.id
                    ? "border-harbor-900 bg-harbor-900 text-ivory-50 shadow-[0_10px_24px_-12px_rgba(11,21,32,0.6)]"
                    : "border-ink-900/15 bg-transparent text-ink-600 hover:border-brass-600/50 hover:text-harbor-900"
                }`}
              >
                {r.name}
                {"countries" in r && (
                  <span className={`ml-1.5 font-mono text-[0.62rem] ${activeRegion === r.id ? "text-brass-400" : "text-ink-400"}`}>
                    {r.countries.length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div key={activeRegion} className="animate-fade-in mt-4 min-h-6 text-sm text-ink-600" aria-live="polite">
            {activeRegionData ? (
              <span>
                <span className="font-semibold text-harbor-900">{activeRegionData.name} —</span>{" "}
                {activeRegionData.blurb}
                <span className="ml-2 hidden font-mono text-xs text-ink-400 md:inline">
                  {activeRegionData.lanes[0]}
                </span>
              </span>
            ) : (
              <span>
                <span className="font-semibold text-harbor-900">{totalMarkets} active markets</span> across 6
                regions — every lane quoting FOB, CIF and DAP terms.
              </span>
            )}
          </div>
        </Reveal>

        {/* map panel */}
        <Reveal delay={120} variant="zoom" className="mt-8">
          <div
            ref={panelRef}
            className={`relative overflow-hidden rounded-3xl border border-ink-900/10 bg-[#fbfaf4] p-3 shadow-[0_40px_90px_-50px_rgba(11,21,32,0.45)] md:p-6 ${inView ? "is-visible" : ""}`}
          >
            <div className="pointer-events-none absolute right-5 top-5 hidden items-center gap-2 text-ink-400 md:flex" aria-hidden="true">
              <Compass className="h-4 w-4 animate-spin-slow" />
              <span className="font-mono text-[0.62rem] tracking-[0.3em]">19.07°N · 72.87°E</span>
            </div>

            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="h-auto w-full"
              role="img"
              aria-label={`World map showing Achrat Exports trade lanes from Mumbai to ${totalMarkets} markets across ${regions.length} regions`}
            >
              <defs>
                <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#DFBA74" />
                  <stop offset="100%" stopColor="#A5802F" />
                </linearGradient>
                <linearGradient id="harborGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#123150" />
                  <stop offset="100%" stopColor="#061019" />
                </linearGradient>
              </defs>

              {/* graticule */}
              <path d={graticule} fill="none" stroke="#0B1520" strokeOpacity="0.055" strokeWidth="0.5" />

              {/* countries */}
              {countries.map((c) => {
                const served = servedSet.has(c.id);
                const isIndia = c.id === INDIA_ISO;
                const inActive = activeSet.has(c.id);
                const dim = activeRegion !== "all" && served && !inActive;
                return (
                  <path
                    key={c.id}
                    d={c.d}
                    className="map-country"
                    fill={isIndia ? "url(#harborGrad)" : served ? "url(#brassGrad)" : "#0B1520"}
                    fillOpacity={isIndia ? 0.96 : served ? (dim ? 0.25 : 0.88) : 0.06}
                    stroke={served || isIndia ? "#fbfaf4" : "transparent"}
                    strokeWidth={0.4}
                    style={{
                      cursor: served ? "pointer" : "default",
                      filter: isIndia ? "drop-shadow(0 4px 10px rgba(6,16,25,0.35))" : undefined,
                    }}
                    onPointerEnter={served ? (e) => moveTip(e, c.name) : undefined}
                    onPointerMove={served ? (e) => moveTip(e, c.name) : undefined}
                    onPointerLeave={served ? () => setTip(null) : undefined}
                  >
                    {served && <title>{c.name}</title>}
                  </path>
                );
              })}

              {/* trade arcs */}
              {arcs.map((a, i) => (
                <g key={a.name}>
                  <path
                    d={a.d}
                    fill="none"
                    stroke="#0B1520"
                    strokeOpacity="0.32"
                    strokeWidth="1.2"
                    className="map-draw"
                    style={{ transitionDelay: `${200 + i * 130}ms` }}
                  />
                  <path
                    d={a.d}
                    fill="none"
                    stroke="#C9A24B"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    className={`arc-anim transition-opacity duration-700 ${inView ? "opacity-90" : "opacity-0"}`}
                    style={{ transitionDelay: `${1400 + i * 130}ms` }}
                  />
                  {/* hub */}
                  <circle cx={a.pos[0]} cy={a.pos[1]} r={10} fill="#C9A24B" fillOpacity="0.35" className="map-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
                  <circle cx={a.pos[0]} cy={a.pos[1]} r={3.4} fill="#A5802F" stroke="#fbfaf4" strokeWidth={1.1}>
                    <title>{a.name}</title>
                  </circle>
                  {labelledHubs.has(a.name) && (
                    <text
                      x={a.pos[0]}
                      y={a.pos[1] - 9}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight={600}
                      letterSpacing="0.08em"
                      fill="#45525F"
                      className="select-none uppercase"
                    >
                      {a.name}
                    </text>
                  )}
                </g>
              ))}

              {/* HQ marker */}
              <g>
                <circle cx={hq[0]} cy={hq[1]} r={14} fill="#0C2237" fillOpacity="0.3" className="map-pulse" />
                <rect
                  x={hq[0] - 4.4}
                  y={hq[1] - 4.4}
                  width={8.8}
                  height={8.8}
                  rx={1.5}
                  fill="#061019"
                  stroke="#DFBA74"
                  strokeWidth={1.4}
                  transform={`rotate(45 ${hq[0]} ${hq[1]})`}
                >
                  <title>Mumbai — Achrat Exports HQ</title>
                </rect>
                <text
                  x={hq[0] + 12}
                  y={hq[1] + 22}
                  fontSize="11.5"
                  fontWeight={700}
                  letterSpacing="0.14em"
                  fill="#0B1520"
                  className="select-none uppercase"
                >
                  Mumbai · HQ
                </text>
              </g>
            </svg>

            {/* tooltip */}
            {tip && (
              <div
                className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg border border-brass-500/40 bg-harbor-950 px-3 py-1.5 text-[0.72rem] font-semibold tracking-wide text-ivory-50 shadow-xl"
                style={{ left: tip.x, top: tip.y - 16 }}
                role="status"
              >
                {tip.name}
              </div>
            )}

            {/* legend */}
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-ink-900/8 px-2 pb-2 pt-4 md:px-4">
              <span className="flex items-center gap-2 text-[0.7rem] font-medium text-ink-600">
                <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-br from-brass-400 to-brass-600" aria-hidden="true" />
                Export markets ({totalMarkets})
              </span>
              <span className="flex items-center gap-2 text-[0.7rem] font-medium text-ink-600">
                <span className="h-2.5 w-2.5 rotate-45 rounded-[3px] bg-harbor-900 ring-1 ring-brass-500" aria-hidden="true" />
                Headquarters & origin — Mumbai
              </span>
              <span className="flex items-center gap-2 text-[0.7rem] font-medium text-ink-600">
                <Ship className="h-3.5 w-3.5 text-brass-600" aria-hidden="true" />
                Active shipping lanes
              </span>
              <span className="ml-auto hidden font-mono text-[0.62rem] tracking-[0.26em] text-ink-400 lg:block">
                NATURAL EARTH PROJECTION · 1:110M
              </span>
            </div>

            {/* accessible list */}
            <ul className="sr-only">
              {regions
                .flatMap((r) => r.countries)
                .map((c) => (
                  <li key={c.iso}>We serve: {c.name}</li>
                ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
