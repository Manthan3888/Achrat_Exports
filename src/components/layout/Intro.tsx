"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

/** Brand intro — plays once per load, ~1.4s, skipped for reduced motion. */
export default function Intro() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("gone");
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("leave"), 1350);
    const t2 = setTimeout(() => {
      setPhase("gone");
      document.documentElement.style.overflow = "";
    }, 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] grid place-items-center bg-harbor-950 transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "leave" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="animate-fade-in text-brass-300 [animation-duration:0.9s]">
          <LogoMark className="h-16 w-16 animate-spin-slow" />
        </div>
        <div className="overflow-hidden">
          <p className="animate-fade-in text-center font-display text-2xl font-medium tracking-[0.14em] text-ivory-50 [animation-delay:0.25s] [animation-duration:0.8s]">
            ACHRAT <span className="text-gilt">EXPORTS</span>
          </p>
        </div>
        <p className="animate-fade-in eyebrow text-ivory-100/40 [animation-delay:0.45s]">
          Connecting Quality with Global Markets
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px">
        <div
          className={`h-full bg-gradient-to-r from-transparent via-brass-500 to-transparent transition-all duration-[1300ms] ease-linear ${
            phase === "show" ? "w-full" : "w-full opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
