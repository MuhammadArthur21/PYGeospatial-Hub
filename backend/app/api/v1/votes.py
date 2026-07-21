# PyGeospatial Hub - Upvote/Bookmark API
# Community engagement system (Section 4.6)

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# In-memory stores
UPVOTES = {}  # { "script:42": set() }
BOOKMARKS = {}


class VoteRequest(BaseModel):
    target_type: str  # 'script' | 'tool' | 'comment'
    target_id: int
    user: str = "anonymous"


class BookmarkRequest(BaseModel):
    target_type: str
    target_id: int
    user: str = "anonymous"


@router.post("/upvote")
async def upvote(req: VoteRequest):
    """Upvote a script, tool, or comment"""
    key = f"{req.target_type}:{req.target_id}"
    if key not in UPVOTES:
        UPVOTES[key] = set()
    UPVOTES[key].add(req.user)
    return {"status": "upvoted", "total": len(UPVOTES[key])}


@router.post("/unvote")
async def unvote(req: VoteRequest):
    """Remove upvote"""
    key = f"{req.target_type}:{req.target_id}"
    if key in UPVOTES:
        UPVOTES[key].discard(req.user)
    return {"status": "unvoted"}


@router.get("/count")
async def get_votes(target_type: str, target_id: int):
    """Get upvote count"""
    key = f"{target_type}:{target_id}"
    count = len(UPVOTES.get(key, set()))
    return {"target_type": target_type, "target_id": target_id, "upvotes": count}


@router.post("/bookmark")
async def add_bookmark(req: BookmarkRequest):
    """Bookmark a script or tool"""
    key = f"{req.target_type}:{req.target_id}"
    if key not in BOOKMARKS:
        BOOKMARKS[key] = set()
    BOOKMARKS[key].add(req.user)
    return {"status": "bookmarked"}


@router.delete("/bookmark")
async def remove_bookmark(req: BookmarkRequest):
    """Remove bookmark"""
    key = f"{req.target_type}:{req.target_id}"
    if key in BOOKMARKS:
        BOOKMARKS[key].discard(req.user)
    return {"status": "removed"}


@router.get("/bookmarks")
async def list_bookmarks(user: str, target_type: Optional[str] = None):
    """Get user's bookmarks"""
    results = []
    for key, users in BOOKMARKS.items():
        if user in users:
            ttype, tid = key.split(":")
            if target_type and ttype != target_type:
                continue
            results.append({"target_type": ttype, "target_id": int(tid)})
    return results
