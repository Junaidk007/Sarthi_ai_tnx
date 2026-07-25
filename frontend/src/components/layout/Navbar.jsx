
import { Bell, Search, Sparkles } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#E7E9F0] bg-[#FEFEFE]/95 px-8 backdrop-blur-xl">
      {/* Search */}
      <div className="flex w-full max-w-lg items-center gap-3 rounded-xl border border-[#E7E9F0] bg-[#FEFEFE] px-4 py-2.5 transition focus-within:border-[#081F62] focus-within:ring-2 focus-within:ring-[#081F62]/10">
        <Search size={18} className="text-[#535F80]" />

        <input
          type="text"
          placeholder="Search knowledge, sources, insights..."
          className="w-full bg-transparent text-sm text-[#051747] outline-none placeholder:text-[#535F80]/60"
        />
      </div>

      {/* Right Section */}
      <div className="ml-6 flex items-center gap-5">
        <div className="hidden items-center gap-2 rounded-full bg-[#E7E9F0] px-3 py-1.5 md:flex">
          <Sparkles size={14} className="text-[#081F62]" />

          <span className="text-xs font-semibold text-[#051747]">
            AI Active
          </span>
        </div>

        <button className="relative text-[#535F80] transition hover:text-[#081F62]">
          <Bell size={20} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#081F62]" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#081F62] text-sm font-bold text-white">
            AI
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#051747]">
              Intelligence Hub
            </p>

            <p className="text-xs text-[#535F80]">
              AI Workspace
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
