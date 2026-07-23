"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react";
import BrandPanel from "@/components/auth/BrandPanel";
import FormField from "@/components/auth/FormField";

type Form = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<Record<keyof Form, string>>;

const initialForm: Form = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState<Form>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleChange(field: keyof Form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Enter a phone number.";
    if (!form.password) next.password = "Create a password.";
    else if (form.password.length < 8)
      next.password = "Use at least 8 characters.";
    if (form.confirmPassword !== form.password)
      next.confirmPassword = "Passwords don't match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.message ?? "Couldn't create your account. Try again.",
        );
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
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
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-pale-blue-grey)] px-6 py-10 text-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-marigold)]">
                <Check
                  className="h-6 w-6 text-[var(--color-charcoal)]"
                  strokeWidth={2.5}
                />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-[var(--color-charcoal)]">
                Account created
              </h2>
              <p className="mt-1 text-sm text-[var(--color-muted-text)]">
                Taking you to sign in…
              </p>
            </motion.div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-charcoal)]">
                Create your account
              </h1>
              <p className="mt-1.5 text-sm text-[var(--color-muted-text)]">
                Start keeping a digital khata in minutes.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 space-y-5"
              >
                <FormField
                  id="name"
                  label="Full name"
                  icon={User}
                  autoComplete="name"
                  placeholder="Anisha Shrestha"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={errors.name}
                />

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
                  id="phone"
                  label="Phone number"
                  icon={Phone}
                  type="tel"
                  autoComplete="tel"
                  placeholder="98XXXXXXXX"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={errors.phone}
                />

                <FormField
                  id="password"
                  label="Password"
                  icon={Lock}
                  isPassword
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  error={errors.password}
                />

                <FormField
                  id="confirmPassword"
                  label="Confirm password"
                  icon={Lock}
                  isPassword
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  error={errors.confirmPassword}
                />

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
                      Create account
                      <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-[var(--color-muted-text)]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[var(--color-steel-blue)] hover:text-[var(--color-sky-accent)]"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
