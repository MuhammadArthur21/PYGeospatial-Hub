# PyGeospatial Hub - Libraries API
# CRUD operations with real data from registry

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.services.library_service import LibraryService

router = APIRouter()


@router.get("")
async def list_libraries(
    category: Optional[str] = Query(None, description="Filter by category ID"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty level"),
    search: Optional[str] = Query(None, description="Search by name or description"),
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=100),
):
    """List all libraries with filters"""
    libraries = LibraryService.search_libraries(
        query=search or "",
        category=category or "",
        difficulty=difficulty or "",
    )

    # Paginate
    start = (page - 1) * limit
    end = start + limit

    return {
        "total": len(libraries),
        "page": page,
        "limit": limit,
        "data": libraries[start:end],
    }


@router.get("/{library_id}")
async def get_library(library_id: str):
    """Get detailed information about a specific library"""
    lib = LibraryService.get_library(library_id)
    if not lib:
        raise HTTPException(status_code=404, detail="Library not found")
    return lib
