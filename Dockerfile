FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        curl \
        nodejs \
        npm \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requiements.txt ./requiements.txt
RUN pip install --upgrade pip && pip install -r requiements.txt

COPY backend/package.json ./backend/package.json
COPY backend/package-lock.json* ./backend/
RUN npm install --prefix backend

COPY . .

RUN chmod +x ./docker-entrypoint.sh

EXPOSE 8000 5000

CMD ["./docker-entrypoint.sh"]
