"""
Geomet — Pure Python GeoJSON geometry utilities.

Provides lightweight encoding and decoding of GeoJSON
geometries without requiring Shapely.
"""

from typing import Optional, Dict, List, Any
import json


def to_wkt(geometry: dict) -> str:
    """
    Convert a GeoJSON geometry to WKT format.

    Args:
        geometry: GeoJSON geometry object

    Returns:
        WKT string
    """
    geom_type = geometry.get("type", "")
    coords = geometry.get("coordinates", [])

    if geom_type == "Point":
        return f"POINT ({coords[0]} {coords[1]})"
    elif geom_type == "LineString":
        points = ", ".join(f"{c[0]} {c[1]}" for c in coords)
        return f"LINESTRING ({points})"
    elif geom_type == "Polygon":
        rings = []
        for ring in coords:
            points = ", ".join(f"{c[0]} {c[1]}" for c in ring)
            rings.append(f"({points})")
        return f"POLYGON ({', '.join(rings)})"

    return f"{geom_type} (representation not implemented)"


def from_wkt(wkt_string: str) -> dict:
    """
    Parse a WKT string to GeoJSON geometry.

    Args:
        wkt_string: Well-Known Text geometry

    Returns:
        GeoJSON geometry dict
    """
    wkt_string = wkt_string.strip()

    if wkt_string.startswith("POINT"):
        coords_str = wkt_string[6:].strip("()")
        parts = [float(x.strip()) for x in coords_str.split()]
        return {"type": "Point", "coordinates": parts[:2]}

    elif wkt_string.startswith("LINESTRING"):
        coords_str = wkt_string[11:].strip("()")
        points = []
        for pair in coords_str.split(","):
            parts = [float(x.strip()) for x in pair.strip().split()]
            points.append(parts[:2])
        return {"type": "LineString", "coordinates": points}

    return {"type": "Unknown", "coordinates": []}
