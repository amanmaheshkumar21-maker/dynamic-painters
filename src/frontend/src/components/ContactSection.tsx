import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Loader2, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export default function ContactSection() {
  const { actor } = useActor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Unable to connect.");
      return;
    }
    if (!form.name || !form.phone || !form.message) {
      toast.error("Please fill in required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      await actor.submitContactMessage(
        form.name,
        form.phone,
        form.email,
        form.message,
      );
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-brand-green font-semibold text-sm uppercase tracking-widest">
            Reach Us
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-navy mt-2 mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions? We&apos;re here to help.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-display font-bold text-brand-navy">
              Get in Touch
            </h3>
            <p className="text-muted-foreground">
              We&apos;d love to hear from you. Whether you need a quote, have a
              question, or want to schedule an inspection.
            </p>
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  content: (
                    <a
                      href="tel:9716089123"
                      className="text-muted-foreground hover:text-brand-green transition-colors"
                    >
                      +91 9716089123
                    </a>
                  ),
                },
                {
                  icon: MapPin,
                  label: "Address",
                  content: (
                    <span className="text-muted-foreground">
                      Delhi NCR, India
                    </span>
                  ),
                },
                {
                  icon: Clock,
                  label: "Working Hours",
                  content: (
                    <>
                      <div className="text-muted-foreground">
                        Mon – Sat: 8:00 AM – 7:00 PM
                      </div>
                      <div className="text-muted-foreground">
                        Sunday: 9:00 AM – 5:00 PM
                      </div>
                    </>
                  ),
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  content: (
                    <a
                      href="https://wa.me/919716089123"
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-brand-green transition-colors"
                    >
                      Chat with us on WhatsApp
                    </a>
                  ),
                },
              ].map(({ icon: Icon, label, content }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-navy flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <div className="font-semibold text-brand-navy">{label}</div>
                    {content}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-border rounded-2xl shadow-card p-8"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="contact.panel"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name *</Label>
                  <Input
                    id="contact-name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    data-ocid="contact.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone *</Label>
                  <Input
                    id="contact-phone"
                    placeholder="Your phone"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    data-ocid="contact.phone.input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="Your email (optional)"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  data-ocid="contact.email.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={4}
                  data-ocid="contact.textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-semibold py-3"
                data-ocid="contact.submit_button"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
