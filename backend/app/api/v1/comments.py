# PyGeospatial Hub - Comments API
# Supports both query params and path params

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()

class CommentCreate(BaseModel):
    target_type: str  # 'script' or 'tool'
    target_id: str  # Script/tool identifier
    content: str
    author: Optional[str] = "Anonymous"


COMMENTS_DB = []


@router.get("")
async def list_comments(
    target_type: str = Query(...),
    target_id: str = Query(...),
):
    """Get comments by target type and ID"""
    return [
        c for c in COMMENTS_DB
        if c["target_type"] == target_type and c["target_id"] == target_id
    ]


@router.get("/{target_id}")
async def get_comments_by_target(target_id: str, target_type: str = Query("script")):
    """Get comments by target (path param convenience)"""
    return [
        c for c in COMMENTS_DB
        if c["target_type"] == target_type and c["target_id"] == target_id
    ]


@router.post("")
async def create_comment(comment: CommentCreate):
    """Create a new comment"""
    if not comment.content.strip():
        raise HTTPException(status_code=400, detail="Comment content cannot be empty")

    new = {
        "id": len(COMMENTS_DB) + 1,
        "target_type": comment.target_type,
        "target_id": comment.target_id,
        "content": comment.content.strip(),
        "author": comment.author or "Anonymous",
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
    }
    COMMENTS_DB.append(new)
    return new


@router.delete("/{comment_id}", status_code=204)
async def delete_comment(comment_id: int):
    """Delete a comment"""
    global COMMENTS_DB
    COMMENTS_DB = [c for c in COMMENTS_DB if c["id"] != comment_id]
    return None
