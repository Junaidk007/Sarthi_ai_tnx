from agents.planner_agent import PlannerAgent

planner = PlannerAgent()

query = input("Enter your query: ")

result = planner.run(query)

print(result)