"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BookOpen,
  Truck,
  BarChart3,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/dashboard/inventory", icon: Package },
  { name: "Bikri (Sales)", href: "/dashboard/sales", icon: ShoppingCart },
  { name: "Khata", href: "/dashboard/khata", icon: BookOpen },
  { name: "Purchases", href: "/dashboard/purchases", icon: Truck },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col h-screen sticky top-0 bg-white dark:bg-dark-surface border-r border-border dark:border-dark-border transition-all duration-200 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo + hamburger toggle */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-border dark:border-dark-border">
        <div
          className={`flex items-center gap-2 overflow-hidden ${
            collapsed ? "w-0" : "w-auto"
          }`}
        >
          <BookOpen
            size={22}
            className="text-navy dark:text-marigold shrink-0"
          />
          {!collapsed && (
            <span className="font-bold text-lg tracking-tight text-navy dark:text-dark-text whitespace-nowrap">
              HisabKitab
            </span>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-pale-blue-grey dark:hover:bg-dark-surface-2 transition-colors shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-charcoal/70 dark:text-dark-muted" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.name : undefined}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                collapsed ? "justify-center" : ""
              } ${
                isActive
                  ? "bg-pale-blue-grey dark:bg-dark-surface-2 text-navy dark:text-marigold"
                  : "text-charcoal/70 dark:text-dark-muted hover:bg-pale-blue-grey/60 dark:hover:bg-dark-surface-2 hover:text-navy dark:hover:text-dark-text"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-marigold rounded-r-full" />
              )}
              <Icon
                size={18}
                className={`shrink-0 ${
                  isActive
                    ? "text-steel-blue dark:text-marigold"
                    : "text-charcoal/50 dark:text-dark-muted"
                }`}
              />
              {!collapsed && item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-border dark:border-dark-border space-y-1">
        <Link
          href="/dashboard/settings"
          title={collapsed ? "Settings" : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-charcoal/70 dark:text-dark-muted hover:bg-pale-blue-grey/60 dark:hover:bg-dark-surface-2 hover:text-navy dark:hover:text-dark-text transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Settings
            size={18}
            className="text-charcoal/50 dark:text-dark-muted shrink-0"
          />
          {!collapsed && "Settings"}
        </Link>
        <button
          title={collapsed ? "Logout" : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-charcoal/70 dark:text-dark-muted hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut
            size={18}
            className="text-charcoal/50 dark:text-dark-muted shrink-0"
          />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
