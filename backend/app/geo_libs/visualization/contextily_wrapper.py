"""
Contextily — Add background map tiles to matplotlib plots.

Contextily provides ready-to-use background tiles from various
online sources to add geographic context to static plots.
"""

from typing import Optional, Dict, List


def list_tile_providers() -> List[Dict]:
    """List available tile providers"""
    return [
        {"name": "OpenStreetMap", "url": "https://tile.openstreetmap.org/{z}/{x}/{y}.png", "attribution": "© OSM"},
        {"name": "Stamen Terrain", "url": "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png", "attribution": "© Stamen"},
        {"name": "CartoDB Positron", "url": "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", "attribution": "© CartoDB"},
        {"name": "CartoDB Dark", "url": "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", "attribution": "© CartoDB"},
    ]


def add_basemap(
    ax: Optional[object] = None,
    source: str = "OpenStreetMap",
    zoom: int = 10,
) -> Dict:
    """
    Add a basemap to a matplotlib axis.

    Args:
        ax: Matplotlib axis (or None to return config)
        source: Tile provider name
        zoom: Zoom level

    Returns:
        Dict with basemap configuration
    """
    return {
        "type": "basemap",
        "source": source,
        "zoom": zoom,
        "description": f"Basemap from {source} at zoom {zoom}",
    }
