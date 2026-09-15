"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/**
 * Magnetic hover — element gently follows the cursor and springs back.
 * Disabled on coarse pointers and reduced-motion environments.
 */
export default function Magnetic({
  children,
  strength = 0.32,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    });
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic inline-block ${className}`}
    >
      {children}
    </div>
  );
}
