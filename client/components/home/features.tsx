"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  Boxes,
  Receipt,
  Users,
  LineChart,
  AlertTriangle,
  UsersRound,
  Eye,
  EyeOff,
} from "lucide-react";

const AUTO_ADVANCE_MS = 4500;

const features = [
  {
    id: "inventory",
    icon: Boxes,
    title: "Inventory Management",
    description:
      "Stock levels update the moment you sell or restock see what's running low before it runs out.",
  },
  {
    id: "billing",
    icon: Receipt,
    title: "Sales & Billing",
    description:
      "Generate a bill in seconds. Every sale is logged automatically, no separate entry needed.",
  },
  {
    id: "khata",
    icon: Users,
    title: "Customer Khata",
    description:
      "Track credit given to each customer and get a clear picture of who owes what, at a glance.",
  },
  {
    id: "family",
    icon: UsersRound,
    title: "Family Accounts",
    description:
      "Invite family members under one head account. The head sees everyone's activity each member sees only their own.",
  },
  {
    id: "reports",
    icon: LineChart,
    title: "Business Reports",
    description:
      "Daily, weekly, and monthly summaries sales trends and expenses without opening a spreadsheet.",
  },
] as const;

type FeatureId = (typeof features)[number]["id"];

function InventoryPreview() {
  const items = [
    { name: "Basmati Rice 5kg", level: 82 },
    { name: "Cooking Oil 1L", level: 24 },
    { name: "Wai Wai Noodles", level: 60 },
    { name: "Sugar 1kg", level: 12 },
  ];

  return (
    <div className="space-y-4">
      {items.map((product, i) => (
        <div key={product.name}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-charcoal">{product.name}</span>
            {product.level < 20 ? (
              <span className="flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertTriangle size={12} /> Low stock
              </span>
            ) : (
              <span className="text-xs text-muted">
                {product.level}% in stock
              </span>
            )}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-pale-blue-grey">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${product.level}%` }}
              transition={{
                duration: 0.8,
                delay: 0.15 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`h-full rounded-full ${
                product.level < 20 ? "bg-red-400" : "bg-marigold"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function BillingPreview() {
  const lines = [
    { name: "Cooking Oil 1L", qty: 2, price: 380 },
    { name: "Basmati Rice 5kg", qty: 1, price: 950 },
    { name: "Wai Wai Noodles", qty: 5, price: 30 },
  ];
  const total = lines.reduce((sum, l) => sum + l.qty * l.price, 0);

  return (
    <div className="relative rounded-xl border border-border bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        Invoice #0142
      </p>

      <div className="mt-4 space-y-2.5">
        {lines.map((line, i) => (
          <motion.div
            key={line.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.35 }}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-charcoal">
              {line.name} <span className="text-muted">× {line.qty}</span>
            </span>
            <span className="font-medium text-navy tabular-nums">
              Rs {(line.qty * line.price).toLocaleString("en-IN")}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-3">
        <span className="text-sm font-semibold text-charcoal">Total</span>
        <span className="text-base font-bold text-navy tabular-nums">
          Rs {total.toLocaleString("en-IN")}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 14 }}
        className="absolute right-6 top-6 rounded-md border-2 border-marigold px-3 py-1 text-xs font-bold uppercase tracking-wide text-marigold-dark"
      >
        Paid
      </motion.div>
    </div>
  );
}

function KhataPreview() {
  const customers = [
    { name: "Sita Traders", due: 6800 },
    { name: "Ram Kirana Pasal", due: 2150 },
    { name: "Gurung Store", due: 4300 },
  ];

  return (
    <div className="space-y-3">
      {customers.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 * i, duration: 0.4 }}
          className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
              {c.name.charAt(0)}
            </span>
            <span className="text-sm font-medium text-charcoal">{c.name}</span>
          </div>
          <span className="text-sm font-semibold text-red-500 tabular-nums">
            Owes Rs {c.due.toLocaleString("en-IN")}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function FamilyPreview() {
  const members = [
    { name: "Sita (You Head)", spend: 24500, visibleToAll: true },
    { name: "Ramesh", spend: 8200, visibleToAll: false },
    { name: "Anita", spend: 5100, visibleToAll: false },
    { name: "Bikash", spend: 11200, visibleToAll: false },
  ];
  const total = members.reduce((sum, m) => sum + m.spend, 0);

  return (
    <div className="w-full">
      {/* Head summary */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-4 flex items-center justify-between rounded-xl bg-navy px-4 py-3"
      >
        <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/70">
          <Eye size={13} /> Head sees all
        </span>
        <span className="text-base font-bold tabular-nums text-white">
          Rs {total.toLocaleString("en-IN")}
        </span>
      </motion.div>

      {/* Connecting line from head down to members */}
      <div className="relative">
        <svg
          className="absolute -top-2 left-4 h-4 w-px overflow-visible"
          aria-hidden
        >
          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2="16"
            stroke="#e8edf5"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          />
        </svg>

        <div className="space-y-2.5">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.12, duration: 0.35 }}
              className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm ${
                m.visibleToAll
                  ? "border-marigold/40 bg-marigold/10"
                  : "border-border bg-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pale-blue-grey text-xs font-semibold text-navy">
                  {m.name.charAt(0)}
                </span>
                <span className="font-medium text-charcoal">{m.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="tabular-nums text-navy">
                  Rs {m.spend.toLocaleString("en-IN")}
                </span>
                {!m.visibleToAll && (
                  <span title="Only visible to this member and the head">
                    <EyeOff size={13} className="text-muted" />
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="mt-3 text-center text-xs text-muted"
      >
        Members only see their own the head sees everything
      </motion.p>
    </div>
  );
}

function ReportsPreview() {
  const points = "0,60 30,45 60,50 90,25 120,32 150,10 180,15 210,0";

  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Weekly Sales
        </p>
        <span className="text-xs font-medium text-marigold-dark">
          +18% vs last week
        </span>
      </div>

      <svg viewBox="0 0 210 70" className="mt-4 h-28 w-full overflow-visible">
        <motion.polyline
          points={points}
          fill="none"
          stroke="#f5a623"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        {points.split(" ").map((p, i) => {
          const [x, y] = p.split(",").map(Number);
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={3}
              fill="#1a2b4a"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.25 }}
            />
          );
        })}
      </svg>
    </div>
  );
}

const previewMap: Record<FeatureId, () => React.JSX.Element> = {
  inventory: InventoryPreview,
  billing: BillingPreview,
  khata: KhataPreview,
  family: FamilyPreview,
  reports: ReportsPreview,
};

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

export default function Features() {
  const [active, setActive] = useState<FeatureId>("inventory");
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(() => {
      setActive((current) => {
        const index = features.findIndex((f) => f.id === current);
        return features[(index + 1) % features.length].id;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, reduceMotion]);

  const ActivePreview = previewMap[active];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-pale-blue-grey px-3 py-1 text-xs font-medium text-navy"
          >
            Features
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-5 text-3xl font-bold tracking-tight text-navy sm:text-4xl"
          >
            Everything your shop's ledger needs to do done for it.
          </motion.h2>
        </motion.div>

        <div
          className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Tab list */}
          <div className="space-y-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isActive = feature.id === active;

              return (
                <button
                  key={feature.id}
                  onClick={() => setActive(feature.id)}
                  className="relative block w-full rounded-xl px-4 py-4 text-left transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="feature-active-bg"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-xl bg-pale-blue-grey"
                    />
                  )}

                  <div className="relative flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isActive
                          ? "bg-marigold text-charcoal"
                          : "bg-pale-blue-grey text-navy"
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    <div>
                      <p
                        className={`text-base font-semibold transition-colors ${
                          isActive ? "text-navy" : "text-charcoal"
                        }`}
                      >
                        {feature.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <motion.div
                      key={`${feature.id}-progress`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused || reduceMotion ? 0 : 1 }}
                      transition={{
                        duration: AUTO_ADVANCE_MS / 1000,
                        ease: "linear",
                      }}
                      className="relative mt-2 h-0.5 origin-left rounded-full bg-marigold"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Preview panel */}
          <div className="relative flex items-center justify-center rounded-2xl border border-border bg-pale-blue-grey/40 p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-sm"
              >
                <ActivePreview />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
