"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/business-solutions", label: "Business Growth", short: "growth" },
  { href: "/automation", label: "Systems & Automation", short: "systems" },
  { href: "/engineering", label: "Data & AI Engineering", short: "engineering" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded border border-signal/40 bg-signal/10 font-display text-[11px] font-bold text-signal">
            CS
          </span>
          <span className="font-display text-[13px] font-semibold tracking-tight text-text sm:text-sm">
            cognicore<span className="text-signal">.</span>solutions
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`font-mono text-[13px] transition-colors ${
                  active
                    ? "text-signal"
                    : "text-dim hover:text-text"
                }`}
              >
                <span className="text-faint select-none">/</span>
                {l.short}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className="rounded-md border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-[13px] font-medium text-signal transition-colors hover:bg-signal/20 hover:border-signal/70"
          >
            contact --now
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-dim hover:text-text md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" />
            ) : (
              <path d="M3 5.5h14M3 10h14M3 14.5h14" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-line bg-surface px-5 py-4 md:hidden"
        >
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2.5 font-mono text-sm ${
                    pathname === l.href
                      ? "bg-signal/10 text-signal"
                      : "text-dim hover:bg-elev hover:text-text"
                  }`}
                >
                  <span className="text-faint">/</span>
                  {l.short}
                  <span className="ml-2 font-sans text-dim">{l.label}</span>
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="block rounded-md border border-signal/40 bg-signal/10 px-3 py-2.5 text-center font-mono text-sm font-medium text-signal"
              >
                contact --now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
