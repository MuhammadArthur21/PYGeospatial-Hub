"""
GeoPlot — High-level geospatial data visualization with matplotlib.

Combines GeoPandas and matplotlib for quick thematic mapping
with minimal code.
"""

from typing import Optional, Dict, List


def choropleth_map(
    geodataframe_info: dict,
    column: str,
    scheme: str = "quantiles",
    cmap: str = "YlGn",
    legend: bool = True,
) -> Dict:
    """
    Create a choropleth map configuration.

    Args:
        geodataframe_info: Dict with GeoDataFrame metadata
        column: Data column to visualize
        scheme: Classification scheme ('quantiles', 'equal_interval', 'natural_breaks')
        cmap: Matplotlib colormap name
        legend: Whether to show legend

    Returns:
        Dict with choropleth config
    """
    return {
        "type": "choropleth",
        "column": column,
        "scheme": scheme,
        "cmap": cmap,
        "legend": legend,
        "description": f"Choropleth map of {column} using {scheme} classification",
    }


def classify_schemes() -> List[Dict]:
    """List available classification schemes"""
    return [
        {"name": "Quantiles", "desc": "Equal number of observations per class"},
        {"name": "Equal Interval", "desc": "Equal value ranges per class"},
        {"name": "Natural Breaks", "desc": "Jenks natural breaks optimization"},
        {"name": "Fisher-Jenks", "desc": "Fisher-Jenks optimized breaks"},
        {"name": "Standard Deviation", "desc": "Standard deviation from mean"},
    ]
