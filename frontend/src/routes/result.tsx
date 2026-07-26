import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2, Download, Copy, Share2, ShieldCheck, ExternalLink,
  Send, Sparkles, ArrowRight, Network, ScanSearch, Brain, FileText,
} from "lucide-react";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Analysis Result — Sarthi AI" },
      { name: "description", content: "Structured report with executive summary, insights, recommendations, and verified sources." },
      { property: "og:title", content: "Analysis Result — Sarthi AI" },
      { property: "og:description", content: "Verified, multi-agent generated report." },
    ],
  }),
  component: Result,
});

const insights = [
  "India's Digital India Act draft prioritizes AI safety, deepfake accountability, and algorithmic transparency.",
  "The EU AI Act creates a tiered risk framework that is being partially referenced in APAC policy drafts.",
  "Public-sector procurement increasingly requires explainability and audit trails for deployed AI systems.",
  "Sector-specific rules (health, finance) are emerging faster than horizontal regulations.",
];

const recs = [
  { p: "High", title: "Establish an internal AI governance committee", desc: "Cross-functional oversight across legal, security, and product." },
  { p: "Medium", title: "Adopt model cards & data sheets", desc: "Standardize documentation for every deployed model." },
  { p: "Low", title: "Pilot red-team evaluations quarterly", desc: "Simulate misuse to surface risks before production." },
];

const sources = [
  { name: "MeitY — Digital India Act draft", cat: "Government", verified: true },
  { name: "NASSCOM — AI Policy Landscape 2026", cat: "Industry", verified: true },
  { name: "EU AI Act — Official Text", cat: "Government", verified: true },
  { name: "Stanford HAI — Global AI Index", cat: "Research", verified: true },
  { name: "OECD.AI — Country Dashboard", cat: "Research", verified: true },
  { name: "Reuters — Policy coverage", cat: "Web", verified: false },
];

const workflow = [
  { icon: Network, name: "Coordinator" },
  { icon: ScanSearch, name: "Search" },
  { icon: Brain, name: "Analysis" },
  { icon: FileText, name: "Report" },
];

const priorityStyle: Record<string, string> = {
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function Result() {
  const confidence = 94;
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Generated · Just now</span>
              <span>·</span>
              <span>Report #A-10298</span>
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold sm:text-4xl">Latest AI Regulations in India — 2026 Overview</h1>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" /> Confidence {confidence}%
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium hover:bg-secondary">
              <Copy className="h-4 w-4" /> Copy
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
              <Download className="h-4 w-4" /> Generate PDF
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Executive Summary */}
          <Section title="Executive Summary">
            <p className="text-[15px] leading-relaxed text-foreground/90">
              India's AI regulatory posture in 2026 is defined by the draft Digital India Act, sector-specific
              guidance from RBI and ICMR, and alignment with global norms like the EU AI Act. The trajectory
              favors risk-tiered obligations, model transparency, and accountability for high-impact deployments.
              Enterprises should prepare governance, documentation, and evaluation processes now.
            </p>
          </Section>

          {/* Key Insights */}
          <Section title="Key Insights">
            <ul className="space-y-3">
              {insights.map((i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-white p-4">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-foreground/90">{i}</p>
                </li>
              ))}
            </ul>
          </Section>

          {/* Recommendations */}
          <Section title="Recommendations">
            <div className="grid gap-3 sm:grid-cols-3">
              {recs.map((r) => (
                <div key={r.title} className="rounded-2xl border border-border/70 bg-white p-4">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold ${priorityStyle[r.p]}`}>{r.p} priority</span>
                  <h4 className="mt-3 font-semibold">{r.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Sources */}
          <Section title="Sources">
            <div className="overflow-hidden rounded-2xl border border-border/70">
              <table className="w-full text-sm">
                <thead className="bg-secondary/70 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Source</th>
                    <th className="px-4 py-3 text-left font-semibold">Category</th>
                    <th className="px-4 py-3 text-left font-semibold">Verified</th>
                    <th className="px-4 py-3 text-right font-semibold">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {sources.map((s) => (
                    <tr key={s.name} className="border-t border-border/60 hover:bg-secondary/40">
                      <td className="px-4 py-3 font-medium">{s.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.cat}</td>
                      <td className="px-4 py-3">
                        {s.verified ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                            <ShieldCheck className="h-3 w-3" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <a href="#" className="inline-flex items-center gap-1 text-brand-600 hover:underline">
                          Open <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Follow-up */}
          <Section title="Ask a follow-up">
            <form className="flex items-center gap-2 rounded-2xl border border-border/70 bg-white p-2">
              <input placeholder="Ask a follow-up question about this report…" className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none" />
              <button className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white">
                <Send className="h-4 w-4" /> Ask
              </button>
            </form>
          </Section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Confidence */}
          <div className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-soft">
            <h3 className="font-display text-base font-semibold">Confidence Score</h3>
            <div className="mt-4 flex items-center gap-5">
              <ConfidenceRing value={confidence} />
              <div className="text-sm text-muted-foreground">
                <p>Aggregate of source verification, cross-agreement, and reasoning strength.</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <VerifyRow label="Government" pct={70} />
              <VerifyRow label="Research" pct={22} />
              <VerifyRow label="Web" pct={8} />
            </div>
          </div>

          {/* Agent Workflow */}
          <div className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-soft">
            <h3 className="font-display text-base font-semibold">Agent Workflow</h3>
            <ol className="mt-4 space-y-3">
              {workflow.map((w, i) => (
                <li key={w.name} className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-white">
                    <w.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{w.name}</div>
                    <div className="text-[11px] text-muted-foreground">Step {i + 1} · Completed</div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="rounded-3xl border border-border/70 bg-soft-gradient p-6 shadow-soft">
            <h3 className="font-display text-base font-semibold text-brand-700">Actions</h3>
            <div className="mt-4 grid gap-2">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
                <Download className="h-4 w-4" /> Download PDF
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium border border-border">
                <Copy className="h-4 w-4" /> Copy Report
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium border border-border">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
            <Link to="/reports" className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline">
              View all reports <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-soft sm:p-7">
      <div className="mb-4 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-brand-50 text-brand-700"><Sparkles className="h-3.5 w-3.5" /></span>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function ConfidenceRing({ value }: { value: number }) {
  const r = 34, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} stroke="#E6EEF8" strokeWidth="8" fill="none" />
        <defs>
          <linearGradient id="ring" x1="0" x2="1"><stop offset="0%" stopColor="#1A89FF" /><stop offset="100%" stopColor="#29B8FF" /></linearGradient>
        </defs>
        <circle cx="40" cy="40" r={r} stroke="url(#ring)" strokeWidth="8" fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-lg font-bold">{value}%</span>
      </div>
    </div>
  );
}

function VerifyRow({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-brand-gradient" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
