"""
PySAL — Python Spatial Analysis Library for geospatial data science.

Provides comprehensive spatial statistical analysis including
autocorrelation, clustering, and regression.
"""

from typing import Optional, Dict, List


def calculate_moran_i(values: List[float], weights_matrix: List[List[float]]) -> Dict:
    """
    Calculate Global Moran's I for spatial autocorrelation.

    Args:
        values: List of observed values
        weights_matrix: Spatial weights matrix

    Returns:
        Dict with Moran's I statistics
    """
    try:
        import libpysal
        import esda

        w = libpysal.weights.full2W(weights_matrix)
        moran = esda.Moran(values, w)

        return {
            "status": "success",
            "moran_i": moran.I,
            "expected_i": moran.EI,
            "p_value": moran.p_sim,
            "z_score": moran.z_sim,
            "significant": moran.p_sim < 0.05,
        }

    except ImportError:
        return {"status": "error", "message": "PySAL not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def list_analysis_methods() -> List[Dict]:
    """List available spatial analysis methods"""
    return [
        {"name": "Moran's I", "type": "Global Autocorrelation", "description": "Measure overall spatial clustering"},
        {"name": "LISA", "type": "Local Autocorrelation", "description": "Local Indicators of Spatial Association"},
        {"name": "Geary's C", "type": "Global Autocorrelation", "description": "Distance-based spatial correlation"},
        {"name": "K-Means", "type": "Clustering", "description": "Spatial clustering analysis"},
        {"name": "SKATER", "type": "Clustering", "description": "Spatial cluster identification"},
    ]
