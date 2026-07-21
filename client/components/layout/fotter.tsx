import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "FAQ's", href: "/faq" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const productLinks = [
  "Inventory Management",
  "Sales & Billing",
  "Expense Tracking",
  "Customer Ledger (Khata)",
  "Business Reports",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-[var(--color-pale-blue-grey)]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-navy)]">
              HisabKitab
            </h2>

            <p className="mt-4 text-sm leading-7 text-[var(--color-muted-text)]">
              Simplify your business management with inventory tracking, sales,
              customer records, expenses, and financial insights all in one
              place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[var(--color-navy)]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--color-steel-blue)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[var(--color-navy)]">
              Product
            </h3>

            <ul className="space-y-3 text-sm text-[var(--color-muted-text)]">
              {productLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[var(--color-navy)]">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-[var(--color-muted-text)]">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[var(--color-marigold)]" />
                <span>Kathmandu, Nepal</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[var(--color-marigold)]" />
                <span>+977 98XXXXXXXX</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[var(--color-marigold)]" />
                <span>support@hisabkitab.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full bg-white p-2 shadow transition hover:bg-blue-600 hover:text-white"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-full bg-white p-2 shadow transition hover:bg-blue-700 hover:text-white"
              >
                <FaLinkedinIn size={16} />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="rounded-full bg-white p-2 shadow transition hover:bg-gray-900 hover:text-white"
              >
                <FaGithub size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-300 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-[var(--color-muted-text)] md:flex-row">
            <p>© {year} HisabKitab. All rights reserved.</p>

            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-[var(--color-steel-blue)]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="hover:text-[var(--color-steel-blue)]"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
