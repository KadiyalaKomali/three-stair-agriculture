# Multi-stage build for production deployment
FROM node:18-alpine as frontend-build

WORKDIR /app/frontend

# Copy frontend package files
COPY package*.json ./
RUN npm ci --only=production

# Copy frontend source and build
COPY . .
RUN npm run build

# Backend stage
FROM python:3.11-slim as backend

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./static

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]