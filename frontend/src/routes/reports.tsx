import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Download, ExternalLink, Filter, Calendar, ShieldCheck, Loader2, FileText, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { AuthModal } from "@/components/auth-modal";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Sarthi AI" },
      { name: "description", content: "Browse, filter, and download every AI-generated report from your Sarthi workspace." },
      { property: "og:title", content: "Reports — Sarthi AI" },
      { property: "og:description", content: "All AI-generated reports in one workspace." },
    ],
  }),
  component: ReportsPage,
});

export function ReportsPage() {
  const { isAuthenticated } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchReports = async () => {
      setLoading(true);
      try {
        const data = await api.get("/workflow/reports");
        setReports(data || []);
      } catch (err) {
        console.warn("Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [isAuthenticated]);

  const filteredReports = reports.filter((r) =>
    r.query?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Workspace Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">All AI-generated research and multi-agent intelligence saved in your account.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/search" className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
            New AI Search
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-6 rounded-2xl border border-border/70 bg-white/85 p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-white px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search past reports…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </div>
      </div>

      {!isAuthenticated ? (
        <div className="mt-12 rounded-3xl border border-border/70 bg-white/80 p-8 text-center shadow-soft">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/60" />
          <h3 className="mt-4 text-xl font-bold">Sign in to view saved reports</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in or create an account to access your full multi-agent search history and saved reports.
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Sign In / Register
          </button>
        </div>
      ) : loading ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          <p className="text-sm font-medium text-muted-foreground">Loading workspace reports...</p>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-border/70 bg-white/80 p-8 text-center shadow-soft">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/60" />
          <h3 className="mt-4 text-xl font-bold">No reports found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            You haven't generated any AI research reports yet. Run your first query!
          </p>
          <Link
            to="/search"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Run New AI Search
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((r) => (
            <div key={r._id} className="group rounded-3xl border border-border/70 bg-white/85 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-700">
                  {r.taskType?.toUpperCase() || "RESEARCH"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                  <ShieldCheck className="h-3 w-3" /> Saved
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-tight line-clamp-2">{r.query}</h3>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> {new Date(r.createdAt).toLocaleDateString()}
              </div>

              <div className="mt-6 flex items-center gap-2">
                <button
                  onClick={() => setSelectedReport(r)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-3 py-2 text-xs font-semibold text-white shadow-glow"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-background p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {selectedReport.taskType?.toUpperCase() || "RESEARCH"} REPORT
                </span>
                <h2 className="mt-2 text-2xl font-bold">{selectedReport.query}</h2>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
              >
                Close
              </button>
            </div>

            <div className="mt-6 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
              {selectedReport.report}
            </div>

            {selectedReport.sources && selectedReport.sources.length > 0 && (
              <div className="mt-8 border-t border-border/60 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Citations & Sources</h4>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {selectedReport.sources.map((src: any, idx: number) => (
                    <a
                      key={idx}
                      href={src.url || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 p-3 text-xs font-medium hover:bg-secondary hover:text-brand-600"
                    >
                      <span className="truncate pr-2">{src.title || src.url}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab="login"
      />
    </main>
  );
}
