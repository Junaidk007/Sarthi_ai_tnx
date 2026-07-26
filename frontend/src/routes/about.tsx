import { createFileRoute } from "@tanstack/react-router";
import { Target, Lightbulb, Layers, Cpu, Users, Compass } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sarthi AI" },
      { name: "description", content: "Learn about Sarthi AI's mission, architecture, and team building multi-agent intelligence for enterprise and government." },
      { property: "og:title", content: "About — Sarthi AI" },
      { property: "og:description", content: "Our mission: verified intelligence for enterprise, research, and government." },
    ],
  }),
  component: About,
});

const stack = [
  { k: "Frontend", v: "React · TanStack Router · Tailwind" },
  { k: "AI Orchestration", v: "Multi-agent coordinator + LLM router" },
  { k: "Retrieval", v: "Hybrid vector + BM25, RAG pipeline" },
  { k: "Reasoning", v: "Chain-of-thought · tool use · self-critique" },
  { k: "Storage", v: "PostgreSQL · Object Store · Vector DB" },
  { k: "Infra", v: "Edge functions · workerd runtime" },
];

const team = [
  { name: "A. Iyer", role: "Founder & CEO" },
  { name: "R. Kapoor", role: "Head of AI Research" },
  { name: "S. Menon", role: "Head of Engineering" },
  { name: "N. Verma", role: "Product Design" },
];

function About() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 shadow-soft">
          <Compass className="h-3.5 w-3.5" /> About Sarthi AI
        </div>
        <h1 className="font-display text-3xl font-bold sm:text-5xl">Verified intelligence, engineered for the enterprise.</h1>
        <p className="mt-4 text-muted-foreground">
          We build multi-agent AI systems that turn fragmented information into structured, cited insight —
          purpose-built for government, research, and enterprise teams.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Card icon={Target} title="Problem Statement">
          Knowledge is scattered across the open web, private data, and legacy systems. Analysts spend most
          of their time collecting and reconciling sources instead of reasoning about them.
        </Card>
        <Card icon={Lightbulb} title="Solution Overview">
          Sarthi AI orchestrates specialized agents — coordinator, search, analysis, and report — to deliver
          structured, verified reports from a single natural-language question.
        </Card>
      </div>

      <section className="mt-8 rounded-3xl border border-border/70 bg-white/85 p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-white"><Layers className="h-4 w-4" /></span>
          <h2 className="font-display text-xl font-bold">Architecture</h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          A modular pipeline where each agent has a single responsibility. Retrieval is hybrid (vector + keyword),
          reasoning is auditable, and every generated claim is tied to a source with a trust score.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { t: "Retrieval Layer", d: "RAG + web + private KB" },
            { t: "Reasoning Layer", d: "Multi-agent coordination" },
            { t: "Delivery Layer", d: "Report · API · Chat" },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-border/70 bg-white p-4">
              <div className="text-xs font-semibold text-brand-700">{b.t}</div>
              <div className="mt-1 text-sm font-medium">{b.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-soft sm:p-8">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-white"><Cpu className="h-4 w-4" /></span>
            <h2 className="font-display text-xl font-bold">Tech Stack</h2>
          </div>
          <div className="mt-5 divide-y divide-border/60">
            {stack.map((s) => (
              <div key={s.k} className="grid grid-cols-[140px_1fr] gap-4 py-3 text-sm">
                <div className="font-semibold text-brand-700">{s.k}</div>
                <div className="text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-soft sm:p-8">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-white"><Users className="h-4 w-4" /></span>
            <h2 className="font-display text-xl font-bold">Team</h2>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {team.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border/70 bg-white p-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-soft-gradient font-semibold text-brand-700">
                  {m.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <div className="mt-3 font-semibold">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-brand-gradient p-10 text-center text-white shadow-glow">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Our Mission</h2>
          <p className="mt-3 text-white/90">
            To make verified, cited intelligence the default — so decision-makers can move faster without
            trading accuracy for speed.
          </p>
        </div>
      </section>
    </main>
  );
}

function Card({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-soft sm:p-8">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-white"><Icon className="h-4 w-4" /></span>
        <h2 className="font-display text-xl font-bold">{title}</h2>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
