# PyGeospatial Hub - Pyproj Wrapper
# Pyproj: Cartographic projections and coordinate transformations

"""
Pyproj provides Python bindings to PROJ for cartographic transformations.
This wrapper simplifies coordinate reference system operations.
"""

from pyproj import CRS, Transformer, Proj
from pyproj.aoi import AreaOfInterest
from pyproj.database import query_crs_info
from typing import Tuple, List, Optional
import json


# Commonly used CRS definitions
CRS_EPSG_4326 = "EPSG:4326"  # WGS84 Lat/Lon
CRS_EPSG_3857 = "EPSG:3857"  # Web Mercator
CRS_EPSG_4269 = "EPSG:4269"  # NAD83
CRS_EPSG_32750 = "EPSG:32750"  # UTM zone 50S
CRS_EPSG_32751 = "EPSG:32751"  # UTM zone 51S


def get_crs_info(crs_code: str) -> dict:
    """Get metadata about a CRS"""
    crs = CRS.from_user_input(crs_code)
    return {
        "code": crs_code,
        "name": crs.name,
        "type": crs.type_name,
        "area_of_use": str(crs.area_of_use),
        "axis_info": [
            {"name": axis.name, "direction": axis.direction}
            for axis in crs.axis_info
        ],
    }


def transform_coordinates(
    x: float,
    y: float,
    source_crs: str = CRS_EPSG_4326,
    target_crs: str = CRS_EPSG_3857,
) -> Tuple[float, float]:
    """Transform a single coordinate from one CRS to another"""
    transformer = Transformer.from_crs(source_crs, target_crs, always_xy=True)
    return transformer.transform(x, y)


def transform_batch(
    coordinates: List[Tuple[float, float]],
    source_crs: str = CRS_EPSG_4326,
    target_crs: str = CRS_EPSG_3857,
) -> List[Tuple[float, float]]:
    """Transform multiple coordinates from one CRS to another"""
    transformer = Transformer.from_crs(source_crs, target_crs, always_xy=True)
    return [transformer.transform(x, y) for x, y in coordinates]


def calculate_distance(
    lon1: float,
    lat1: float,
    lon2: float,
    lat2: float,
) -> float:
    """Calculate geodesic distance between two points (in meters)"""
    transformer = Transformer.from_crs(CRS_EPSG_4326, CRS_EPSG_3857, always_xy=True)
    x1, y1 = transformer.transform(lon1, lat1)
    x2, y2 = transformer.transform(lon2, lat2)
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5


def convert_to_utm(crs_code: str) -> str:
    """Find the appropriate UTM CRS for a given CRS"""
    crs = CRS.from_user_input(crs_code)
    utm_crs = crs.to_epsg()
    if utm_crs and 32601 <= utm_crs <= 32660 or 32701 <= utm_crs <= 32760:
        return f"EPSG:{utm_crs}"
    return crs_code


def list_supported_crs() -> List[dict]:
    """List commonly used CRS definitions"""
    common_crs = [
        ("EPSG:4326", "WGS 84 (Lat/Lon)"),
        ("EPSG:3857", "Web Mercator"),
        ("EPSG:4269", "NAD83"),
        ("EPSG:4267", "NAD27"),
        ("EPSG:4265", "SIRGAS 2000"),
        ("EPSG:32750", "UTM zone 50S"),
        ("EPSG:32751", "UTM zone 51S"),
        ("EPSG:32760", "UTM zone 60S"),
        ("EPSG:32650", "UTM zone 50N"),
        ("EPSG:32651", "UTM zone 51N"),
    ]
    return [{"code": code, "name": name} for code, name in common_crs]
