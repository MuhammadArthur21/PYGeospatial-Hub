# PyGeospatial Hub - Comments API

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()

class CommentCreate(BaseModel):
    target_type: str  # 'script' or 'tool'
    target_id: str
    content: str
    author: Optional[str] = "Anonymous Geodev"

class CommentResponse(BaseModel):
    id: int
    target_type: str
    target_id: str
    content: str
    author: str
    created_at: str

# In-memory comments repository
COMMENTS_DB = [
    {
        "id": 1,
        "target_type": "script",
        "target_id": "geopandas-buffer",
        "content": "Sangat membantu! Buffer 0.01 derajat (~1.1km) bekerja sempurna untuk analisis DKI Jakarta.",
        "author": "Budi Santoso",
        "created_at": "2026-07-20 14:30"
    },
    {
        "id": 2,
        "target_type": "script",
        "target_id": "geopandas-buffer",
        "content": "Bisa tambahkan contoh kalkulasi CRS Web Mercator meter juga?",
        "author": "Siti Rahma",
        "created_at": "2026-07-21 09:15"
    }
]

@router.get("/{target_id}", response_model=List[CommentResponse])
async def get_comments(target_id: str):
    """Retrieve all comments for a specific script or tool"""
    return [c for c in COMMENTS_DB if c["target_id"] == target_id]

@router.post("/", response_model=CommentResponse)
async def create_comment(comment: CommentCreate):
    """Post a new comment"""
    if not comment.content.strip():
        raise HTTPException(status_code=400, detail="Comment content cannot be empty")
        
    new_comment = {
        "id": len(COMMENTS_DB) + 1,
        "target_type": comment.target_type,
        "target_id": comment.target_id,
        "content": comment.content.strip(),
        "author": comment.author or "Anonymous Geodev",
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M")
    }
    COMMENTS_DB.append(new_comment)
    return new_comment
