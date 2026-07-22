"use client";

import { motion, type Variants } from "motion/react";
import {
  BookOpenCheck,
  Boxes,
  Users,
  Receipt,
  UsersRound,
  LineChart,
} from "lucide-react";

const featured = [
  {
    icon: BookOpenCheck,
    title: "Digital khata",
    description:
      "Every sale, payment, and customer credit lands in one running ledger no more flipping through old notebook pages to find who owes what.",
  },
  {
    icon: UsersRound,
    title: "One family, every business in view",
    description:
      "Invite family members under one head account. The head sees every member's activity and spending; each member only ever sees their own.",
  },
];

const secondary = [
  {
    icon: Boxes,
    title: "Inventory that updates itself",
    description:
      "Stock adjusts the moment you sell or restock, so you always know what's on the shelf.",
  },
  {
    icon: Receipt,
    title: "Expenses, sorted",
    description:
      "Log daily expenses and see exactly where the money's going, by category and by month.",
  },
  {
    icon: LineChart,
    title: "Insights without the spreadsheet",
    description:
      "Sales trends and totals, summarized automatically no formulas required.",
  },
  {
    icon: Users,
    title: "Built for how you already work",
    description:
      "No new system to learn it mirrors the way Nepali shops already track business, just faster.",
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
      className="flex min-h-[calc(100vh-5rem)] items-center bg-[#e8edf5]/40"
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
            className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3 py-1 text-xs font-medium text-[#1a2b4a]"
          >
            What is HisabKitab?
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-5 text-3xl font-bold tracking-tight text-[#1a2b4a] sm:text-4xl"
          >
            The same khata you know, minus the guesswork.
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-4 text-lg leading-relaxed text-[#2d2d2d]/80"
          >
            HisabKitab is a business management app built for shops, traders,
            and small businesses in Nepal. It replaces the paper ledger, the
            loose receipts, and the mental math with one simple place for sales,
            inventory, expenses, and customer credit.
          </motion.p>
        </motion.div>

        {/* Featured pillars — 2 up, larger */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="mt-10 grid gap-5 sm:grid-cols-2"
        >
          {featured.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={item}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5a623]/15">
                  <Icon size={24} className="text-[#d88c0f]" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[#1a2b4a]">
                  {pillar.title}
                </h3>

                <p className="mt-2.5 max-w-md text-sm leading-relaxed text-[#6b7280]">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Secondary pillars — 4 up, compact */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {secondary.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={item}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8edf5]">
                  <Icon size={17} className="text-[#1a2b4a]" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-[#1a2b4a]">
                  {pillar.title}
                </h3>

                <p className="mt-1.5 text-xs leading-relaxed text-[#6b7280]">
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
