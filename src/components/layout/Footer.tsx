import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import Magnetic from "@/components/ui/Magnetic";
import { navLinks, site, waLink } from "@/lib/site";
import { products } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ivory-100/8 bg-harbor-950">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="shell relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-4">
              <LogoMark className="h-12 w-12" />
              <div>
                <p className="font-display text-2xl font-semibold tracking-[0.06em] text-ivory-50">
                  ACHRAT <span className="text-gilt">EXPORTS</span>
                </p>
                <p className="eyebrow mt-1 text-ivory-100/40">Import · Export · Sourcing</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory-100/55">
              {site.tagline}. An India-headquartered international trading house
              moving export-grade agro products, spices, textiles and handicrafts
              to {`25+`} markets — and global goods into India.
            </p>
            <a
              href={waLink("Hello Achrat Exports, I would like to discuss a trade requirement.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-brass-500/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-brass-300 transition-colors hover:border-brass-400 hover:bg-brass-500/10"
            >
              Chat on WhatsApp
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* explore */}
          <nav aria-label="Footer">
            <p className="eyebrow text-brass-500">Explore</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-ivory-100/60 transition-colors hover:text-brass-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* products */}
          <div>
            <p className="eyebrow text-brass-500">Products</p>
            <ul className="mt-5 space-y-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <a
                    href="#products"
                    className="text-sm text-ivory-100/60 transition-colors hover:text-brass-300"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <p className="eyebrow text-brass-500">Contact</p>
            <ul className="mt-5 space-y-4 text-sm text-ivory-100/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                <span>
                  {site.address.line1}, {site.address.line2}, {site.address.country}
                </span>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-brass-300">
                  <Mail className="h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 transition-colors hover:text-brass-300">
                  <Phone className="h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-ivory-100/35">{site.hours}</p>
          </div>
        </div>

        <div className="hairline mt-14" aria-hidden="true" />

        <div className="mt-8 flex flex-col items-center justify-between gap-5 md:flex-row">
          <p className="text-xs text-ivory-100/40">
            © {new Date().getFullYear()} {site.legalName} All rights reserved.
          </p>
          <p className="text-center text-[0.68rem] uppercase tracking-[0.22em] text-ivory-100/30">
            IEC · FIEO · APEDA · Spice Board of India
          </p>
          <Magnetic>
            <a
              href="#top"
              aria-label="Back to top"
              className="grid h-11 w-11 place-items-center rounded-full border border-ivory-100/15 text-ivory-100/70 transition-colors hover:border-brass-500/60 hover:text-brass-300"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
