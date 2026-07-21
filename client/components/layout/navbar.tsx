"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X, ChevronDown, ArrowRight, BookOpen } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Contact", href: "/contact" },
];

const resourceLinks = [
  { name: "Blog", href: "/blog" },
  { name: "Tutorials", href: "/tutorials" },
  { name: "FAQ's", href: "/faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-navy">
              <BookOpen size={18} className="text-marigold" />
            </div>
            <span className="text-xl font-bold tracking-tight text-navy">
              HisabKitab
            </span>
          </Link>

          {/* Desktop nav links — centered */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-charcoal transition-colors hover:text-navy"
              >
                {link.name}
              </Link>
            ))}

            {/* Resources dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="flex items-center gap-1 text-base font-medium text-charcoal transition-colors hover:text-navy">
                Resources
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    resourcesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 top-full mt-3 w-48 -translate-x-1/2 rounded-lg border border-border bg-white py-2 shadow-lg"
                  >
                    {resourceLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-charcoal transition-colors hover:bg-pale-blue-grey hover:text-navy"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side: CTA */}
          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <Link
              href="/register"
              className="flex items-center gap-1.5 rounded-full bg-marigold px-5 py-2.5 text-base font-semibold text-charcoal transition-colors hover:bg-marigold-dark"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="p-2 text-navy md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="px-6 pb-5 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-2 py-3 text-base font-medium text-charcoal hover:text-navy"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <p className="px-2 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                Resources
              </p>
              {resourceLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-2 py-2.5 text-base text-charcoal hover:text-navy"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/get-started"
                className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-marigold px-5 py-3 font-semibold text-charcoal"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
