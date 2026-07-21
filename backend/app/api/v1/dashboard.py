# dashboard.py - Dashboard summary API

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class DashboardSummary(BaseModel):
    total_libraries: int = 37
    total_tools: int = 10
    total_executions: int = 0
    total_scripts: int = 0
    storage_used_mb: float = 0
    recent_activity: list = []


@router.get("/summary", response_model=DashboardSummary)
async def get_dashboard_summary(token: Optional[str] = Query(None)):
    """Get dashboard summary for the current user"""
    return DashboardSummary(
        total_libraries=37,
        total_tools=10,
        total_executions=0,
        total_scripts=0,
        storage_used_mb=0,
        recent_activity=[],
    )
