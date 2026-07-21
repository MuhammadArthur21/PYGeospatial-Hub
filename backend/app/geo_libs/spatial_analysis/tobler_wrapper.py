"""
Tobler — Areal interpolation and dasymetric mapping.

Provides area-weighted and dasymetric interpolation methods
for transferring data between spatial units.
"""

from typing import Optional, Dict, List


def area_weighted_interpolation(
    source_geojson: dict,
    target_geojson: dict,
    variable: str = "pop_est",
) -> Dict:
    """
    Perform area-weighted interpolation.

    Args:
        source_geojson: Source zone geometries with data
        target_geojson: Target zone geometries
        variable: Variable name to interpolate

    Returns:
        Dict with interpolation result
    """
    try:
        import tobler

        result = tobler.area_weighted.area_weighted(
            source_geojson,
            target_geojson,
            variable,
        )

        return {
            "status": "success",
            "method": "area_weighted",
            "variable": variable,
            "result_summary": f"Interpolated {variable} to {len(result)} target zones",
        }

    except ImportError:
        return {"status": "error", "message": "Tobler not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def dasymetric_mapping(
    source_geojson: dict,
    target_geojson: dict,
    variable: str,
    density_geojson: Optional[dict] = None,
) -> Dict:
    """
    Perform dasymetric mapping using auxiliary density information.

    Args:
        source_geojson: Source zones
        target_geojson: Target zones
        variable: Variable to interpolate
        density_geojson: Optional density layer

    Returns:
        Dict with dasymetric result
    """
    try:
        import tobler

        result = tobler.dasymetric.dasymetric(
            source_geojson,
            target_geojson,
            variable,
            density_geojson,
        )

        return {
            "status": "success",
            "method": "dasymetric",
            "variable": variable,
        }

    except ImportError:
        return {"status": "error", "message": "Tobler not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
