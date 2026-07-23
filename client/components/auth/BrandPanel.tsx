"use client";

import { motion } from "motion/react";
import { GeistMono } from "geist/font/mono";
import { CheckCircle2 } from "lucide-react";

type LedgerRow = {
  label: string;
  detail: string;
  amount: string;
  isBalance?: boolean;
};

const rows: LedgerRow[] = [
  { label: "Ram Traders", detail: "Rice, 2 bags", amount: "4,200" },
  { label: "Sita Hardware", detail: "Cement supply", amount: "12,850" },
  { label: "Advance paid", detail: "Gopal Suppliers", amount: "−6,000" },
  { label: "Hari Kirana", detail: "Monthly stock", amount: "8,450" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};

const rowVariant = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BrandPanel() {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-[var(--color-navy)] p-10 text-[var(--color-white)] lg:flex">
      {/* faint dot-grid texture, like ruled ledger paper viewed from a distance */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* single soft glow, top right — restrained, not doubled */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-steel-blue)] opacity-[0.18] blur-[90px]" />

      {/* signature element: a physical passbook, taped up like it's pinned to a corkboard */}
      <div className="relative z-10 flex flex-1 items-center justify-center pb-6 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative w-full max-w-[340px]"
        >
          {/* drop shadow ground plane, separate from the card so the tilt reads as an object, not a panel */}
          <div className="absolute inset-x-6 -bottom-4 h-8 rounded-full bg-black/40 blur-xl" />

          {/* washi-tape corners, standing in for a logo — the object is pinned up, not branded */}
          <div className="absolute -top-3 left-6 z-20 h-6 w-14 -rotate-6 rounded-[2px] bg-[var(--color-marigold)]/70 shadow-sm ring-1 ring-black/10" />
          <div className="absolute -top-2.5 right-8 z-20 h-6 w-12 rotate-[8deg] rounded-[2px] bg-[var(--color-sky-accent)]/60 shadow-sm ring-1 ring-black/10" />

          <div className="relative overflow-hidden rounded-r-xl rounded-l-md bg-[var(--color-pale-blue-grey)] pl-9 shadow-2xl shadow-black/50 ring-1 ring-black/5">
            {/* binder spine with punch holes */}
            <div className="absolute inset-y-0 left-0 flex w-7 flex-col items-center justify-evenly bg-[var(--color-navy-dark)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full bg-[var(--color-navy)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"
                />
              ))}
            </div>

            <div className="px-4 py-4">
              <div className="mb-3 flex items-baseline justify-between border-b border-[var(--color-border)] pb-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-navy)]">
                  Khata — Baisakh
                </span>
                <span className="text-[10px] text-[var(--color-muted-text)]">
                  2083
                </span>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-2.5"
              >
                {rows.map((row) => (
                  <motion.div
                    key={row.label}
                    variants={rowVariant}
                    className="flex items-center justify-between gap-3 border-b border-dashed border-[var(--color-border)] pb-2.5 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-[var(--color-charcoal)]">
                        {row.label}
                      </p>
                      <p className="truncate text-[11px] text-[var(--color-muted-text)]">
                        {row.detail}
                      </p>
                    </div>
                    <span
                      className={`${GeistMono.className} shrink-0 text-[13px] tabular-nums ${
                        row.amount.startsWith("−")
                          ? "text-[var(--color-muted-text)]"
                          : "text-[var(--color-navy)]"
                      }`}
                    >
                      Rs {row.amount}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* balance strip, stamped rather than just highlighted */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.4 }}
              className="relative flex items-center justify-between bg-[var(--color-navy)] px-4 py-3"
            >
              <span className="text-[11px] font-medium uppercase tracking-wide text-white/60">
                Net balance
              </span>
              <span
                className={`${GeistMono.className} text-[15px] font-medium text-[var(--color-marigold)]`}
              >
                Rs 19,500
              </span>

              {/* stamp badge, slightly rotated to look hand-applied */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -18 }}
                animate={{ opacity: 1, scale: 1, rotate: -10 }}
                transition={{ delay: 1.4, duration: 0.35, ease: "backOut" }}
                className="absolute -right-3 -top-4 flex items-center gap-1 rounded-full border-2 border-[var(--color-marigold)] bg-[var(--color-navy)] px-2.5 py-1"
              >
                <CheckCircle2
                  className="h-3 w-3 text-[var(--color-marigold)]"
                  strokeWidth={2.5}
                />
                <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-marigold)]">
                  Settled
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* footline */}
      <div className="relative z-10">
        <h2 className="text-[26px] font-semibold leading-[1.2] tracking-tight">
          Your ledger,
          <br />
          wherever{" "}
          <span className="text-[var(--color-marigold)]">business</span>{" "}
          happens.
        </h2>
        <p className="mt-2.5 max-w-sm text-sm text-white/60">
          Track dues, payments, and stock for every customer — no paper khata
          required.
        </p>
      </div>
    </div>
  );
}
