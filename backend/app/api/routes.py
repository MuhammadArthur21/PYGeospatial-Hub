# PyGeospatial Hub - API Router Registration

from fastapi import APIRouter
from app.api.auth import router as auth_router
from app.api.v1.libraries import router as libraries_router
from app.api.v1.categories import router as categories_router
from app.api.v1.tools import router as tools_router
from app.api.v1.sandbox import router as sandbox_router
from app.api.v1.uploads import router as uploads_router
from app.api.v1.visualizations import router as visualizations_router
from app.api.v1.scripts import router as scripts_router
from app.api.v1.dashboard import router as dashboard_router
from app.api.v1.users import router as users_router
from app.api.v1.comments import router as comments_router
from app.api.v1.votes import router as votes_router

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
api_router.include_router(scripts_router, prefix="/scripts", tags=["Scripts"])
api_router.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(users_router, prefix="/users", tags=["Users"])
api_router.include_router(comments_router, prefix="/comments", tags=["Community"])
api_router.include_router(votes_router, prefix="/votes", tags=["Community"])
