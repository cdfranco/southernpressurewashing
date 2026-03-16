"use client";

import { FormEvent, useState } from "react";
import { Button } from "./button";
import { business, services } from "@/content/site";

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  serviceType: "",
  message: "",
};

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-sky-400 focus:ring-1 focus:ring-sky-400/20";

const labelClasses =
  "block text-xs font-semibold uppercase tracking-wide text-slate-400";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // TODO: Replace with a real API route or third-party form service.
    setTimeout(() => {
      setStatus("success");
      setForm(initialState);
    }, 800);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-5"
    >
      <div>
        <h2 className="text-base font-bold text-white">Request your free quote</h2>
        <p className="mt-1 text-sm text-slate-400">
          Share a few details and we&apos;ll follow up with pricing and availability.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>Name *</label>
          <input id="name" name="name" value={form.name} onChange={handleChange}
            className={inputClasses} autoComplete="name" placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone *</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange}
            className={inputClasses} autoComplete="tel" placeholder="(555) 000-0000" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
            className={inputClasses} autoComplete="email" placeholder="jane@example.com" />
        </div>
        <div>
          <label htmlFor="address" className={labelClasses}>Service address *</label>
          <input id="address" name="address" value={form.address} onChange={handleChange}
            className={inputClasses} autoComplete="street-address" placeholder="123 Main St" />
        </div>
      </div>

      <div>
        <label htmlFor="serviceType" className={labelClasses}>Service type</label>
        <select id="serviceType" name="serviceType" value={form.serviceType} onChange={handleChange}
          className={inputClasses}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>{service.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>Notes</label>
        <textarea id="message" name="message" value={form.message} onChange={handleChange}
          rows={3}
          className={`${inputClasses} min-h-[90px] resize-none`}
          placeholder="Tell us about the areas you'd like cleaned."
        />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Request free quote"}
        </Button>
        <p className="text-xs text-slate-500">
          Or call{" "}
          <a href={business.phoneHref} className="font-semibold text-sky-400 hover:text-sky-300">
            {business.phone}
          </a>
        </p>
      </div>

      {status === "success" && (
        <p className="rounded-lg border border-emerald-800/40 bg-emerald-900/20 px-4 py-3 text-sm font-medium text-emerald-400">
          Thank you — we&apos;ll follow up shortly to confirm details.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg border border-rose-800/40 bg-rose-900/20 px-4 py-3 text-sm font-medium text-rose-400">
          Please fill in your name, phone, and service address.
        </p>
      )}
    </form>
  );
}
