from agents.planner_agent import PlannerAgent
from agents.web_search_agent import WebSearchAgent
from agents.scraper_agent import ScraperAgent


planner = PlannerAgent()
search_agent = WebSearchAgent()
scraper = ScraperAgent()


query = input("Enter query: ")

print("\n1. Creating plan...")
plan = planner.run(query)

print(plan)


print("\n2. Searching web...")
results = search_agent.run(plan)

print("Number of results:", len(results))

print(results[:2])


print("\n3. Scraping pages...")
documents = scraper.run(results)

print("Number of documents:", len(documents))


for doc in documents[:2]:

    print("\n====================")

    print("TITLE:")
    print(doc["title"])

    print("\nCONTENT:")
    print(doc["content"][:500])