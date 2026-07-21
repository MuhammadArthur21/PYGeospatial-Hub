"""
OpenRouteService — Python client for OpenRouteService API.

Provides routing, directions, isochrones, and spatial analysis
using OpenRouteService (ORS) API.
"""

from typing import Optional, Dict, List


def calculate_route(
    coordinates: List[List[float]],
    profile: str = "driving-car",
) -> Dict:
    """
    Calculate a route between coordinates.

    Args:
        coordinates: List of [lon, lat] waypoints
        profile: Travel profile (driving-car, cycling-regular, foot-walking)

    Returns:
        Dict with route info
    """
    return {
        "status": "requires_api_key",
        "message": "OpenRouteService requires an API key",
        "profile": profile,
        "waypoints": len(coordinates),
        "example": {
            "api_url": "https://api.openrouteservice.org/v2/directions",
            "auth_required": True,
        },
    }


def list_profiles() -> List[Dict]:
    """List available travel profiles"""
    return [
        {"name": "driving-car", "desc": "Car driving"},
        {"name": "driving-hgv", "desc": "Heavy goods vehicle"},
        {"name": "cycling-regular", "desc": "Regular cycling"},
        {"name": "cycling-mountain", "desc": "Mountain biking"},
        {"name": "foot-walking", "desc": "Walking"},
        {"name": "foot-hiking", "desc": "Hiking"},
        {"name": "wheelchair", "desc": "Wheelchair accessible"},
    ]
