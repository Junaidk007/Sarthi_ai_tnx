# Sarthi AI — Multi-Agent Knowledge Intelligence Platform

**Sarthi AI** is an enterprise-grade multi-agent research and intelligence platform. It accepts natural-language user queries, routes them through a coordinated pipeline of specialized AI agents (Planner → Web Search → RAG Retrieval → Analysis → Recommendation → Report Generator), and produces structured research reports.

---

## ✨ Core Architecture

Sarthi AI follows a modular 3-tier architecture with a decoupled Python AI Agent microservice:

```
┌─────────────────┐        REST API         ┌─────────────────┐        HTTP API         ┌─────────────────────────┐
│                 │ ─────────────────────>  │                 │ ─────────────────────>  │                         │
│  React Frontend │                         │  Express API    │                         │  Python Agent Server    │
│  (TanStack/Vite)│ <─────────────────────  │  (Node.js/Mongo)│ <─────────────────────  │  (FastAPI / Uvicorn)    │
└─────────────────┘                         └─────────────────┘                         └─────────────────────────┘
                                                     │                                               │
                                                     ▼                                               ▼
                                              MongoDB Atlas                                   [ Groq LLM API ]
                                              (Reports & Users)                               [ Tavily Search]
                                                                                              [ FAISS Vector ]
```

---

## 📁 Project Structure

The project is structured into three clean top-level directories:

```
sarthiAI/
├── agents/                   # Python-based Multi-Agent AI Engine
│   ├── agent_server.py       # FastAPI microservice server (port 8000)
│   ├── run_pipeline.py       # Standalone pipeline runner
│   ├── main.py               # Interactive CLI interface
│   ├── planner_agent.py      # Decomposes queries into search topics
│   ├── web_search_agent.py   # Live web retrieval via Tavily
│   ├── retrieval_agent.py    # Vector search & knowledge indexing
│   ├── analysis_agent.py     # Multi-document synthesis & analysis
│   ├── recommendation_agent.py# Strategic recommendations
│   ├── report_agent.py       # Structured report generator
│   ├── scraper_agent.py      # HTML scraping tool
│   ├── tools/                # Shared AI utilities (LLM, search, embeddings, vector store)
│   ├── tests/                # Test suite scripts
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile            # Agents container definition
│   └── .gitignore            # Agents ignore rules
├── backend/                  # Node.js / Express REST API Gateway
│   ├── src/
│   │   ├── config/           # MongoDB database connection
│   │   ├── controllers/      # Workflow & Auth controllers
│   │   ├── middlewares/      # JWT auth & global error handling
│   │   ├── models/           # Mongoose User & Report schemas
│   │   ├── routes/           # REST endpoints (/auth, /workflow)
│   │   └── utils/            # ApiError, ApiResponse & Async wrappers
│   ├── package.json          # Node.js dependencies
│   └── .env.example          # Backend environment template
├── frontend/                 # React 19 Client UI
│   ├── src/
│   │   ├── components/       # Site header, footer, auth modal & UI primitives
│   │   ├── lib/              # API client, Auth context, utilities
│   │   ├── routes/           # File-based routes (home, search, reports, workflow)
│   │   └── styles.css        # Tailwind CSS 4 styles
│   └── package.json          # Frontend dependencies
└── README.md
```

---

## 🛠️ Prerequisites

- **Node.js** — v18 or higher
- **Python** — 3.10 or higher
- **MongoDB** — Local instance or MongoDB Atlas URI
- **Groq API Key** — Required for LLM inference ([Get Key](https://console.groq.com/))
- **Tavily API Key** — Required for web search ([Get Key](https://tavily.com/))

---

## 🚀 Quick Start & Development

### 1. Environment Setup

Configure environment variables:

- **Backend (`backend/.env`)**:
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  AGENT_MICROSERVICE_URL=http://127.0.0.1:8000/api/agents/run
  ```

- **Agents (`agents/.env`)**:
  ```env
  GROQ_API_KEY=your_groq_api_key
  TAVILY_API_KEY=your_tavily_api_key
  AGENT_PORT=8000
  ```

### 2. Start Services

Open 3 terminal windows:

**Terminal 1 — Python Agent Microservice**:
```bash
cd agents
pip install -r requirements.txt
python agent_server.py
```
*(Runs on `http://localhost:8000`)*

**Terminal 2 — Node.js Backend API**:
```bash
cd backend
npm install
npm run dev
```
*(Runs on `http://localhost:5000`)*

**Terminal 3 — React Frontend**:
```bash
cd frontend
npm install
npm run dev
```
*(Runs on `http://localhost:5173`)*

---

## 🐳 Docker Deployment (Agents Microservice)

To build and run the Python Agent microservice in a Docker container:

```bash
# Build Docker image
docker build -t sarthi-agents ./agents

# Run container with environment file
docker run -d -p 8000:8000 --env-file ./agents/.env --name sarthi-agents sarthi-agents
```

---

## 📋 Key API Endpoints

### Express Backend API (`http://localhost:5000/api/v1`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Authenticate user & get JWT token |
| `GET` | `/auth/me` | Fetch logged-in user profile |
| `POST` | `/workflow/run` | Execute multi-agent research workflow |
| `GET` | `/workflow/reports` | Get user search history & reports |
| `GET` | `/workflow/reports/:id` | Get detailed report by ID |
| `DELETE`| `/workflow/reports/:id` | Delete saved report |

### Python Agent Microservice (`http://localhost:8000`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check endpoint |
| `POST` | `/api/agents/run` | Execute 6-stage multi-agent pipeline |

---

## 🤖 Multi-Agent Execution Pipeline

1. **Planner Agent**: Analyzes user prompt and generates target search queries.
2. **Web Search Agent**: Queries Tavily API for real-time web content.
3. **Retrieval Agent**: Generates embeddings using `sentence-transformers` and performs vector search with FAISS.
4. **Analysis Agent**: Synthesizes retrieved documents into structured findings.
5. **Recommendation Agent**: Formulates actionable recommendations.
6. **Report Agent**: Compiles the final response into a structured executive report with verified sources.