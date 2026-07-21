# PyGeospatial Hub - GDAL/OSR Wrapper
# GDAL: Geospatial Data Abstraction Library

"""
GDAL provides comprehensive raster and vector data processing capabilities.
This wrapper exposes commonly used GDAL operations through a Pythonic API.
"""

from osgeo import gdal, ogr, osr
import numpy as np
from typing import Optional, Tuple, List, Dict
import json


# Configure GDAL to use exceptions
gdal.UseExceptions()


def get_raster_info(filepath: str) -> dict:
    """Get detailed information about a raster file"""
    ds = gdal.Open(filepath)
    info = {
        "driver": ds.GetDriver().ShortName,
        "width": ds.RasterXSize,
        "height": ds.RasterYSize,
        "bands": ds.RasterCount,
        "projection": ds.GetProjection(),
        "geotransform": ds.GetGeoTransform(),
        "corner_coordinates": {
            "upper_left": (ds.GetGeoTransform()[0], ds.GetGeoTransform()[3]),
            "lower_right": (
                ds.GetGeoTransform()[0] + ds.GetGeoTransform()[1] * ds.RasterXSize,
                ds.GetGeoTransform()[3] + ds.GetGeoTransform()[5] * ds.RasterYSize,
            ),
        },
    }
    ds = None
    return info


def get_vector_info(filepath: str) -> dict:
    """Get detailed information about a vector file"""
    ds = ogr.Open(filepath)
    layer = ds.GetLayer()
    info = {
        "driver": ds.GetDriver().ShortName,
        "feature_count": layer.GetFeatureCount(),
        "geometry_type": layer.GetGeomType(),
        "spatial_ref": layer.GetSpatialRef().ExportToWkt() if layer.GetSpatialRef() else None,
        "extent": layer.GetExtent(),
        "fields": [
            {
                "name": field_defn.GetName(),
                "type": field_defn.GetTypeName(),
            }
            for field_defn in layer.GetLayerDefn()
        ],
    }
    ds = None
    return info


def convert_raster_format(
    input_path: str,
    output_path: str,
    format_driver: str = "GTiff",
) -> bool:
    """Convert raster between different formats"""
    src_ds = gdal.Open(input_path)
    dst_ds = gdal.GetDriverByName(format_driver).CreateCopy(output_path, src_ds)
    dst_ds = None
    src_ds = None
    return True


def convert_vector_format(
    input_path: str,
    output_path: str,
    format_driver: str = "GeoJSON",
) -> bool:
    """Convert vector between different formats"""
    src_ds = ogr.Open(input_path)
    dst_ds = gdal.GetDriverByName(format_driver).CreateCopy(output_path, src_ds)
    dst_ds = None
    src_ds = None
    return True


def warp_raster(
    input_path: str,
    output_path: str,
    target_crs: str = "EPSG:3857",
    resolution: Optional[float] = None,
) -> bool:
    """Reproject and warp raster to a new CRS"""
    warp_options = gdal.WarpOptions(
        dstSRS=target_crs,
        xRes=resolution,
        yRes=resolution,
    )
    gdal.Warp(output_path, input_path, options=warp_options)
    return True
