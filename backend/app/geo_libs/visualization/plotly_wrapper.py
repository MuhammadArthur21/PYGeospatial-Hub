"""
Plotly — Interactive graphing and charting library.

Provides configuration for creating interactive charts,
including scatter plots, bar charts, and choropleth maps.
"""

from typing import Optional, Dict, List, Any


def scatter_geo(
    lat: List[float],
    lon: List[float],
    text: Optional[List[str]] = None,
    color: Optional[List[float]] = None,
    title: str = "Geographic Scatter Plot",
) -> Dict:
    """
    Create a geographic scatter plot on a map.

    Args:
        lat: List of latitudes
        lon: List of longitudes
        text: Optional hover text
        color: Optional color values
        title: Chart title

    Returns:
        Dict with Plotly chart config
    """
    return {
        "type": "plotly_geo_scatter",
        "title": title,
        "data": {
            "lat": lat,
            "lon": lon,
            "text": text or [],
            "color": color or [],
        },
        "layout": {
            "title": title,
            "geo": {
                "projection": {"type": "natural earth"},
                "showland": True,
                "landcolor": "rgb(243, 243, 243)",
            },
        },
    }


def choropleth_mapbox(
    geojson: Dict,
    locations: List[str],
    values: List[float],
    title: str = "Choropleth Map",
) -> Dict:
    """
    Create an interactive choropleth map using Mapbox.

    Args:
        geojson: GeoJSON FeatureCollection
        locations: Feature IDs matching GeoJSON
        values: Numeric values by location
        title: Chart title

    Returns:
        Dict with Plotly choropleth config
    """
    return {
        "type": "plotly_choropleth",
        "title": title,
        "data": {
            "geojson": geojson,
            "locations": locations,
            "values": values,
        },
        "layout": {
            "title": title,
            "mapbox": {"style": "carto-positron", "zoom": 3},
        },
        "color_scale": "Greens",
    }


def bar_chart(
    labels: List[str],
    values: List[float],
    title: str = "Bar Chart",
    color: str = "#546B41",
) -> Dict:
    """
    Create a bar chart.

    Args:
        labels: X-axis labels
        values: Y-axis values
        title: Chart title
        color: Bar color

    Returns:
        Dict with Plotly bar chart config
    """
    return {
        "type": "plotly_bar",
        "title": title,
        "data": {"labels": labels, "values": values, "color": color},
        "layout": {
            "title": title,
            "xaxis": {"title": ""},
            "yaxis": {"title": ""},
        },
    }
