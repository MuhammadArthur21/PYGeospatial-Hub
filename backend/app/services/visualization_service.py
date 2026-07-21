# PyGeospatial Hub - Visualization Service
# Renders execution results as maps and charts

"""
Service for converting geospatial execution results into
interactive visualizations (maps, charts, tables).
"""

import json
from typing import Optional, Dict, Any
from app.utils.logger import logger


class VisualizationService:
    """Handles rendering of geospatial data to visual formats"""

    @staticmethod
    def detect_output_type(output_text: str) -> str:
        """Detect what type of visualization to use based on output"""
        if not output_text:
            return "none"

        # Check for GeoJSON-like content
        try:
            data = json.loads(output_text)
            if isinstance(data, dict):
                if data.get("type") in ("FeatureCollection", "Feature"):
                    return "map"
                if data.get("type") == "Polygon" or data.get("type") == "Point":
                    return "map"
                if "lat" in data and "lon" in data:
                    return "map"
                if "coordinates" in data:
                    return "map"
            return "json"
        except (json.JSONDecodeError, TypeError):
            pass

        # Check for matplotlib references
        if "plt.show()" in output_text or "fig, ax" in output_text:
            return "chart"

        # Check for pandas output
        if "DataFrame" in output_text or "head()" in output_text:
            return "table"

        return "text"

    @staticmethod
    def parse_geojson_from_output(output_text: str) -> Optional[dict]:
        """Extract GeoJSON from execution output"""
        lines = output_text.strip().split("\n")
        for line in reversed(lines):
            try:
                data = json.loads(line.strip())
                if isinstance(data, dict) and "type" in data:
                    return data
            except (json.JSONDecodeError, TypeError):
                continue
        return None

    @staticmethod
    def prepare_map_data(geojson_data: dict) -> Dict:
        """Prepare GeoJSON data for frontend map rendering"""
        return {
            "type": "map",
            "data": geojson_data,
            "center": VisualizationService._get_center(geojson_data),
            "zoom": 10,
        }

    @staticmethod
    def _get_center(geojson_data: dict) -> list:
        """Extract center point from GeoJSON for map centering"""
        try:
            if geojson_data.get("type") == "FeatureCollection":
                coords = []
                for feature in geojson_data.get("features", [])[:5]:
                    geom = feature.get("geometry", {})
                    if geom.get("type") == "Point":
                        coords.append(geom["coordinates"])
                if coords:
                    avg_lon = sum(c[0] for c in coords) / len(coords)
                    avg_lat = sum(c[1] for c in coords) / len(coords)
                    return [avg_lat, avg_lon]
        except Exception:
            pass
        return [-6.2, 106.8]  # Default: Jakarta

    @staticmethod
    def prepare_chart_data(data: Dict) -> Dict:
        """Prepare chart data for Plotly rendering"""
        return {
            "type": "chart",
            "data": data,
        }

    @staticmethod
    def empty_result() -> Dict:
        return {
            "type": "none",
            "data": None,
        }
