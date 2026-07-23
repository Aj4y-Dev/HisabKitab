"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import BrandPanel from "@/components/auth/BrandPanel";
import FormField from "@/components/auth/FormField";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function handleChange(field: "email" | "password", value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const next: typeof errors = {};
    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (!form.password) next.password = "Enter your password.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.message ??
            "Couldn't sign you in. Check your details and try again.",
        );
      }

      window.location.href = "/dashboard";
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <BrandPanel />

      <div className="flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-charcoal)]">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-[var(--color-muted-text)]">
            Sign in to keep your khata up to date.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <FormField
              id="email"
              label="Email address"
              icon={Mail}
              type="email"
              autoComplete="email"
              placeholder="you@business.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />

            <FormField
              id="password"
              label="Password"
              icon={Lock}
              isPassword
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
            />

            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[var(--color-steel-blue)] hover:text-[var(--color-sky-accent)]"
              >
                Forgot password?
              </Link>
            </div>

            {formError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600">
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-steel-blue)] py-2.5 text-sm font-semibold text-[var(--color-white)] transition-colors hover:bg-[var(--color-sky-accent)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <Loader2
                  className="h-4.5 w-4.5 animate-spin"
                  strokeWidth={2.25}
                />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[var(--color-muted-text)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[var(--color-steel-blue)] hover:text-[var(--color-sky-accent)]"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
