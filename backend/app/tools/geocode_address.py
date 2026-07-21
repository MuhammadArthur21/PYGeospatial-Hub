# geocode_address.py - Geocode an address to coordinates

def geocode_address(address: str, provider: str = "nominatim") -> dict:
    """
    Convert a street address or place name to geographic coordinates.

    Args:
        address: Full address or place name
        provider: Geocoding service provider

    Returns:
        Dict with coordinates
    """
    try:
        from geopy.geocoders import Nominatim

        geolocator = Nominatim(user_agent="pygeospatial-hub")
        location = geolocator.geocode(address)

        if location:
            return {
                "status": "success",
                "address": address,
                "lat": location.latitude,
                "lon": location.longitude,
                "display_name": location.address,
            }
        return {"status": "not_found", "address": address}

    except ImportError:
        # Fallback: return approximate coordinates
        return {
            "status": "approximate",
            "address": address,
            "message": "GeoPy not installed. Install with: pip install geopy",
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
