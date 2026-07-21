"""
GeoAlchemy2 — SQLAlchemy GIS extension for spatial databases.

Provides spatial database connectivity and ORM support for
PostGIS, Spatialite, and other spatial database backends.
"""

from typing import Optional, Dict, List


def create_spatial_model(
    table_name: str,
    columns: Dict[str, str],
    geometry_column: str = "geom",
    srid: int = 4326,
) -> Dict:
    """
    Create a SQLAlchemy spatial model configuration.

    Args:
        table_name: Database table name
        columns: Column definitions {name: type}
        geometry_column: Name of geometry column
        srid: Spatial reference ID

    Returns:
        Dict with model configuration
    """
    return {
        "type": "spatial_model",
        "table": table_name,
        "columns": columns,
        "geometry_column": geometry_column,
        "srid": srid,
        "geometry_type": "GEOMETRY",
    }


def get_spatial_query_types() -> List[Dict]:
    """List available spatial query types"""
    return [
        {"name": "ST_Within", "description": "Find geometries within another"},
        {"name": "ST_Intersects", "description": "Find intersecting geometries"},
        {"name": "ST_Contains", "description": "Find geometries that contain another"},
        {"name": "ST_DWithin", "description": "Find geometries within a distance"},
        {"name": "ST_Distance", "description": "Calculate distance between geometries"},
        {"name": "ST_Area", "description": "Calculate geometry area"},
        {"name": "ST_Length", "description": "Calculate geometry length"},
    ]


def postgis_version_info() -> Dict:
    """Get PostGIS version info"""
    return {
        "extension": "PostGIS",
        "functionality": "Spatial database operations via SQLAlchemy",
        "supported_operations": [
            "Spatial queries (within, intersects, contains)",
            "Geometry transformations",
            "Coordinate reprojection (ST_Transform)",
            "Spatial indexing (GIST)",
            "Raster support",
        ],
    }
