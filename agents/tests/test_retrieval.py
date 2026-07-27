import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from retrieval_agent import RetrievalAgent


documents = [

{
"title":"Tesla India",
"content":"Tesla entered India with Model Y launch and opened showrooms."
},

{
"title":"BYD India",
"content":"BYD is expanding electric vehicles in India with competitive pricing."
},

{
"title":"EV Market",
"content":"India electric vehicle market is growing rapidly."
}

]


agent = RetrievalAgent()


agent.build_knowledge(
    documents
)


results = agent.retrieve(
    "Tesla vs BYD India competition"
)


for r in results:

    print("\nTITLE:")
    print(r["title"])

    print("CONTENT:")
    print(r["content"])