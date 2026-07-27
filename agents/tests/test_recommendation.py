import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from recommendation_agent import RecommendationAgent


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