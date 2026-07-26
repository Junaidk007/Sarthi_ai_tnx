import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, ArrowRight, Clock, LayoutGrid, FileText, Workflow, Settings,
  MessageSquare, ScanSearch, Brain, FileBarChart,
} from "lucide-react";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "AI Search — Sarthi AI" },
      { name: "description", content: "Ask anything in natural language. Sarthi AI's agents retrieve, reason, and synthesize verified answers." },
      { property: "og:title", content: "AI Search — Sarthi AI" },
      { property: "og:description", content: "Natural-language search powered by multi-agent intelligence." },
    ],
  }),
  component: SearchPage,
});

const sidebar = [
  { icon: Search, label: "AI Search", to: "/search", active: true },
  { icon: FileText, label: "Reports", to: "/reports" },
  { icon: Workflow, label: "Workflow", to: "/workflow" },
  { icon: Settings, label: "Settings", to: "/search" },
];

const suggested = [
  { title: "Latest AI Regulations in India", tag: "Policy" },
  { title: "Cyber Security Trends 2026", tag: "Security" },
  { title: "AI in Healthcare — clinical impact", tag: "Healthcare" },
  { title: "Climate Change Policies — G20", tag: "Climate" },
  { title: "Semiconductor supply chain outlook", tag: "Industry" },
  { title: "Quantum computing readiness", tag: "Research" },
];

const recent = [
  "Latest AI Regulations",
  "Healthcare AI",
  "Cyber Security",
  "Blockchain",
];

const steps = [
  { icon: MessageSquare, title: "You Ask", desc: "Natural language" },
  { icon: ScanSearch, title: "Search", desc: "Semantic retrieval" },
  { icon: Brain, title: "Analyze", desc: "Multi-agent reasoning" },
  { icon: FileBarChart, title: "Generate Report", desc: "Structured output" },
];

function SearchPage() {
  const [q, setQ] = useState("");
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr_280px]">
        {/* Left sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border/70 bg-white/80 p-3 shadow-soft">
            {sidebar.map((s) => (
              <Link key={s.label} to={s.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${s.active ? "bg-soft-gradient text-brand-700" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                <s.icon className="h-4 w-4" /> {s.label}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main */}
        <section>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 shadow-soft">
              <LayoutGrid className="h-3.5 w-3.5" /> Ask Sarthi AI
            </div>
            <h1 className="font-display text-3xl font-bold sm:text-5xl">What do you want to know?</h1>
            <p className="mt-3 text-muted-foreground">Ask any question — agents will retrieve, reason, and build a structured report.</p>

            <form
              onSubmit={(e) => { e.preventDefault(); window.location.href = "/processing"; }}
              className="mx-auto mt-8 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/90 p-2 shadow-glow"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Search className="h-5 w-5" />
              </div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ask anything in natural language..."
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base outline-none"
              />
              <button className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow">
                Search <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="mt-12">
            <h3 className="text-sm font-semibold text-muted-foreground">Suggested queries</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {suggested.map((s) => (
                <button key={s.title} onClick={() => setQ(s.title)}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-white/80 p-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow">
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Trending topic</div>
                  </div>
                  <span className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-semibold text-brand-700">{s.tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* How AI works */}
          <div className="mt-14 rounded-3xl border border-border/70 bg-white/80 p-8 shadow-soft">
            <h3 className="font-display text-xl font-bold">How AI works</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <div key={s.title} className="relative rounded-2xl border border-border/70 bg-white p-5 shadow-soft">
                  <div className="absolute -top-3 left-5 rounded-full bg-brand-gradient px-2.5 py-0.5 text-[10px] font-bold text-white">Step {i + 1}</div>
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-soft-gradient text-brand-700"><s.icon className="h-5 w-5" /></div>
                  <div className="font-semibold">{s.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right panel */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border/70 bg-white/80 p-5 shadow-soft">
            <h4 className="flex items-center gap-2 text-sm font-semibold"><Clock className="h-4 w-4 text-brand-600" /> Recent Queries</h4>
            <ul className="mt-4 space-y-2">
              {recent.map((r) => (
                <li key={r}>
                  <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-brand-200/60 bg-soft-gradient p-5 shadow-soft">
            <h4 className="text-sm font-semibold text-brand-700">Pro tip</h4>
            <p className="mt-2 text-xs text-brand-700/80">Ask multi-part questions. Sarthi's Coordinator Agent will decompose and route the sub-tasks automatically.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
