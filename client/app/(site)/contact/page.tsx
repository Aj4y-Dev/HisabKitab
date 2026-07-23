"use client";

import { useState, type FormEvent } from "react";
import { motion, type Variants } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    label: "Office",
    value: "Kathmandu, Nepal",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977 98XXXXXXXX",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@hisabkitab.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Sun – Fri, 10:00 AM – 6:00 PM",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  function validate() {
    const next: Partial<typeof form> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) next.subject = "Please enter a subject.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    // Replace with your actual API call, e.g.:
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
        {/* Page heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={container}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-[#e8edf5] px-3 py-1 text-xs font-medium text-[#1a2b4a]"
          >
            Contact Us
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-3xl font-bold tracking-tight text-[#1a2b4a] sm:text-4xl"
          >
            Get in touch with our team
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-lg leading-relaxed text-[#2d2d2d]/80"
          >
            Have a question about HisabKitab, need help setting up your
            business, or want to report an issue? Send us a message and we'll
            respond within one business day.
          </motion.p>
        </motion.div>

        {/* Form + details */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5a623]/15">
                  <CheckCircle2 size={28} className="text-[#d88c0f]" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-[#1a2b4a]">
                  Message sent
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#6b7280]">
                  Thank you for reaching out. Our team will get back to you at{" "}
                  {form.email} within one business day.
                </p>
                <button
                  onClick={() => {
                    setForm({ name: "", email: "", subject: "", message: "" });
                    setStatus("idle");
                  }}
                  className="mt-6 text-sm font-medium text-[#1a2b4a] underline underline-offset-4 hover:text-[#f5a623]"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-[#1a2b4a]"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Sita Gurung"
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#2d2d2d] outline-none transition-colors focus:border-[#f5a623] ${
                        errors.name ? "border-red-400" : "border-[#e5e7eb]"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-[#1a2b4a]"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="sita@example.com"
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#2d2d2d] outline-none transition-colors focus:border-[#f5a623] ${
                        errors.email ? "border-red-400" : "border-[#e5e7eb]"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-sm font-medium text-[#1a2b4a]"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    placeholder="How can we help?"
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#2d2d2d] outline-none transition-colors focus:border-[#f5a623] ${
                      errors.subject ? "border-red-400" : "border-[#e5e7eb]"
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-[#1a2b4a]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us a bit about your business and what you need help with..."
                    className={`w-full resize-none rounded-lg border px-4 py-2.5 text-sm text-[#2d2d2d] outline-none transition-colors focus:border-[#f5a623] ${
                      errors.message ? "border-red-400" : "border-[#e5e7eb]"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#f5a623] px-6 py-3 text-sm font-semibold text-[#2d2d2d] transition-colors hover:bg-[#d88c0f] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "submitting" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact details */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="space-y-4"
          >
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <motion.div
                  key={detail.label}
                  variants={item}
                  className="flex items-start gap-4 rounded-2xl border border-[#e5e7eb] bg-[#e8edf5]/40 p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                    <Icon size={18} className="text-[#f5a623]" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      {detail.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#1a2b4a]">
                      {detail.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            <motion.p
              variants={item}
              className="px-1 text-xs leading-relaxed text-[#6b7280]"
            >
              For account or billing issues, please include your registered
              business name so our team can locate your account faster.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
