import type { Metadata } from "next";
import { Martian_Mono, JetBrains_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const martian = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cognicoresolutions.com"),
  title: {
    default: "Cognicore Solutions | Automation & AI Engineering",
    template: "%s | Cognicore Solutions",
  },
  description:
    "US-based technology consultancy. Lead generation and CRM automation for growing businesses, workflow and AI systems for operators, and data/AI engineering for technical teams.",
  openGraph: {
    title: "Cognicore Solutions | Automation & AI Engineering",
    description:
      "One firm, three depths: business growth foundations, systems & automation, and data & AI engineering.",
    type: "website",
    url: "https://cognicoresolutions.com",
  },
};

const DIRECTION_CONTRACT = `
<!--
impeccable:direction seed:brief-pinned
THESIS: One consultancy, three depths. The site is a router that meets each
visitor at their technical altitude; it refuses the category default of a
single flat services grid with stock icon cards.
OWN-WORLD: Near-black phosphor terminal (#060a0c ground, #46e5b7 signal mint,
amber prompt marks), Martian Mono display, JetBrains Mono terminal text,
Hanken Grotesk prose. Neural node-and-edge lines as living background
material; scanlines only inside terminal chrome. Density escalates tier 1->3.
STORY: Visitor lands, sees three named depths, self-selects, reaches a tier
page speaking their language, submits the contact form.
FIRST VIEWPORT: Landing = full-height dark field, animated neural canvas
behind; terminal block top-left types "cognicore route" and resolves the
positioning line; three tier tiles below in one row (stacked mobile), density
visibly escalating clean panel -> full terminal chrome. Primary action is
choosing a tile; "Contact" persistent in nav.
FORM: brief-pinned terminal/neural world; signature interaction = neural
field + routing terminal; motion grammar = single orchestrated expo-ease
reveal per page, cursor blink, node drift.
FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md
-->
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${martian.variable} ${jetbrains.variable} ${hanken.variable}`}
    >
      <body className="min-h-screen antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        {children}
      </body>
    </html>
  );
}
