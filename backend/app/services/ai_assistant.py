# PyGeospatial Hub - AI Assistant Enhancement
# Smart code suggestions and debugging (Section 4.7)

import re
from typing import Optional, Dict, List


class GeoAIAssistant:
    """
    Enhanced AI Assistant for geospatial Python code assistance.
    Provides context-aware suggestions, error explanations, and code fixes.
    """

    ERROR_PATTERNS = {
        r"ModuleNotFoundError.*geopandas": "Install GeoPandas: pip install geopandas",
        r"ModuleNotFoundError.*rasterio": "Install Rasterio: pip install rasterio",
        r"ModuleNotFoundError.*shapely": "Install Shapely: pip install shapely",
        r"FileNotFoundError": "File not found. Check the file path or upload the file first via the Upload button.",
        r"CRSError": "Invalid CRS. Use 'EPSG:4326' (WGS84) or 'EPSG:3857' (Web Mercator).",
        r"GeometryError": "Geometry error. Check that polygons are closed and coordinates are valid.",
        r"AttributeError.*'NoneType'": "The operation returned None. Check that your data was loaded correctly.",
        r"DataFrameError": "DataFrame operation failed. Check column names and data types.",
        r"MemoryError": "Memory limit reached. Try processing a smaller dataset or increasing server resources.",
        r"TimeoutError": "Execution timed out. Try simplifying your code or reducing the dataset size.",
    }

    OPTIMIZATION_TIPS = {
        "for": "Consider using vectorized operations instead of for-loops for better performance.",
        "iterrows": "Avoid iterrows() - use vectorized operations or apply() instead.",
        "buffer": "For large buffer operations, use a spatial index (R-tree) first.",
        "gpd.read_file": "For large files, use the 'columns' parameter to read only needed columns.",
        "merge": "Ensure both DataFrames have the same CRS before merging.",
        "join": "Add spatial indexes before joining large datasets for faster performance.",
    }

    def analyze_error(self, code: str, error: str) -> str:
        """Analyze an error and return helpful suggestion"""
        for pattern, suggestion in self.ERROR_PATTERNS.items():
            if re.search(pattern, error, re.IGNORECASE):
                return f"🔍 **Error Analysis:**\n\n{error[:200]}\n\n💡 **Suggestion:** {suggestion}"
        return f"❌ **Unknown error.**\n\n{error[:300]}\n\nCheck your code syntax and try again."

    def optimize_suggestions(self, code: str) -> List[str]:
        """Suggest code optimizations"""
        suggestions = []
        for keyword, tip in self.OPTIMIZATION_TIPS.items():
            if keyword in code:
                suggestions.append(f"• {tip}")
        return suggestions

    def explain_concept(self, topic: str) -> str:
        """Explain a geospatial concept"""
        topics = {
            "crs": "**CRS (Coordinate Reference System)** defines how map coordinates relate to real positions on Earth.\n\n"
                   "Common CRS codes:\n"
                   "- `EPSG:4326` — WGS84 (standard GPS coordinates, in degrees)\n"
                   "- `EPSG:3857` — Web Mercator (used by Google Maps, in meters)\n"
                   "- `EPSG:32750` — UTM zone 50S (for Indonesia area)\n\n"
                   "Use `pyproj.Transformer` to convert between CRS.",
            "buffer": "**Buffer** creates a zone of specified distance around a geometry.\n\n"
                      "```python\nfrom shapely.geometry import Point\npoint = Point(106.8, -6.2)\nbuffered = point.buffer(0.1)  # 0.1 degrees ≈ 11km\n```\n\n"
                      "Useful for proximity analysis and spatial queries.",
            "spatial join": "**Spatial Join** combines two datasets based on their spatial relationship.\n\n"
                           "```python\nimport geopandas as gpd\njoined = gpd.sjoin(points_df, polygons_df, predicate='within')\n```\n\n"
                           "Common predicates: `within`, `intersects`, `contains`, `touches`.",
            "geocoding": "**Geocoding** converts addresses to coordinates (forward) or coordinates to addresses (reverse).\n\n"
                        "```python\nfrom geopy.geocoders import Nominatim\ngeo = Nominatim(user_agent='myapp')\nlocation = geo.geocode('Jakarta')\nprint(location.latitude, location.longitude)\n```",
            "raster": "**Raster data** consists of pixels/grid cells with values (satellite imagery, elevation models).\n\n"
                     "Use `rasterio` to read/write and `numpy` to process raster arrays.",
            "vector": "**Vector data** uses points, lines, and polygons to represent features.\n\n"
                     "Use `GeoPandas` for vector data manipulation and `Shapely` for geometry operations.",
        }
        return topics.get(topic.lower(), f"Topic '{topic}' not found in knowledge base. Try: {', '.join(topics.keys())}")
