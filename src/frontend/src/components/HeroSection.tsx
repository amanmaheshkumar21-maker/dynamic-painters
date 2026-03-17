import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-painting-bg.dim_1200x600.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/40" />
      <div className="relative container mx-auto px-4 py-24 pt-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-brand-green/20 text-brand-green border border-brand-green/30 px-4 py-1 rounded-full text-sm font-medium mb-6">
              Delhi NCR&apos;s Trusted Painters
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-4">
              Dynamic<span className="block text-brand-green">Painters</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium italic mb-4">
              &ldquo;We are known for smooth painting.&rdquo;
            </p>
            <p className="text-white/60 text-base md:text-lg mb-10 leading-relaxed">
              Professional wall painting services across Delhi NCR. Transform
              your space with our expert team, quality materials, and flawless
              finish guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollTo("#booking")}
                className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold px-8 py-4 text-lg shadow-lg"
                data-ocid="hero.primary_button"
              >
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("#services")}
                className="border-white text-white hover:bg-white hover:text-brand-navy font-semibold px-8 py-4 text-lg"
                data-ocid="hero.secondary_button"
              >
                View Services
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-6 border-t border-white/20 pt-8"
          >
            {[
              { value: "500+", label: "Happy Clients" },
              { value: "10+", label: "Years Experience" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-display font-bold text-brand-green">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
