import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Download, ExternalLink, Filter, Calendar, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Sarthi AI" },
      { name: "description", content: "Browse, filter, and download every AI-generated report from your Sarthi workspace." },
      { property: "og:title", content: "Reports — Sarthi AI" },
      { property: "og:description", content: "All AI-generated reports in one workspace." },
    ],
  }),
  component: Reports,
});

const reports = [
  { name: "Latest AI Regulations in India", date: "Aug 12, 2026", conf: 94, cat: "Policy", status: "Ready" },
  { name: "Cyber Security Trends 2026", date: "Aug 10, 2026", conf: 91, cat: "Security", status: "Ready" },
  { name: "AI in Healthcare — Clinical Impact", date: "Aug 09, 2026", conf: 88, cat: "Healthcare", status: "Ready" },
  { name: "Climate Change Policies — G20 Summary", date: "Aug 05, 2026", conf: 92, cat: "Climate", status: "Ready" },
  { name: "Semiconductor Supply Chain Outlook", date: "Aug 02, 2026", conf: 86, cat: "Industry", status: "Draft" },
  { name: "Quantum Computing Readiness", date: "Jul 28, 2026", conf: 90, cat: "Research", status: "Ready" },
];

function Reports() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">All AI-generated reports across your workspace.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium hover:bg-secondary">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <Link to="/search" className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
            New report
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-6 rounded-2xl border border-border/70 bg-white/85 p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-white px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search reports…" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          </div>
          <FilterPill icon={Calendar} label="Date: Last 30 days" />
          <FilterPill label="Category: All" />
          <FilterPill label="Status: All" />
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <div key={r.name} className="group rounded-3xl border border-border/70 bg-white/85 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-700">{r.cat}</span>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${r.status === "Ready" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {r.status === "Ready" && <ShieldCheck className="h-3 w-3" />} {r.status}
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold leading-tight">{r.name}</h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> {r.date}
            </div>

            <div className="mt-5">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium">Confidence</span>
                <span className="text-muted-foreground">{r.conf}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-brand-gradient" style={{ width: `${r.conf}%` }} />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <Link to="/result" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-3 py-2 text-xs font-semibold text-white shadow-glow">
                <ExternalLink className="h-3.5 w-3.5" /> Open
              </Link>
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-xs font-medium">
                <Download className="h-3.5 w-3.5" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function FilterPill({ icon: Icon, label }: { icon?: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary">
      {Icon && <Icon className="h-3.5 w-3.5" />} {label}
    </button>
  );
}
