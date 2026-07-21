"""
Geocoder — Simple geocoding with multiple provider support.

Lightweight geocoding library supporting Google, Bing,
ArcGIS, and many other providers.
"""

from typing import Optional, Dict, List


def geocode_location(address: str, provider: str = "arcgis") -> Dict:
    """
    Geocode an address to coordinates.

    Args:
        address: Street address or place name
        provider: Geocoding provider

    Returns:
        Dict with geocoded result
    """
    try:
        import geocoder

        result = geocoder.get(address, provider=provider)

        if result and result.ok:
            return {
                "status": "success",
                "address": result.address,
                "lat": result.latlng[0] if result.latlng else None,
                "lon": result.latlng[1] if result.latlng else None,
                "provider": provider,
                "quality": result.quality if hasattr(result, "quality") else None,
            }
        return {"status": "not_found", "message": f"Address '{address}' not found"}

    except ImportError:
        return {"status": "error", "message": "Geocoder not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def list_providers() -> List[str]:
    """List available geocoding providers"""
    return [
        "arcgis", "bing", "google", "tomtom", "mapbox",
        "openstreetmap", "geonames", "here", "baidu",
    ]
