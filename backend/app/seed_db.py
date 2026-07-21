# PyGeospatial Hub - Database Seeding Utility
# Usage: python -m app.seed_db

import os
import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("db_seeder")

SEED_CATEGORIES = [
    {"name": "Core Geospatial", "icon": "📍", "description": "Fundamental vector & geometry handling"},
    {"name": "Remote Sensing & Raster", "icon": "🛰️", "description": "Satellite imagery and grid processing"},
    {"name": "Web Mapping", "icon": "🗺️", "description": "Interactive web maps and Leaflet/Mapbox tools"},
    {"name": "Spatial Analysis", "icon": "📐", "description": "Network analysis and spatial statistics"},
    {"name": "Visualization", "icon": "📊", "description": "High-quality geospatial charts & cartography"},
    {"name": "Geocoding & Routing", "icon": "📍", "description": "Address translation and shortest path planning"},
]

SEED_TOOLS = [
    {
        "name": "Buffer Geometry",
        "category": "Vector Operations",
        "description": "Create buffer zones around points, lines, or polygons.",
        "code": "import geopandas as gpd\n\ndef run(gdf, distance=0.01):\n    return gdf.buffer(distance)"
    },
    {
        "name": "Clip Raster",
        "category": "Raster Processing",
        "description": "Clip satellite image by polygon boundary.",
        "code": "import rasterio\n\ndef run(raster_path, mask_geom):\n    print('Raster clipped')"
    }
]

def seed():
    logger.info("Starting database seeding process...")
    logger.info(f"Loaded {len(SEED_CATEGORIES)} categories to seed.")
    logger.info(f"Loaded {len(SEED_TOOLS)} sample tools to seed.")
    logger.info("Database seeding simulation completed successfully!")

if __name__ == "__main__":
    seed()
