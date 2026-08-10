import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import LeadNurture from "@/components/three/LeadNurture";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Business Growth Foundations",
  description:
    "Lead generation, automated follow-up, websites that sell, and CRM automation for growing businesses. Plain-English delivery, measurable outcomes.",
};

const stages = [
  {
    stage: "stage 01",
    title: "Lead Generation",
    body: "People who need what you sell should be able to find you. We build the funnels, forms, and campaigns that bring a steady stream of real inquiries, not a list of cold names.",
    gets: ["Landing pages that convert", "Ad & campaign plumbing", "Lead capture that just works"],
  },
  {
    stage: "stage 02",
    title: "Lead Nurture",
    body: "Most sales are lost in the follow-up nobody had time for. We set up the emails and texts that go out on their own, so every lead hears back in minutes, not days.",
    gets: ["Automated email & SMS follow-up", "Response within minutes, 24/7", "No lead left waiting"],
  },
  {
    stage: "stage 03",
    title: "Website Design",
    body: "Your website's one job is turning visitors into customers. We design and build sites that load fast, read clearly, and make the next step obvious.",
    gets: ["Designed around one clear action", "Fast on every phone", "You own it outright"],
  },
  {
    stage: "stage 04",
    title: "CRM Automation",
    body: "One place where every customer, conversation, and deal lives, updated automatically. You see exactly where every opportunity stands without typing a thing.",
    gets: ["Salesforce, HubSpot, or Zoho", "Pipeline updates itself", "Nothing falls through cracks"],
  },
];

export default function BusinessSolutions() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ---- Hero: plain-spoken, minimal terminal density ---- */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 md:pt-36">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
            <p className="font-mono text-xs tracking-widest text-signal">
              PATH 1 | FOR BUSINESS OWNERS
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.12] tracking-tight text-text sm:text-4xl md:text-5xl">
              Your next customer shouldn&apos;t slip through the cracks.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dim">
              We build the four pieces every growing business needs: a way to
              attract leads, a system that follows up instantly, a website that
              sells, and a CRM that keeps it all organized. Connected, so
              nothing gets lost between them.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-md bg-signal px-6 py-3 font-mono text-sm font-semibold text-bg transition-colors hover:bg-signal/85"
              >
                start a conversation
              </a>
              <a
                href="#pipeline"
                className="rounded-md border border-line-bright px-6 py-3 font-mono text-sm text-dim transition-colors hover:border-signal/50 hover:text-text"
              >
                see how it fits together ↓
              </a>
            </div>
              </div>
              <div className="relative h-64 overflow-hidden rounded-lg border border-line bg-surface/30 shadow-panel sm:h-80 lg:h-[26rem]">
                <LeadNurture className="absolute inset-0" />
              </div>
            </div>
          </div>
        </section>

        {/* ---- The pipeline: four services as one connected system ---- */}
        <section id="pipeline" className="scroll-mt-16 border-b border-line bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              One connected system, not four loose tools.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-dim">
              Each piece feeds the next: a lead comes in, follow-up starts on
              its own, your website closes the deal, and your CRM records every
              step. That connection is the work, and it&apos;s why it holds up
              after we leave.
            </p>

            {/* Pipeline: node-and-edge, horizontal on desktop, vertical on mobile */}
            <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6">
              {/* connecting edge */}
              <div
                aria-hidden="true"
                className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-signal/60 via-line-bright to-signal/60 lg:left-2 lg:top-[7px] lg:h-px lg:w-[calc(100%-1rem)] lg:bg-gradient-to-r"
              />
              {stages.map((s) => (
                <li key={s.stage} className="relative pl-8 lg:pl-0 lg:pt-8">
                  {/* node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-signal bg-bg shadow-[0_0_12px_rgba(70,229,183,0.45)] lg:left-0 lg:top-0"
                  />
                  <p className="font-mono text-xs tracking-widest text-faint">
                    {s.stage}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-text">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-dim">
                    {s.body}
                  </p>
                  <ul className="mt-4 space-y-1.5 text-sm text-text">
                    {s.gets.map((g) => (
                      <li key={g} className="flex gap-2">
                        <span aria-hidden="true" className="text-signal">
                          →
                        </span>
                        {g}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Case study: Globe Life / glonboarding.com */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              From a real project
            </h2>

            <div className="mt-8 rounded-lg border border-line bg-surface p-6 shadow-panel sm:p-10">
              <p className="font-mono text-xs tracking-widest text-signal">
                GLOBE LIFE | GLONBOARDING.COM
              </p>
              <div className="mt-6 grid gap-8 lg:grid-cols-3">
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-faint">
                    the client
                  </h3>
                  <p className="mt-2 leading-relaxed text-dim">
                    Globe Life recruits independent life insurance sales
                    agents. Every candidate got a spot on a recruiter&apos;s
                    spreadsheet and a stream of manual texts and calls to keep
                    them engaged before their intro meeting.
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-faint">
                    what we built
                  </h3>
                  <p className="mt-2 leading-relaxed text-dim">
                    Glonboarding.com: a CRM built around their actual
                    recruiting pipeline. Every booked meeting gets automatic
                    text and email reminders, every new-hire invite and
                    onboarding step tracks itself, and recruiters see the
                    whole pipeline in one dashboard instead of a spreadsheet.
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-faint">
                    what changed
                  </h3>
                  <p className="mt-2 leading-relaxed text-dim">
                    Recruiters got back roughly 10 hours a week they used to
                    spend manually texting leads and keeping spreadsheets
                    current.
                  </p>
                </div>
              </div>
              <p className="mt-8 border-t border-line pt-5 text-sm text-faint">
                Live at{" "}
                <a
                  href="https://glonboarding.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal hover:underline"
                >
                  glonboarding.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ---- How we work ---- */}
        <section className="border-b border-line bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              How working with us goes
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              <div>
                <h3 className="font-display text-base font-semibold text-text">
                  We listen first.
                </h3>
                <p className="mt-3 leading-relaxed text-dim">
                  A short call about how you get customers today and where
                  they&apos;re slipping away. No pitch deck, no jargon.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-text">
                  You get a fixed plan.
                </h3>
                <p className="mt-3 leading-relaxed text-dim">
                  What we&apos;ll build, what it costs, and what changes for
                  you: in writing, before any work starts.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-text">
                  We build it and hand you the keys.
                </h3>
                <p className="mt-3 leading-relaxed text-dim">
                  You own everything we deliver. We stay available after
                  launch, but you&apos;re never locked in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Contact ---- */}
        <section id="contact" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                  Tell us how you get customers today.
                </h2>
                <p className="mt-4 max-w-sm leading-relaxed text-dim">
                  Two or three sentences is plenty. We&apos;ll reply within one
                  business day with an honest read on whether we can help.
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
              <div className="rounded-lg border border-line bg-surface p-6 shadow-panel sm:p-8">
                <ContactForm defaultTopic="Business growth: leads, website, CRM" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
