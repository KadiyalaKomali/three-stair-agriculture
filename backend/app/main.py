from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from app.config import settings
from app.database import create_tables
from app.api import auth, fish, poultry, solar, inventory

# Create FastAPI application
app = FastAPI(
    title="EcoTriFarm API",
    description="Smart farm management system API for aquaculture, poultry, and solar monitoring",
    version="1.0.0",
)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (frontend) if they exist
static_dir = "static"
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Include API routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(fish.router, prefix="/fish", tags=["Fish Management"])
app.include_router(poultry.router, prefix="/poultry", tags=["Poultry Management"])
app.include_router(solar.router, prefix="/solar", tags=["Solar Monitoring"])
app.include_router(inventory.router, prefix="/inventory", tags=["Inventory"])

@app.on_event("startup")
async def startup_event():
    """Create database tables on startup."""
    create_tables()

@app.get("/")
async def root():
    """Serve frontend or API root endpoint."""
    if os.path.exists("static/index.html"):
        return FileResponse("static/index.html")
    return {
        "message": "EcoTriFarm Smart Farm Management API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "EcoTriFarm API"}

# Catch-all route for frontend routing (SPA)
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    """Serve frontend for all non-API routes."""
    if full_path.startswith("api/") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
        return {"error": "API endpoint not found"}
    
    if os.path.exists("static/index.html"):
        return FileResponse("static/index.html")
    
    return {"message": "Frontend not available"}