"""
OSMnx — Download and analyze OpenStreetMap street networks.

OSMnx provides capabilities for downloading, modeling, and analyzing
street networks and spatial data from OpenStreetMap.
"""

from typing import Optional, Dict, List


def download_network(
    location: str,
    network_type: str = "drive",
    distance: float = 1000,
) -> Dict:
    """
    Download a street network for a location.

    Args:
        location: Address or place name
        network_type: 'drive', 'walk', 'bike', 'all'
        distance: Radius in meters

    Returns:
        Dict with network statistics
    """
    try:
        import osmnx as ox

        G = ox.graph_from_address(
            location,
            dist=distance,
            network_type=network_type,
        )

        stats = ox.basic_stats(G)

        return {
            "status": "success",
            "location": location,
            "network_type": network_type,
            "nodes": stats.get("n"),
            "edges": stats.get("m"),
            "avg_street_length_m": round(stats.get("avg_street_length", 0), 2),
            "intersection_count": stats.get("intersection_count", 0),
        }

    except ImportError:
        return {"status": "error", "message": "OSMnx not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_poi(
    location: str,
    tags: Optional[Dict[str, bool]] = None,
) -> Dict:
    """
    Get points of interest from OSM.

    Args:
        location: Address or place name
        tags: OSM tag filters (e.g., {"amenity": True, "building": True})

    Returns:
        Dict with POI statistics
    """
    if tags is None:
        tags = {"amenity": True}

    try:
        import osmnx as ox

        features = ox.features_from_address(location, tags=tags)

        counts = {}
        for feature in features.to_dict("records"):
            for key in tags:
                if key in feature:
                    val = feature[key]
                    if isinstance(val, str):
                        counts[val] = counts.get(val, 0) + 1

        return {
            "status": "success",
            "location": location,
            "total_features": len(features),
            "category_counts": dict(sorted(counts.items(), key=lambda x: -x[1])[:15]),
        }

    except ImportError:
        return {"status": "error", "message": "OSMnx not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
