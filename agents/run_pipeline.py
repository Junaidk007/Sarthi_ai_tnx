import sys
import subprocess
import os
import json

# Ensure required Python packages are installed dynamically if missing on host (Render)
required_packages = {
    "groq": "groq",
    "tavily": "tavily-python",
    "sentence_transformers": "sentence-transformers",
    "faiss": "faiss-cpu",
    "bs4": "beautifulsoup4",
    "requests": "requests",
    "dotenv": "python-dotenv",
    "fastapi": "fastapi",
    "uvicorn": "uvicorn",
    "pydantic": "pydantic"
}

for module_name, package_name in required_packages.items():
    try:
        __import__(module_name)
    except ImportError:
        sys.stderr.write(f"[Python Pipeline] Module '{module_name}' missing. Auto-installing '{package_name}'...\n")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package_name])
        except Exception as e:
            sys.stderr.write(f"[Python Pipeline Warning] Failed to auto-install {package_name}: {e}\n")

# Ensure current script directory is in sys.path for relative imports
script_dir = os.path.dirname(os.path.abspath(__file__))
if script_dir not in sys.path:
    sys.path.insert(0, script_dir)

from planner_agent import PlannerAgent
from web_search_agent import WebSearchAgent
from retrieval_agent import RetrievalAgent
from analysis_agent import AnalysisAgent
from recommendation_agent import RecommendationAgent
from report_agent import ReportAgent

def run_pipeline(user_query: str):
    user_query = user_query.strip()
    if not user_query:
        return {"success": False, "error": "Query string cannot be empty"}

    # 1. Planner Agent
    planner = PlannerAgent()
    plan = planner.run(user_query)

    # 2. Web Search Agent
    search_agent = WebSearchAgent()
    search_results = search_agent.run(plan)

    # 3. Retrieval Agent (FAISS + Embeddings)
    documents = []
    if search_results:
        try:
            retrieval_agent = RetrievalAgent()
            retrieval_agent.build_knowledge(search_results)
            documents = retrieval_agent.retrieve(user_query)
        except Exception as e:
            sys.stderr.write(f"[Retrieval Agent Warning]: {e}\n")
            documents = search_results
    else:
        documents = [{
            "title": "General Knowledge Base",
            "url": "https://sarthi-ai.local",
            "content": f"Information regarding: {user_query}"
        }]

    # 4. Analysis Agent
    analysis_agent = AnalysisAgent()
    analysis = analysis_agent.run(user_query, documents)

    # 5. Recommendation Agent
    recommendation_agent = RecommendationAgent()
    recommendations = recommendation_agent.run(user_query, analysis)

    # 6. Report Agent
    sources = [doc.get("title", "Web Source") for doc in documents]
    report_agent = ReportAgent()
    final_report = report_agent.run(user_query, analysis, recommendations, sources)

    return {
        "success": True,
        "query": user_query,
        "taskType": plan.get("task_type", "research") if isinstance(plan, dict) else "research",
        "plan": plan,
        "analysis": analysis,
        "recommendations": recommendations,
        "report": final_report,
        "sources": search_results
    }

if __name__ == "__main__":
    input_text = ""
    if len(sys.argv) > 1:
        input_text = sys.argv[1]
    else:
        input_text = sys.stdin.read()
    
    query = input_text
    try:
        data = json.loads(input_text)
        if isinstance(data, dict) and "query" in data:
            query = data["query"]
    except Exception:
        pass

    result = run_pipeline(query)
    print(json.dumps(result))
