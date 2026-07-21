"""
Folium — Create interactive Leaflet maps from Python data.

Folium makes it easy to visualize data on an interactive Leaflet map.
This wrapper provides common mapping operations.
"""

from typing import Optional, Dict, List, Union
import json


def create_base_map(
    location: List[float] = None,
    zoom_start: int = 10,
    tiles: str = "OpenStreetMap",
) -> Dict:
    """
    Create a base interactive map.

    Args:
        location: [lat, lon] center point
        zoom_start: Initial zoom level
        tiles: Tile provider name

    Returns:
        Dict with map configuration
    """
    if location is None:
        location = [-6.2, 106.8]  # Jakarta

    return {
        "type": "folium_map",
        "center": location,
        "zoom": zoom_start,
        "tiles": tiles,
        "width": "100%",
        "height": "400px",
    }


def add_marker(
    lat: float,
    lon: float,
    popup: Optional[str] = None,
    tooltip: Optional[str] = None,
    icon: str = "info-sign",
) -> Dict:
    """
    Add a marker to a map.

    Args:
        lat: Latitude
        lon: Longitude
        popup: Popup text
        tooltip: Tooltip text
        icon: Icon name (from Bootstrap or Font Awesome)

    Returns:
        Dict with marker configuration
    """
    return {
        "type": "marker",
        "location": [lat, lon],
        "popup": popup,
        "tooltip": tooltip,
        "icon": icon,
    }


def add_choropleth(
    geojson_data: Dict,
    data: Dict[str, float],
    columns: List[str],
    key_on: str = "feature.id",
    fill_color: str = "YlGn",
) -> Dict:
    """
    Add a choropleth layer to a map.

    Args:
        geojson_data: GeoJSON FeatureCollection
        data: Dictionary of values keyed by feature ID
        columns: [key_column, value_column]
        key_on: JSONPath expression for feature keys
        fill_color: Color scheme

    Returns:
        Dict with choropleth layer config
    """
    return {
        "type": "choropleth",
        "geo_data": geojson_data,
        "data": data,
        "columns": columns,
        "key_on": key_on,
        "fill_color": fill_color,
        "legend_title": "Legend",
    }


def save_map(map_config: Dict, output_path: str = "map.html") -> bool:
    """Save map configuration to HTML file"""
    import os
    try:
        with open(output_path, "w") as f:
            f.write(f"<!-- Map centered at {map_config.get('center')} -->\n")
            f.write(f"<div style='width:{map_config.get('width', '100%')};")
            f.write(f"height:{map_config.get('height', '400px')};'")
            f.write("id='map'></div>\n")
        return True
    except Exception as e:
        return False
