"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-md border border-line bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-faint transition-colors focus:border-signal/60 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-signal/30";

export default function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "The message didn't go through.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "The message didn't go through."
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="term-window">
        <div className="term-titlebar">
          <span className="term-dot bg-danger/50" />
          <span className="term-dot bg-amber/50" />
          <span className="term-dot bg-signal/50" />
          <span className="ml-2">message sent</span>
        </div>
        <div className="term-body crt px-6 py-8 font-mono text-sm leading-relaxed">
          <p className="text-signal crt-glow">✓ Message delivered.</p>
          <p className="mt-3 text-dim">
            We reply to every inquiry within one business day. If it&apos;s
            urgent, call{" "}
            <a href="tel:+17276375368" className="text-cyan underline">
              +1 (727) 637-5368
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 font-mono text-xs text-faint underline hover:text-dim"
          >
            send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block font-mono text-xs tracking-wide text-dim"
          >
            name <span className="text-amber">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Jane Rivera"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block font-mono text-xs tracking-wide text-dim"
          >
            email <span className="text-amber">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="company"
            className="mb-1.5 block font-mono text-xs tracking-wide text-dim"
          >
            company
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={inputClass}
            placeholder="Company LLC"
          />
        </div>
        <div>
          <label
            htmlFor="topic"
            className="mb-1.5 block font-mono text-xs tracking-wide text-dim"
          >
            what do you need?
          </label>
          <select
            id="topic"
            name="topic"
            defaultValue={defaultTopic ?? "Not sure yet"}
            className={inputClass}
          >
            <option>Business growth: leads, website, CRM</option>
            <option>Systems &amp; automation</option>
            <option>Data &amp; AI engineering</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block font-mono text-xs tracking-wide text-dim"
        >
          message <span className="text-amber">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={inputClass}
          placeholder="What are you trying to get done, and what's in the way?"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="font-mono text-sm text-danger">
          ✕ {error} Email us directly at{" "}
          <a
            href="mailto:team@cognicoresolutions.com"
            className="underline hover:text-text"
          >
            team@cognicoresolutions.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-signal px-6 py-3 font-mono text-sm font-semibold text-bg transition-all hover:bg-signal/85 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "sending…" : "send message ↵"}
      </button>
    </form>
  );
}
