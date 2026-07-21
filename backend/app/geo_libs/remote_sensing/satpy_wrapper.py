"""
Satpy — Reading, manipulating, and writing satellite data.

Satpy provides capabilities for processing satellite remote sensing data
from various Earth-observing missions.
"""

from typing import Optional, Dict, List


def list_available_sensors() -> List[str]:
    """List available satellite sensors supported by Satpy"""
    return [
        "viirs", "modis", "avhrr", "seviri", "abi", "ahi",
        "msi", "oli", "etm", "tm", "sentinel-2", "sentinel-3",
    ]


def load_satellite_data(
    filenames: List[str],
    sensor: str = "viirs",
    bands: Optional[List[str]] = None,
) -> Dict:
    """
    Load satellite data from files.

    Args:
        filenames: List of satellite data files
        sensor: Satellite sensor name
        bands: List of bands to load (e.g., ['I01', 'I02'])

    Returns:
        Dict with scene metadata
    """
    try:
        from satpy import Scene
        import xarray as xr

        scene = Scene(filenames=filenames, reader=sensor)
        available = scene.available_dataset_names()

        if bands:
            load_bands = [b for b in bands if b in available]
            scene.load(load_bands)
        else:
            scene.load(available[:5])  # Load first 5 by default

        return {
            "status": "success",
            "sensor": sensor,
            "files": len(filenames),
            "available_bands": available[:20],
            "loaded_bands": list(scene.keys()) if bands else [],
        }

    except ImportError:
        return {"status": "error", "message": "Satpy not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def create_composite(
    red_band: str = "I01",
    green_band: str = "I02",
    blue_band: str = "I03",
) -> Dict:
    """
    Create a true-color composite from RGB bands.

    Returns composite configuration that can be applied to satellite scenes.
    """
    return {
        "composite": "true_color",
        "red": red_band,
        "green": green_band,
        "blue": blue_band,
        "description": f"RGB composite using {red_band}, {green_band}, {blue_band}",
    }
