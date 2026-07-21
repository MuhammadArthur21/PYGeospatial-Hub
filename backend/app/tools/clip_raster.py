# clip_raster.py - Clip raster to polygon boundary

def clip_raster_by_polygon(raster_path: str, geojson_polygon: str) -> dict:
    """
    Clip a raster file to a polygon boundary.
    Requires Rasterio and a valid raster file.
    """
    import json
    from shapely.geometry import shape

    try:
        import rasterio
        from rasterio.mask import mask

        polygon = shape(json.loads(geojson_polygon))

        with rasterio.open(raster_path) as src:
            out_image, out_transform = mask(src, [polygon], crop=True)
            out_meta = src.meta.copy()

        return {
            "status": "success",
            "message": f"Clipped raster: {out_image.shape}",
            "width": out_image.shape[2],
            "height": out_image.shape[1],
            "bands": out_image.shape[0] if out_image.ndim > 2 else 1,
        }

    except ImportError:
        return {"status": "error", "message": "Rasterio not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
