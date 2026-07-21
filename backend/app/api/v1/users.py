# users.py - User profile API

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class UserProfile(BaseModel):
    id: int
    username: str
    email: str
    joined_at: str = "2026-01-01T00:00:00"
    scripts_count: int = 0
    executions_count: int = 0
    datasets_count: int = 0


@router.get("/{user_id}/profile", response_model=UserProfile)
async def get_user_profile(user_id: int):
    """Get public profile for a user"""
    raise HTTPException(status_code=501, detail="Not implemented")
