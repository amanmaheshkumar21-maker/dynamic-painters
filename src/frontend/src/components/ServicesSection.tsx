import { Card, CardContent } from "@/components/ui/card";
import {
  Armchair,
  Building2,
  Droplets,
  Home,
  Layers,
  LayoutGrid,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Home,
    title: "Interior Painting",
    description:
      "Transform your indoor spaces with flawless, smooth finishes using premium paints for lasting beauty.",
  },
  {
    icon: Building2,
    title: "Exterior Painting",
    description:
      "Weather-resistant exterior painting that protects and beautifies your property's outer walls.",
  },
  {
    icon: Layers,
    title: "Texture Painting",
    description:
      "Add depth and character to your walls with stunning texture effects and artistic patterns.",
  },
  {
    icon: Droplets,
    title: "Waterproofing",
    description:
      "Expert waterproofing solutions for terrace, bathrooms, and exterior walls to prevent seepage.",
  },
  {
    icon: LayoutGrid,
    title: "False Ceiling",
    description:
      "Modern gypsum and POP false ceiling installations that enhance aesthetics and acoustics.",
  },
  {
    icon: Armchair,
    title: "Wood Polishing",
    description:
      "Revive and protect your wooden furniture and surfaces with professional polishing services.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-brand-green font-semibold text-sm uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-navy mt-2 mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From interior walls to exterior facades, we offer comprehensive
            painting and finishing services.
          </p>
        </motion.div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="services.list"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                data-ocid={`services.item.${index + 1}`}
              >
                <Card className="h-full border border-border hover:border-brand-green hover:shadow-card-hover transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-brand-navy/5 flex items-center justify-center mb-4 group-hover:bg-brand-green/10 transition-colors">
                      <Icon className="w-7 h-7 text-brand-navy group-hover:text-brand-green transition-colors" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-navy mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
