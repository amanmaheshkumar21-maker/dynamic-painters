import { Mail, MapPin, Phone } from "lucide-react";

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer className="bg-brand-navy-dark text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img
              src="/assets/generated/dynamic-painters-logo-transparent.dim_400x200.png"
              alt="Dynamic Painters"
              className="h-14 w-auto object-contain mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Delhi NCR&apos;s trusted painting professionals. We bring color,
              life, and quality to every wall we touch.
            </p>
            <p className="text-brand-green italic text-sm mt-3 font-medium">
              &ldquo;We are known for smooth painting.&rdquo;
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "#home" },
                { label: "Services", href: "#services" },
                { label: "Book a Service", href: "#booking" },
                { label: "Contact Us", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-white/60 hover:text-brand-green transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-brand-green flex-shrink-0" />
                <a
                  href="tel:9716089123"
                  className="hover:text-brand-green transition-colors"
                >
                  +91 9716089123
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-brand-green flex-shrink-0" />
                <span>Delhi NCR, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-brand-green flex-shrink-0" />
                <span>dynamicpainters@email.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {year} Dynamic Painters. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-green transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
