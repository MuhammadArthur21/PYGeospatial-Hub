# merge_shapefiles.py - Merge multiple vector files

def merge_shapefiles(file_paths: list, output_format: str = "GeoJSON") -> dict:
    """
    Merge multiple shapefiles/GeoJSON files into one.
    Uses GeoPandas to concatenate GeoDataFrames.
    """
    try:
        import geopandas as gpd

        gdfs = []
        for path in file_paths:
            try:
                gdf = gpd.read_file(path)
                if not gdf.empty:
                    gdfs.append(gdf)
            except Exception as e:
                return {"status": "error", "message": f"Failed to read {path}: {str(e)}"}

        if not gdfs:
            return {"status": "error", "message": "No valid files to merge"}

        merged = gpd.pd.concat(gdfs, ignore_index=True)

        return {
            "status": "success",
            "message": f"Merged {len(file_paths)} files into {len(merged)} features",
            "feature_count": len(merged),
            "columns": list(merged.columns),
        }

    except ImportError:
        return {"status": "error", "message": "GeoPandas not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
