
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import StatsCard from "../components/dashboard/StatsCard";
import DataSourceCard from "../components/dashboard/DataSourceCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import IntelligencePipeline from "../components/dashboard/intelligencepipeline";
import CursorGlow from "../components/effects/cursorGlow";

function Dashboard() {
  return (
    <div className="app-background min-h-screen text-[#051747]">
      {/* Cursor Bubble */}
      <CursorGlow />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Navbar */}
        <Navbar />

        <main className="p-8">
          {/* Hero Section */}
          <section className="relative mb-10 overflow-hidden rounded-3xl bg-[#051747] p-8 shadow-xl">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#081F62] opacity-60 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#081F62] opacity-30 blur-3xl" />

            <div className="relative">
              {/* Status */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                <span className="text-xs font-semibold uppercase tracking-wider text-[#E7E9F0]">
                  AI Knowledge Intelligence
                </span>
              </div>

              {/* Heading */}
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                Transform Web Data Into{" "}
                <span className="text-[#E7E9F0]">
                  Actionable Intelligence
                </span>
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#E7E9F0]/70">
                Collect, organize, and analyze unstructured public
                information using RAG and AI to generate structured,
                contextual, and actionable insights.
              </p>

              {/* Hero Mini Stats */}
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs text-[#E7E9F0]/50">
                    Intelligence Status
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    Operational
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs text-[#E7E9F0]/50">
                    AI Models
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    6 Active
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs text-[#E7E9F0]/50">
                    Knowledge Processing
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    Real-time
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Data Sources"
              value="128"
              description="+12 this week"
            />

            <StatsCard
              title="Knowledge Items"
              value="2,486"
              description="Organized by AI"
            />

            <StatsCard
              title="AI Models"
              value="6"
              description="Active intelligence layer"
            />

            <StatsCard
              title="Insights Generated"
              value="864"
              description="+24 today"
            />
          </section>

          {/* 3D Intelligence Pipeline */}
          <IntelligencePipeline />

          {/* Data Sources + Recent Activity */}
          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <DataSourceCard />

            <ActivityFeed />
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
