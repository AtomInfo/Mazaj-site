import { ContactForm } from "@/components/contact-form";
import { FlipCard } from "@/components/flip-card";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const HERO_SLIDES = [
  { src: "/images/hero-harvesting.png",   label: "Coffee Harvesting",  step: "01" },
  { src: "/images/hero-cleaning.png",     label: "Cleaning & Sorting", step: "02" },
  { src: "/images/hero-green-coffee.png", label: "Green Coffee",       step: "03" },
  { src: "/images/hero.png",     label: "Roasting",           step: "04" },
  { src: "/images/hero-grounding.png",     label: "Grinding",           step: "05" },
  { src: "/images/hero-packaging.png",    label: "Packaging",          step: "06" },
];

const SLIDE_DURATION = 5000;

const TESTIMONIALS = [
  {
    quote: "Excellent quality coffee with a rich aroma and great flavor. Freshly roasted, professionally packaged, and great customer service. Highly recommend MAZAJ COFFEE ROASTERS UGANDA for anyone looking for premium Ugandan coffee around Kampala.",
    name: "Liorah Atukunda Katsme",
    role: "Corporate Client",
    company: "",
    initials: "LAK",
  },
  {
    quote: "Freshly roasted coffee with amazing aroma and flavor. Great quality and excellent customer service. Highly recommended!",
    name: "Ethan Arinaitwe",
    role: "International Buyer",
    company: "",
    initials: "EA",
  },
  {
    quote: "So delicious I liked your coffee wow! Ordering soon for my cafe business especially Espresso and Roasted Coffee beans",
    name: "Amary sarah",
    role: "Café Owner",
    company: "",
    initials: "AS",
  },
  {
    quote: "Very delicious! Tastes nice well Grounded Espresso 😋 Fine Grounded I liked your coffee ☕️ And I recommend especially those with cafés try them",
    name: "Kyokunda Molly",
    role: "Corporate Client",
    company: "",
    initials: "KM",
  },
];

