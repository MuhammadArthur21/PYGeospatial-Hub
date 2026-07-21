"""
ipyleaflet — Interactive Leaflet maps for Jupyter notebooks.

Provides interactive map widgets that integrate natively
with Jupyter notebooks and JupyterLab.
"""

from typing import Optional, Dict, List


def create_widget_map(
    center: List[float] = None,
    zoom: int = 10,
    basemap: str = "OpenStreetMap",
) -> Dict:
    """
    Create an interactive map widget configuration.

    Args:
        center: [lat, lon] map center
        zoom: Initial zoom level
        basemap: Basemap name

    Returns:
        Dict with map widget config
    """
    if center is None:
        center = [-6.2, 106.8]

    return {
        "type": "ipyleaflet_map",
        "center": center,
        "zoom": zoom,
        "basemap": basemap,
        "scroll_wheel_zoom": True,
        "widget_layout": "notebook",
    }


def add_draw_control() -> Dict:
    """Add drawing tools to the map"""
    return {
        "type": "draw_control",
        "polyline": True,
        "polygon": True,
        "circle": True,
        "rectangle": True,
        "marker": True,
        "edit": True,
        "remove": True,
    }
