"use client";

import { motion, type Variants } from "motion/react";
import { BookOpenCheck, Boxes, Users, Receipt } from "lucide-react";

const pillars = [
  {
    icon: BookOpenCheck,
    title: "Digital khata",
    description:
      "Every sale, payment, and customer credit lands in one running ledger — no more flipping through old notebook pages to find who owes what.",
  },
  {
    icon: Boxes,
    title: "Inventory that updates itself",
    description:
      "Stock levels adjust the moment you record a sale or a restock, so you always know what's actually on the shelf.",
  },
  {
    icon: Receipt,
    title: "Expenses, sorted",
    description:
      "Log daily expenses as they happen and see exactly where the money's going, broken down by category and by month.",
  },
  {
    icon: Users,
    title: "Built for how you already work",
    description:
      "No new system to learn — HisabKitab mirrors the way Nepali shops and traders already track business, just faster and harder to lose.",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="flex min-h-[calc(100vh-5rem)] items-center bg-pale-blue-grey/40"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-navy"
          >
            What is HisabKitab?
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-5 text-3xl font-bold tracking-tight text-navy sm:text-4xl"
          >
            The same khata you know, minus the guesswork.
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-4 text-lg leading-relaxed text-charcoal/80"
          >
            HisabKitab is a business management app built for shops, traders,
            and small businesses in Nepal. It replaces the paper ledger, the
            loose receipts, and the mental math with one simple place for sales,
            inventory, expenses, and customer credit.
          </motion.p>
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={item}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold/15">
                  <Icon size={20} className="text-marigold-dark" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-navy">
                  {pillar.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
