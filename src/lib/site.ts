export const site = {
  name: "Achrat Exports",
  legalName: "Achrat Exports Pvt. Ltd.",
  tagline: "Connecting Quality with Global Markets",
  description:
    "Achrat Exports is an international import–export house sourcing export-grade agro products, spices, textiles and handicrafts from India to 25+ markets worldwide — with compliance-first documentation and end-to-end logistics.",
  url: "https://www.achratexports.com",
  email: "trade@achratexports.com",
  phone: "+91 98200 45600",
  phoneHref: "tel:+919820045600",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919820045600",
  address: {
    line1: "Level 8, Trade Crest, G Block",
    line2: "Bandra Kurla Complex, Mumbai 400051",
    country: "India",
  },
  desk: {
    city: "Dubai",
    country: "United Arab Emirates",
    note: "Middle-East trade desk",
  },
  hours: "Mon–Sat · 09:30–18:30 IST",
  geo: { lat: 19.076, lon: 72.877 },
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Markets", href: "#markets" },
  { label: "Imports", href: "#import-solutions" },
  { label: "Why Us", href: "#why-us" },
  { label: "Quality", href: "#quality" },
  { label: "Global", href: "#global-presence" },
] as const;

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailLink(subject: string, body?: string) {
  const q = body
    ? `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : `?subject=${encodeURIComponent(subject)}`;
  return `mailto:${site.email}${q}`;
}
