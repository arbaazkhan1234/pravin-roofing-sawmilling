"use client";

import { useState, type FormEvent } from "react";
import RevealOnScroll from "./RevealOnScroll";
import { business, productInterestOptions } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="grain grain-dark bg-charcoal py-24 text-bone lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <RevealOnScroll stagger=":scope > *" staggerAmount={0.1} className="lg:col-span-5">
          <p className="eyebrow text-amber-light">Get In Touch</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
            Tell us what you&apos;re building.
          </h2>

          <div className="mt-10 space-y-6 text-bone/85">
            <div>
              <p className="eyebrow text-[0.65rem] text-bone/50">Visit</p>
              <p className="mt-1.5 text-base">{business.address}</p>
            </div>
            <div className="hairline" />
            <div>
              <p className="eyebrow text-[0.65rem] text-bone/50">Call</p>
              <a
                href={business.phoneHref}
                className="mt-1.5 block text-base hover:text-amber-light"
              >
                {business.phone}
              </a>
            </div>
            <div className="hairline" />
            <div>
              <p className="eyebrow text-[0.65rem] text-bone/50">Hours</p>
              <p className="mt-1.5 text-base">{business.hours}</p>
              <p className="text-sm text-bone/60">{business.hoursClosed}</p>
            </div>
          </div>

          <a
            href={business.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-10 text-bone hover:text-charcoal"
          >
            Message Us on WhatsApp
          </a>

          <div className="mt-10 aspect-[4/3] w-full overflow-hidden border border-bone/15">
            <iframe
              title="Pravin Roofing and Sawmilling — map"
              src={business.mapEmbedSrc}
              className="h-full w-full grayscale contrast-125 invert-[.92]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll
          stagger=".form-field"
          staggerAmount={0.08}
          delay={0.1}
          className="lg:col-span-6 lg:col-start-7"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
            </div>
            <div className="form-field">
              <label className="eyebrow mb-2 block text-[0.65rem] text-bone/60">
                Product Interest
              </label>
              <select
                name="productInterest"
                defaultValue=""
                required
                className="w-full border-b border-bone/30 bg-transparent py-2.5 text-base text-bone outline-none transition-colors focus:border-amber-light"
              >
                <option value="" disabled className="text-charcoal">
                  Select one
                </option>
                {productInterestOptions.map((opt) => (
                  <option key={opt} value={opt} className="text-charcoal">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label className="eyebrow mb-2 block text-[0.65rem] text-bone/60">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about size, style, wood preference — whatever you know so far."
                className="w-full resize-none border-b border-bone/30 bg-transparent py-2.5 text-base text-bone placeholder:text-bone/40 outline-none transition-colors focus:border-amber-light"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="form-field btn btn-primary w-full sm:w-auto disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Get a Quote"}
            </button>

            {status === "success" && (
              <p className="text-sm text-amber-light">
                Thanks — we&apos;ll get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-terracotta">
                Something went wrong. Please call or WhatsApp us instead.
              </p>
            )}
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="form-field">
      <label className="eyebrow mb-2 block text-[0.65rem] text-bone/60">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-bone/30 bg-transparent py-2.5 text-base text-bone outline-none transition-colors focus:border-amber-light"
      />
    </div>
  );
}
