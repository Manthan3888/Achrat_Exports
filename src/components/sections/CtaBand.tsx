import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden" aria-label="Get a trade quote">
      <div className="absolute inset-0" aria-hidden="true">
        <Parallax speed={0.26} className="absolute -inset-y-20 inset-x-0">
          <Image
            src="/images/cta-containers.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-harbor-950/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-harbor-950/80 via-transparent to-harbor-950/60" />
      </div>

      <div className="shell relative flex flex-col items-center gap-8 py-24 text-center md:py-32">
        <Reveal>
          <p className="eyebrow text-brass-400">Start a conversation</p>
        </Reveal>
        <Reveal delay={110}>
          <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.08] text-ivory-50">
            Have a requirement ready?{" "}
            <em className="text-gilt font-light italic">We quote within 24 hours.</em>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ivory-100/65">
            Share your product, volume and destination — receive an indicative
            price, MOQ and schedule from a real trade manager, not a bot.
          </p>
        </Reveal>
        <Reveal delay={280} className="flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href="#contact"
              className="btn-sheen group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-brass-300 to-brass-500 px-8 py-4 text-sm font-semibold text-harbor-950 shadow-[0_18px_45px_-14px_rgba(201,162,75,0.8)]"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-ivory-100/25 px-8 py-4 text-sm font-semibold text-ivory-100 backdrop-blur-sm transition-colors hover:border-brass-400/70 hover:text-brass-300"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
