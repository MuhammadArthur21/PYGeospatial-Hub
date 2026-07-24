# PyGeospatial Hub - Subscriptions API
# Monetization tier management (Section 18)

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

TIERS = {
    "free": {"name": "Free", "price": 0, "executions_per_day": 5, "storage_mb": 50, "features": ["Sandbox", "Library Index", "Basic Tools"]},
    "pro": {"name": "Pro", "price": 15, "executions_per_day": None, "storage_mb": 1024, "features": ["Unlimited executions", "100MB files", "Workflow builder", "Priority support"]},
    "team": {"name": "Team", "price": 45, "executions_per_day": None, "storage_mb": 10240, "features": ["Everything in Pro", "5 members", "Shared datasets", "Admin dashboard"]},
    "enterprise": {"name": "Enterprise", "price": None, "executions_per_day": None, "storage_mb": None, "features": ["Everything in Team", "On-premise", "SSO", "SLA"]},
}


@router.get("/tiers")
async def list_tiers():
    """List all subscription tiers"""
    return [
        {"id": tid, **info} for tid, info in TIERS.items()
    ]


@router.get("/tiers/{tier_id}")
async def get_tier(tier_id: str):
    """Get specific tier info"""
    if tier_id not in TIERS:
        raise HTTPException(status_code=404, detail="Tier not found")
    return {"id": tier_id, **TIERS[tier_id]}


# Current session usage tracking
_SESSION_USAGE = {"executions_today": 0, "storage_used_mb": 0}


@router.get("/usage")
async def get_usage():
    """Get current user's tier and usage info"""
    return {
        "tier": "free",
        "tier_name": "Free",
        "executions_per_day": TIERS["free"]["executions_per_day"],
        "remaining_runs": TIERS["free"]["executions_per_day"] - _SESSION_USAGE["executions_today"],
        "storage_mb": TIERS["free"]["storage_mb"],
        "storage_used_mb": _SESSION_USAGE["storage_used_mb"],
    }


@router.post("/usage/increment")
async def increment_usage():
    """Increment execution count (for testing)"""
    _SESSION_USAGE["executions_today"] += 1
    return {"executions_today": _SESSION_USAGE["executions_today"]}
