import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from planner_agent import PlannerAgent
from web_search_agent import WebSearchAgent
from retrieval_agent import RetrievalAgent
from analysis_agent import AnalysisAgent
from recommendation_agent import RecommendationAgent
from report_agent import ReportAgent

app = FastAPI(
    title="Sarthi AI Multi-Agent Engine Service",
    description="Microservice running Planner, Search, RAG Retrieval, Analysis, Recommendation, and Report agents.",
    version="1.0.0"
)

# Enable CORS for local backend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

@app.get("/")
def health_check():
    return {"status": "ok", "service": "Sarthi AI Agent Microservice"}

@app.post("/api/agents/run")
def run_agent_pipeline(request: QueryRequest):
    user_query = request.query.strip()
    if not user_query:
        raise HTTPException(status_code=400, detail="Query string cannot be empty")

    try:
        print(f"\n[Agent Microservice] Processing query: '{user_query}'")

        # 1. Planner Agent
        planner = PlannerAgent()
        plan = planner.run(user_query)

        # 2. Web Search Agent
        search_agent = WebSearchAgent()
        search_results = search_agent.run(plan)

        # 3. Retrieval Agent (FAISS + Embeddings)
        documents = []
        if search_results:
            retrieval_agent = RetrievalAgent()
            retrieval_agent.build_knowledge(search_results)
            documents = retrieval_agent.retrieve(user_query)
        else:
            # Fallback document if search returns empty
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

    except Exception as e:
        print(f"[Agent Microservice Error]: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Agent execution failed: {str(e)}")

if __name__ == "__main__":
    port = int(os.getenv("AGENT_PORT", 8000))
    uvicorn.run("agent_server:app", host="0.0.0.0", port=port, reload=True)
