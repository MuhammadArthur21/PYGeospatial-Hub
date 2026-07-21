# PyGeospatial Hub - Categories API
# CRUD operations for library categories

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()


class CategoryResponse(BaseModel):
    id: int
    name: str
    icon: Optional[str] = None
    description: str
    library_count: int = 0


@router.get("", response_model=List[CategoryResponse])
async def list_categories():
    """List all library categories"""
    # TODO: Implement category retrieval
    return []


@router.get("/{category_id}", response_model=CategoryResponse)
async def get_category(category_id: int):
    """Get a specific category with its libraries"""
    # TODO: Implement category detail
    raise HTTPException(status_code=404, detail="Category not found")
