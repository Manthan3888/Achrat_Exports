"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Magnetic from "@/components/ui/Magnetic";
import { navLinks, site } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 32);
        setHidden(y > 480 && y > lastY && !open);
        lastY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "border-b border-ivory-100/8 bg-harbor-950/82 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="shell flex h-[76px] items-center justify-between md:h-[88px]">
          <a
            href="#top"
            aria-label="Achrat Exports — home"
            className="text-ivory-50 transition-opacity hover:opacity-85"
          >
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-[0.82rem] font-medium tracking-wide text-ivory-100/72 transition-colors hover:text-ivory-50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden md:inline-block">
              <a
                href="#contact"
                className="btn-sheen group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brass-300 to-brass-500 px-5 py-2.5 text-[0.82rem] font-semibold tracking-wide text-harbor-950 shadow-[0_10px_30px_-12px_rgba(201,162,75,0.7)] transition-shadow hover:shadow-[0_14px_38px_-10px_rgba(201,162,75,0.8)]"
              >
                Get a Quote
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full border border-ivory-100/15 text-ivory-50 transition-colors hover:border-brass-500/60 hover:text-brass-300 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* ------- mobile overlay menu ------- */}
      <div
        className={`fixed inset-0 z-[80] flex flex-col bg-harbor-950/97 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="shell flex h-[76px] items-center justify-between">
          <Logo className="text-ivory-50" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-ivory-100/15 text-ivory-50 transition-colors hover:border-brass-500/60 hover:text-brass-300"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="shell flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-8"
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
              className={`group flex items-baseline gap-4 border-b border-ivory-100/8 py-4 transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <span className="font-mono text-xs text-brass-500">
                0{i + 1}
              </span>
              <span className="font-display text-3xl font-medium text-ivory-100 transition-colors group-hover:text-brass-300">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <div
          className={`shell pb-10 transition-all delay-300 duration-500 ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-sheen flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-brass-300 to-brass-500 px-6 py-4 text-sm font-semibold text-harbor-950"
          >
            Get a Quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-5 text-center text-xs tracking-wide text-ivory-100/45">
            {site.email} · {site.phone}
          </p>
        </div>
      </div>
    </>
  );
}
