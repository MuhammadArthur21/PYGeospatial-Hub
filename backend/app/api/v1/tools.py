# PyGeospatial Hub - Tools API
# Real data from pre-built tools

from fastapi import APIRouter, HTTPException, Query
from typing import Optional

router = APIRouter()

TOOLS = [
    {"id": "buffer", "name": "Buffer Geometry", "category": "Vector", "description": "Create buffer zones around geometries", "uses": ["Spatial analysis", "Proximity analysis"]},
    {"id": "clip", "name": "Clip Raster", "category": "Raster", "description": "Clip raster dataset to polygon boundary", "uses": ["Extract ROI", "Crop imagery"]},
    {"id": "geocode", "name": "Geocode Address", "category": "Geocoding", "description": "Convert addresses to coordinates", "uses": ["Address lookup", "Coordinate conversion"]},
    {"id": "distance", "name": "Calculate Distance", "category": "Analysis", "description": "Calculate geographic distances", "uses": ["Route planning", "Measurement"]},
    {"id": "merge", "name": "Merge Shapefiles", "category": "Vector", "description": "Combine multiple files into one", "uses": ["Data integration", "Batch processing"]},
    {"id": "rasterize", "name": "Rasterize Vector", "category": "Raster", "description": "Convert vector to raster format", "uses": ["Create masks", "Raster conversion"]},
    {"id": "osm", "name": "Extract OSM Data", "category": "Data", "description": "Download OpenStreetMap data", "uses": ["Get map data", "Feature extraction"]},
    {"id": "join", "name": "Spatial Join", "category": "Analysis", "description": "Join attributes spatially", "uses": ["Attribute enrichment", "Spatial queries"]},
    {"id": "tiles", "name": "Generate Tiles", "category": "Raster", "description": "Generate map tiles from raster", "uses": ["Web maps", "Tile serving"]},
    {"id": "network", "name": "Analyze Network", "category": "Analysis", "description": "Analyze road networks", "uses": ["Network analysis", "Shortest path"]},
]


@router.get("")
async def list_tools(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
):
    """List all available tools"""
    result = TOOLS
    if category:
        result = [t for t in result if t["category"].lower() == category.lower()]
    if search:
        s = search.lower()
        result = [t for t in result if s in t["name"].lower() or s in t["description"].lower()]
    return result


@router.get("/{tool_id}")
async def get_tool(tool_id: str):
    """Get a specific tool"""
    for tool in TOOLS:
        if tool["id"] == tool_id:
            return tool
    raise HTTPException(status_code=404, detail="Tool not found")
