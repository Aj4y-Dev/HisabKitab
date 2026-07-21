"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X, ChevronDown, ArrowRight, BookOpen } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Contact", href: "/contact" },
  ];

  const resourceLinks = [
    { name: "Documentation", href: "/docs" },
    { name: "Guides", href: "/guides" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-md bg-navy flex items-center justify-center">
              <BookOpen size={18} className="text-marigold" />
            </div>
            <span className="font-bold text-xl text-navy tracking-tight">
              HisabKitab
            </span>
          </Link>

          {/* Desktop nav links — centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-charcoal hover:text-navy transition-colors"
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
              <button className="flex items-center gap-1 text-base font-medium text-charcoal hover:text-navy transition-colors">
                Resources
                <ChevronDown
                  size={16}
                  className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white rounded-lg shadow-lg border border-border py-2"
                  >
                    {resourceLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-charcoal hover:bg-pale-blue-grey hover:text-navy transition-colors"
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
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <Link
              href="/get-started"
              className="flex items-center gap-1.5 bg-marigold hover:bg-marigold-dark text-charcoal font-semibold text-base px-5 py-2.5 rounded-full transition-colors"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
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
            className="md:hidden overflow-hidden border-t border-border"
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

              <p className="px-2 pt-3 pb-1 text-xs font-semibold text-muted uppercase tracking-wide">
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
                className="mt-4 flex items-center justify-center gap-1.5 bg-marigold text-charcoal font-semibold px-5 py-3 rounded-full"
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
