"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AgentNetwork from "./AgentNetwork";
import CloudPipeline from "./CloudPipeline";
import LeadNurture from "./LeadNurture";

const paths = [
  {
    key: "growth",
    label: "business growth foundations",
    tag: "PATH 1",
    href: "/business-solutions",
    accent: "text-signal",
    dot: "bg-signal",
    Scene: LeadNurture,
  },
  {
    key: "systems",
    label: "systems & automation",
    tag: "PATH 2",
    href: "/automation",
    accent: "text-cyan",
    dot: "bg-cyan",
    Scene: AgentNetwork,
  },
  {
    key: "engineering",
    label: "data & ai engineering",
    tag: "PATH 3",
    href: "/engineering",
    accent: "text-amber",
    dot: "bg-amber",
    Scene: CloudPipeline,
  },
] as const;

const HOLD_MS = 12000;

/**
 * Home-page showcase: cycles through the three path animations, one WebGL
 * scene mounted at a time. Auto-advances every 12s; the dots switch manually
 * and reset the timer.
 */
export default function PathShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % paths.length), HOLD_MS);
    return () => clearInterval(id);
  }, [active]);

  const current = paths[active];

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface/30 shadow-panel">
      <div className="relative h-64 sm:h-80 lg:h-96">
        <div key={current.key} className="rise absolute inset-0">
          <current.Scene className="absolute inset-0" />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
        <Link
          href={current.href}
          className={`font-mono text-xs tracking-widest ${current.accent} transition-opacity hover:opacity-75`}
        >
          {current.tag} | {current.label} →
        </Link>
        <div className="flex items-center gap-2.5">
          {paths.map((p, i) => (
            <button
              key={p.key}
              type="button"
              aria-label={`show ${p.label}`}
              onClick={() => setActive(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === active ? `${p.dot} scale-125` : "bg-line-bright hover:bg-faint"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
