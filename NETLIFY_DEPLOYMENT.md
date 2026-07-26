# Netlify Deployment Guide for Sarthi AI

This project is fully configured for deployment on **Netlify**.

---

## 🚀 Quick Deployment Steps

### Option A: Automatic Git Integration (Recommended)

1. **Push your repository** to GitHub, GitLab, or Bitbucket.
2. Log in to your [Netlify Dashboard](https://app.netlify.com/).
3. Click **"Add new site"** → **"Import an existing project"**.
4. Select your Git provider and repository.
5. Netlify will automatically detect the configuration settings from [`netlify.toml`](file:///c:/Users/junaid/Desktop/sarthiAI/netlify.toml):
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist/client` (or `dist/client`)
   - **Functions directory:** `frontend/netlify/functions`
6. Under **Environment Variables**, set:
   - `VITE_API_URL`: The public URL of your deployed Express backend API (e.g. `https://your-backend.onrender.com/api/v1`)
7. Click **"Deploy site"**.

---

### Option B: Manual CLI Deployment

1. Install Netlify CLI globally (if not installed):
   ```bash
   npm install -g netlify-cli
   ```
2. Build the frontend locally:
   ```bash
   cd frontend
   npm run build
   ```
3. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```

---

## ⚙️ Project Architecture & Deployment Notes

- **Frontend (Netlify):** Built with TanStack Start, React, Vite, and TailwindCSS. Netlify serves static assets directly via CDN and handles server routes via Netlify Serverless Functions.
- **Backend API (Express & Node.js):** Located in [`backend/`](file:///c:/Users/junaid/Desktop/sarthiAI/backend). Host this on services like **Render**, **Railway**, **Fly.io**, or **Vercel**.
- **AI Agent Microservice (Python):** Located at root (`main.py`, `agent_server.py`). Host on **Render**, **Railway**, or as a Docker container using the root [`Dockerfile`](file:///c:/Users/junaid/Desktop/sarthiAI/Dockerfile).

---

## 🔗 Environment Variables Summary

| Scope | Variable | Purpose | Example |
|---|---|---|---|
| **Netlify (Frontend)** | `VITE_API_URL` | Base URL for Node.js Express backend | `https://sarthi-backend.onrender.com/api/v1` |
| **Backend Node.js** | `PORT` | Express server port | `5000` |
| **Backend Node.js** | `MONGODB_URI` | Connection string for MongoDB | `mongodb+srv://...` |
| **Backend Node.js** | `CORS_ORIGIN` | Allowed origin for Netlify app | `https://sarthi-ai.netlify.app` |
| **Python Agent** | `GROQ_API_KEY` | Groq LLM API Key | `gsk_...` |
| **Python Agent** | `TAVILY_API_KEY` | Tavily Web Search API Key | `tvly-...` |
