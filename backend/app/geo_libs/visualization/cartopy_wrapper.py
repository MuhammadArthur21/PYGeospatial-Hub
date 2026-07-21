"""
Cartopy — Map projections and geospatial data visualization.

Cartopy provides tools for map projection transformations and
geospatial data visualization with matplotlib integration.
"""

from typing import Optional, Dict, List


def list_projections() -> List[Dict]:
    """List available map projections"""
    return [
        {"name": "PlateCarree", "description": "Equirectangular/Cylindrical", "code": "EPSG:4326"},
        {"name": "Mercator", "description": "Web Mercator", "code": "EPSG:3857"},
        {"name": "LambertConformal", "description": "Lambert Conformal Conic"},
        {"name": "AlbersEqualArea", "description": "Albers Equal Area"},
        {"name": "Stereographic", "description": "Stereographic/Polar"},
        {"name": "Robinson", "description": "Robinson (world map)"},
        {"name": "UTM", "description": "Universal Transverse Mercator"},
    ]


def get_coastline(scale: str = "50m") -> Dict:
    """
    Get coastline data configuration.

    Args:
        scale: Resolution scale ('10m', '50m', '110m')

    Returns:
        Dict with coastline config
    """
    scales = {"10m": "high", "50m": "medium", "110m": "low"}
    return {
        "type": "coastline",
        "scale": scale,
        "resolution": scales.get(scale, "medium"),
        "description": f"Coastline at {scales.get(scale, 'medium')} resolution",
    }


def create_map_figure(
    projection: str = "PlateCarree",
    figsize: tuple = (10, 8),
) -> Dict:
    """
    Create a map figure configuration.

    Args:
        projection: Map projection name
        figsize: Figure dimensions (width, height) in inches

    Returns:
        Dict with figure configuration
    """
    return {
        "type": "cartopy_figure",
        "projection": projection,
        "figsize": figsize,
        "aspect": "equal",
    }
