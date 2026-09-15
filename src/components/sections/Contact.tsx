"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  MessageSquareQuote,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { products } from "@/lib/data";
import { site, waLink } from "@/lib/site";

type FormState = {
  name: string;
  company: string;
  email: string;
  country: string;
  inquiryType: string;
  product: string;
  message: string;
  website: string; // honeypot
};

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  country: "",
  inquiryType: "export",
  product: "",
  message: "",
  website: "",
};

const inputCls = "field";
const labelCls =
  "mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-600";

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");

  // prefilled from product "Send Inquiry" buttons
  useEffect(() => {
    const handler = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      setStatus("idle");
      setForm((f) => ({
        ...f,
        inquiryType: "export",
        product: name,
        message: f.message || `Hello, I'd like to get a quote for ${name}. My destination port is `,
      }));
    };
    window.addEventListener("achrat:inquire", handler);
    return () => window.removeEventListener("achrat:inquire", handler);
  }, []);

  function update(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok?: boolean; ref?: string; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Could not submit your inquiry. Please email us directly.");
      }
      setRef(data.ref ?? "");
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-ivory-100 py-24 md:py-32" aria-labelledby="contact-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Contact Us"
          number="08"
          title={
            <span id="contact-title">
              Tell us what you trade —{" "}
              <em className="font-light italic text-brass-600">we’ll take it globally.</em>
            </span>
          }
          lead="Quotes, samples, compliance documents or a full trade program — the desk answers within 12 business hours."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* info card */}
          <Reveal variant="left" delay={140}>
            <div className="relative flex h-full flex-col gap-7 overflow-hidden rounded-3xl bg-harbor-950 p-8 text-ivory-100 md:p-10">
              <div className="dot-grid absolute inset-0 opacity-20" aria-hidden="true" />
              <div className="relative">
                <p className="eyebrow text-brass-400">Head Office</p>
                <p className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-ivory-100/75">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  {site.legalName}, {site.address.line1}, {site.address.line2},{" "}
                  {site.address.country}
                </p>
              </div>

              <div className="relative space-y-4 border-t border-ivory-100/10 pt-7 text-sm">
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-ivory-100/80 transition-colors hover:text-brass-300">
                  <Mail className="h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  {site.email}
                </a>
                <a href={site.phoneHref} className="flex items-center gap-3 text-ivory-100/80 transition-colors hover:text-brass-300">
                  <Phone className="h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  {site.phone}
                </a>
                <p className="flex items-center gap-3 text-ivory-100/60">
                  <Clock3 className="h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  {site.hours}
                </p>
                <p className="flex items-center gap-3 text-ivory-100/60">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-brass-500" aria-hidden="true" />
                  Response SLA — under 12 business hours
                </p>
              </div>

              <div className="relative mt-auto space-y-3 border-t border-ivory-100/10 pt-7">
                <Magnetic>
                  <a
                    href={waLink("Hello Achrat Exports, I would like to discuss a trade requirement.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sheen inline-flex items-center gap-2.5 rounded-full bg-[#1faa55] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(31,170,85,0.7)]"
                  >
                    <MessageSquareQuote className="h-4.5 w-4.5" aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                </Magnetic>
                <p className="text-xs text-ivory-100/40">
                  {site.desk.city} desk ({site.desk.country}) — {site.desk.note}.
                </p>
              </div>
            </div>
          </Reveal>

          {/* form card */}
          <Reveal variant="right" delay={220}>
            <div className="h-full rounded-3xl border border-ink-900/10 bg-ivory-50 p-8 shadow-[0_40px_90px_-50px_rgba(11,21,32,0.4)] md:p-10">
              {status === "success" ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-5 text-center" role="status">
                  <span className="ping-ring grid h-16 w-16 place-items-center rounded-full bg-emerald-500/12 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-medium text-ink-900">
                    Inquiry received.
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-ink-600">
                    Your reference number is{" "}
                    <span className="rounded-md bg-harbor-950 px-2 py-1 font-mono text-xs font-bold text-brass-400">
                      {ref}
                    </span>
                    . A trade manager will reply within 12 business hours.
                  </p>
                  <div className="mt-2 flex flex-wrap justify-center gap-3">
                    <a
                      href={waLink(`Hello, I just submitted inquiry ${ref} on your website. Following up here.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#1faa55] px-5 py-2.5 text-xs font-semibold text-white"
                    >
                      <MessageSquareQuote className="h-4 w-4" aria-hidden="true" />
                      Continue on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-5 py-2.5 text-xs font-semibold text-ink-900 transition-colors hover:border-brass-600/60"
                    >
                      Send another inquiry
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate={false} className="flex h-full flex-col">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelCls}>Full name *</label>
                      <input id="name" name="name" required minLength={2} maxLength={80} value={form.name} onChange={update} className={inputCls} placeholder="Aarav Shah" autoComplete="name" />
                    </div>
                    <div>
                      <label htmlFor="company" className={labelCls}>Company</label>
                      <input id="company" name="company" maxLength={120} value={form.company} onChange={update} className={inputCls} placeholder="Gulf Foods Trading LLC" autoComplete="organization" />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelCls}>Business email *</label>
                      <input id="email" name="email" type="email" required maxLength={120} value={form.email} onChange={update} className={inputCls} placeholder="you@company.com" autoComplete="email" />
                    </div>
                    <div>
                      <label htmlFor="country" className={labelCls}>Country</label>
                      <input id="country" name="country" maxLength={80} value={form.country} onChange={update} className={inputCls} placeholder="United Arab Emirates" autoComplete="country-name" />
                    </div>
                    <div>
                      <label htmlFor="inquiryType" className={labelCls}>I’m looking to</label>
                      <select id="inquiryType" name="inquiryType" value={form.inquiryType} onChange={update} className={inputCls}>
                        <option value="export">Buy from India (export)</option>
                        <option value="import">Sell to India (import)</option>
                        <option value="partnership">Explore a partnership</option>
                        <option value="general">General query</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="product" className={labelCls}>Product interest</label>
                      <select id="product" name="product" value={form.product} onChange={update} className={inputCls}>
                        <option value="">Select a product…</option>
                        {products.map((p) => (
                          <option key={p.slug} value={p.name}>{p.name}</option>
                        ))}
                        <option value="Other">Other / not listed</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className={labelCls}>Requirement details *</label>
                      <textarea id="message" name="message" required minLength={10} maxLength={4000} rows={5} value={form.message} onChange={update} className={`${inputCls} resize-y`} placeholder="Product, quantity, grade, destination port, target timeline…" />
                    </div>

                    {/* honeypot — invisible to humans */}
                    <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
                    </div>
                  </div>

                  {status === "error" && (
                    <p role="alert" className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
                      {error}
                    </p>
                  )}

                  <div className="mt-7 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                    <p className="max-w-xs text-[0.7rem] leading-relaxed text-ink-400">
                      By submitting, you agree to be contacted about your inquiry.
                      We never share trade data with third parties.
                    </p>
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-sheen inline-flex items-center gap-2.5 rounded-full bg-harbor-950 px-8 py-4 text-sm font-semibold text-ivory-50 shadow-[0_18px_40px_-16px_rgba(6,16,25,0.7)] transition-all hover:bg-harbor-900 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Inquiry
                            <Send className="h-4 w-4" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
