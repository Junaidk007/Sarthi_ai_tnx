import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from planner_agent import PlannerAgent
from web_search_agent import WebSearchAgent


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