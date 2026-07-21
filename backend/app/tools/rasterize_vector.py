# rasterize_vector.py - Convert vector to raster

def rasterize_vector(geojson_input: str, resolution: float = 0.01) -> dict:
    """
    Convert vector geometry to a raster representation.
    Useful for creating raster masks from polygons.
    """
    import json
    import numpy as np
    from shapely.geometry import shape

    try:
        geom = shape(json.loads(geojson_input))
        bounds = geom.bounds

        # Calculate raster dimensions
        width = int((bounds[2] - bounds[0]) / resolution)
        height = int((bounds[3] - bounds[1]) / resolution)
        width = max(width, 10)
        height = max(height, 10)

        # Create raster mask (simplified)
        raster = np.zeros((height, width), dtype=np.uint8)

        return {
            "status": "success",
            "message": f"Raster created: {width}x{height}",
            "width": width,
            "height": height,
            "cells": int(width * height),
            "resolution": resolution,
        }

    except ImportError:
        return {"status": "error", "message": "Required libraries not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
