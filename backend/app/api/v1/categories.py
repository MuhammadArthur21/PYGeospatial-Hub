# PyGeospatial Hub - Categories API
# Returns real category data from registry

from fastapi import APIRouter, HTTPException
from app.services.library_service import LibraryService

router = APIRouter()


@router.get("")
async def list_categories():
    """List all library categories with library counts"""
    categories = LibraryService.get_categories()
    result = []
    for cat in categories:
        result.append({
            "id": cat["id"],
            "name": cat["name"],
            "icon": cat.get("icon", ""),
            "description": cat.get("description", ""),
            "library_count": len(cat.get("libraries", [])),
        })
    return result


@router.get("/{category_id}")
async def get_category(category_id: str):
    """Get a specific category with its libraries"""
    for cat in LibraryService.get_categories():
        if cat["id"] == category_id:
            return {
                "id": cat["id"],
                "name": cat["name"],
                "icon": cat.get("icon", ""),
                "description": cat.get("description", ""),
                "libraries": cat.get("libraries", []),
            }
    raise HTTPException(status_code=404, detail="Category not found")
