# PyGeospatial Hub - API Router Registration

from fastapi import APIRouter
from app.api.auth import router as auth_router
from app.api.v1.libraries import router as libraries_router
from app.api.v1.categories import router as categories_router
from app.api.v1.tools import router as tools_router
from app.api.v1.sandbox import router as sandbox_router
from app.api.v1.uploads import router as uploads_router
from app.api.v1.visualizations import router as visualizations_router

api_router = APIRouter()

# Auth routes
api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])

# V1 routes
api_router.include_router(libraries_router, prefix="/libraries", tags=["Libraries"])
api_router.include_router(categories_router, prefix="/categories", tags=["Categories"])
api_router.include_router(tools_router, prefix="/tools", tags=["Tools"])
api_router.include_router(sandbox_router, prefix="/sandbox", tags=["Sandbox"])
api_router.include_router(uploads_router, prefix="/uploads", tags=["Uploads"])
api_router.include_router(visualizations_router, prefix="/visualizations", tags=["Visualizations"])
