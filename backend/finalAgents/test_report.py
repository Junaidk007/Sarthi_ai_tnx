from agents.report_agent import ReportAgent


agent = ReportAgent()


query = "Compare Tesla and BYD in India"


analysis = """
Tesla focuses on premium EVs.
BYD focuses on competitive pricing.
Indian EV market is growing.
"""


recommendations = """
Tesla should explore affordable models.
BYD should improve brand trust.
Both should invest in charging infrastructure.
"""


sources = [
    "Business Insider",
    "CleanTechnica",
    "India Today"
]


result = agent.run(
    query,
    analysis,
    recommendations,
    sources
)


print("\n===== FINAL REPORT =====\n")

print(result)