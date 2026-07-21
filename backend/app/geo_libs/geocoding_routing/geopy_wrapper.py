"""
GeoPy — Python geocoding toolbox.

Geocoding and reverse geocoding with support for multiple providers
(Nominatim, Google, Bing, ArcGIS, etc.).
"""

from typing import Optional, List, Dict


def geocode(
    address: str,
    provider: str = "nominatim",
    timeout: int = 10,
) -> Dict:
    """
    Geocode an address to coordinates.

    Args:
        address: Street address or place name
        provider: Geocoding service provider
        timeout: Request timeout in seconds

    Returns:
        Dict with geocoding result
    """
    try:
        import geopy.geocoders

        geolocator_class = getattr(geopy.geocoders, provider.capitalize(), None)
        if geolocator_class is None:
            return {"status": "error", "message": f"Unknown provider: {provider}"}

        geolocator = geolocator_class(user_agent="pygeospatial-hub", timeout=timeout)
        location = geolocator.geocode(address)

        if location:
            return {
                "status": "success",
                "address": location.address,
                "lat": location.latitude,
                "lon": location.longitude,
                "altitude": location.altitude if hasattr(location, "altitude") else None,
                "raw": str(location.raw)[:200] if hasattr(location, "raw") else "",
            }
        return {"status": "not_found", "message": f"Address '{address}' not found"}

    except ImportError:
        return {"status": "error", "message": "GeoPy not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def reverse_geocode(
    lat: float,
    lon: float,
    provider: str = "nominatim",
) -> Dict:
    """
    Reverse geocode coordinates to an address.

    Args:
        lat: Latitude
        lon: Longitude
        provider: Geocoding service provider

    Returns:
        Dict with address information
    """
    try:
        import geopy.geocoders

        geolocator_class = getattr(geopy.geocoders, provider.capitalize(), None)
        if geolocator_class is None:
            return {"status": "error", "message": f"Unknown provider: {provider}"}

        geolocator = geolocator_class(user_agent="pygeospatial-hub")
        location = geolocator.reverse(f"{lat}, {lon}")

        if location:
            return {
                "status": "success",
                "address": location.address,
                "lat": location.latitude,
                "lon": location.longitude,
                "raw": str(location.raw)[:200] if hasattr(location, "raw") else "",
            }
        return {"status": "not_found", "message": f"Coordinates ({lat}, {lon}) not found"}

    except ImportError:
        return {"status": "error", "message": "GeoPy not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
