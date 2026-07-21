"""
SentinelSat — Search and download Sentinel satellite imagery.

Python API for searching and downloading Sentinel-1, Sentinel-2,
and Sentinel-3 satellite data from ESA's Copernicus Data Hub.
"""

from typing import Optional, List, Dict
from datetime import datetime, timedelta


def search_sentinel_data(
    footprint: str,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    max_records: int = 10,
    platform: str = "Sentinel-2",
) -> Dict:
    """
    Search for Sentinel satellite imagery.

    Args:
        footprint: WKT polygon or bounding box
        start_date: Start date string (YYYY-MM-DD)
        end_date: End date string (YYYY-MM-DD)
        max_records: Maximum number of results
        platform: Satellite platform ('Sentinel-1', 'Sentinel-2', 'Sentinel-3')

    Returns:
        Dict with search results
    """
    if start_date is None:
        start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    if end_date is None:
        end_date = datetime.now().strftime("%Y-%m-%d")

    try:
        from sentinelsat import SentinelAPI, read_geojson

        # Note: Actual API requires Copernicus credentials
        return {
            "status": "requires_auth",
            "message": "Sentinel API requires Copernicus Data Hub credentials",
            "query": {
                "platform": platform,
                "footprint": footprint,
                "date_range": (start_date, end_date),
                "max_records": max_records,
            },
            "example": {
                "api_url": "https://scihub.copernicus.eu/dhus",
                "auth_required": True,
            },
        }

    except ImportError:
        return {"status": "error", "message": "Sentinelsat not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_product_types(platform: str = "Sentinel-2") -> List[Dict]:
    """Get available product types for a Sentinel platform"""
    products = {
        "Sentinel-1": [
            {"name": "SLC", "description": "Single Look Complex"},
            {"name": "GRD", "description": "Ground Range Detected"},
        ],
        "Sentinel-2": [
            {"name": "MSIL1C", "description": "Top-of-atmosphere reflectance"},
            {"name": "MSIL2A", "description": "Bottom-of-atmosphere reflectance"},
        ],
        "Sentinel-3": [
            {"name": "OL_1_EFR", "description": "OLCI Level-1 Full Resolution"},
            {"name": "SL_1_RBT", "description": "SLSTR Level-1 Radiance"},
        ],
    }
    return products.get(platform, [])
