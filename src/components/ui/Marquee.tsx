import { Sparkle } from "lucide-react";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  dark?: boolean;
};

/** Infinite marquee strip — pauses on hover, GPU transform only. */
export default function Marquee({ items, className = "", dark = true }: MarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex w-max shrink-0 items-center"
    >
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className={`flex items-center gap-8 pr-8 text-[0.72rem] font-semibold uppercase tracking-[0.3em] whitespace-nowrap ${
            dark ? "text-ivory-100/55" : "text-ink-600/80"
          }`}
        >
          {item}
          <Sparkle
            className="h-3 w-3 text-brass-500"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`group relative flex overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] ${className}`}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
