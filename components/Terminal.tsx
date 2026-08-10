"use client";

import { useEffect, useRef, useState } from "react";

export type TermLine =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: "signal" | "dim" | "cyan" | "amber" };

type Props = {
  title: string;
  lines: TermLine[];
  /** ms per typed character for cmd lines */
  speed?: number;
  className?: string;
  bodyClassName?: string;
};

const toneClass: Record<string, string> = {
  signal: "text-signal",
  dim: "text-dim",
  cyan: "text-cyan",
  amber: "text-amber",
};

/**
 * Terminal window that types command lines and prints output lines.
 * Under prefers-reduced-motion (or once finished) it shows the full transcript.
 */
export default function Terminal({
  title,
  lines,
  speed = 28,
  className = "",
  bodyClassName = "",
}: Props) {
  const [progress, setProgress] = useState<{ line: number; chars: number }>({
    line: 0,
    chars: 0,
  });
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    let line = 0;
    let chars = 0;

    const tick = () => {
      if (line >= lines.length) {
        setDone(true);
        return;
      }
      const current = lines[line];
      if (current.kind === "cmd") {
        if (chars < current.text.length) {
          chars += 1;
          setProgress({ line, chars });
          timer.current = setTimeout(tick, speed);
        } else {
          line += 1;
          chars = 0;
          setProgress({ line, chars });
          timer.current = setTimeout(tick, 260);
        }
      } else {
        line += 1;
        chars = 0;
        setProgress({ line, chars });
        timer.current = setTimeout(tick, 90);
      }
    };

    timer.current = setTimeout(tick, 450);
    return () => clearTimeout(timer.current);
  }, [lines, speed]);

  const visible = done
    ? lines.map((l) => ({ l, text: l.text, active: false }))
    : lines
        .slice(0, progress.line + 1)
        .map((l, i) => ({
          l,
          text:
            i < progress.line
              ? l.text
              : l.kind === "cmd"
                ? l.text.slice(0, progress.chars)
                : i <= progress.line
                  ? l.text
                  : "",
          active: i === progress.line,
        }));

  return (
    <div className={`term-window ${className}`}>
      <div className="term-titlebar">
        <span className="term-dot bg-danger/50" />
        <span className="term-dot bg-amber/50" />
        <span className="term-dot bg-signal/50" />
        <span className="ml-2">{title}</span>
      </div>
      <div
        className={`term-body crt px-5 py-4 font-mono text-[13px] leading-[1.85] sm:text-sm ${bodyClassName}`}
        aria-label={lines.map((l) => l.text).join("\n")}
      >
        {visible.map(({ l, text, active }, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {l.kind === "cmd" ? (
              <>
                <span className="text-amber select-none">➜ </span>
                <span className="text-text crt-glow">{text}</span>
                {active && !done && (
                  <span className="cursor-blink text-signal">▊</span>
                )}
              </>
            ) : (
              <span className={toneClass[l.tone ?? "dim"]}>{text}</span>
            )}
          </div>
        ))}
        {done && (
          <div>
            <span className="text-amber select-none">➜ </span>
            <span className="cursor-blink text-signal">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}
