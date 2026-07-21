"""
S2Sphere — S2 geometry library for spherical computations.

Provides S2 cell covering, indexing, and geometry operations
on the sphere (Earth).
"""

from typing import Optional, Dict, List


def get_cell_id(lat: float, lon: float, level: int = 15) -> str:
    """
    Get the S2 cell ID for a point at a given level.

    Args:
        lat: Latitude in degrees
        lon: Longitude in degrees
        level: S2 cell level (0-30)

    Returns:
        S2 cell ID as hex string
    """
    try:
        import s2sphere

        cell_id = s2sphere.CellId.from_lat_lng(
            s2sphere.LatLng.from_degrees(lat, lon)
        ).parent(level)

        return {
            "status": "success",
            "cell_id": str(cell_id),
            "token": cell_id.to_token(),
            "level": level,
            "lat": lat,
            "lon": lon,
        }

    except ImportError:
        return {"status": "error", "message": "S2Sphere not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def cover_region(
    min_lat: float,
    min_lon: float,
    max_lat: float,
    max_lon: float,
    min_level: int = 10,
    max_level: int = 15,
) -> Dict:
    """
    Cover a bounding box with S2 cells.

    Args:
        min_lat: Minimum latitude
        min_lon: Minimum longitude
        max_lat: Maximum latitude
        max_lon: Maximum longitude
        min_level: Minimum cell level
        max_level: Maximum cell level

    Returns:
        Dict with cell covering
    """
    try:
        import s2sphere

        region = s2sphere.LatLngRect(
            s2sphere.LatLng.from_degrees(min_lat, min_lon),
            s2sphere.LatLng.from_degrees(max_lat, max_lon),
        )
        coverer = s2sphere.RegionCoverer()
        coverer.min_level = min_level
        coverer.max_level = max_level
        covering = coverer.get_covering(region)

        return {
            "status": "success",
            "num_cells": len(covering),
            "min_level": min_level,
            "max_level": max_level,
            "sample_cells": [str(c) for c in covering[:10]],
        }

    except ImportError:
        return {"status": "error", "message": "S2Sphere not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
