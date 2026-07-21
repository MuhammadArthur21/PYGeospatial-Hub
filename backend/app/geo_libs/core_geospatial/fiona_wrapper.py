# PyGeospatial Hub - Fiona Wrapper
# Fiona: Simple reading and writing of vector geospatial files

"""
Fiona provides a Pythonic API for vector data I/O.
This wrapper simplifies reading and writing spatial data formats.
"""

import fiona
from fiona.crs import from_epsg
from typing import List, Dict, Optional, Iterator
import json


# Supported drivers
DRIVERS = {
    "Shapefile": "ESRI Shapefile",
    "GeoJSON": "GeoJSON",
    "GPKG": "GPKG",
    "KML": "KML",
    "GPX": "GPX",
}


def read_vector_file(filepath: str, layer: int = 0) -> dict:
    """Read a vector file and return its contents"""
    with fiona.open(filepath, layer=layer) as src:
        return {
            "crs": str(src.crs),
            "driver": src.driver,
            "schema": src.schema,
            "features": list(src),
            "count": len(src),
            "bounds": src.bounds,
        }


def read_features(filepath: str) -> List[dict]:
    """Read all features from a vector file"""
    with fiona.open(filepath) as src:
        return list(src)


def write_geojson(
    features: List[dict],
    output_path: str,
    crs: str = "EPSG:4326",
) -> bool:
    """Write features to a GeoJSON file"""
    # Infer schema from first feature
    if not features:
        return False

    first_geom = features[0].get("geometry", {})
    schema = {
        "geometry": first_geom.get("type", "Unknown"),
        "properties": {
            k: type(v).__name__ for k, v in features[0].get("properties", {}).items()
        },
    }

    with fiona.open(
        output_path,
        "w",
        driver="GeoJSON",
        crs=from_epsg(int(crs.split(":")[1])),
        schema=schema,
    ) as dst:
        dst.writerecords(features)
    return True


def get_supported_formats() -> List[dict]:
    """List supported vector file formats"""
    return [
        {"name": name, "driver": driver}
        for name, driver in DRIVERS.items()
    ]


def convert_format(
    input_path: str,
    output_path: str,
    output_driver: str = "GeoJSON",
) -> bool:
    """Convert between vector file formats"""
    with fiona.open(input_path) as src:
        schema = src.schema.copy()
        crs = src.crs
        with fiona.open(
            output_path,
            "w",
            driver=output_driver,
            crs=crs,
            schema=schema,
        ) as dst:
            dst.writerecords(src)
    return True
