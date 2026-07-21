# PyGeospatial Hub - Shapely Wrapper
# Shapely: Manipulation and analysis of planar geometric objects

"""
Shapely provides geometric operations for planar features (points, lines, polygons).
This wrapper exposes common Shapely operations through a simplified interface.
"""

from shapely.geometry import Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon
from shapely import wkt, wkb, geojson
from shapely.ops import unary_union, transform
from typing import Union, List
import pyproj

GeometryType = Union[Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon]


def create_point(x: float, y: float) -> Point:
    """Create a Point geometry from coordinates"""
    return Point(x, y)


def create_line(coordinates: List[tuple]) -> LineString:
    """Create a LineString from a list of (x, y) coordinates"""
    return LineString(coordinates)


def create_polygon(coordinates: List[tuple]) -> Polygon:
    """Create a Polygon from a list of (x, y) coordinates"""
    return Polygon(coordinates)


def buffer_geometry(geom: GeometryType, distance: float) -> Polygon:
    """Create a buffer around a geometry"""
    return geom.buffer(distance)


def intersect_geometries(geom1: GeometryType, geom2: GeometryType) -> GeometryType:
    """Return the intersection of two geometries"""
    return geom1.intersection(geom2)


def union_geometries(geom1: GeometryType, geom2: GeometryType) -> GeometryType:
    """Return the union of two geometries"""
    return geom1.union(geom2)


def difference_geometries(geom1: GeometryType, geom2: GeometryType) -> GeometryType:
    """Return the difference of two geometries"""
    return geom1.difference(geom2)


def simplify_geometry(geom: GeometryType, tolerance: float) -> GeometryType:
    """Simplify a geometry by removing vertices within tolerance"""
    return geom.simplify(tolerance, preserve_topology=True)


def to_geojson(geom: GeometryType) -> dict:
    """Convert a Shapely geometry to GeoJSON dict"""
    return geojson.dumps(geom)


def from_geojson(geojson_str: str) -> GeometryType:
    """Create a Shapely geometry from a GeoJSON string"""
    return geojson.loads(geojson_str)


def reproject_geometry(
    geom: GeometryType,
    source_crs: str = "EPSG:4326",
    target_crs: str = "EPSG:3857",
) -> GeometryType:
    """Reproject a geometry from one CRS to another"""
    project = pyproj.Transformer.from_crs(source_crs, target_crs, always_xy=True).transform
    return transform(project, geom)


def calculate_area(geom: GeometryType) -> float:
    """Calculate the area of a geometry (in CRS units)"""
    return geom.area


def calculate_length(geom: GeometryType) -> float:
    """Calculate the perimeter/length of a geometry (in CRS units)"""
    return geom.length


def calculate_distance(geom1: GeometryType, geom2: GeometryType) -> float:
    """Calculate the minimum distance between two geometries"""
    return geom1.distance(geom2)
