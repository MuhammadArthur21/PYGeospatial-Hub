# PyGeospatial Hub - Team Workspace API
# Private workspaces and collaboration (Fase 4 Enterprise)

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()

WORKSPACES = {}
MEMBERS = {}


class WorkspaceCreate(BaseModel):
    name: str
    description: str = ""


class WorkspaceResponse(BaseModel):
    id: str
    name: str
    description: str
    member_count: int
    created_at: str


class MemberAdd(BaseModel):
    workspace_id: str
    username: str
    role: str = "member"


@router.post("/workspaces", response_model=WorkspaceResponse)
async def create_workspace(ws: WorkspaceCreate):
    """Create a private workspace"""
    ws_id = f"ws_{len(WORKSPACES) + 1}"
    WORKSPACES[ws_id] = {
        "id": ws_id,
        "name": ws.name,
        "description": ws.description,
        "created_at": datetime.utcnow().isoformat(),
    }
    MEMBERS[ws_id] = [{"username": "owner", "role": "admin"}]
    return {**WORKSPACES[ws_id], "member_count": 1}


@router.get("/workspaces")
async def list_workspaces():
    """List all accessible workspaces"""
    return [
        {**ws, "member_count": len(MEMBERS.get(ws_id, []))}
        for ws_id, ws in WORKSPACES.items()
    ]


@router.post("/workspaces/{ws_id}/members")
async def add_member(ws_id: str, member: MemberAdd):
    """Add a member to workspace"""
    if ws_id not in WORKSPACES:
        raise HTTPException(404, "Workspace not found")
    if ws_id not in MEMBERS:
        MEMBERS[ws_id] = []
    if any(m["username"] == member.username for m in MEMBERS[ws_id]):
        raise HTTPException(400, "Member already exists")
    MEMBERS[ws_id].append({"username": member.username, "role": member.role})
    return {"status": "added", "username": member.username}
