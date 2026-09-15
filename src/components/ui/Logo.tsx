type LogoProps = {
  className?: string;
  compact?: boolean;
};

/**
 * Achrat Exports wordmark — compass-rose monogram + paired wordmark.
 * Server-safe inline SVG, inherits currentColor for the text.
 */
export default function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0 md:h-10 md:w-10" />
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[1.24rem] font-semibold tracking-[0.08em] text-current md:text-[1.34rem]">
            ACHRAT
          </span>
          <span className="mt-1 block text-[0.5625rem] font-semibold uppercase tracking-[0.52em] text-brass-500">
            Exports&nbsp;·&nbsp;Imports
          </span>
        </span>
      )}
    </span>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* outer compass ring */}
      <circle cx="24" cy="24" r="22.5" stroke="#C9A24B" strokeWidth="1.4" />
      <circle
        cx="24"
        cy="24"
        r="18.5"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="0.9"
        strokeDasharray="2.4 3.4"
      />
      {/* compass rose / monogram A */}
      <path d="M24 6.5 27.4 19 24 16.4 20.6 19 24 6.5Z" fill="#C9A24B" />
      <path d="M24 41.5 20.6 29 24 31.6 27.4 29 24 41.5Z" fill="currentColor" fillOpacity="0.5" />
      <path d="M6.5 24 19 20.6 16.4 24 19 27.4 6.5 24Z" fill="currentColor" fillOpacity="0.5" />
      <path d="M41.5 24 29 27.4 31.6 24 29 20.6 41.5 24Z" fill="#C9A24B" />
      <circle cx="24" cy="24" r="3.1" fill="#C9A24B" />
      <circle cx="24" cy="24" r="1.2" fill="#061019" />
    </svg>
  );
}
