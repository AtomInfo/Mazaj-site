import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const ANCHOR_LINKS = [
  { label: "About",    href: "about" },
  { label: "Services", href: "services" },
  { label: "Why Us",   href: "why-us" },
  { label: "Export",   href: "export" },
  { label: "Contact",  href: "contact" },
];

const PAGE_LINKS = [
  { label: "Products", path: "/products" },
  { label: "FAQ",      path: "/faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/" || location === "";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const isOnSubpage = !isHome;
  const textColor = isOnSubpage || isScrolled ? "text-foreground/80" : "text-white/90";
  const activeColor = "hover:text-primary";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOnSubpage || isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`text-xl font-bold uppercase tracking-wider transition-colors ${
                isOnSubpage || isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              MAZAJ <span className="text-primary">COFFEE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {/* Anchor links — scroll on home, navigate on sub-pages */}
              {ANCHOR_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm font-medium transition-colors ${textColor} ${activeColor}`}
                >
                  {link.label}
                </button>
              ))}

              {/* Page links */}
              {PAGE_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    location === link.path ? "text-primary font-semibold" : `${textColor} ${activeColor}`
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l border-border/30 pl-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-colors ${
                  isOnSubpage || isScrolled ? "hover:bg-muted" : "hover:bg-white/10 text-white"
                }`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Button onClick={() => scrollTo("contact")}>Order Coffee</Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition-colors ${
                isOnSubpage || isScrolled ? "hover:bg-muted" : "hover:bg-white/10 text-white"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${isOnSubpage || isScrolled ? "text-foreground" : "text-white"}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg border-b border-border py-4 px-4 flex flex-col gap-2">
          {ANCHOR_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left text-base font-medium text-foreground py-3 border-b border-border/40 hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          {PAGE_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-base font-medium py-3 border-b border-border/40 hover:text-primary transition-colors ${
                location === link.path ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button onClick={() => scrollTo("contact")} className="w-full mt-4">
            Order Coffee
          </Button>
        </div>
      )}
    </nav>
  );
}
