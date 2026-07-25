
import { ArrowUpRight } from "lucide-react";

function StatsCard({ title, value, description }) {
  return (
    <div className="card-hover card-shadow rounded-2xl border border-[#E7E9F0] bg-[#FEFEFE] p-6">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-[#535F80]">
          {title}
        </p>

        <div className="rounded-lg bg-[#E7E9F0] p-2 text-[#081F62]">
          <ArrowUpRight size={16} />
        </div>
      </div>

      <h3 className="mt-4 text-3xl font-bold tracking-tight text-[#051747]">
        {value}
      </h3>

      <p className="mt-2 text-xs font-medium text-[#081F62]">
        {description}
      </p>
    </div>
  );
}

export default StatsCard;
