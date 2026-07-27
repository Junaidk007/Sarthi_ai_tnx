from planner_agent import PlannerAgent
from web_search_agent import WebSearchAgent
from retrieval_agent import RetrievalAgent
from analysis_agent import AnalysisAgent
from recommendation_agent import RecommendationAgent
from report_agent import ReportAgent


def main():

    print("\n===== Sarthi AI =====\n")

    query = input("Enter your query: ")


    # 1. Planner Agent
    print("\n[1] Planning query...")
    planner = PlannerAgent()

    plan = planner.run(query)

    print(plan)



    # 2. Web Search Agent
    print("\n[2] Searching web sources...")

    search_agent = WebSearchAgent()

    search_results = search_agent.run(plan)


    if len(search_results) == 0:
        print("No search results found.")
        return


    print(f"Found {len(search_results)} sources")



    # 3. Retrieval Agent
    print("\n[3] Building knowledge base...")

    retrieval_agent = RetrievalAgent()


    retrieval_agent.build_knowledge(
        search_results
    )


    documents = retrieval_agent.retrieve(
        query
    )


    print(
        f"Retrieved {len(documents)} relevant documents"
    )



    # 4. Analysis Agent
    print("\n[4] Analysing information...")

    analysis_agent = AnalysisAgent()


    analysis = analysis_agent.run(
        query,
        documents
    )



    # 5. Recommendation Agent
    print("\n[5] Generating recommendations...")

    recommendation_agent = RecommendationAgent()


    recommendations = recommendation_agent.run(
        query,
        analysis
    )



    # 6. Report Agent
    print("\n[6] Creating final report...")

    report_agent = ReportAgent()


    sources = []

    for doc in documents:
        sources.append(
            doc["title"]
        )


    final_report = report_agent.run(
        query,
        analysis,
        recommendations,
        sources
    )


    print("\n\n========== FINAL REPORT ==========\n")

    print(final_report)



if __name__ == "__main__":
    main()