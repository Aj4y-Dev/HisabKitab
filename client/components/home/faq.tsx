"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { Plus, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What is HisabKitab and who is it for?",
    answer:
      "HisabKitab is a business management app for shops, traders, and small businesses in Nepal it replaces the paper khata with digital sales, inventory, expense, and customer credit tracking.",
  },
  {
    question: "Do I need accounting knowledge to use it?",
    answer:
      "No. If you can keep a khata by hand, you already know everything you need HisabKitab just does the adding up and remembering for you.",
  },
  {
    question: "How is my data kept safe?",
    answer:
      "Your records are encrypted and backed up automatically, so a lost phone or a torn notebook page never means lost business data again.",
  },
  {
    question: "Is HisabKitab free to use?",
    answer:
      "Yes, core features like sales, inventory, and customer khata are free to get started. Optional add ons for larger shops are available inside the app.",
  },
  {
    question: "Can my family members use one account together?",
    answer:
      "Yes invite family members under your head account. You'll see everyone's activity and spending each member only ever sees their own.",
  },
  {
    question: "Is it available on both mobile and desktop?",
    answer:
      "Yes, your khata stays in sync whether you're behind the counter on your phone or reviewing the day's numbers on a computer at home.",
  },
  {
    question: "Can I use HisabKitab without internet?",
    answer:
      "You can keep recording sales and expenses offline everything syncs automatically the next time you're connected.",
  },
  {
    question: "Is it suitable for a business that's just starting out?",
    answer:
      "Absolutely many shop owners start with HisabKitab from day one so they never build the habit of tracking things on loose paper in the first place.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={item}
      className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-[#1a2b4a] sm:text-base">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8edf5] text-[#1a2b4a]"
        >
          <Plus size={15} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-[#6b7280]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-3xl font-bold tracking-tight text-[#1a2b4a] sm:text-4xl"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="mt-12 grid items-start gap-4 lg:grid-cols-2"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="/faq"
            className="flex items-center gap-2 rounded-full border border-[#e5e7eb] px-5 py-2.5 text-sm font-medium text-[#1a2b4a] transition-colors hover:bg-[#e8edf5]"
          >
            See All FAQs
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
