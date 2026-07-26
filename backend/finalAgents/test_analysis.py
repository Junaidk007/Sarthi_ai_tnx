from agents.retrieval_agent import RetrievalAgent
from agents.analysis_agent import AnalysisAgent


documents = [

{
"title":"Tesla India",
"content":
"Tesla entered India with Model Y launch and opened showrooms."
},

{
"title":"BYD India",
"content":
"BYD is expanding electric vehicles in India with competitive pricing."
},

{
"title":"EV Market",
"content":
"India electric vehicle market is growing rapidly."
}

]


query = "Compare Tesla and BYD in India"


retrieval = RetrievalAgent()

retrieval.build_knowledge(
    documents
)


results = retrieval.retrieve(
    query
)


analysis = AnalysisAgent()


response = analysis.run(
    query,
    results
)


print("\n===== ANALYSIS =====\n")

print(response)