import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Book Now", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

const scrollTo = (href: string, close?: () => void) => {
  close?.();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-navy shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="flex items-center"
          >
            <img
              src="/assets/generated/dynamic-painters-logo-transparent.dim_400x200.png"
              alt="Dynamic Painters"
              className="h-12 w-auto object-contain"
            />
          </button>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/80 hover:text-brand-green px-4 py-2 rounded-md transition-colors font-medium text-sm"
              >
                {link.label}
              </button>
            ))}
            <Link to="/admin">
              <Button
                type="button"
                size="sm"
                className="ml-2 bg-brand-green hover:bg-brand-green-dark text-white border-0"
                data-ocid="nav.admin.button"
              >
                Admin Login
              </Button>
            </Link>
          </div>
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-ocid="nav.toggle"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-brand-navy-dark border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => scrollTo(link.href, () => setIsMenuOpen(false))}
              className="block w-full text-left text-white/80 hover:text-brand-green px-4 py-3 rounded-md transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
          <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
            <Button
              type="button"
              className="w-full mt-2 bg-brand-green hover:bg-brand-green-dark text-white"
            >
              Admin Login
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
