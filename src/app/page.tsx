import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import ExportMarkets from "@/components/sections/ExportMarkets";
import ImportSolutions from "@/components/sections/ImportSolutions";
import WhyUs from "@/components/sections/WhyUs";
import Quality from "@/components/sections/Quality";
import GlobalPresence from "@/components/sections/GlobalPresence";
import CtaBand from "@/components/sections/CtaBand";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/ui/Marquee";
import { products, trustStrip } from "@/lib/data";
import { site } from "@/lib/site";

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Achrat Exports — traded product portfolio",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: `${p.tagline} Origin: ${p.origin}. Markets: ${p.destinations.join(", ")}.`,
      brand: { "@type": "Brand", name: site.name },
      image: `${site.url}${p.image}`,
      category: p.category,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Hero />
      <div className="border-y border-ivory-100/8 bg-harbor-950/95">
        <Marquee items={trustStrip} />
      </div>
      <About />
      <Products />
      <ExportMarkets />
      <ImportSolutions />
      <WhyUs />
      <Quality />
      <GlobalPresence />
      <CtaBand />
      <Contact />
    </>
  );
}
