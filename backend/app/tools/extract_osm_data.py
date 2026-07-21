# extract_osm_data.py - Extract OpenStreetMap data

def extract_osm_data(location_name: str, tags: dict = None) -> dict:
    """
    Extract OpenStreetMap data for a location.
    Returns count of features by type.
    """
    if tags is None:
        tags = {"building": True, "highway": True, "amenity": True}

    try:
        import osmnx as ox

        # Get features
        features = ox.features_from_address(location_name, tags=tags)

        type_counts = features["element_type"].value_counts().to_dict() if "element_type" in features else {}
        return {
            "status": "success",
            "location": location_name,
            "total_features": len(features),
            "by_type": type_counts,
        }

    except ImportError:
        return {"status": "error", "message": "OSMnx not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
