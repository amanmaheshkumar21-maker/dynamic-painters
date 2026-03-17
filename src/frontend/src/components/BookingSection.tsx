import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const serviceOptions = [
  "Interior Painting",
  "Exterior Painting",
  "Texture Painting",
  "Waterproofing",
  "False Ceiling",
  "Wood Polishing",
];

export default function BookingSection() {
  const { actor } = useActor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    serviceType: "",
    preferredDate: "",
    message: "",
  });

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Unable to connect. Please try again.");
      return;
    }
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.serviceType ||
      !form.preferredDate
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const dateMs = BigInt(new Date(form.preferredDate).getTime());
      await actor.submitBooking(
        form.name,
        form.phone,
        form.address,
        form.serviceType,
        dateMs,
        form.message,
      );
      toast.success("Booking submitted! We'll contact you shortly.");
      setForm({
        name: "",
        phone: "",
        address: "",
        serviceType: "",
        preferredDate: "",
        message: "",
      });
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-brand-green font-semibold text-sm uppercase tracking-widest">
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-navy mt-2 mb-4">
            Book a Service
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fill in the form below and we&apos;ll get in touch to confirm your
            booking.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto bg-white border border-border rounded-2xl shadow-card p-8"
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="booking.panel"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="booking-name">Full Name *</Label>
                <Input
                  id="booking-name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  data-ocid="booking.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-phone">Phone Number *</Label>
                <Input
                  id="booking-phone"
                  placeholder="Your phone number"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  data-ocid="booking.phone.input"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-address">Address *</Label>
              <Input
                id="booking-address"
                placeholder="Your complete address"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                data-ocid="booking.address.input"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Service Type *</Label>
                <Select
                  value={form.serviceType}
                  onValueChange={(val) => handleChange("serviceType", val)}
                >
                  <SelectTrigger data-ocid="booking.select">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-date">Preferred Date *</Label>
                <Input
                  id="booking-date"
                  type="date"
                  value={form.preferredDate}
                  onChange={(e) =>
                    handleChange("preferredDate", e.target.value)
                  }
                  min={new Date().toISOString().split("T")[0]}
                  data-ocid="booking.date.input"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-message">Message (Optional)</Label>
              <Textarea
                id="booking-message"
                placeholder="Any additional details..."
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={3}
                data-ocid="booking.textarea"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-3 text-base"
              data-ocid="booking.submit_button"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <CalendarCheck className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? "Submitting..." : "Submit Booking"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
