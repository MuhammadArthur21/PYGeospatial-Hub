"""
MapboxGL — Declarative web mapping with Mapbox GL JS.

Provides configuration for creating interactive maps
using Mapbox GL JS vector tile rendering.
"""

from typing import Optional, Dict, List


def create_mapbox_map(
    style: str = "mapbox://styles/mapbox/light-v11",
    center: List[float] = None,
    zoom: int = 10,
    token_required: bool = True,
) -> Dict:
    """
    Create a Mapbox GL map configuration.

    Args:
        style: Mapbox style URL
        center: [lat, lon] center
        zoom: Initial zoom
        token_required: Whether Mapbox access token is needed

    Returns:
        Dict with Mapbox config
    """
    if center is None:
        center = [-6.2, 106.8]

    return {
        "type": "mapbox_map",
        "style": style,
        "center": center,
        "zoom": zoom,
        "token_required": token_required,
        "note": "Mapbox requires an access token" if token_required else "",
    }


def add_geojson_layer(
    geojson_data: Dict,
    layer_id: str = "custom-layer",
    paint_color: str = "#546B41",
) -> Dict:
    """
    Add a GeoJSON data layer.

    Args:
        geojson_data: GeoJSON FeatureCollection
        layer_id: Unique layer identifier
        paint_color: Hex color for fills/lines

    Returns:
        Dict with layer config
    """
    return {
        "id": layer_id,
        "type": "geojson",
        "data": geojson_data,
        "paint": {
            "fill-color": paint_color,
            "fill-opacity": 0.4,
            "line-color": "#333333",
            "line-width": 1,
        },
    }
