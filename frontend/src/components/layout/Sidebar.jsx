
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Database,
  Brain,
  Lightbulb,
  Search,
  Activity,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Knowledge Base",
    path: "/knowledge",
    icon: Database,
  },
  {
    name: "AI Models",
    path: "/models",
    icon: Brain,
  },
  {
    name: "Insights",
    path: "/insights",
    icon: Lightbulb,
  },
  {
    name: "Research",
    path: "/research",
    icon: Search,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-[#051747]">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F62]">
            <Brain size={21} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Intel<span className="text-[#E7E9F0]">AI</span>
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-wider text-[#E7E9F0]/60">
              Knowledge Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E7E9F0]/50">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#081F62] text-white shadow-lg shadow-black/20"
                    : "text-[#E7E9F0]/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="border-t border-white/10 p-4">
        <div className="rounded-2xl bg-white/5 p-4">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-[#E7E9F0]" />

            <p className="text-xs font-semibold text-white">
              AI SYSTEM STATUS
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            <span className="text-xs text-[#E7E9F0]/60">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

