"use client";

import { useState, forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  isPassword?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, icon: Icon, error, isPassword, type, id, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const inputType = isPassword
      ? visible
        ? "text"
        : "password"
      : (type ?? "text");

    return (
      <div>
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-[var(--color-charcoal)]"
        >
          {label}
        </label>
        <div className="relative">
          <Icon
            className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[var(--color-muted-text)]"
            strokeWidth={2}
          />
          <input
            ref={ref}
            id={id}
            type={inputType}
            className={`w-full rounded-lg border bg-[var(--color-white)] py-2.5 pl-10 ${
              isPassword ? "pr-10" : "pr-3.5"
            } text-sm text-[var(--color-charcoal)] outline-none transition-colors placeholder:text-[var(--color-muted-text)] focus:border-[var(--color-steel-blue)] focus:ring-2 focus:ring-[var(--color-sky-accent)]/25 ${
              error ? "border-red-400" : "border-[var(--color-border)]"
            }`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-text)] transition-colors hover:text-[var(--color-charcoal)]"
              aria-label={visible ? "Hide password" : "Show password"}
            >
              {visible ? (
                <EyeOff className="h-4.5 w-4.5" strokeWidth={2} />
              ) : (
                <Eye className="h-4.5 w-4.5" strokeWidth={2} />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";
export default FormField;
