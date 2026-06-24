import React, { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";

const FAQ_CATEGORIES = [
  {
    category: "Orders & Purchasing",
    faqs: [
      {
        q: "What is the minimum order quantity?",
        a: "For wholesale and retail orders, our minimum is 5 kg of roasted coffee. For green coffee bean export lots, the minimum is typically 60 kg (one bag). Corporate and café supply packages are flexible — contact us to discuss your specific needs.",
      },
      {
        q: "How do I place an order?",
        a: "You can reach us via the contact form on our website, by email at mazajcoffeeroastersuganda@gmail.com, or directly on WhatsApp at +256 708 132968. Our team will confirm availability, agree on a specification, and arrange delivery or collection.",
      },
      {
        q: "Do you offer samples before committing to a large order?",
        a: "Yes. We encourage buyers — especially international importers and new wholesale clients — to request a sample first. Sample packs of roasted coffee are available; green coffee samples are subject to a small logistics fee. Contact us with your requirements.",
      },
      {
        q: "Can I request a custom roast profile?",
        a: "Absolutely. Our custom roasting service is available for cafés, retailers, and brands who want a proprietary roast. We'll work with you on roast level, origin, and blend composition. Minimum quantity for custom profiles is 10 kg per batch.",
      },
    ],
  },
  {
    category: "Products & Quality",
    faqs: [
      {
        q: "What coffee varieties do you roast?",
        a: "We primarily roast Ugandan Arabica (from the Elgon, Rwenzori, and Kigezi growing regions) and select Robusta. We offer single-origin lots, espresso blends, and can source specific farm-level micro-lots for specialty buyers.",
      },
      {
        q: "How fresh is your coffee?",
        a: "All roasted coffee is freshly roasted to order. We do not keep large stocks of pre-roasted coffee — your order is roasted specifically for you, typically within 2–5 business days. Beans are sealed within 24 hours of roasting.",
      },
      {
        q: "What is the shelf life of your roasted coffee?",
        a: "Properly sealed whole beans have an optimal freshness window of 2–4 weeks after roasting, and remain good for up to 3 months when stored cool and dry. Ground coffee has a shorter window of 2–4 weeks. We always include the roast date on packaging.",
      },
      {
        q: "Do you provide SCA cup scores or quality certifications?",
        a: "Our specialty-grade lots are cupped in-house and select lots are submitted for SCA scoring. Cupping notes and moisture reports are available for export green coffee. Contact us for specific lot documentation.",
      },
      {
        q: "Are your coffees traceable to their origin?",
        a: "Yes. Our specialty and single-origin products are traceable to specific farming cooperatives and washing stations in Uganda. We can provide origin documentation for export buyers requiring full traceability.",
      },
    ],
  },
  {
    category: "Export & International Buyers",
    faqs: [
      {
        q: "Do you export green coffee internationally?",
        a: "Yes. We supply export-grade green Ugandan coffee to importers, roasters, traders, and distributors worldwide. We can assist with export documentation, phytosanitary certificates, and grading reports. Logistics coordination is available on request.",
      },
      {
        q: "What export documentation do you provide?",
        a: "We provide commercial invoices, packing lists, certificates of origin, phytosanitary certificates, and moisture content reports. We can work with your freight forwarder or recommend one if needed.",
      },
      {
        q: "What are your payment terms for international orders?",
        a: "For international export orders, payment terms are discussed per agreement — typically 50% deposit upfront and 50% before shipping, or full payment in advance for new buyers. We accept bank transfers (SWIFT/TT). Contact us to discuss your preferred arrangement.",
      },
      {
        q: "Can you arrange logistics and freight forwarding?",
        a: "We offer logistics coordination support and can connect you with trusted freight forwarders operating out of Kampala. Final freight arrangements are typically the responsibility of the buyer, but we assist with all documentation on our end.",
      },
    ],
  },
  {
    category: "Wholesale & Corporate Supply",
    faqs: [
      {
        q: "Do you offer wholesale pricing?",
        a: "Yes. We have tiered wholesale pricing for cafés, restaurants, hotels, and retailers. Discounts increase with volume. Contact us with your estimated monthly quantity and we'll provide a wholesale quote.",
      },
      {
        q: "Can you supply on a recurring schedule?",
        a: "Yes. We have corporate and café supply agreements that include scheduled deliveries — weekly, fortnightly, or monthly — based on your consumption. Consistency and reliability are core to what we offer.",
      },
      {
        q: "Do you supply to hotels and restaurants?",
        a: "Yes. We work with hospitality businesses across Kampala and the greater Wakiso district. Our coffee is served in several hotels and restaurants. We can provide menu-ready descriptions and origin stories for your beverage program.",
      },
      {
        q: "Is private-label packaging available?",
        a: "Yes. For larger volume partners, we offer private-label packaging with your brand. Minimum quantities apply. Lead times are typically 2–3 weeks for the first run. Contact us to discuss design and packaging specifications.",
      },
    ],
  },
  {
    category: "Delivery & Logistics",
    faqs: [
      {
        q: "Which areas do you deliver to?",
        a: "We deliver to Kampala, Kira, Kasangati, Najjera, Ntinda, Bukoto, Kyaliwajjala, Namugongo, Wakiso, Entebbe, and surrounding areas. For locations outside these areas, we can arrange courier delivery or arrange for collection from our roastery.",
      },
      {
        q: "How long does delivery take?",
        a: "For standard orders within Kampala and nearby areas, delivery takes 1–3 business days after your order is confirmed and roasted. Rush orders may be possible — contact us directly to confirm availability.",
      },
      {
        q: "Can I collect my order from the roastery?",
        a: "Yes. Collection is available from our location on Kira–Kasangati Road, Uganda. We'll notify you when your order is ready. Collection is a great opportunity to see the roastery and sample our coffee.",
      },
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function FAQPage() {
  useEffect(() => {
    document.title = "FAQs — MAZAJ Coffee Roasters Uganda";
    window.scrollTo(0, 0);
  }, []);

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
        <div className="absolute inset-0 bg-[url('/images/hero-roasting.png')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Everything you need to know about ordering, products, export, and working with MAZAJ Coffee Roasters Uganda.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-16">
            {FAQ_CATEGORIES.map((cat, ci) => (
              <motion.div
                key={ci}
                custom={ci}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <h2 className="text-xs font-bold tracking-widest text-primary uppercase mb-2">{cat.category}</h2>
                <div className="w-8 h-[2px] bg-primary mb-6" />
                <Accordion type="single" collapsible className="space-y-2">
                  {cat.faqs.map((faq, fi) => (
                    <AccordionItem
                      key={fi}
                      value={`${ci}-${fi}`}
                      className="border border-border/50 rounded-lg px-4 bg-card data-[state=open]:border-primary/40 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-medium py-5 hover:no-underline hover:text-primary transition-colors">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          {/* Still have questions */}
          <motion.div
            variants={fadeInUp}
            custom={FAQ_CATEGORIES.length}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-20 p-8 rounded-2xl bg-card border border-border text-center"
          >
            <h3 className="text-2xl font-serif mb-3">Still have a question?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Our team is happy to help. Reach out via WhatsApp, email, or the contact form and we'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <a href="/#contact">Contact Us</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://wa.me/256708132968" target="_blank" rel="noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
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
