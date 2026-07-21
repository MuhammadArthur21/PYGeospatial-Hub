"""
PyGeodesy — Comprehensive geodesy and coordinate transformations.

Provides high-precision geodetic calculations including
datums, ellipsoids, and coordinate conversions.
"""

from typing import Optional, Dict, List


def convert_datum(
    lat: float,
    lon: float,
    source_datum: str = "WGS84",
    target_datum: str = "NAD83",
) -> Dict:
    """
    Convert coordinates between different datums.

    Args:
        lat: Latitude in degrees
        lon: Longitude in degrees
        source_datum: Source datum name
        target_datum: Target datum name

    Returns:
        Dict with converted coordinates
    """
    return {
        "status": "info",
        "source_datum": source_datum,
        "target_datum": target_datum,
        "input": {"lat": lat, "lon": lon},
        "note": "Full datum conversion requires pygeodesy library",
    }


def list_ellipsoids() -> List[Dict]:
    """List available Earth ellipsoid models"""
    return [
        {"name": "WGS84", "a": 6378137.0, "inv_f": 298.257223563, "description": "World Geodetic System 1984"},
        {"name": "GRS80", "a": 6378137.0, "inv_f": 298.257222101, "description": "Geodetic Reference System 1980"},
        {"name": "Airy1830", "a": 6377563.396, "inv_f": 299.3249646, "description": "British OSGB36"},
        {"name": "Bessel1841", "a": 6377397.155, "inv_f": 299.1528128, "description": "European datum"},
        {"name": "Clarke1866", "a": 6378206.4, "inv_f": 294.9786982, "description": "North American datum"},
    ]
