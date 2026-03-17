import { BadgeDollarSign, CheckCircle2, Clock, Users } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: CheckCircle2,
    title: "Quality Materials",
    description:
      "We use only premium, trusted paint brands that ensure a long-lasting and beautiful finish.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our skilled painters bring years of experience and craftsmanship to every project.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "We respect your time. Projects are completed on schedule without compromising quality.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Pricing",
    description:
      "Competitive, transparent pricing with no hidden charges. Value for every rupee spent.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-brand-navy">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-brand-green font-semibold text-sm uppercase tracking-widest">
            Why Us
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-2 mb-4">
            Why Choose Dynamic Painters?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We&apos;re committed to delivering excellence in every stroke.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-brand-green" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
