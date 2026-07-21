"""
Rtree — R-tree spatial indexing for Python.

Provides spatial indexing capabilities for efficient
nearest-neighbor and intersection queries.
"""

from typing import Optional, Dict, List, Tuple


def create_index(geometries: List[dict]) -> Dict:
    """
    Create a spatial index from a list of geometries.

    Args:
        geometries: List of GeoJSON geometry objects

    Returns:
        Dict with index info
    """
    try:
        from rtree import index
        from shapely.geometry import shape

        idx = index.Index()

        for i, geom_data in enumerate(geometries):
            geom = shape(geom_data)
            idx.insert(i, geom.bounds)

        return {
            "status": "success",
            "index_size": len(geometries),
            "type": "rtree",
        }

    except ImportError:
        return {"status": "error", "message": "Rtree not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def nearest_neighbor_search(
    index_data: Dict,
    query_point: Tuple[float, float],
    k: int = 5,
) -> Dict:
    """
    Find k-nearest neighbors using spatial index.

    Args:
        index_data: Result from create_index
        query_point: (x, y) query coordinates
        k: Number of neighbors to find

    Returns:
        Dict with nearest neighbors
    """
    import json

    try:
        from rtree import index
        from shapely.geometry import Point

        idx = index.Index()
        geometries = index_data.get("geometries", [])
        for i, geom_data in enumerate(geometries):
            from shapely.geometry import shape
            geom = shape(geom_data)
            idx.insert(i, geom.bounds)

        point = Point(query_point)
        nearest = list(idx.nearest(point.bounds, k))

        return {
            "status": "success",
            "query_point": query_point,
            "k": k,
            "nearest_indices": nearest,
            "results": len(nearest),
        }

    except ImportError:
        return {"status": "error", "message": "Rtree not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
