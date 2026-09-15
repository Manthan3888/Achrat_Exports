import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  number?: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  number,
  title,
  lead,
  dark = false,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start";
  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${alignCls} ${className}`}>
      <Reveal variant="fade" className="flex items-center gap-3">
        <span className="hairline w-10" aria-hidden="true" />
        <span className={`eyebrow ${dark ? "text-brass-400" : "text-brass-600"}`}>
          {eyebrow}
        </span>
        {number && (
          <span
            className={`eyebrow ${dark ? "text-ivory-100/30" : "text-ink-400/70"}`}
            aria-hidden="true"
          >
            / {number}
          </span>
        )}
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`font-display text-[clamp(2.1rem,4.6vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.01em] ${
            dark ? "text-ivory-50" : "text-ink-900"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={170}>
          <p
            className={`max-w-2xl text-[1.02rem] leading-relaxed md:text-lg ${
              dark ? "text-ivory-100/62" : "text-ink-600"
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
