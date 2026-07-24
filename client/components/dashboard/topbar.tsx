"use client";

import { Bell, Search, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function Topbar({ userName = "Ramesh" }: { userName?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-20 bg-white dark:bg-dark-surface border-b border-border dark:border-dark-border flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      {/* Search */}
      <div className="hidden sm:flex items-center gap-2 bg-pale-blue-grey dark:bg-dark-surface-2 rounded-lg px-3 py-2.5 w-72 border border-transparent focus-within:border-steel-blue transition-colors">
        <Search size={16} className="text-steel-blue dark:text-sky-accent" />
        <input
          type="text"
          placeholder="Search products, customers..."
          className="bg-transparent w-full text-sm text-charcoal dark:text-dark-text placeholder:text-muted dark:placeholder:text-dark-muted outline-none"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-pale-blue-grey dark:hover:bg-dark-surface-2 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={17} className="text-marigold" />
          ) : (
            <Moon size={17} className="text-steel-blue" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-pale-blue-grey dark:hover:bg-dark-surface-2 transition-colors">
          <Bell size={17} className="text-charcoal dark:text-dark-text" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-marigold rounded-full ring-2 ring-white dark:ring-dark-surface" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2.5 pl-3 border-l border-border dark:border-dark-border">
          <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-sm font-semibold">
            {userName.charAt(0)}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-charcoal dark:text-dark-text leading-tight">
              {userName}
            </p>
            <p className="text-xs text-muted dark:text-dark-muted leading-tight">
              Owner
            </p>
          </div>
          <ChevronDown size={16} className="text-muted dark:text-dark-muted" />
        </button>
      </div>
    </header>
  );
}
