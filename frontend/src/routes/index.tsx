import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Sparkles, ArrowRight, Brain, Network, ShieldCheck, FileText,
  Layers, Users, ScanSearch, BookOpen, ArrowDown, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sarthi AI — Multi-Agent Knowledge Intelligence Platform" },
      { name: "description", content: "Transform fragmented information into structured insights with AI agents, semantic search, and automated report generation." },
      { property: "og:title", content: "Sarthi AI — Multi-Agent Knowledge Intelligence Platform" },
      { property: "og:description", content: "Transform fragmented information into structured insights with AI agents, semantic search, and automated report generation." },
    ],
  }),
  component: Landing,
});

const suggestions = [
  "Latest AI Regulations in India",
  "Cyber Security Trends",
  "AI in Healthcare",
  "Climate Change Policies",
];

const stats = [
  { label: "Reports Generated", value: "128K+" },
  { label: "AI Confidence", value: "96.4%" },
  { label: "Sources Processed", value: "42M" },
  { label: "Organizations Using", value: "820+" },
];

const workflow = [
  { title: "User Query", desc: "Natural-language question", icon: Search },
  { title: "Coordinator Agent", desc: "Plans multi-step task", icon: Network },
  { title: "Search Agent", desc: "Semantic web + KB", icon: ScanSearch },
  { title: "Analysis Agent", desc: "Reasons over sources", icon: Brain },
  { title: "Report Agent", desc: "Composes final output", icon: FileText },
  { title: "Structured Output", desc: "Verified insights", icon: CheckCircle2 },
];

const features = [
  { icon: ScanSearch, title: "Semantic Search", desc: "Vector + hybrid retrieval that understands meaning, not just keywords." },
  { icon: Users, title: "Multi-Agent AI", desc: "Specialized agents collaborate through a coordinator for complex tasks." },
  { icon: Brain, title: "Intelligent Reasoning", desc: "Chain-of-thought synthesis across dozens of verified sources." },
  { icon: ShieldCheck, title: "Source Verification", desc: "Provenance, trust scoring, and citation for every insight." },
  { icon: FileText, title: "Report Generation", desc: "Structured, exportable PDFs with executive summaries and recommendations." },
  { icon: Layers, title: "RAG Architecture", desc: "Retrieval-augmented generation with your knowledge base and the open web." },
];

function Landing() {
  const [q, setQ] = useState("");
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-100/50 blur-3xl" />
          <div className="absolute right-[-10%] top-40 h-[320px] w-[320px] rounded-full bg-brand-200/40 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 shadow-soft">
              <Sparkles className="h-3.5 w-3.5" /> Introducing Multi-Agent Intelligence
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              AI-Powered <span className="text-gradient">Knowledge Retrieval</span> &
              <br className="hidden sm:block" /> Multi-Agent Intelligence
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Transform fragmented information into structured insights using AI agents,
              semantic search, reasoning, and automated report generation.
            </p>

            {/* Search bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); window.location.href = "/processing"; }}
              className="mx-auto mt-10 flex max-w-3xl items-center gap-2 rounded-2xl border border-border/70 bg-white/90 p-2 shadow-glow"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Search className="h-5 w-5" />
              </div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search anything..."
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-95"
              >
                Analyze <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQ(s)}
                  className="rounded-full border border-border/70 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:border-brand-300 hover:text-brand-700"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Hero illustration */}
          {/* <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="relative rounded-3xl border border-border/70 bg-white/80 p-6 shadow-card">
              <NetworkIllustration />
            </div>
          </div> */}

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border/70 bg-white/80 p-6 text-center shadow-soft">
                <div className="font-display text-3xl font-bold text-gradient">{s.value}</div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="workflow" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-600">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">A coordinated pipeline of AI agents</h2>
          <p className="mt-4 text-muted-foreground">
            From your question to a verified, structured report — orchestrated by specialized agents.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {workflow.map((w, i) => (
            <div key={w.title} className="relative rounded-2xl border border-border/70 bg-white/80 p-5 shadow-soft">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-soft-gradient text-brand-700">
                <w.icon className="h-5 w-5" />
              </div>
              <div className="text-xs font-semibold text-muted-foreground">Step {i + 1}</div>
              <div className="mt-1 font-semibold">{w.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-600">Features</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Built for verified intelligence</h2>
          <p className="mt-4 text-muted-foreground">Everything you need for retrieval, reasoning, and reporting.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group rounded-3xl border border-border/70 bg-white/80 p-7 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow">
              <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-gradient group-hover:text-white">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-10 text-center shadow-glow sm:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(600px 200px at 20% 0%, rgba(255,255,255,.5), transparent), radial-gradient(500px 200px at 80% 100%, rgba(255,255,255,.35), transparent)" }} />
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-5xl">Start searching with intelligence.</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/85">Ask any question and let coordinated agents deliver a structured, cited report.</p>
          <Link to="/search" className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg hover:opacity-95">
            Start Searching <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function NetworkIllustration() {
  const nodes = [
    { x: 50, y: 50, label: "Coordinator", big: true },
    { x: 15, y: 20, label: "Search" },
    { x: 85, y: 20, label: "Analysis" },
    { x: 10, y: 80, label: "Reasoning" },
    { x: 90, y: 80, label: "Report" },
    { x: 50, y: 12, label: "Query" },
    { x: 50, y: 88, label: "Output" },
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 3], [2, 4], [5, 1], [5, 2], [3, 6], [4, 6],
  ];
  return (
    <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl bg-soft-gradient">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0%" stopColor="#1A89FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#29B8FF" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="url(#edge)" strokeWidth="0.3" />
        ))}
      </svg>
      {nodes.map((n) => (
        <div key={n.label}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/70 bg-white/95 px-3 py-1.5 text-[11px] font-medium shadow-soft ${n.big ? "bg-brand-gradient !text-white animate-pulse-ring" : "text-foreground animate-float"}`}
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${n.x * 30}ms` }}>
          {n.label}
        </div>
      ))}
    </div>
  );
}
