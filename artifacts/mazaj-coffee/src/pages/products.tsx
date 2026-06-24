import React, { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";

const PRODUCTS = [
  {
    title: "Premium Arabica Coffee Beans",
    img: "/images/product-arabica.png",
    description:
      "Single-origin Arabica beans sourced from Uganda's high-altitude growing regions. Bright acidity, floral notes, and a clean, complex finish. Available in light, medium, and dark roast profiles.",
    tags: ["Whole Bean", "Single Origin", "Export Ready"],
  },
  {
    title: "Espresso Blend",
    img: "/images/product-espresso.png",
    description:
      "Our signature espresso blend combines select Ugandan Arabica and Robusta lots for a bold, balanced shot with rich crema, dark chocolate body, and a lingering caramel sweetness.",
    tags: ["Whole Bean", "Blend", "Café Supply"],
  },
  {
    title: "Ground Coffee",
    img: "/images/product-ground.png",
    description:
      "Freshly ground to order. Available in espresso, filter, French press, and Moka pot grind sizes. Sealed for freshness immediately after grinding.",
    tags: ["Pre-Ground", "Custom Grind", "Retail Ready"],
  },
  {
    title: "Specialty Single Origin Coffee",
    img: "/images/product-single-origin.png",
    description:
      "Traceable lots from specific Ugandan farms and cooperatives. Cup scores 80+. Perfect for specialty retailers, cafés, and discerning home brewers who want provenance in the cup.",
    tags: ["Specialty Grade", "Traceable", "80+ SCA Score"],
  },
  {
    title: "Green Coffee Beans",
    img: "/images/product-green.png",
    description:
      "Export-quality green (unroasted) Ugandan coffee for importers, roasters, and traders worldwide. Available in washed, natural, and honey process. Full quality documentation and moisture reports provided.",
    tags: ["Unroasted", "Export Grade", "Bulk Available"],
  },
  {
    title: "Export Coffee Lots",
    img: "/images/product-export.png",
    description:
      "Large-volume export lots of both green and roasted coffee for international buyers, distributors, and importers. We handle grading, sorting, documentation, and logistics support.",
    tags: ["Bulk", "International", "Full Documentation"],
  },
];

const SERVICES = [
  {
    title: "Coffee Roasting",
    description: "Precision drum roasting with full profile control. Every batch roasted fresh to order.",
  },
  {
    title: "Custom Roasting",
    description: "Work with our roastmaster to develop a roast profile exclusive to your brand or café.",
  },
  {
    title: "Wholesale Coffee Supply",
    description: "Reliable wholesale supply for cafés, restaurants, hotels, and office kitchens.",
  },
  {
    title: "Espresso Blends",
    description: "Custom espresso blend development and consistent batch supply for café operators.",
  },
  {
    title: "Green Coffee Beans",
    description: "Raw, unroasted Ugandan coffee for specialty roasters and international importers.",
  },
  {
    title: "Coffee Export Services",
    description: "End-to-end export support including documentation, grading, and logistics coordination.",
  },
  {
    title: "Corporate Coffee Supply",
    description: "Regular delivery of freshly roasted coffee to offices, co-working spaces, and institutions.",
  },
  {
    title: "Café Supply Solutions",
    description: "Complete café supply packages — beans, equipment consultation, and barista training referrals.",
  },
  {
    title: "Ground Coffee",
    description: "Custom grind sizes ground fresh to order and sealed immediately for shelf life.",
  },
  {
    title: "Roasted Coffee Beans",
    description: "Freshly roasted whole beans in custom packaging for retail, wholesale, or export.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function ProductsPage() {
  useEffect(() => {
    document.title = "Coffee & Products — MAZAJ Coffee Roasters Uganda";
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/256708132968"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </a>

      {/* Page Hero */}
      <section className="relative pt-36 pb-20 bg-card overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-green-coffee.png')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif mb-4">
            Coffee &amp; Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Every product begins with Uganda's finest coffee-growing regions and ends with your cup — freshly roasted, carefully packed, and delivered with pride.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Selection</h2>
            <h3 className="text-3xl md:text-4xl font-serif">Premium Products</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <Card className="overflow-hidden bg-card border-border/50 group h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col gap-4 flex-1">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-xl font-serif font-medium">{product.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{product.description}</p>
                    <Button variant="outline" className="w-full mt-auto" asChild>
                      <a href="/#contact">Inquire About This Product</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">What We Offer</h2>
            <h3 className="text-3xl md:text-4xl font-serif">Our Services</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="p-6 rounded-xl border border-border/50 bg-background hover:border-primary/40 transition-colors"
              >
                <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-primary">Ready to Order?</h2>
          <p className="text-white/70 mb-8">
            Samples and specifications available on request. Reach out and our team will respond within 24 hours.
          </p>
          <Button size="lg" className="px-10 py-6 text-lg" asChild>
            <a href="/#contact">Get in Touch</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-10 border-t border-white/10 text-center">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-2">
          MAZAJ <span className="text-primary">COFFEE</span>
        </h2>
        <p className="text-white/40 text-sm">© 2026 MAZAJ Coffee Roasters Uganda. All rights reserved.</p>
      </footer>
    </div>
  );
}