const TESTIMONIAL_DURATION = 6000;

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent((idx + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, TESTIMONIAL_DURATION);
    return () => clearTimeout(t);
  }, [current, paused, next]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
  };

  const t = TESTIMONIALS[current];

  return (
    <section
      id="testimonials"
      className="py-28 bg-card overflow-hidden"
      // onMouseEnter={() => setPaused(true)}
      // onMouseLeave={() => setPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">What People Say</h2>
          <h3 className="text-3xl md:text-4xl font-serif">Trusted by Businesses Worldwide</h3>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Quote mark */}
          <span className="absolute -top-6 -left-4 text-[96px] leading-none text-primary/20 font-serif select-none pointer-events-none">"</span>

          {/* Animated card */}
          <div className="relative min-h-[260px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed font-light italic mb-10">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role} — {t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="relative h-[3px] rounded-full overflow-hidden bg-border transition-all duration-300"
                  style={{ width: i === current ? "28px" : "12px" }}
                >
                  {i === current && (
                    <motion.span
                      key={current}
                      className="absolute inset-0 bg-primary rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: TESTIMONIAL_DURATION / 1000, ease: "linear" }}
                      style={{ originX: 0 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent((idx + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  useEffect(() => {
    document.title = "MAZAJ Coffee Roasters Uganda | Freshly Roasted Specialty Coffee";
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [current, paused, next]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, scale: dir > 0 ? 1.06 : 0.96 }),
    center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const } },
    exit:  (dir: number) => ({ opacity: 0, scale: dir > 0 ? 0.96 : 1.06, transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
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

      {/* Hero Section */}
      <section
        className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
        // onMouseEnter={() => setPaused(true)}
        // onMouseLeave={() => setPaused(false)}
      >
        {/* Carousel background */}
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={HERO_SLIDES[current].src}
              alt={HERO_SLIDES[current].label}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/55" />
          </motion.div>
        </AnimatePresence>

        {/* Step label — bottom-left on desktop, below buttons on mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`label-${current}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.3 } }}
            className="hidden sm:flex absolute bottom-24 left-8 z-20 items-center gap-3"
          >
            <span className="text-primary font-bold text-sm tracking-widest tabular-nums">
              {HERO_SLIDES[current].step} / {String(HERO_SLIDES.length).padStart(2, "0")}
            </span>
            <span className="w-px h-4 bg-white/40" />
            <span className="text-white/90 text-sm font-medium tracking-wider uppercase">
              {HERO_SLIDES[current].label}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative h-[3px] rounded-full overflow-hidden bg-white/30 transition-all duration-300"
              style={{ width: i === current ? "32px" : "12px" }}
            >
              {i === current && (
                <motion.span
                  key={current}
                  className="absolute inset-0 bg-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                  style={{ originX: 0 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>

        {/* Hero content */}
        <div className="container relative z-10 mx-auto px-4 text-center mt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto space-y-8"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight"
            >
              Freshly Roasted Ugandan <br />
              <span className="text-primary italic font-serif">Specialty Coffee</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light"
            >
              Premium roasted coffee beans, espresso blends, wholesale supply, and export-quality coffee from Uganda.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6" onClick={() => scrollTo("products")}>
                Order Coffee
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-black" onClick={() => scrollTo("contact")}>
                Request a Quote
              </Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="mt-4 flex flex-col items-center gap-3 sm:hidden"
            >
              <span className="text-primary font-bold text-sm tracking-widest tabular-nums">
                {HERO_SLIDES[current].step} / {String(HERO_SLIDES.length).padStart(2, "0")}
              </span>
              <span className="text-white/90 text-sm font-medium tracking-wider uppercase text-center">
                {HERO_SLIDES[current].label}
              </span>
              <div className="flex gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i, i > current ? 1 : -1)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="relative h-[3px] rounded-full overflow-hidden bg-white/30 transition-all duration-300"
                    style={{ width: i === current ? "32px" : "12px" }}
                  >
                    {i === current && (
                      <motion.span
                        key={current}
                        className="absolute inset-0 bg-primary rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                        style={{ originX: 0 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Our Story</h2>
            <h3 className="text-3xl md:text-4xl font-serif">The Soul of African Origin</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MAZAJ Coffee Roasters Uganda is a specialty coffee roastery located on Kira–Kasangati Road, Uganda. We source from Uganda's finest coffee-growing regions to supply homes, cafés, restaurants, hotels, retailers, and international buyers. Our brand is warm, proud, and craft-forward — bringing the precision of a specialty roaster to the soul of African origin.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">What We Do</h2>
            <h3 className="text-3xl md:text-4xl font-serif">Our Services</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              "Coffee Roasting", "Custom Roasting", "Wholesale Coffee Supply", 
              "Roasted Coffee Beans", "Ground Coffee", "Espresso Blends", 
              "Green Coffee Beans", "Coffee Export Services", "Corporate Coffee Supply", 
              "Café Supply Solutions"
            ].map((service, i) => (
              <Card key={i} className="border-border/50 bg-card hover:border-primary/50 transition-colors">
                <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[120px]">
                  <p className="font-medium">{service}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Our Selection</h2>
            <h3 className="text-3xl md:text-4xl font-serif">Premium Products</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Premium Arabica Coffee Beans", img: "/images/product-arabica.png", desc: "Single-origin Arabica from Uganda's high-altitude regions. Bright acidity, floral notes, and a clean complex finish. Available in light, medium, and dark roast." },
              { title: "Espresso Blend", img: "/images/product-espresso.png", desc: "Our signature blend of select Ugandan Arabica and Robusta for a bold, balanced shot with rich crema and a lingering caramel sweetness." },
              { title: "Ground Coffee", img: "/images/product-ground.png", desc: "Freshly ground to order in espresso, filter, French press, and Moka pot sizes. Sealed for freshness within 24 hours of grinding." },
              { title: "Specialty Single Origin Coffee", img: "/images/product-single-origin.png", desc: "Traceable lots from specific Ugandan farms and cooperatives. Cup scores 80+. Perfect for specialty retailers and discerning home brewers." },
              { title: "Green Coffee Beans", img: "/images/product-green.png", desc: "Export-quality unroasted Ugandan coffee for importers and roasters worldwide. Available in washed, natural, and honey process." },
              { title: "Export Coffee Lots", img: "/images/product-export.png", desc: "Large-volume export lots of green and roasted coffee for international buyers. We handle grading, sorting, documentation, and logistics support." },
            ].map((product, i) => (
              <FlipCard
                key={i}
                height={380}
                front={
                  <div className="w-full h-full flex flex-col border border-border/50 rounded-lg bg-background shadow-sm">
                    <div className="flex-1 overflow-hidden rounded-t-lg">
                      <img src={product.img} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 text-center">
                      <h4 className="text-lg font-serif font-medium">{product.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Hover to learn more</p>
                    </div>
                  </div>
                }
                back={
                  <div className="w-full h-full flex flex-col items-center justify-center p-7 text-center gap-5 bg-[#2C1810] rounded-lg shadow-sm">
                    <h4 className="text-xl font-serif font-semibold text-[#F5F0E8]">{product.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.80)" }}>{product.desc}</p>
                    <button
                      onClick={() => scrollTo("contact")}
                      className="mt-2 w-full rounded-md px-4 py-2 text-sm font-semibold transition-colors"
                      style={{ background: "#C9A84C", color: "#0D0A07" }}
                    >
                      Inquire
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">The MAZAJ Difference</h2>
            <h3 className="text-3xl md:text-4xl font-serif">Why Choose Us</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              "Freshly Roasted", "Export Quality", "Ugandan Specialty Coffee", 
              "Reliable Supply", "Competitive Pricing", "Consistent Quality", "Professional Service"
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/50">
                <CheckCircle2 className="text-primary shrink-0 mt-1" />
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Export Section */}
      <section id="export" className="relative py-32 bg-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/gallery-roasting.png')] bg-cover bg-center mix-blend-overlay" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-primary">Export-Quality Ugandan Coffee</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
            Supplying importers and distributors worldwide with premium Ugandan coffee. We handle the complexities so you can focus on quality.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {["International Supply", "Bulk Orders", "Quality Assurance", "Export Documentation Support"].map((item, i) => (
              <div key={i} className="border border-white/20 p-6 rounded-lg bg-black/40 backdrop-blur-sm">
                <h4 className="font-bold">{item}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery & Service Areas */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-serif mb-8">Craft in Action</h3>
              <div className="grid grid-cols-2 gap-4">
                {["gallery-roasting.png", "gallery-beans.png", "gallery-farm.png", "gallery-packaging.png"].map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <img src={`/images/${img}`} alt="Gallery" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-serif mb-8">Service Areas</h3>
              <p className="text-muted-foreground mb-6">Proudly serving the greater Kampala region and beyond, while exporting internationally.</p>
              <div className="flex flex-wrap gap-3">
                {["Kampala", "Kira", "Kasangati", "Najjera", "Ntinda", "Bukoto", "Kyaliwajjala", "Namugongo", "Wakiso", "Entebbe"].map((area, i) => (
                  <span key={i} className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Get in Touch</h2>
              <h3 className="text-3xl md:text-4xl font-serif mb-8">Let's Talk Coffee</h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-background rounded-full shrink-0">
                    <MapPin className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p className="text-muted-foreground">Kira–Kasangati Road, Uganda</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-background rounded-full shrink-0">
                    <Phone className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Phone / WhatsApp</h4>
                    <p className="text-muted-foreground">
                      <a href="tel:+256708132968" className="hover:text-primary transition-colors">+256 708 132968</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-background rounded-full shrink-0">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p className="text-muted-foreground">
                      <a href="mailto:mazajcoffeeroastersuganda@gmail.com" className="hover:text-primary transition-colors">mazajcoffeeroastersuganda@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-8 rounded-xl border border-border shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-white">
            MAZAJ <span className="text-primary">COFFEE</span>
          </h2>
          <p className="text-white/60">Premium roasted coffee beans, espresso blends, wholesale supply, and export-quality coffee from Uganda.</p>
          <div className="pt-8 border-t border-white/10 text-white/40 text-sm">
            © 2026 MAZAJ Coffee Roasters Uganda. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
