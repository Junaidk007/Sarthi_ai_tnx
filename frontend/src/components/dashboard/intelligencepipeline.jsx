

import {
  Globe,
  Database,
  Brain,
  Network,
  Lightbulb,
} from "lucide-react";

const nodes = [
  {
    icon: Globe,
    title: "Public Web",
    subtitle: "Collect",
  },
  {
    icon: Database,
    title: "RAG Engine",
    subtitle: "Retrieve",
  },
  {
    icon: Brain,
    title: "AI Models",
    subtitle: "Analyze",
  },
  {
    icon: Network,
    title: "Knowledge",
    subtitle: "Structure",
  },
  {
    icon: Lightbulb,
    title: "Insights",
    subtitle: "Act",
  },
];

function IntelligencePipeline() {
  return (
    <section className="pipeline-section mt-8 overflow-hidden rounded-3xl border border-[#E7E9F0] bg-[#FEFEFE] p-8 shadow-[0_15px_50px_rgba(5,23,71,0.07)]">
      {/* Header */}
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#081F62]">
          Intelligence Architecture
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#051747]">
          From Public Data to Actionable Intelligence
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#535F80]">
          Watch information move through the intelligence pipeline as
          unstructured public data becomes structured knowledge.
        </p>
      </div>

      {/* 3D Scene */}
      <div className="pipeline-scene relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-3xl bg-[#051747]">
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#081F62]/40 blur-[110px]" />

        {/* 3D Grid */}
        <div className="pipeline-grid pointer-events-none absolute inset-0" />

        {/* Pipeline Nodes */}
        <div className="pipeline-3d relative z-10 flex w-full max-w-6xl items-center justify-center px-8">
          {nodes.map((node, index) => {
            const Icon = node.icon;

            return (
              <div
                key={node.title}
                className="pipeline-node-wrapper flex flex-1 items-center"
              >
                {/* Node */}
                <div className="pipeline-node group relative w-full">
                  {/* 3D Card */}
                  <div className="pipeline-card relative mx-auto flex h-36 w-36 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/[0.08] backdrop-blur-xl">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-[#081F62]/40 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100" />

                    {/* Icon */}
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-[#FEFEFE] text-[#081F62] shadow-xl">
                      <Icon size={26} strokeWidth={1.7} />
                    </div>

                    {/* Title */}
                    <h3 className="relative mt-3 text-sm font-semibold text-white">
                      {node.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="relative mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#E7E9F0]/50">
                      {node.subtitle}
                    </p>

                    {/* Number */}
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#081F62] text-[9px] font-bold text-white shadow-lg">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Floating Indicator */}
                  <div className="absolute -bottom-8 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#E7E9F0] shadow-[0_0_15px_rgba(231,233,240,0.8)]" />
                </div>

                {/* Data Connection */}
                {index < nodes.length - 1 && (
                  <div className="pipeline-connection relative h-[2px] w-12 flex-shrink-0 bg-white/10">
                    {/* Moving Data Particle */}
                    <div className="data-particle absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Status */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            <span className="text-xs font-medium text-white/70">
              Intelligence Pipeline Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntelligencePipeline;
