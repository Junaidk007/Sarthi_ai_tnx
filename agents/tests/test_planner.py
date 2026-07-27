import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from planner_agent import PlannerAgent

planner = PlannerAgent()

query = input("Enter your query: ")

result = planner.run(query)

print(result)