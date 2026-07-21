"""
PDAL — Point Data Abstraction Library for point cloud processing.

Provides pipeline-based processing for LiDAR and other
point cloud data formats.
"""

from typing import Optional, Dict, List


def create_pipeline(stream: bool = False) -> Dict:
    """
    Create a PDAL processing pipeline configuration.

    Args:
        stream: Enable streaming mode for large datasets

    Returns:
        Dict with pipeline config
    """
    return {
        "type": "pdal_pipeline",
        "pipeline": [],
        "stream": stream,
        "description": "PDAL pipeline for point cloud processing",
    }


def add_reader(pipeline: Dict, filepath: str) -> Dict:
    """
    Add a reader stage to the pipeline.

    Args:
        pipeline: Existing pipeline config
        filepath: Input file path (.las, .laz, .ply, etc.)

    Returns:
        Updated pipeline config
    """
    import os

    ext = os.path.splitext(filepath)[1].lower()
    reader_type = {
        ".las": "readers.las",
        ".laz": "readers.las",
        ".ply": "readers.ply",
    }.get(ext, "readers.las")

    pipeline["pipeline"].append({
        "type": reader_type,
        "filename": filepath,
    })
    return pipeline


def add_filter(pipeline: Dict, filter_type: str, params: dict = None) -> Dict:
    """
    Add a filter stage to the pipeline.

    Args:
        pipeline: Existing pipeline config
        filter_type: Filter type name
        params: Filter parameters

    Returns:
        Updated pipeline config
    """
    if params is None:
        params = {}

    pipeline["pipeline"].append({
        "type": f"filters.{filter_type}",
        **params,
    })
    return pipeline
