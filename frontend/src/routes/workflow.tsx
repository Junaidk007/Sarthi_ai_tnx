import { createFileRoute } from "@tanstack/react-router";
import { Network, ScanSearch, Brain, FileText, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/workflow")({
  head: () => ({
    meta: [
      { title: "AI Workflow — Sarthi AI" },
      { name: "description", content: "Explore Sarthi AI's multi-agent architecture — coordinator, search, analysis, and report agents working in concert." },
      { property: "og:title", content: "AI Workflow — Sarthi AI" },
      { property: "og:description", content: "Interactive multi-agent architecture." },
    ],
  }),
  component: WorkflowPage,
});

const agents = [
  { icon: MessageSquare, role: "User Query", desc: "Natural-language question submitted by the user.", status: "Input" },
  { icon: Network, role: "Coordinator Agent", desc: "Decomposes the query and orchestrates specialized sub-agents.", status: "Active" },
  { icon: ScanSearch, role: "Search Agent", desc: "Hybrid semantic + keyword search across the web and knowledge bases.", status: "Active" },
  { icon: Brain, role: "Analysis Agent", desc: "Extracts entities, evaluates evidence, and reasons across sources.", status: "Active" },
  { icon: FileText, role: "Report Agent", desc: "Composes the structured report with executive summary and citations.", status: "Active" },
  { icon: CheckCircle2, role: "Structured Output", desc: "Verified insights delivered as PDF, JSON, or web view.", status: "Ready" },
];

const statusStyle: Record<string, string> = {
  Input: "bg-secondary text-foreground",
  Active: "bg-brand-50 text-brand-700",
  Ready: "bg-emerald-50 text-emerald-700",
};

function WorkflowPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 shadow-soft">
          <Network className="h-3.5 w-3.5" /> Multi-Agent Architecture
        </div>
        <h1 className="font-display text-3xl font-bold sm:text-5xl">The Sarthi AI Workflow</h1>
        <p className="mt-3 text-muted-foreground">A coordinated pipeline of specialized agents from question to verified report.</p>
      </div>

      {/* Horizontal flow (desktop) */}
      <div className="mt-14 hidden lg:block">
        <div className="grid grid-cols-6 items-stretch gap-4">
          {agents.map((a, i) => (
            <div key={a.role} className="relative">
              <AgentCard a={a} />
              {i < agents.length - 1 && (
                <ArrowRight className="pointer-events-none absolute -right-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-brand-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Vertical flow (mobile/tablet) */}
      <div className="mt-14 grid gap-4 lg:hidden">
        {agents.map((a) => (
          <AgentCard key={a.role} a={a} />
        ))}
      </div>

      {/* Architecture detail */}
      <section className="mt-20 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-soft lg:col-span-2">
          <h2 className="font-display text-xl font-bold">How agents collaborate</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The Coordinator Agent plans a task graph based on the user's intent. It dispatches sub-tasks
            to the Search, Analysis, and Report Agents, which communicate through a shared context store.
            All artifacts — retrieved passages, extracted entities, and intermediate reasoning — are logged
            for auditability and confidence scoring.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { k: "RAG Retrieval", v: "Hybrid vector + BM25" },
              { k: "Reasoning", v: "Chain-of-thought + tool use" },
              { k: "Verification", v: "Source trust scoring" },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-border/70 bg-white p-4">
                <div className="text-xs font-semibold text-brand-700">{x.k}</div>
                <div className="mt-1 text-sm font-medium">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-brand-200 bg-soft-gradient p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold text-brand-700">System guarantees</h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-800/90">
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700" /> Provenance for every claim</li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700" /> Confidence scoring per section</li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700" /> Reproducible reasoning trace</li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700" /> Enterprise-grade audit logs</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

function AgentCard({ a }: { a: { icon: React.ComponentType<{ className?: string }>; role: string; desc: string; status: string } }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-white/90 p-5 shadow-soft transition-transform hover:-translate-y-0.5">
      <div className="mb-3 flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
          <a.icon className="h-5 w-5" />
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyle[a.status]}`}>{a.status}</span>
      </div>
      <div className="font-semibold">{a.role}</div>
      <div className="mt-1 text-xs text-muted-foreground">{a.desc}</div>
    </div>
  );
}
