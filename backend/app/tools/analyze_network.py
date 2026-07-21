# analyze_network.py - Road network analysis

def analyze_network(location_name: str, distance_km: float = 1.0) -> dict:
    """
    Analyze road network around a location.
    Uses OSMnx to download and analyze OpenStreetMap data.
    """
    try:
        import osmnx as ox
        import networkx as nx

        # Download street network
        G = ox.graph_from_address(
            location_name,
            dist=distance_km * 1000,
            network_type="drive",
        )

        # Basic metrics
        stats = ox.basic_stats(G)
        return {
            "status": "success",
            "location": location_name,
            "radius_km": distance_km,
            "nodes": stats.get("n", 0),
            "edges": stats.get("m", 0),
            "avg_street_length_m": round(stats.get("avg_street_length", 0), 2),
            "intersection_count": stats.get("intersection_count", 0),
        }

    except ImportError:
        return {"status": "error", "message": "OSMnx not available. Install: pip install osmnx networkx"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
