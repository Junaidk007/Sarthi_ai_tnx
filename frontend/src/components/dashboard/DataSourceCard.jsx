
import { Globe, FileText, Database } from "lucide-react";

function DataSourceCard() {
  const sources = [
    {
      icon: Globe,
      name: "Public Web Sources",
      count: "86",
    },
    {
      icon: FileText,
      name: "Documents",
      count: "542",
    },
    {
      icon: Database,
      name: "Knowledge Records",
      count: "1,858",
    },
  ];

  return (
    <div className="card-hover card-shadow rounded-2xl border border-[#E7E9F0] bg-[#FEFEFE] p-6">
      <h2 className="text-xl font-semibold text-[#051747]">
        Data Sources
      </h2>

      <p className="mt-1 text-sm text-[#535F80]">
        Information currently powering your AI system
      </p>

      <div className="mt-6 space-y-3">
        {sources.map((source) => {
          const Icon = source.icon;

          return (
            <div
              key={source.name}
              className="flex items-center justify-between rounded-xl border border-[#E7E9F0] bg-[#E7E9F0]/40 p-4 transition hover:border-[#081F62]/30"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#081F62]/10 p-2 text-[#081F62]">
                  <Icon size={18} />
                </div>

                <span className="text-sm font-medium text-[#535F80]">
                  {source.name}
                </span>
              </div>

              <span className="font-semibold text-[#051747]">
                {source.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DataSourceCard;


