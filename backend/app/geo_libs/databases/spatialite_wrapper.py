"""
Spatialite — Lightweight spatial database engine.

Provides spatial SQL functionality as an extension to SQLite,
enabling geospatial operations without PostgreSQL.
"""

from typing import Optional, Dict, List


def create_spatial_db(database_path: str) -> Dict:
    """
    Initialize a Spatialite database.

    Args:
        database_path: Path to .sqlite file

    Returns:
        Dict with initialization info
    """
    try:
        from spatialite import connect
        conn = connect(database_path)
        conn.execute("SELECT InitSpatialMetadata(1)")
        conn.close()

        return {
            "status": "success",
            "database": database_path,
            "spatialite_version": "enabled",
        }

    except ImportError:
        return {"status": "error", "message": "Spatialite not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
