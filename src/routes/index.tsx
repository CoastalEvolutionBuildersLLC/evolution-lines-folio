import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logoAsset from "@/assets/coastal-evolution-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coastal Evolution Builders — Custom Homes in Charleston, SC" },
      { name: "description", content: "Custom homes and select commercial builds in North Charleston, SC. European-inspired craftsmanship, storm-resilient construction, energy-conscious methods." },
      { property: "og:title", content: "Coastal Evolution Builders" },
      { property: "og:description", content: "Refined, storm-resilient custom homes in the Lowcountry." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "GeneralContractor",
        name: "Coastal Evolution Builders LLC",
        email: "info@coastalevolutionbuilders.com",
        telephone: "+1-843-410-3516",
        address: { "@type": "PostalAddress", addressLocality: "North Charleston", addressRegion: "SC", addressCountry: "US" },
        areaServed: "South Carolina",
      }),
    }],
  }),
  component: Index,
});

const sections = [
  { id: "mission", label: "Mission" },
  { id: "team", label: "Team" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Mission />
      <Team />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Coastal Evolution Builders" className="h-14 w-auto" />
          <span className="sr-only">Coastal Evolution Builders</span>
        </a>
        <nav className="hidden md:flex items-center gap-9">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-sm text-foreground/75 hover:text-accent transition-colors">
              {s.label}
            </a>
          ))}
          <a href="#contact" className="text-sm px-5 py-2 border border-foreground/80 hover:bg-foreground hover:text-background transition-colors">
            Start a project
          </a>
        </nav>
        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className="w-6 h-px bg-foreground" />
          <span className="w-6 h-px bg-foreground" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-4">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="text-sm text-foreground/80">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="paper-grain absolute inset-0 opacity-60 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-28 md:pt-36 md:pb-40 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-8">North Charleston · South Carolina</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight">
              Homes built with <em className="text-accent not-italic font-normal">considered</em> proportion, <span className="italic">storm-ready</span> bones, and a quieter sense of luxury.
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
              Coastal Evolution Builders crafts custom residences and select commercial spaces shaped by European tradition and engineered for the Lowcountry climate.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <a href="#portfolio" className="text-sm px-6 py-3 bg-foreground text-background hover:bg-accent transition-colors">
                View our work
              </a>
              <a href="#mission" className="text-sm underline underline-offset-4 decoration-accent/60 hover:text-accent">
                Our philosophy
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {[
            ["35+", "Years combined experience"],
            ["2", "States licensed"],
            ["2024", "Founded"],
            ["1:1", "Owner-led builds"],
          ].map(([n, l]) => (
            <div key={l} className="bg-background px-6 py-8">
              <div className="font-display text-3xl md:text-4xl">{n}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-16 max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <span className="w-10 h-px bg-accent" />
        <span className="text-xs uppercase tracking-[0.3em] text-accent">{kicker}</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">{title}</h2>
    </div>
  );
}

function Mission() {
  return (
    <section id="mission" className="border-t border-border/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <SectionHeading kicker="Our Mission" title="Lasting character, intelligently built." />
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6 text-[1.05rem] leading-relaxed text-foreground/85">
            <p>
              At Coastal Evolution Builders LLC, we create projects of lasting character—custom homes and select small commercial or mixed-use spaces that feel refined, personal, and intelligently built for modern use. Based in North Charleston, South Carolina, we bring together elevated craftsmanship, architectural individuality, and a disciplined approach to construction for clients who want more than a standard build.
            </p>
            <p>
              Our design approach is inspired by the elegance and proportion found in traditional European and Transylvanian homes, translated thoughtfully into modern, livable spaces. Instead of purely minimal, box-style construction, we favor considered rooflines, richer trim profiles, layered details, and interiors that feel tailored rather than generic.
            </p>
            <p>
              We also build with the future in mind. In a coastal region where severe storms, heavy rain, and wind are a reality, we would rather spend more up front to elevate a structure properly than risk flooding or avoidable damage later—raised foundations or floating slabs where appropriate, assemblies that manage moisture and reduce long-term risks like hidden termite damage.
            </p>
            <p>
              We pair that mindset with energy-conscious practices: quality framing, insulation, and methods that support comfort, efficiency, and long-term performance. A home that not only looks elevated—but feels solid, quiet, and well-built day after day.
            </p>
          </div>
          <aside className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-border">
            <div className="space-y-10">
              {[
                ["European proportion", "Rooflines, trim, and detail informed by Transylvanian and Old-World tradition."],
                ["Storm-resilient construction", "Raised foundations, moisture-aware assemblies, and termite-resistant detailing."],
                ["Energy-conscious methods", "Framing, insulation, and envelopes built for long-term comfort and efficiency."],
                ["Tailored interiors", "Layered finishes and considered rooms—never generic, never off-the-shelf."],
              ].map(([h, b]) => (
                <div key={h}>
                  <h3 className="font-display text-2xl">{h}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <SectionHeading kicker="The Team" title="Seasoned hands. Owner-led oversight." />
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6 text-[1.05rem] leading-relaxed text-foreground/85">
            <p>
              Coastal Evolution Builders is powered by more than 35 years of combined experience in construction, craftsmanship, and residential improvement. Although the company is from 2024, the people behind it bring seasoned, practical knowledge built on real work in the field and on actual job sites.
            </p>
            <p>
              The company is co-owned by a dual-licensed builder who holds a general contractor license in two states and a residential builder license, alongside a partner with a strong background in interior renovations and European-influenced design. Clients gain both deep technical expertise and a refined design sensibility on every project.
            </p>
            <p>
              Our team combines in-house trade capability with carefully selected specialty partners, allowing us to handle projects efficiently while maintaining high standards. We are defined by craftsmanship, clear communication, and doing things the right way the first time.
            </p>
          </div>
          <div className="lg:col-span-5 lg:pl-10 grid grid-cols-1 gap-6">
            {[
              { role: "Co-owner · Lead Builder", note: "Dual-state General Contractor & Residential Builder license" },
              { role: "Co-owner · Design Lead", note: "Interior renovations & European-influenced design" },
            ].map((m) => (
              <div key={m.role} className="bg-card border border-border p-8">
                <div className="font-display text-2xl">{m.role}</div>
                <div className="text-sm text-muted-foreground mt-2">{m.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { n: "01", t: "Custom Residential Builds", d: "Ground-up custom homes designed for the way you actually live—proportion, light, and detail considered room by room." },
    { n: "02", t: "Small Commercial & Mixed-Use", d: "Select commercial and mixed-use projects executed with the same craftsmanship as our residential work." },
    { n: "03", t: "Interior, Exterior & Landscape Staging", d: "Finished spaces, façades, and grounds composed to feel cohesive and complete." },
    { n: "04", t: "Energy-Conscious Construction", d: "Framing, insulation, and assemblies that deliver comfort, quiet, and long-term performance." },
    { n: "05", t: "Design & Build Consulting", d: "Guidance on layout, detailing, and planning for clients evaluating a project before committing to a full build." },
  ];
  return (
    <section id="services" className="border-t border-border/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <SectionHeading kicker="What We Offer" title="Design-conscious, energy-aware construction." />
        <p className="max-w-2xl text-foreground/80 mb-16 -mt-8 leading-relaxed">
          A focused offering for clients who expect a higher standard of work. Clear planning, disciplined construction, and finished spaces built to stand the test of time.
        </p>
        <div className="border-t border-border">
          {items.map((it) => (
            <article
              key={it.n}
              className="group grid md:grid-cols-12 gap-6 py-10 border-b border-border hover:bg-secondary/40 transition-colors px-2 -mx-2"
            >
              <div className="md:col-span-1 text-sm text-accent tracking-widest">{it.n}</div>
              <h3 className="md:col-span-4 font-display text-2xl md:text-3xl">{it.t}</h3>
              <p className="md:col-span-6 md:col-start-7 text-foreground/75 leading-relaxed">{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const projects = [
    { title: "Lowcountry Residence", meta: "Mount Pleasant · 2024", span: "md:col-span-8 aspect-[16/10]" },
    { title: "Carolina Farmhouse", meta: "Summerville · 2025", span: "md:col-span-4 aspect-[4/5]" },
    { title: "Coastal Retreat", meta: "Isle of Palms · 2025", span: "md:col-span-4 aspect-[4/5]" },
    { title: "Mixed-Use Storefront", meta: "Park Circle · 2025", span: "md:col-span-8 aspect-[16/10]" },
    { title: "Transylvanian-Inspired Home", meta: "Daniel Island · 2025", span: "md:col-span-6 aspect-[5/4]" },
    { title: "Garden Pavilion", meta: "West Ashley · 2025", span: "md:col-span-6 aspect-[5/4]" },
  ];
  return (
    <section id="portfolio" className="border-t border-border/70 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-px bg-accent" />
              <span className="text-xs uppercase tracking-[0.3em] text-accent">Selected Work</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">Recent projects.</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            A small studio means a small, intentional portfolio. Full case studies available on request.
          </p>
        </div>
        <div className="grid md:grid-cols-12 gap-4 md:gap-6">
          {projects.map((p) => (
            <figure key={p.title} className={`${p.span} group relative overflow-hidden bg-stone border border-border`}>
              <div className="absolute inset-0 paper-grain opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display text-foreground/30 text-5xl mb-2">+</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.3em] text-foreground/40">Photo placeholder</div>
                </div>
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-ink/70 to-transparent text-background opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="font-display text-xl">{p.title}</div>
                <div className="text-xs uppercase tracking-widest opacity-80">{p.meta}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(String(data.get("subject") || "Project inquiry"));
    const body = encodeURIComponent(
      `${data.get("message") || ""}\n\n— Reply to: ${data.get("email") || ""}`
    );
    window.location.href = `mailto:info@coastalevolutionbuilders.com?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <section id="contact" className="border-t border-border/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <SectionHeading kicker="Contact" title="Start a conversation." />
            <p className="text-foreground/80 leading-relaxed mb-10 max-w-md">
              Tell us about your project. We'll respond personally—usually within a business day.
            </p>
            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">Email</div>
                <a href="mailto:info@coastalevolutionbuilders.com" className="font-display text-2xl hover:text-accent transition-colors">
                  info@coastalevolutionbuilders.com
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">Text or call</div>
                <a href="tel:+18434103516" className="font-display text-2xl hover:text-accent transition-colors">
                  843.410.3516
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">Studio</div>
                <div className="text-foreground/80">North Charleston, South Carolina</div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-7 lg:pl-10 lg:border-l lg:border-border space-y-8">
            <Field label="Your email" name="email" type="email" required placeholder="you@domain.com" />
            <Field label="Subject" name="subject" type="text" required placeholder="New custom home in Mount Pleasant" />
            <div>
              <label className="block text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Tell us about the project
              </label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Site, scope, timeline, anything you'd like us to know…"
                className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-base resize-none transition-colors"
              />
            </div>
            <div className="flex items-center justify-between gap-6 pt-2">
              <p className="text-xs text-muted-foreground">
                Opens your email client. Prefer direct? Email or text us above.
              </p>
              <button
                type="submit"
                className="text-sm px-8 py-3 bg-foreground text-background hover:bg-accent transition-colors whitespace-nowrap"
              >
                {status === "sent" ? "Thank you" : "Send inquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">{label}</label>
      <input
        {...props}
        className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-base transition-colors"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/70 bg-ink text-background/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-display text-xl text-background">Coastal Evolution Builders LLC</div>
          <div className="text-xs uppercase tracking-[0.25em] mt-2 opacity-70">
            North Charleston, SC · Licensed General Contractor
          </div>
        </div>
        <div className="text-xs opacity-70">© {new Date().getFullYear()} Coastal Evolution Builders. All rights reserved.</div>
      </div>
    </footer>
  );
}
