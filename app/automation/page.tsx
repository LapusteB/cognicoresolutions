import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import NeuralField from "@/components/NeuralField";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Systems & Automation",
  description:
    "Workflow automation, integrations, AI agents and chatbots, and internal dashboards: systems that remove manual work from your operation.",
};

const services = [
  {
    name: "workflow-automation",
    title: "Workflow Automation",
    body: "The repetitive work between your tools (copying, forwarding, updating, chasing) becomes a pipeline that runs itself. Built on Zapier, n8n, or custom code, whichever the job actually needs.",
  },
  {
    name: "integrations",
    title: "Integrations & APIs",
    body: "Your CRM, billing, messaging, and back office talking to each other reliably, including the systems without an off-the-shelf connector. Twilio, Telnyx, Resend, and direct API work.",
  },
  {
    name: "ai-agents",
    title: "AI Agents & Chatbots",
    body: "Assistants that answer from your own data, qualify inbound leads, and hand off to a human at the right moment, with guardrails, logging, and a clear escalation path.",
  },
  {
    name: "dashboards",
    title: "Internal Dashboards",
    body: "The numbers your team checks every morning, in one place and current. Built with Next.js and Supabase instead of another spreadsheet that drifts out of date.",
  },
];

export default function Automation() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="relative overflow-hidden border-b border-line">
          <NeuralField density={0.45} className="opacity-50" />
          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 md:pt-36">
            <p className="font-mono text-xs tracking-widest text-cyan">
              PATH 2 | FOR OPERATORS
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.12] tracking-tight text-text sm:text-4xl md:text-5xl">
              The work your team repeats every day is a system waiting to be
              built.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dim">
              We connect your tools, automate the handoffs between them, and
              put the numbers where you can see them, so your operation runs
              on rails instead of memory.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-block rounded-md bg-signal px-6 py-3 font-mono text-sm font-semibold text-bg transition-colors hover:bg-signal/85"
            >
              describe your workflow
            </a>
          </div>
        </section>

        <section className="border-b border-line bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <p className="font-mono text-sm text-dim">
              <span className="text-amber">➜ </span>
              <span className="text-text">cognicore ls ./automation</span>
            </p>
            <div className="mt-8 grid gap-x-12 gap-y-12 md:grid-cols-2">
              {services.map((s) => (
                <div key={s.name} className="border-t border-line pt-6">
                  <p className="font-mono text-xs text-faint">./{s.name}</p>
                  <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-text">
                    {s.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-dim">{s.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-14 max-w-2xl border-l border-cyan/40 pl-4 text-sm leading-relaxed text-dim">
              A full build-out of this page (with a real automation case study)
              is on the way. The services above are live now; the depth is
              coming.
            </p>
          </div>
        </section>

        <section id="contact" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                  Walk us through the process that hurts.
                </h2>
                <p className="mt-4 max-w-sm leading-relaxed text-dim">
                  Name the tools involved and where things get stuck. We&apos;ll
                  reply within one business day with a straight answer on
                  whether it&apos;s automatable.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-6 shadow-panel sm:p-8">
                <ContactForm defaultTopic="Systems & automation" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
