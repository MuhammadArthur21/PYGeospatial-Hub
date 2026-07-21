# PyGeospatial Hub - GeoPandas Wrapper
# GeoPandas: Extends pandas to support geospatial operations

"""
GeoPandas combines pandas and shapely for geospatial data manipulation.
This wrapper provides convenient access to common GeoDataFrame operations.
"""

import geopandas as gpd
import pandas as pd
from shapely.geometry import Point
from typing import List, Optional, Dict, Any
import json


def read_file(filepath: str, layer: Optional[str] = None) -> gpd.GeoDataFrame:
    """Read a spatial file (shapefile, GeoJSON, GPKG, etc.)"""
    return gpd.read_file(filepath, layer=layer)


def read_geojson(geojson_str: str) -> gpd.GeoDataFrame:
    """Create a GeoDataFrame from a GeoJSON string"""
    data = json.loads(geojson_str)
    return gpd.GeoDataFrame.from_features(data["features"])


def create_geodataframe(
    data: Dict[str, List],
    geometry_column: str = "geometry",
    crs: str = "EPSG:4326",
) -> gpd.GeoDataFrame:
    """Create a GeoDataFrame from a dictionary of data"""
    gdf = gpd.GeoDataFrame(data, geometry=geometry_column)
    gdf.set_crs(crs, inplace=True)
    return gdf


def to_geojson(gdf: gpd.GeoDataFrame, indent: int = 2) -> str:
    """Convert a GeoDataFrame to GeoJSON string"""
    return gdf.to_json(indent=indent)


def spatial_join(
    left_gdf: gpd.GeoDataFrame,
    right_gdf: gpd.GeoDataFrame,
    how: str = "inner",
    op: str = "intersects",
) -> gpd.GeoDataFrame:
    """Perform a spatial join between two GeoDataFrames"""
    return gpd.sjoin(left_gdf, right_gdf, how=how, predicate=op)


def clip_geodataframe(
    gdf: gpd.GeoDataFrame, clip_geom: gpd.GeoDataFrame
) -> gpd.GeoDataFrame:
    """Clip a GeoDataFrame to a boundary geometry"""
    return gpd.clip(gdf, clip_geom)


def simplify(gdf: gpd.GeoDataFrame, tolerance: float) -> gpd.GeoDataFrame:
    """Simplify all geometries in a GeoDataFrame"""
    gdf.geometry = gdf.geometry.simplify(tolerance, preserve_topology=True)
    return gdf


def calculate_area(gdf: gpd.GeoDataFrame) -> gpd.GeoSeries:
    """Calculate area for each geometry in the GeoDataFrame"""
    return gdf.geometry.area


def calculate_length(gdf: gpd.GeoDataFrame) -> gpd.GeoSeries:
    """Calculate length for each geometry in the GeoDataFrame"""
    return gdf.geometry.length


def get_centroid(gdf: gpd.GeoDataFrame) -> gpd.GeoSeries:
    """Get centroid for each geometry"""
    return gdf.geometry.centroid


def buffer(
    gdf: gpd.GeoDataFrame, distance: float
) -> gpd.GeoDataFrame:
    """Create buffer around all geometries"""
    gdf.geometry = gdf.geometry.buffer(distance)
    return gdf


def dissolve(
    gdf: gpd.GeoDataFrame, by: Optional[str] = None, aggfunc: str = "first"
) -> gpd.GeoDataFrame:
    """Dissolve geometries based on an attribute column"""
    return gdf.dissolve(by=by, aggfunc=aggfunc)


def sample_data() -> gpd.GeoDataFrame:
    """Create a sample GeoDataFrame with world countries data"""
    return gpd.read_file('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')
