"use client";

import { motion, type Variants } from "motion/react";
import { Star, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Sita Gurung",
    business: "Gurung General Store, Pokhara",
    quote:
      "I used to spend an hour every night adding up the day's khata by hand. Now it's already done by the time I close the shutter.",
    rating: 5,
  },
  {
    name: "Ramesh Shrestha",
    business: "Shrestha Hardware, Kathmandu",
    quote:
      "My son helps run the shop on weekends. With family accounts he logs his own sales and I still see everything at the end of the day.",
    rating: 5,
  },
  {
    name: "Anita Tamang",
    business: "Tamang Kirana Pasal, Lalitpur",
    quote:
      "I finally stopped losing paper receipts. Every bill photo is saved and I can find any customer's due amount in seconds.",
    rating: 5,
  },
  {
    name: "Bikash Rai",
    business: "Rai Electronics, Butwal",
    quote:
      "Stock used to run out without warning. Now I get a low-stock nudge before I'm caught off guard in front of a customer.",
    rating: 4,
  },
  {
    name: "Sunita Magar",
    business: "Magar Cosmetics, Chitwan",
    quote:
      "Reminding customers to pay used to feel awkward. Now HisabKitab sends it for me and the money actually comes in on time.",
    rating: 5,
  },
  {
    name: "Deepak Thapa",
    business: "Thapa Traders, Biratnagar",
    quote:
      "Switching from my old notebook felt risky. Two weeks in, my staff were using it faster than I was.",
    rating: 5,
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:w-[360px]">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < t.rating
                ? "fill-[#f5a623] text-[#f5a623]"
                : "fill-[#e8edf5] text-[#e8edf5]"
            }
          />
        ))}
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-[#2d2d2d]/85">
        "{t.quote}"
      </p>

      <div className="mt-5 flex items-center gap-3 border-t border-[#e5e7eb] pt-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a2b4a] text-sm font-semibold text-white">
          {t.name.charAt(0)}
        </span>
        <div>
          <p className="flex items-center gap-1 text-sm font-semibold text-[#1a2b4a]">
            {t.name}
            <BadgeCheck size={14} className="text-[#f5a623]" />
          </p>
          <p className="text-xs text-[#6b7280]">{t.business}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = [...testimonials, ...testimonials];
  const row2 = [
    ...testimonials.slice().reverse(),
    ...testimonials.slice().reverse(),
  ];

  return (
    <section className="overflow-hidden bg-[#e8edf5]/40 py-20 lg:py-28">
      <style>{`
        @keyframes hk-marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes hk-marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .hk-marquee-track-left {
          animation: hk-marquee-left 42s linear infinite;
        }
        .hk-marquee-track-right {
          animation: hk-marquee-right 42s linear infinite;
        }
        .hk-marquee-row:hover .hk-marquee-track-left,
        .hk-marquee-row:hover .hk-marquee-track-right {
          animation-play-state: paused;
        }
      `}</style>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={container}
        className="mx-auto max-w-2xl px-6 text-center sm:px-8 lg:px-10"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3 py-1 text-xs font-medium text-[#1a2b4a]"
        >
          Testimonials
        </motion.span>

        <motion.h2
          variants={item}
          className="mt-5 text-3xl font-bold tracking-tight text-[#1a2b4a] sm:text-4xl"
        >
          Hear from our trusted business owners
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-4 text-lg leading-relaxed text-[#2d2d2d]/80"
        >
          Real shops, real khatas, real time saved every single day.
        </motion.p>
      </motion.div>

      {/* Row 1 — scrolls left */}
      <div className="hk-marquee-row group relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="hk-marquee-track-left flex w-max gap-5 px-6">
          {row1.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right, offset for rhythm */}
      <div className="hk-marquee-row group relative mt-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="hk-marquee-track-right flex w-max gap-5 px-6">
          {row2.map((t, i) => (
            <TestimonialCard key={`row2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
