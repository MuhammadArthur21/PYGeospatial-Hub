# PyGeospatial Hub - AI Assistant Service
# Provides geospatial code suggestions and debugging help

"""
AI Assistant for geospatial Python code assistance.
Planned for Fase 3 (see PYGeospatial.md Section 4.7).
"""

from typing import Optional, Dict, List


class AIAssistant:
    """
    AI-powered assistant for geospatial coding help.

    NOTE: This is a placeholder service for Fase 3.
    Full implementation requires an LLM API integration.
    """

    def __init__(self):
        self.provider = None  # Will be set when AI provider is configured
        self.api_key = None

    def suggest_fix(self, code: str, error_message: str) -> str:
        """
        Suggest a fix for an error in geospatial code.
        """
        if "FileNotFoundError" in error_message:
            return "Check that the file path exists. Use an absolute path or upload the file first."
        if "CRSError" in error_message or "crs" in error_message.lower():
            return "Invalid CRS. Use a valid EPSG code like 'EPSG:4326' (WGS84) or 'EPSG:3857' (Web Mercator)."
        if "GeometryError" in error_message or "geometry" in error_message.lower():
            return "Invalid geometry. Check that your geometry is valid (polygon closed, points in range, etc)."
        return "Review the error message and check your code syntax."

    def optimize_code(self, code: str) -> str:
        """
        Suggest performance optimizations for geospatial code.
        """
        suggestions = []

        if "for" in code and "iterrows" in code:
            suggestions.append("Consider using vectorized operations instead of iterrows for better performance.")

        if ".buffer" in code:
            suggestions.append("For large buffer operations, consider using a spatial index (R-tree) first.")

        if "gpd.read_file" in code:
            suggestions.append("For large files, consider reading only needed columns with the 'columns' parameter.")

        return "\n".join(suggestions) if suggestions else "No optimizations detected for this code."

    def explain_concept(self, topic: str) -> str:
        """
        Explain a geospatial concept.
        """
        explanations = {
            "crs": "A Coordinate Reference System (CRS) defines how coordinates map to real locations on Earth. "
                   "Common CRS: EPSG:4326 (WGS84 lat/lon), EPSG:3857 (Web Mercator).",
            "buffer": "Buffer creates a zone of a specified distance around a geometry. "
                      "Useful for proximity analysis and spatial queries.",
            "spatial join": "Spatial join combines attributes from two datasets based on spatial relationship, "
                           "like 'intersects', 'contains', or 'within'.",
            "geocoding": "Geocoding converts addresses into geographic coordinates (lat/lon). "
                        "Reverse geocoding does the opposite.",
        }
        return explanations.get(topic.lower(), f"Topic '{topic}' is not in the knowledge base yet.")
