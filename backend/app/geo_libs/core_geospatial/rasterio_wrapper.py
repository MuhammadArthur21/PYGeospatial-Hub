# PyGeospatial Hub - Rasterio Wrapper
# Rasterio: Reading and writing geospatial raster data

"""
Rasterio provides Pythonic access to GDAL raster capabilities.
This wrapper simplifies common raster operations.
"""

import rasterio
from rasterio.io import MemoryFile
from rasterio.transform import from_bounds
from rasterio.enums import Resampling
from rasterio.warp import calculate_default_transform, reproject, Resampling as WarpResampling
from rasterio.mask import mask
from rasterio.features import geometry_mask, shapes
from shapely.geometry import Polygon
import numpy as np
from typing import Optional, Tuple, List
import json


def read_raster(filepath: str) -> dict:
    """Read a raster file and return its properties and band data"""
    with rasterio.open(filepath) as src:
        return {
            "width": src.width,
            "height": src.height,
            "count": src.count,
            "crs": str(src.crs),
            "bounds": src.bounds,
            "res": src.res,
            "nodata": src.nodata,
            "dtypes": [src.dtypes[i] for i in range(src.count)],
        }


def read_band(filepath: str, band_index: int = 1) -> np.ndarray:
    """Read a specific band from a raster file"""
    with rasterio.open(filepath) as src:
        return src.read(band_index)


def write_raster(
    data: np.ndarray,
    filepath: str,
    crs: str = "EPSG:4326",
    transform: Optional[Tuple] = None,
    bounds: Optional[Tuple] = None,
    width: Optional[int] = None,
    height: Optional[int] = None,
) -> bool:
    """Write a numpy array to a raster file"""
    if transform is None and bounds is not None:
        if width is None or height is None:
            raise ValueError("width and height required when using bounds")
        transform = from_bounds(*bounds, width, height)

    with rasterio.open(
        filepath,
        "w",
        driver="GTiff",
        height=data.shape[-2] if data.ndim > 1 else data.shape[0],
        width=data.shape[-1] if data.ndim > 1 else data.shape[1],
        count=1 if data.ndim <= 2 else data.shape[0],
        dtype=data.dtype,
        crs=crs,
        transform=transform,
    ) as dst:
        if data.ndim <= 2:
            dst.write(data, 1)
        else:
            for i in range(data.shape[0]):
                dst.write(data[i], i + 1)
    return True


def reproject_raster(
    input_path: str,
    output_path: str,
    dst_crs: str = "EPSG:3857",
) -> bool:
    """Reproject a raster to a new coordinate system"""
    with rasterio.open(input_path) as src:
        transform, width, height = calculate_default_transform(
            src.crs, dst_crs, src.width, src.height, *src.bounds
        )
        kwargs = src.meta.copy()
        kwargs.update({
            "crs": dst_crs,
            "transform": transform,
            "width": width,
            "height": height,
        })

        with rasterio.open(output_path, "w", **kwargs) as dst:
            for i in range(1, src.count + 1):
                reproject(
                    source=rasterio.band(src, i),
                    destination=rasterio.band(dst, i),
                    src_transform=src.transform,
                    src_crs=src.crs,
                    dst_transform=transform,
                    dst_crs=dst_crs,
                    resampling=WarpResampling.bilinear,
                )
    return True


def clip_raster(
    input_path: str,
    output_path: str,
    polygon: Polygon,
) -> bool:
    """Clip a raster to a polygon boundary"""
    with rasterio.open(input_path) as src:
        out_image, out_transform = mask(src, [polygon], crop=True)
        out_meta = src.meta.copy()
        out_meta.update({
            "driver": "GTiff",
            "height": out_image.shape[1],
            "width": out_image.shape[2],
            "transform": out_transform,
        })

        with rasterio.open(output_path, "w", **out_meta) as dst:
            dst.write(out_image)
    return True


def get_statistics(filepath: str, band_index: int = 1) -> dict:
    """Get basic statistics for a raster band"""
    data = read_band(filepath, band_index)
    return {
        "min": float(np.min(data)),
        "max": float(np.max(data)),
        "mean": float(np.mean(data)),
        "std": float(np.std(data)),
        "nodata_count": int(np.sum(data == np.nan)),
    }
