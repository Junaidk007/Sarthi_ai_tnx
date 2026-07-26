import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Network, ScanSearch, Brain, FileText, Sparkles } from "lucide-react";

export const Route = createFileRoute("/processing")({
  head: () => ({
    meta: [
      { title: "Analyzing… — Sarthi AI" },
      { name: "description", content: "Sarthi AI's agents are retrieving, reasoning, and generating a structured report." },
      { property: "og:title", content: "Analyzing — Sarthi AI" },
      { property: "og:description", content: "Multi-agent processing in progress." },
    ],
  }),
  component: Processing,
});

const agents = [
  { icon: Network, name: "Coordinator Agent", detail: "Task decomposition complete" },
  { icon: ScanSearch, name: "Search Agent", detail: "Searching web & knowledge base" },
  { icon: Brain, name: "Analysis Agent", detail: "Extracting information" },
  { icon: Sparkles, name: "Reasoning", detail: "Synthesizing knowledge" },
  { icon: FileText, name: "Report Agent", detail: "Generating report" },
];

function Processing() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(6);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s < agents.length ? s + 1 : s)), 1400);
    const p = setInterval(() => setProgress((v) => Math.min(v + 3, 100)), 250);
    const done = setTimeout(() => { window.location.href = "/result"; }, agents.length * 1400 + 800);
    return () => { clearInterval(t); clearInterval(p); clearTimeout(done); };
  }, []);

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 shadow-soft">
        <Sparkles className="h-3.5 w-3.5" /> Multi-agent processing
      </div>
      <h1 className="text-center font-display text-3xl font-bold sm:text-5xl">Sarthi AI is thinking…</h1>
      <p className="mt-3 text-center text-muted-foreground">Coordinated agents are retrieving verified sources and synthesizing a report.</p>

      <div className="mt-12 w-full rounded-3xl border border-border/70 bg-white/85 p-6 shadow-card sm:p-8">
        <ul className="space-y-4">
          {agents.map((a, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={a.name} className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${active ? "border-brand-300 bg-soft-gradient shadow-glow" : done ? "border-border/70 bg-white" : "border-border/60 bg-white/60"}`}>
                <div className={`grid h-11 w-11 place-items-center rounded-xl ${done ? "bg-brand-gradient text-white" : active ? "bg-white text-brand-700 animate-pulse-ring" : "bg-secondary text-muted-foreground"}`}>
                  {done ? <CheckCircle2 className="h-5 w-5" /> : active ? <Loader2 className="h-5 w-5 animate-spin" /> : <a.icon className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{a.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {done ? "Completed" : active ? a.detail : "Queued"}
                  </div>
                </div>
                {done && <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-700">Done</span>}
                {active && <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-brand-700 border border-brand-200">Running</span>}
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Estimated processing time — ~12s</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-brand-gradient transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <Link to="/result" className="mt-6 text-sm text-muted-foreground hover:text-foreground">Skip to result →</Link>
    </main>
  );
}
