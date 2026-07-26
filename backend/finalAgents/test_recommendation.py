from agents.recommendation_agent import RecommendationAgent


query = "Compare Tesla and BYD in India"


analysis = """

Tesla entered India with premium EV strategy.
BYD is competing with affordable EV models.
Indian EV market is growing.

"""


agent = RecommendationAgent()


result = agent.run(
    query,
    analysis
)


print("\n===== RECOMMENDATIONS =====\n")

print(result)