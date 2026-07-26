#!/bin/sh
set -e

PORT=5000 node backend/src/server.js &
PORT=5000 python -m uvicorn agent_server:app --host 0.0.0.0 --port 8000 &

wait
