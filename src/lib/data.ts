/* ------------------------------------------------------------------ */
/* Central content model for Achrat Exports — single source of truth  */
/* ------------------------------------------------------------------ */

export type ProductSpec = { k: string; v: string };

export type Product = {
  slug: string;
  name: string;
  category: "Agro & Food" | "Spices" | "Textiles" | "Handicrafts";
  image: string;
  tagline: string;
  hs: string;
  origin: string;
  destinations: string[];
  specs: ProductSpec[];
  packaging: string;
  moq: string;
  incoterms: string;
};

export const productCategories = [
  "All",
  "Agro & Food",
  "Spices",
  "Textiles",
  "Handicrafts",
] as const;

export const products: Product[] = [
  {
    slug: "basmati-rice",
    name: "Basmati & Specialty Rice",
    category: "Agro & Food",
    image: "/images/product-rice.jpg",
    tagline: "Long-grain aromatic rice in steam, sella and raw variants.",
    hs: "HS 1006",
    origin: "Punjab, Haryana & UP, India",
    destinations: ["Middle East", "North America", "Europe"],
    specs: [
      { k: "Variants", v: "1121 Steam / Golden Sella / Raw, 1509, PR-11" },
      { k: "Average grain length", v: "8.30 mm+ (1121 basmati)" },
      { k: "Moisture", v: "≤ 13%" },
      { k: "Broken", v: "≤ 2% (sortex cleaned)" },
    ],
    packaging: "5 / 25 / 50 kg PP, BOPP & jute bags · private label on request",
    moq: "1 × 20' FCL (≈ 25–27 MT)",
    incoterms: "FOB · CFR · CIF",
  },
  {
    slug: "spices",
    name: "Whole & Ground Spices",
    category: "Spices",
    image: "/images/product-spices.jpg",
    tagline: "Turmeric, cumin, coriander, cardamom, chilli and blends.",
    hs: "HS 0904–0910",
    origin: "Kerala, Gujarat & Rajasthan, India",
    destinations: ["Europe", "North America", "Japan", "GCC"],
    specs: [
      { k: "Range", v: "Whole, crushed & steam-sterilised ground spices" },
      { k: "Turmeric curcumin", v: "2–5% (grade-wise, as per buyer spec)" },
      { k: "Cumin purity", v: "99% / 99.5% machine-clean & sortex" },
      { k: "Treatment", v: "Steam sterilisation available (ETO-free on request)" },
    ],
    packaging: "25 kg PP bags / 20 kg cartons · nitrogen-flushed consumer packs",
    moq: "Mixed container loads supported",
    incoterms: "FOB · CIF · DAP",
  },
  {
    slug: "fresh-produce",
    name: "Fresh Produce",
    category: "Agro & Food",
    image: "/images/product-produce.jpg",
    tagline: "Onions, potatoes, citrus and seasonal fruits with cold-chain care.",
    hs: "HS 0703 / 0805",
    origin: "Nashik, Gujarat & Maharashtra, India",
    destinations: ["GCC", "South-East Asia", "East Africa", "UK"],
    specs: [
      { k: "Produce", v: "Red onion, potato, banana, mango (seasonal), citrus" },
      { k: "Onion sizing", v: "30–50 mm / 40–60 mm / 55 mm+" },
      { k: "Shelf life", v: "Ventilated & reefer-managed, commodity-specific" },
      { k: "Chain", v: "Pre-cooling + reefer sea freight · air freight options" },
    ],
    packaging: "5 / 18 / 25 kg mesh bags · 5 kg cartons · buyer branding",
    moq: "Program supply & spot loads (1 × 40' reefer)",
    incoterms: "FOB · CFR",
  },
  {
    slug: "pulses",
    name: "Pulses & Lentils",
    category: "Agro & Food",
    image: "/images/product-pulses.jpg",
    tagline: "Chana, toor, moong, urad and red lentils — cleaned and graded.",
    hs: "HS 0713",
    origin: "Madhya Pradesh & Maharashtra, India",
    destinations: ["Middle East", "South Asia", "Europe"],
    specs: [
      { k: "Range", v: "Kabuli chana, toor, moong, urad, masoor (whole/split)" },
      { k: "Purity", v: "98.5–99.5% colour-sorted" },
      { k: "Foreign matter", v: "≤ 0.5%" },
      { k: "Moisture", v: "≤ 12–14% (commodity-specific)" },
    ],
    packaging: "25 / 50 kg PP bags · retail packs on request",
    moq: "1 × 20' FCL (≈ 24–26 MT)",
    incoterms: "FOB · CFR · CIF",
  },
  {
    slug: "textiles",
    name: "Cotton Textiles & Home",
    category: "Textiles",
    image: "/images/product-textiles.jpg",
    tagline: "Greige & finished fabrics, made-ups and home furnishings.",
    hs: "HS 5208 / 6302",
    origin: "Tirupur, Surat & Ahmedabad, India",
    destinations: ["Europe", "North America", "Australia", "Japan"],
    specs: [
      { k: "Fabrics", v: "100% cotton & blends — woven, knitted, dyed/printed" },
      { k: "Made-ups", v: "Bedding, table & kitchen linen, towels" },
      { k: "Compliance", v: "Oeko-Tex® & GOTS-certified mills (on program)" },
      { k: "Sampling", v: "Strike-offs & lab dips in 7–10 days" },
    ],
    packaging: "Roll / bale packing · export cartons with polybag protection",
    moq: "Program-based · flexible for first orders",
    incoterms: "FOB · FCA · DAP",
  },
  {
    slug: "handicrafts",
    name: "Handicrafts & Décor",
    category: "Handicrafts",
    image: "/images/product-handicrafts.jpg",
    tagline: "Ceramics, brassware and carved wood from artisan clusters.",
    hs: "HS 4420 / 6913 / 7419",
    origin: "Jodhpur, Moradabad & Jaipur, India",
    destinations: ["Europe", "North America", "Japan", "Australia"],
    specs: [
      { k: "Materials", v: "Ceramic, brass, mango & acacia wood, glass" },
      { k: "Ranges", v: "Tabletop, décor, seasonal & gift collections" },
      { k: "Development", v: "Buyer designs sampled against reference" },
      { k: "Finishing", v: "Food-safe glazes & lead-compliant coatings" },
    ],
    packaging: "Bubble + honeycomb, buyer-marked master cartons, palletised",
    moq: "Consolidated mixed-SKU containers",
    incoterms: "FOB · CIF · DDP (select lanes)",
  },
];

