"""
Kepler.gl — High-performance web-based geospatial visualization.

Provides configuration for large-scale geospatial data
visualization with Kepler.gl's deck.gl-based engine.
"""

from typing import Optional, Dict, List


def create_visualization_config(
    data_layers: List[Dict],
    map_style: str = "dark",
) -> Dict:
    """
    Create a Kepler.gl visualization configuration.

    Args:
        data_layers: List of layer configurations
        map_style: Map style ('dark', 'light', 'satellite')

    Returns:
        Dict with Kepler.gl config
    """
    return {
        "type": "keplergl_map",
        "version": "v3",
        "config": {
            "mapStyle": {"styleType": map_style},
            "layers": data_layers,
        },
        "description": f"Kepler.gl map with {len(data_layers)} layers",
    }


def point_layer(
    data: Dict,
    label: str = "Points",
    color: List[int] = None,
) -> Dict:
    """
    Create a point layer configuration.

    Args:
        data: GeoJSON FeatureCollection
        label: Layer name
        color: RGB color [r, g, b]

    Returns:
        Dict with point layer config
    """
    if color is None:
        color = [84, 107, 65]  # Forest green

    return {
        "id": label.lower().replace(" ", "_"),
        "type": "point",
        "config": {
            "label": label,
            "color": color,
            "columns": {"lat": "lat", "lng": "lng"},
            "visConfig": {"radius": 10, "opacity": 0.8},
        },
    }


def heatmap_layer(
    data: Dict,
    label: str = "Heatmap",
) -> Dict:
    """
    Create a heatmap layer configuration.

    Args:
        data: GeoJSON FeatureCollection
        label: Layer name

    Returns:
        Dict with heatmap layer config
    """
    return {
        "id": label.lower().replace(" ", "_"),
        "type": "heatmap",
        "config": {
            "label": label,
            "columns": {"lat": "lat", "lng": "lng"},
            "visConfig": {"radius": 20, "opacity": 0.7},
        },
    }
