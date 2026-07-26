import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search as SearchIcon, ArrowRight, Clock, LayoutGrid, FileText, Workflow, Settings,
  MessageSquare, ScanSearch, Brain, FileBarChart, Loader2, CheckCircle2, Sparkles, AlertCircle, ExternalLink, Download
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { AuthModal } from "@/components/auth-modal";

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
  { icon: SearchIcon, label: "AI Search", to: "/search", active: true },
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

const steps = [
  { icon: MessageSquare, title: "1. Planning", desc: "Query decomposition" },
  { icon: ScanSearch, title: "2. Search", desc: "Tavily web retrieval" },
  { icon: Brain, title: "3. RAG Analysis", desc: "FAISS vector reasoning" },
  { icon: FileBarChart, title: "4. Report Generation", desc: "Structured report" },
];

export function SearchPage() {
  const { isAuthenticated } = useAuth();
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [resultReport, setResultReport] = useState<any | null>(null);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;

    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    setLoading(true);
    setError(null);
    setResultReport(null);
    setProgressStep(1);

    // Simulate progress updates for smooth agent execution feedback
    const t1 = setTimeout(() => setProgressStep(2), 1200);
    const t2 = setTimeout(() => setProgressStep(3), 2400);

    try {
      const data = await api.post("/workflow/run", { query: q.trim() });
      setProgressStep(4);
      setResultReport(data);
    } catch (err: any) {
      setError(err.message || "Failed to execute agent workflow.");
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setLoading(false);
    }
  };

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

        {/* Main section */}
        <section>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 shadow-soft">
              <LayoutGrid className="h-3.5 w-3.5" /> Multi-Agent Search Engine
            </div>
            <h1 className="font-display text-3xl font-bold sm:text-5xl">What do you want to know?</h1>
            <p className="mt-3 text-muted-foreground">Ask any question — agents will retrieve, reason, and build a structured report.</p>

            <form
              onSubmit={handleSearchSubmit}
              className="mx-auto mt-8 flex items-center gap-2 rounded-2xl border border-border/70 bg-white/90 p-2 shadow-glow"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <SearchIcon className="h-5 w-5" />
              </div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ask anything in natural language..."
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base outline-none"
              />
              <button
                type="submit"
                disabled={loading || !q.trim()}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Search <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          </div>

          {/* Progress Indicator */}
          {loading && (
            <div className="mt-8 rounded-2xl border border-brand-200 bg-white p-6 shadow-glow text-center animate-in fade-in duration-300">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                <Sparkles className="h-4 w-4 animate-spin text-brand-600" />
                Agents working in parallel...
              </div>
              <h4 className="mt-3 text-lg font-bold">Executing Multi-Agent Pipeline</h4>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {steps.map((step, idx) => {
                  const stepNum = idx + 1;
                  const isDone = progressStep > stepNum;
                  const isCurrent = progressStep === stepNum;
                  return (
                    <div
                      key={step.title}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        isDone
                          ? "border-emerald-200 bg-emerald-50/60 text-emerald-800"
                          : isCurrent
                          ? "border-brand-300 bg-brand-50/60 text-brand-800 ring-2 ring-brand-400/20"
                          : "border-border/60 bg-secondary/30 text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>{step.title}</span>
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : isCurrent ? (
                          <Loader2 className="h-4 w-4 animate-spin text-brand-600" />
                        ) : null}
                      </div>
                      <p className="mt-1 text-[11px] opacity-80">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mt-6 flex items-center gap-2 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Result Display */}
          {resultReport && (
            <div className="mt-8 rounded-3xl border border-border/80 bg-white p-6 shadow-glow sm:p-8 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {resultReport.taskType?.toUpperCase() || "RESEARCH"} REPORT
                  </span>
                  <h2 className="mt-2 text-2xl font-bold">{resultReport.query}</h2>
                </div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-3.5 py-2 text-xs font-semibold hover:bg-secondary"
                >
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>
              </div>

              <div className="mt-6 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                {resultReport.report}
              </div>

              {resultReport.sources && resultReport.sources.length > 0 && (
                <div className="mt-8 border-t border-border/60 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Verified Sources & Citations</h4>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {resultReport.sources.map((src: any, idx: number) => (
                      <a
                        key={idx}
                        href={src.url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 p-3 text-xs font-medium transition-colors hover:bg-secondary hover:text-brand-600"
                      >
                        <span className="truncate pr-2">{src.title || src.url}</span>
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Suggested queries */}
          {!resultReport && !loading && (
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
          )}

          {/* How AI works */}
          {!resultReport && !loading && (
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
          )}
        </section>

        {/* Right panel */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border/70 bg-white/80 p-5 shadow-soft">
            <h4 className="flex items-center gap-2 text-sm font-semibold"><Clock className="h-4 w-4 text-brand-600" /> Recent Queries</h4>
            <ul className="mt-4 space-y-2">
              {suggested.slice(0, 4).map((r) => (
                <li key={r.title}>
                  <button onClick={() => setQ(r.title)} className="w-full rounded-xl px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
                    {r.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-brand-200/60 bg-soft-gradient p-5 shadow-soft">
            <h4 className="text-sm font-semibold text-brand-700">Pro tip</h4>
            <p className="mt-2 text-xs text-brand-700/80">Ask multi-part questions. Sarthi's agents will plan, retrieve live web articles, and perform FAISS vector synthesis automatically.</p>
          </div>
        </aside>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab="login"
      />
    </main>
  );
}
