import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded border border-signal/40 bg-signal/10 font-display text-[11px] font-bold text-signal">
                CS
              </span>
              <span className="font-display text-sm font-semibold text-text">
                Cognicore Solutions LLC
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-dim">
              US-based technology consultancy. Growth systems, automation, and
              data &amp; AI engineering, delivered by people who build for a
              living.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h2 className="font-mono text-xs tracking-widest text-faint">
                paths
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/business-solutions" className="text-dim hover:text-signal">
                    Business Growth
                  </Link>
                </li>
                <li>
                  <Link href="/automation" className="text-dim hover:text-signal">
                    Systems &amp; Automation
                  </Link>
                </li>
                <li>
                  <Link href="/engineering" className="text-dim hover:text-signal">
                    Data &amp; AI Engineering
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-xs tracking-widest text-faint">
                contact
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:team@cognicoresolutions.com"
                    className="text-dim hover:text-signal"
                  >
                    team@cognicoresolutions.com
                  </a>
                </li>
                <li>
                  <a href="tel:+17276375368" className="text-dim hover:text-signal">
                    +1 (727) 637-5368
                  </a>
                </li>
                <li className="text-dim">United States · remote &amp; on-site</li>
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-xs tracking-widest text-faint">
                legal
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href="/privacy-policy.html"
                    className="text-dim hover:text-signal"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} Cognicore Solutions LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
