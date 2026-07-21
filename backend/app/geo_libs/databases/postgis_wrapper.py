"""
PostGIS — PostgreSQL spatial database extension.

Provides geospatial query capabilities and spatial functions
for the PostgreSQL database system.
"""

from typing import Optional, Dict, List


def check_postgis_extension(db_url: str) -> Dict:
    """
    Check if PostGIS is installed and get version.

    Args:
        db_url: Database connection URL

    Returns:
        Dict with PostGIS info
    """
    try:
        from sqlalchemy import create_engine, text

        engine = create_engine(db_url)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT PostGIS_Version()"))
            version = result.scalar()

        return {
            "status": "success",
            "postgis_version": version,
            "available": True,
        }

    except ImportError:
        return {"status": "error", "message": "SQLAlchemy not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def list_spatial_functions() -> List[Dict]:
    """List common PostGIS spatial functions"""
    return [
        {"name": "ST_GeomFromText", "desc": "Create geometry from WKT"},
        {"name": "ST_AsGeoJSON", "desc": "Output geometry as GeoJSON"},
        {"name": "ST_Within", "desc": "Find geometries within another"},
        {"name": "ST_Intersects", "desc": "Check geometry intersection"},
        {"name": "ST_Distance", "desc": "Calculate geometry distance"},
        {"name": "ST_Buffer", "desc": "Create buffer around geometry"},
        {"name": "ST_Transform", "desc": "Reproject geometry"},
        {"name": "ST_Area", "desc": "Calculate geometry area"},
    ]
