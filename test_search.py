from agents.planner_agent import PlannerAgent
from agents.web_search_agent import WebSearchAgent


planner = PlannerAgent()
search_agent = WebSearchAgent()


query = input("Enter query: ")


plan = planner.run(query)

print("\nPlanner:")
print(plan)


results = search_agent.run(plan)


print("\nSearch Results:")
for r in results[:10]:
    print(r)