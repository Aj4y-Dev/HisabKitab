"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Check, PlayCircle, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const ledgerRows = [
  { label: "Sales today", value: 48250, tag: "Received" },
  { label: "Supplier payment", value: -12400, tag: "Paid" },
  { label: "Customer khata — Sita Traders", value: 6800, tag: "Due" },
];

function useCountUp(target: number, start: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }

    let frame: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration, reduceMotion]);

  return value;
}

function LedgerCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const netTarget = ledgerRows.reduce((sum, row) => sum + row.value, 0);
  const net = useCountUp(netTarget, mounted);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ rotate: 0, y: -4 }}
      className="relative w-full max-w-sm rounded-2xl border border-border bg-white p-6 shadow-xl"
    >
      {/* Spiral-bound notebook edge */}
      <div className="absolute -left-2 top-6 flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="block h-2 w-2 rounded-full bg-white"
            style={{ border: "2px solid #f5a623" }}
          />
        ))}
      </div>

      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">
          Today's Khata
        </span>
        <span className="rounded-full bg-pale-blue-grey px-2.5 py-1 text-[11px] font-medium text-navy">
          Live
        </span>
      </div>

      <div className="space-y-3">
        {ledgerRows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -12 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.35 + i * 0.15,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="flex items-center justify-between border-b border-dashed border-border pb-3 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-2.5">
              <motion.span
                initial={{ scale: 0 }}
                animate={mounted ? { scale: 1 } : {}}
                transition={{
                  delay: 0.5 + i * 0.15,
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-marigold/20"
              >
                <Check
                  size={12}
                  className="text-marigold-dark"
                  strokeWidth={3}
                />
              </motion.span>
              <div>
                <p className="text-sm font-medium text-charcoal">{row.label}</p>
                <p className="text-xs text-muted">{row.tag}</p>
              </div>
            </div>
            <span
              className={`text-sm font-semibold tabular-nums ${
                row.value < 0 ? "text-red-500" : "text-navy"
              }`}
            >
              {row.value < 0 ? "-" : "+"}Rs{" "}
              {Math.abs(row.value).toLocaleString("en-IN")}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.4 }}
        className="mt-5 flex items-center justify-between rounded-xl bg-navy px-4 py-3"
      >
        <span className="text-xs font-medium uppercase tracking-wide text-white/70">
          Net position
        </span>
        <span className="text-base font-bold tabular-nums text-white">
          Rs {net.toLocaleString("en-IN")}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-white"
    >
      {/* Soft floating background accents */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-marigold/10 blur-3xl"
        animate={{ y: [0, 24, 0], x: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-pale-blue-grey blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-10">
        {/* Left: copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-pale-blue-grey px-3 py-1 text-xs font-medium text-navy"
          >
            Built for shops &amp; small businesses in Nepal
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]"
          >
            Your khata,
            <br />
            finally caught up.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-lg leading-relaxed text-charcoal/80"
          >
            Track sales, expenses, and customer credit the way you already do in
            your ledger book — except it adds itself up, never gets lost, and
            tells you who owes what before you have to ask.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/get-started"
              className="flex items-center gap-1.5 rounded-full bg-marigold px-6 py-3 text-base font-semibold text-charcoal transition-colors hover:bg-marigold-dark"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/features"
              className="flex items-center gap-2 px-2 py-3 text-base font-medium text-charcoal transition-colors hover:text-navy"
            >
              <PlayCircle size={20} />
              See how it works
            </Link>
          </motion.div>

          <motion.p variants={item} className="mt-6 text-sm text-muted">
            No card required · Set up in under 5 minutes
          </motion.p>
        </motion.div>

        {/* Right: signature ledger card */}
        <div className="flex justify-center lg:justify-end">
          <LedgerCard />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to learn what HisabKitab is"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-navy"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          y: { delay: 1.2, duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        Scroll to explore
        <ChevronDown size={18} />
      </motion.a>
    </section>
  );
}