/* ------------------------------ stats ----------------------------- */

export const stats = [
  { value: 25, suffix: "+", label: "Export markets served" },
  { value: 1200, suffix: "+", label: "TEU shipped annually" },
  { value: 40, suffix: "+", label: "Port & airport gateways" },
  { value: 98, suffix: "%", label: "On-time dispatch rate" },
] as const;

/* --------------------------- world map ---------------------------- */

export type Region = {
  id: string;
  name: string;
  blurb: string;
  countries: { iso: string; name: string }[];
  lanes: string[];
};

export const regions: Region[] = [
  {
    id: "middle-east",
    name: "Middle East",
    blurb: "Food & agro programs with GCC distributors and retail groups.",
    countries: [
      { iso: "784", name: "United Arab Emirates" },
      { iso: "682", name: "Saudi Arabia" },
      { iso: "634", name: "Qatar" },
      { iso: "512", name: "Oman" },
      { iso: "414", name: "Kuwait" },
    ],
    lanes: ["Nhava Sheva → Jebel Ali · 3–4 days", "Mundra → Hamad · 4 days"],
  },
  {
    id: "europe",
    name: "Europe",
    blurb: "Compliant food ingredients and home textiles into EU & UK.",
    countries: [
      { iso: "826", name: "United Kingdom" },
      { iso: "276", name: "Germany" },
      { iso: "528", name: "Netherlands" },
      { iso: "250", name: "France" },
      { iso: "724", name: "Spain" },
      { iso: "380", name: "Italy" },
    ],
    lanes: ["Nhava Sheva → Rotterdam · ~22 days", "Nhava Sheva → Felixstowe · ~24 days"],
  },
  {
    id: "north-america",
    name: "North America",
    blurb: "Retail & private-label programs across US and Canada.",
    countries: [
      { iso: "840", name: "United States" },
      { iso: "124", name: "Canada" },
    ],
    lanes: ["Mundra → New York · ~28 days", "Nhava Sheva → Vancouver · ~32 days"],
  },
  {
    id: "asia-pacific",
    name: "Asia-Pacific",
    blurb: "Intra-Asia trade with Japan, ASEAN and Oceania buyers.",
    countries: [
      { iso: "702", name: "Singapore" },
      { iso: "458", name: "Malaysia" },
      { iso: "392", name: "Japan" },
      { iso: "410", name: "South Korea" },
      { iso: "156", name: "China" },
      { iso: "036", name: "Australia" },
    ],
    lanes: ["Chennai → Singapore · ~8 days", "Nhava Sheva → Sydney · ~26 days"],
  },
  {
    id: "africa",
    name: "Africa",
    blurb: "Staple foods & building supplies for growing African demand.",
    countries: [
      { iso: "818", name: "Egypt" },
      { iso: "504", name: "Morocco" },
      { iso: "404", name: "Kenya" },
      { iso: "710", name: "South Africa" },
    ],
    lanes: ["Mundra → Mombasa · ~12 days", "Nhava Sheva → Durban · ~16 days"],
  },
  {
    id: "south-america",
    name: "South America",
    blurb: "Selective programs for textiles & handicraft retailers.",
    countries: [{ iso: "076", name: "Brazil" }],
    lanes: ["Nhava Sheva → Santos · ~30 days"],
  },
];

