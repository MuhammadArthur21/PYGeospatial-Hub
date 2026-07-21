# spatial_join.py - Perform spatial joins between datasets

def spatial_join(points_geojson: str, polygon_geojson: str, op: str = "within") -> dict:
    """
    Perform a spatial join between points and polygons.
    Returns points that satisfy the spatial relationship.

    Args:
        points_geojson: GeoJSON FeatureCollection of points
        polygon_geojson: GeoJSON polygon geometry
        op: Spatial operation ('within', 'intersects', 'contains')

    Returns:
        Dict with join results
    """
    import json
    from shapely.geometry import shape, Point

    try:
        points_data = json.loads(points_geojson)
        polygon = shape(json.loads(polygon_geojson))
        features = points_data.get("features", [])

        results = []
        for feat in features:
            point = shape(feat["geometry"])
            if op == "within" and point.within(polygon):
                results.append(feat)
            elif op == "intersects" and point.intersects(polygon):
                results.append(feat)
            elif op == "contains" and polygon.contains(point):
                results.append(feat)

        return {
            "status": "success",
            "operation": op,
            "total_points": len(features),
            "matched": len(results),
            "results": results[:100],
        }

    except ImportError:
        return {"status": "error", "message": "Shapely not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
