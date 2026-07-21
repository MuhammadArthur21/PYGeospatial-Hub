# PyGeospatial Hub - Library Service
# Business logic for library management

import json
import os
from typing import List, Optional

# Project root: go up 4 levels from this file (/backend/app/services/ -> /)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
DATA_DIR = os.path.join(PROJECT_ROOT, "data")
REGISTRY_PATH = os.path.join(DATA_DIR, "metadata", "libraries_registry.json")


class LibraryService:
    """Service for managing geospatial library registry"""

    @staticmethod
    def load_registry() -> dict:
        """Load the library registry from JSON file"""
        if os.path.exists(REGISTRY_PATH):
            with open(REGISTRY_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        return {"categories": []}

    @staticmethod
    def get_categories() -> List[dict]:
        """Get all library categories"""
        registry = LibraryService.load_registry()
        return registry.get("categories", [])

    @staticmethod
    def get_all_libraries() -> List[dict]:
        """Get all libraries across all categories"""
        libraries = []
        for category in LibraryService.get_categories():
            for lib in category.get("libraries", []):
                lib["category"] = category["name"]
                lib["category_id"] = category["id"]
                libraries.append(lib)
        return libraries

    @staticmethod
    def get_library(library_id: str) -> Optional[dict]:
        """Get a specific library by ID"""
        for lib in LibraryService.get_all_libraries():
            if lib["id"] == library_id:
                return lib
        return None

    @staticmethod
    def search_libraries(
        query: str = "",
        category: str = "",
        difficulty: str = "",
    ) -> List[dict]:
        """Search and filter libraries"""
        libraries = LibraryService.get_all_libraries()
        if query:
            query = query.lower()
            libraries = [
                lib for lib in libraries
                if query in lib["name"].lower()
                or query in lib["description"].lower()
                or query in " ".join(lib.get("tags", [])).lower()
            ]
        if category:
            libraries = [lib for lib in libraries if lib.get("category_id") == category]
        if difficulty:
            libraries = [lib for lib in libraries if lib.get("difficulty") == difficulty]
        return libraries
