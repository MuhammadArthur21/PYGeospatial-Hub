"""
Geojson — Python bindings and utilities for the GeoJSON format.

Provides encoding, decoding, and validation of GeoJSON
data structures per the RFC 7946 standard.
"""

from typing import Optional, Dict, List, Any
import json


def validate_geojson(data: dict) -> Dict:
    """
    Validate a GeoJSON object.

    Args:
        data: GeoJSON object to validate

    Returns:
        Dict with validation results
    """
    errors = []

    if not isinstance(data, dict):
        return {"valid": False, "errors": ["GeoJSON must be a dict"]}

    if "type" not in data:
        return {"valid": False, "errors": ["GeoJSON must have a 'type' property"]}

    valid_types = [
        "Point", "MultiPoint", "LineString", "MultiLineString",
        "Polygon", "MultiPolygon", "GeometryCollection",
        "Feature", "FeatureCollection",
    ]

    if data["type"] not in valid_types:
        errors.append(f"Invalid type: {data['type']}")

    if data["type"] == "Feature" and "geometry" not in data:
        errors.append("Feature must have a 'geometry' property")

    if data["type"] == "FeatureCollection":
        if "features" not in data:
            errors.append("FeatureCollection must have 'features' array")
        elif not isinstance(data["features"], list):
            errors.append("'features' must be an array")

    return {
        "valid": len(errors) == 0,
        "type": data.get("type"),
        "errors": errors,
    }


def to_feature_collection(features: List[dict]) -> Dict:
    """
    Wrap a list of features in a FeatureCollection.

    Args:
        features: List of GeoJSON Feature objects

    Returns:
        GeoJSON FeatureCollection
    """
    return {"type": "FeatureCollection", "features": features}


def create_point_feature(
    lon: float,
    lat: float,
    properties: Optional[Dict[str, Any]] = None,
) -> Dict:
    """
    Create a GeoJSON Point feature.

    Args:
        lon: Longitude
        lat: Latitude
        properties: Feature properties

    Returns:
        GeoJSON Feature
    """
    return {
        "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [lon, lat]},
        "properties": properties or {},
    }


def create_polygon_feature(
    coordinates: List[List[List[float]]],
    properties: Optional[Dict[str, Any]] = None,
) -> Dict:
    """
    Create a GeoJSON Polygon feature.

    Args:
        coordinates: Polygon coordinate rings
        properties: Feature properties

    Returns:
        GeoJSON Feature
    """
    return {
        "type": "Feature",
        "geometry": {"type": "Polygon", "coordinates": coordinates},
        "properties": properties or {},
    }
