"""
Haversine — Calculate distances between geographic points.

Simple utility for calculating great-circle distances
between points on the Earth's surface.
"""

from typing import Tuple, List, Dict, Union


def calculate_distance(
    point1: Tuple[float, float],
    point2: Tuple[float, float],
    unit: str = "km",
) -> float:
    """
    Calculate the great-circle distance between two points.

    Args:
        point1: (lat, lon) of first point
        point2: (lat, lon) of second point
        unit: Unit of measurement ('km', 'm', 'mi', 'nm')

    Returns:
        Distance in specified unit
    """
    try:
        from haversine import haversine, Unit

        unit_map = {
            "km": Unit.KILOMETERS,
            "m": Unit.METERS,
            "mi": Unit.MILES,
            "nm": Unit.NAUTICAL_MILES,
        }
        u = unit_map.get(unit, Unit.KILOMETERS)
        return haversine(point1, point2, unit=u)

    except ImportError:
        from math import radians, sin, cos, sqrt, asin

        lat1, lon1 = radians(point1[0]), radians(point1[1])
        lat2, lon2 = radians(point2[0]), radians(point2[1])

        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
        c = 2 * asin(sqrt(a))
        r = 6371  # Earth radius in km

        distance_km = r * c
        if unit == "m":
            return distance_km * 1000
        elif unit == "mi":
            return distance_km * 0.621371
        elif unit == "nm":
            return distance_km * 0.539957
        return distance_km


def calculate_bearing(
    point1: Tuple[float, float],
    point2: Tuple[float, float],
) -> float:
    """
    Calculate the bearing between two points.

    Args:
        point1: (lat, lon) of start point
        point2: (lat, lon) of end point

    Returns:
        Bearing in degrees (0-360)
    """
    from math import radians, degrees, atan2, sin, cos

    lat1, lon1 = radians(point1[0]), radians(point1[1])
    lat2, lon2 = radians(point2[0]), radians(point2[1])

    dlon = lon2 - lon1
    x = sin(dlon) * cos(lat2)
    y = cos(lat1) * sin(lat2) - sin(lat1) * cos(lat2) * cos(dlon)

    bearing = degrees(atan2(x, y))
    return (bearing + 360) % 360


def midpoint(
    point1: Tuple[float, float],
    point2: Tuple[float, float],
) -> Tuple[float, float]:
    """Calculate the midpoint between two geographic points"""
    from math import radians, degrees, atan2, sin, cos, sqrt

    lat1, lon1 = radians(point1[0]), radians(point1[1])
    lat2, lon2 = radians(point2[0]), radians(point2[1])

    bx = cos(lat2) * cos(lon2 - lon1)
    by = cos(lat2) * sin(lon2 - lon1)

    lat_mid = atan2(
        sin(lat1) + sin(lat2),
        sqrt((cos(lat1) + bx) ** 2 + by ** 2),
    )
    lon_mid = lon1 + atan2(by, cos(lat1) + bx)

    return (degrees(lat_mid), degrees(lon_mid))