/** Office / gateway hubs: [longitude, latitude] */
export const hubs = {
  mumbai: { name: "Mumbai — HQ", lon: 72.877, lat: 19.076 },
  destinations: [
    { name: "Jebel Ali", lon: 55.027, lat: 24.985 },
    { name: "Jeddah", lon: 39.173, lat: 21.485 },
    { name: "Rotterdam", lon: 4.479, lat: 51.922 },
    { name: "London", lon: -0.127, lat: 51.507 },
    { name: "New York", lon: -74.006, lat: 40.712 },
    { name: "Singapore", lon: 103.819, lat: 1.352 },
    { name: "Tokyo", lon: 139.691, lat: 35.689 },
    { name: "Sydney", lon: 151.209, lat: -33.868 },
    { name: "Durban", lon: 31.021, lat: -29.858 },
    { name: "Santos", lon: -46.328, lat: -23.96 },
  ],
} as const;

/* --------------------------- import desk --------------------------- */

export const importSolutions = [
  {
    title: "Global Sourcing & Procurement",
    copy: "We identify, audit and negotiate with vetted overseas manufacturers for machinery, industrial inputs and raw materials — a single, accountable buying desk in India.",
  },
  {
    title: "Freight & Customs Management",
    copy: "FCL/LCL sea, air and multimodal freight with pre-alerts, duty optimisation and CHA coordination — documentation handled before the vessel berths.",
  },
  {
    title: "Compliance & Trade Finance",
    copy: "LC, DP/DA and open-account structures, product registrations, BIS/food-safety clearances and insurance — engineered for a clean clearance trail.",
  },
  {
    title: "Last-Mile Distribution",
    copy: "Bonded warehousing, relabelling and pan-India dispatch through partner 3PLs, with live inventory and POD visibility.",
  },
];

/* ----------------------------- why us ------------------------------ */

export const pillars = [
  {
    title: "Verified Supply Network",
    copy: "Every supplier is audited for capacity, compliance and export readiness before the first order — you buy from pre-qualified sources.",
  },
  {
    title: "Compliance-First Paperwork",
    copy: "Phytosanitary, fumigation, health & origin certificates, labelling and HS classification checked before cargo moves — zero-surprise clearances.",
  },
  {
    title: "End-to-End Logistics",
    copy: "Factory gate to destination port on one contract: stuffing supervision, freight, insurance and customs, tracked on a single dashboard.",
  },
  {
    title: "Quality at Origin",
    copy: "In-house QC plus third-party inspection (SGS / Bureau Veritas on request) with photo & video reports before every shipment.",
  },
  {
    title: "Flexible, Fair Terms",
    copy: "LC, TT and DP structures, mixed-container consolidation and practical MOQs that let new buyers test markets safely.",
  },
  {
    title: "A Desk That Answers",
    copy: "Dedicated account managers across IST and GST time zones with a 12-hour response SLA — in English, Hindi and Arabic.",
  },
];

/* ------------------------- quality process ------------------------- */

export const qualitySteps = [
  {
    step: "01",
    title: "Source & Verify",
    copy: "Supplier audits, approved-vendor list and lot traceability down to farm or mill.",
  },
  {
    step: "02",
    title: "Inspect & Approve",
    copy: "Pre-shipment inspection against AQL / commodity specs with lab reports on request.",
  },
  {
    step: "03",
    title: "Document & Declare",
    copy: "Certificates of origin, phyto, health, fumigation & labelling per destination law.",
  },
  {
    step: "04",
    title: "Ship & Track",
    copy: "Supervised stuffing, sealed containers, live milestones until POD is confirmed.",
  },
  {
    step: "05",
    title: "Support & Settle",
    copy: "Claims handling within 7 days, destination feedback loop and program reviews.",
  },
] as const;

export const complianceBadges = [
  "IEC Registered",
  "APEDA Scheduled Products",
  "FSSAI-aligned Food Safety",
  "ISO 9001-aligned Processes",
  "Spice Board Registered",
  "AEO-ready Documentation",
  "Incoterms® 2020 Contracts",
  "FIEO Member",
];

/* ---------------------------- testimonials -------------------------- */

export const trustStrip = [
  "FOB · CFR · CIF · FCA · DAP · DDP",
  "Incoterms® 2020",
  "FCL · LCL · Reefer · Air Freight",
  "LC · DP · TT Settlement",
  "Door-to-Door Programs",
  "Private Label & OEM",
  "Third-party Inspection",
  "Bonded Warehousing",
];
