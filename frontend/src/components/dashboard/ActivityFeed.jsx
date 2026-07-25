
import { CheckCircle2 } from "lucide-react";

function ActivityFeed() {
  const activities = [
    "New public web data indexed",
    "RAG knowledge base updated",
    "AI models completed analysis",
    "New actionable insight generated",
  ];

  return (
    <div className="card-hover card-shadow rounded-2xl border border-[#E7E9F0] bg-[#FEFEFE] p-6">
      <h2 className="text-xl font-semibold text-[#051747]">
        Recent Activity
      </h2>

      <p className="mt-1 text-sm text-[#535F80]">
        Latest actions performed by the intelligence system
      </p>

      <div className="mt-6 space-y-5">
        {activities.map((activity) => (
          <div key={activity} className="flex items-center gap-4">
            <div className="rounded-full bg-[#E7E9F0] p-2 text-[#081F62]">
              <CheckCircle2 size={16} />
            </div>

            <div>
              <p className="text-sm font-medium text-[#535F80]">
                {activity}
              </p>

              <p className="mt-1 text-xs text-[#535F80]/60">
                Recently completed
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;


