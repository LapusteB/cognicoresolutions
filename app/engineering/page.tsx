import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import NeuralField from "@/components/NeuralField";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import Terminal from "@/components/Terminal";

export const metadata: Metadata = {
  title: "Data & AI Engineering",
  description:
    "AWS Lambda and event-driven architecture, Spark/Python data engineering, RAG systems, and full-stack platform work — senior engineering, delivered.",
};

const capabilities = [
  {
    path: "aws/",
    title: "AWS & Event-Driven Architecture",
    body: "Lambda, SQS/SNS, EventBridge, Step Functions. Systems designed around events instead of cron jobs and polling — cheaper to run, easier to reason about, built to fail loudly and recover cleanly.",
    stack: ["Lambda", "EventBridge", "SQS", "Step Functions", "DynamoDB"],
  },
  {
    path: "data/",
    title: "Data Engineering",
    body: "Spark and Python pipelines that turn raw operational data into something analysts and models can actually use — with schema contracts, backfills, and observability, not just a DAG that ran once.",
    stack: ["Spark", "Python", "Airflow", "dbt", "Parquet"],
  },
  {
    path: "rag/",
    title: "RAG & LLM Systems",
    body: "Retrieval-augmented systems over your own corpus: chunking and embedding strategy, evaluation harnesses, guardrails, and cost control. We measure answer quality; we don't demo-and-pray.",
    stack: ["Claude API", "pgvector", "embeddings", "eval harnesses"],
  },
  {
    path: "platform/",
    title: "Full-Stack Platform Work",
    body: "The product surface on top: Next.js, React, Supabase/Postgres, auth, billing, CI/CD. One team from the event bus to the button — no handoff gap where bugs live.",
    stack: ["Next.js", "React", "Postgres", "Supabase", "Vercel"],
  },
];

export default function Engineering() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="relative overflow-hidden border-b border-line">
          <NeuralField density={0.85} className="opacity-80" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(242,185,80,0.05),transparent_55%)]"
          />
          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 md:pt-36">
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="font-mono text-xs tracking-widest text-amber">
                  PATH 3 — FOR TECHNICAL TEAMS
                </p>
                <h1 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-text sm:text-4xl md:text-[2.75rem]">
                  Senior engineering, without the enterprise wrapper.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-dim">
                  Event-driven systems on AWS, Spark and Python data pipelines,
                  RAG systems that get evaluated instead of demoed, and the
                  full-stack platform on top. Architecture decisions explained
                  in writing, code you can read after we&apos;re gone.
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-block rounded-md bg-signal px-6 py-3 font-mono text-sm font-semibold text-bg transition-colors hover:bg-signal/85"
                >
                  bring us the hard problem
                </a>
              </div>
              <Terminal
                title="cognicore@prod — session"
                className="hidden sm:block"
                lines={[
                  { kind: "cmd", text: "cognicore ls ./engineering" },
                  { kind: "out", text: "aws/       event-driven architecture", tone: "signal" },
                  { kind: "out", text: "data/      spark · python pipelines", tone: "signal" },
                  { kind: "out", text: "rag/       retrieval + eval harnesses", tone: "signal" },
                  { kind: "out", text: "platform/  next.js · postgres · ci/cd", tone: "signal" },
                  { kind: "cmd", text: "cognicore uptime --promises" },
                  { kind: "out", text: "no invented benchmarks found ✓", tone: "amber" },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {capabilities.map((c) => (
                <article key={c.path} className="term-window flex flex-col">
                  <div className="term-titlebar">
                    <span className="term-dot bg-danger/50" />
                    <span className="term-dot bg-amber/50" />
                    <span className="term-dot bg-signal/50" />
                    <span className="ml-2">~/engineering/{c.path}</span>
                  </div>
                  <div className="term-body crt flex flex-1 flex-col px-6 py-6">
                    <h2 className="font-display text-lg font-semibold tracking-tight text-text crt-glow">
                      {c.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-dim">
                      {c.body}
                    </p>
                    <p className="mt-5 flex flex-wrap gap-2">
                      {c.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-line bg-bg/60 px-2 py-0.5 font-mono text-xs text-signal"
                        >
                          {t}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-14 max-w-2xl border-l border-amber/40 pl-4 text-sm leading-relaxed text-dim">
              The full build-out of this page — architecture walkthroughs and a
              real engineering case study — ships next. What&apos;s listed
              above is what we deliver today.
            </p>
          </div>
        </section>

        <section id="contact" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                  Send the problem statement.
                </h2>
                <p className="mt-4 max-w-sm leading-relaxed text-dim">
                  Stack, scale, and what&apos;s breaking. An engineer reads
                  every message — you&apos;ll get a technical reply, not a
                  sales sequence.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-6 shadow-panel sm:p-8">
                <ContactForm defaultTopic="Data & AI engineering" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
