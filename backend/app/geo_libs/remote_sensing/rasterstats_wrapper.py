"""
Rasterstats — Summarize raster data based on vector geometries.

Computes zonal statistics by overlaying vector geometries
on raster data and calculating summary metrics.
"""

from typing import Optional, Dict, List


def zonal_stats(
    vector_geojson: dict,
    raster_path: str,
    stats: Optional[List[str]] = None,
) -> Dict:
    """
    Compute zonal statistics for vector geometries on a raster.

    Args:
        vector_geojson: GeoJSON FeatureCollection or single geometry
        raster_path: Path to raster file
        stats: Statistics to compute (default: min, max, mean)

    Returns:
        Dict with zonal statistics
    """
    if stats is None:
        stats = ["min", "max", "mean", "count"]

    try:
        import rasterstats as rs

        result = rs.zonal_stats(
            vector_geojson,
            raster_path,
            stats=stats,
            geojson_out=True,
        )

        return {
            "status": "success",
            "features_processed": len(result),
            "statistics": stats,
            "results": result[:5],  # First 5 features
        }

    except ImportError:
        return {"status": "error", "message": "Rasterstats not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
