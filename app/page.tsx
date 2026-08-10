import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import NeuralField from "@/components/NeuralField";
import PathShowcase from "@/components/three/PathShowcase";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ---- First viewport: field + routing terminal + three depths ---- */}
        <section className="relative overflow-hidden border-b border-line">
          <NeuralField density={0.55} className="opacity-70" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(70,229,183,0.06),transparent_60%)]"
          />

          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 md:pt-36">
            <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr]">
              <div className="rise">
                <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-5xl md:text-[3.4rem]">
                  One firm.
                  <br />
                  Three depths.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-dim">
                  Cognicore Solutions builds the systems behind growing
                  businesses, from your first lead-generation funnel to
                  production data platforms. Pick the path that matches where
                  you are; the same team is behind all three.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#paths"
                    className="rounded-md bg-signal px-6 py-3 font-mono text-sm font-semibold text-bg transition-colors hover:bg-signal/85"
                  >
                    choose a path ↓
                  </a>
                  <a
                    href="#contact"
                    className="rounded-md border border-line-bright px-6 py-3 font-mono text-sm text-dim transition-colors hover:border-signal/50 hover:text-text"
                  >
                    talk to us first
                  </a>
                </div>
              </div>

              <Terminal
                title="cognicore · router"
                className="rise hidden sm:block"
                lines={[
                  { kind: "cmd", text: "cognicore route --visitor" },
                  { kind: "out", text: "resolving visitor profile … ok", tone: "dim" },
                  { kind: "out", text: "3 paths available:", tone: "dim" },
                  { kind: "out", text: "  [1] business growth foundations", tone: "signal" },
                  { kind: "out", text: "  [2] systems & automation", tone: "cyan" },
                  { kind: "out", text: "  [3] data & ai engineering", tone: "amber" },
                  { kind: "out", text: "select a path to continue ↓", tone: "dim" },
                ]}
              />
            </div>

            {/* ---- Three escalating tiles ---- */}
            <div id="paths" className="mt-16 grid gap-5 scroll-mt-24 md:grid-cols-3">
              {/* Tier 1: cleanest */}
              <Link
                href="/business-solutions"
                className="group relative flex flex-col rounded-lg border border-line bg-surface p-7 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-signal/50 hover:shadow-deep"
              >
                <p className="font-mono text-xs tracking-widest text-signal">
                  PATH 1
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-text">
                  Business Growth Foundations
                </h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-dim">
                  More customers, less busywork. Lead generation, follow-up
                  that runs itself, a website that sells, and a CRM that keeps
                  the whole thing organized.
                </p>
                <p className="mt-6 text-sm font-medium text-signal">
                  For business owners{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </p>
              </Link>

              {/* Tier 2: mono labels + grid material */}
              <Link
                href="/automation"
                className="group relative flex flex-col rounded-lg border border-line bg-surface p-7 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:shadow-deep"
              >
                <p className="font-mono text-xs tracking-widest text-cyan">
                  PATH 2
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-text">
                  Systems &amp; Automation
                </h2>
                <ul className="mt-3 flex-1 space-y-1.5 font-mono text-[13px] leading-relaxed text-dim">
                  <li>
                    <span className="text-faint">├─</span> workflow automation
                  </li>
                  <li>
                    <span className="text-faint">├─</span> integrations &amp; APIs
                  </li>
                  <li>
                    <span className="text-faint">├─</span> AI agents &amp; chatbots
                  </li>
                  <li>
                    <span className="text-faint">└─</span> internal dashboards
                  </li>
                </ul>
                <p className="mt-6 font-mono text-sm text-cyan">
                  for operators{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </p>
              </Link>

              {/* Tier 3: full terminal chrome */}
              <Link
                href="/engineering"
                className="group term-window flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-amber/50 hover:shadow-deep"
              >
                <span className="term-titlebar">
                  <span className="term-dot bg-danger/50" />
                  <span className="term-dot bg-amber/50" />
                  <span className="term-dot bg-signal/50" />
                  <span className="ml-2">path-3 · engineering</span>
                </span>
                <span className="term-body crt flex flex-1 flex-col px-7 py-6">
                  <span className="font-mono text-xs tracking-widest text-amber">
                    PATH 3
                  </span>
                  <span className="mt-3 block font-display text-xl font-semibold tracking-tight text-text crt-glow">
                    Data &amp; AI Engineering
                  </span>
                  <span className="mt-3 block flex-1 font-mono text-[13px] leading-relaxed text-dim">
                    <span className="block">
                      <span className="text-signal">$</span> aws lambda ·
                      event-driven arch
                    </span>
                    <span className="block">
                      <span className="text-signal">$</span> spark · python
                      pipelines
                    </span>
                    <span className="block">
                      <span className="text-signal">$</span> RAG systems ·
                      platform work
                    </span>
                  </span>
                  <span className="mt-6 block font-mono text-sm text-amber">
                    for technical teams{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ---- Live look at each path's system, cycling ---- */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <p className="font-mono text-sm text-dim">
              <span className="text-amber">➜ </span>
              <span className="text-text">cognicore render ./paths --live</span>
            </p>
            <div className="mt-8">
              <PathShowcase />
            </div>
          </div>
        </section>

        {/* ---- Real outcomes, printed as a log ---- */}
        <section className="border-b border-line bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                  Shipped, not promised.
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-dim">
                  We don&apos;t publish logo walls or invented statistics. These
                  numbers come from delivered projects, and we&apos;re happy to
                  walk you through how they were measured.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Salesforce",
                    "HubSpot",
                    "Zoho",
                    "Zapier",
                    "n8n",
                    "Twilio",
                    "AWS",
                    "Supabase",
                    "Next.js",
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded border border-line bg-elev px-2.5 py-1 font-mono text-xs text-dim"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="term-window">
                <div className="term-titlebar">
                  <span className="term-dot bg-danger/50" />
                  <span className="term-dot bg-amber/50" />
                  <span className="term-dot bg-signal/50" />
                  <span className="ml-2">cognicore log --outcomes</span>
                </div>
                <div className="term-body crt px-6 py-5 font-mono text-[13px] leading-[1.9] sm:text-sm">
                  <p>
                    <span className="text-faint">[insurance]</span>{" "}
                    <span className="text-text">
                      digital onboarding rebuilt:{" "}
                    </span>
                    <span className="text-signal crt-glow">
                      applications completed 70% faster
                    </span>
                    <span className="text-text">, compliance intact</span>
                  </p>
                  <p className="mt-3">
                    <span className="text-faint">[e-commerce]</span>{" "}
                    <span className="text-text">
                      order workflow automated end-to-end:{" "}
                    </span>
                    <span className="text-signal crt-glow">
                      processing efficiency up 85%
                    </span>
                  </p>
                  <p className="mt-3">
                    <span className="text-faint">[next]</span>{" "}
                    <span className="text-dim">your project here _</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Contact ---- */}
        <section id="contact" className="relative overflow-hidden scroll-mt-16">
          <NeuralField density={0.3} className="opacity-40" />
          <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                  Tell us what&apos;s in the way.
                </h2>
                <p className="mt-4 max-w-sm leading-relaxed text-dim">
                  Every message lands with the team. No ticket queue, no
                  qualification bot. We reply within one business day.
                </p>
                <dl className="mt-8 space-y-4 text-sm">
                  <div>
                    <dt className="font-mono text-xs tracking-widest text-faint">
                      email
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="mailto:team@cognicoresolutions.com"
                        className="text-signal hover:underline"
                      >
                        team@cognicoresolutions.com
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs tracking-widest text-faint">
                      phone
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="tel:+17276375368"
                        className="text-text hover:text-signal"
                      >
                        +1 (727) 637-5368
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-lg border border-line bg-surface/80 p-6 shadow-panel backdrop-blur-sm sm:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
