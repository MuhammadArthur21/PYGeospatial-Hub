# PyGeospatial Hub - Calculate Distance Tool
# Computes geographic distances between points or along paths

"""
Tool: calculate_distance
Calculates geographic distances using various methods:
- Haversine (great-circle) distance between two points
- Euclidean distance (for projected coordinates)
- Path length along a LineString geometry
"""

from typing import Tuple, Optional, List
import math


def haversine_distance(
    lat1: float, lon1: float, lat2: float, lon2: float
) -> float:
    """
    Calculate the great-circle distance between two points
    using the Haversine formula.

    Args:
        lat1, lon1: Latitude/longitude of point 1 (decimal degrees)
        lat2, lon2: Latitude/longitude of point 2 (decimal degrees)

    Returns:
        Distance in kilometers
    """
    R = 6371.0  # Earth radius in km

    lat1_r = math.radians(lat1)
    lat2_r = math.radians(lat2)
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1_r) * math.cos(lat2_r) * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


def vincenty_distance(
    lat1: float, lon1: float, lat2: float, lon2: float
) -> float:
    """
    More accurate distance calculation using Vincenty's formula
    (accounts for Earth's oblate spheroid shape).
    Falls back to haversine if vincenty fails to converge.
    """
    try:
        from pyproj import Geod
        geod = Geod(ellps="WGS84")
        _, _, dist = geod.inv(lon1, lat1, lon2, lat2)
        return dist / 1000  # Convert meters to km
    except Exception:
        return haversine_distance(lat1, lon1, lat2, lon2)


def path_length(coordinates: List[Tuple[float, float]]) -> float:
    """
    Calculate total length of a path defined by a list of (lat, lon) points.

    Args:
        coordinates: List of (lat, lon) tuples

    Returns:
        Total distance in kilometers
    """
    if len(coordinates) < 2:
        return 0.0

    total = 0.0
    for i in range(len(coordinates) - 1):
        lat1, lon1 = coordinates[i]
        lat2, lon2 = coordinates[i + 1]
        total += haversine_distance(lat1, lon1, lat2, lon2)
    return total


def run_tool(
    lat1: float,
    lon1: float,
    lat2: float,
    lon2: float,
    method: str = "haversine",
) -> dict:
    """
    Main tool entry point.

    Args:
        lat1, lon1: Start point coordinates (decimal degrees)
        lat2, lon2: End point coordinates (decimal degrees)
        method: 'haversine' (default) or 'vincenty' (more accurate)

    Returns:
        Dict with distance in km, meters, and miles
    """
    if method == "vincenty":
        dist_km = vincenty_distance(lat1, lon1, lat2, lon2)
    else:
        dist_km = haversine_distance(lat1, lon1, lat2, lon2)

    return {
        "method": method,
        "from": {"lat": lat1, "lon": lon1},
        "to": {"lat": lat2, "lon": lon2},
        "distance": {
            "km": round(dist_km, 4),
            "meters": round(dist_km * 1000, 1),
            "miles": round(dist_km * 0.621371, 4),
            "nautical_miles": round(dist_km * 0.539957, 4),
        },
    }


if __name__ == "__main__":
    # Example: Jakarta to Surabaya
    result = run_tool(-6.2088, 106.8456, -7.2575, 112.7521)
    print(f"Jakarta → Surabaya: {result['distance']['km']} km")
