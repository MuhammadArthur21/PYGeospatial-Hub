# PyGeospatial Hub - Comments API
# Community commenting system (Section 4.6)

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()

# In-memory comment store
COMMENTS = []
_next_id = 1


class CommentCreate(BaseModel):
    target_type: str  # 'script' | 'tool' | 'library'
    target_id: int
    content: str
    author: str = "anonymous"


class CommentResponse(BaseModel):
    id: int
    target_type: str
    target_id: int
    content: str
    author: str
    created_at: str
    upvotes: int = 0


@router.post("", response_model=CommentResponse, status_code=201)
async def create_comment(comment: CommentCreate):
    """Add a comment to a script, tool, or library"""
    global _next_id
    c = {
        "id": _next_id,
        "target_type": comment.target_type,
        "target_id": comment.target_id,
        "content": comment.content,
        "author": comment.author,
        "created_at": datetime.utcnow().isoformat(),
        "upvotes": 0,
    }
    _next_id += 1
    COMMENTS.append(c)
    return c


@router.get("", response_model=List[CommentResponse])
async def list_comments(
    target_type: str = Query(...),
    target_id: int = Query(...),
):
    """Get comments for a specific target"""
    return [
        c for c in COMMENTS
        if c["target_type"] == target_type and c["target_id"] == target_id
    ]


@router.delete("/{comment_id}", status_code=204)
async def delete_comment(comment_id: int):
    """Delete a comment"""
    global COMMENTS
    COMMENTS = [c for c in COMMENTS if c["id"] != comment_id]
    return None
