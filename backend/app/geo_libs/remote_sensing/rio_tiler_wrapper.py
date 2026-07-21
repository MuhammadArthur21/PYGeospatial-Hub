"""
Rio-Tiler — Create map tiles from raster sources.

Provides tile serving capabilities for raster datasets,
enabling dynamic map tile generation from GeoTIFFs.
"""

from typing import Optional, Dict, List


def tile_exists(raster_path: str, x: int, y: int, z: int) -> bool:
    """
    Check if a tile exists for the given coordinates.

    Args:
        raster_path: Path to raster file
        x: Tile column
        y: Tile row
        z: Zoom level

    Returns:
        True if tile exists
    """
    try:
        import rio_tiler
        from rio_tiler.io import Reader

        with Reader(raster_path) as reader:
            tile = reader.tile(x, y, z)
            return tile is not None

    except ImportError:
        return False
    except Exception:
        return False


def get_raster_info_tiled(raster_path: str) -> Dict:
    """
    Get raster metadata suitable for tiled serving.

    Args:
        raster_path: Path to raster file

    Returns:
        Dict with tiling info
    """
    try:
        import rio_tiler
        from rio_tiler.io import Reader

        with Reader(raster_path) as reader:
            info = reader.info()

        return {
            "status": "success",
            "bounds": info.bounds,
            "minzoom": info.minzoom,
            "maxzoom": info.maxzoom,
            "center": info.center,
            "bands": info.bands if hasattr(info, "bands") else None,
        }

    except ImportError:
        return {"status": "error", "message": "rio-tiler not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
