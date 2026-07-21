"""
Laspy — Read and write LAS/LAZ LiDAR point cloud files.

Provides capabilities for working with LiDAR point cloud data
in LAS and LAZ compressed formats.
"""

from typing import Optional, Dict, List
import numpy as np


def read_las_info(filepath: str) -> Dict:
    """
    Read LAS/LAZ file metadata.

    Args:
        filepath: Path to LAS/LAZ file

    Returns:
        Dict with file metadata
    """
    try:
        import laspy

        with laspy.open(filepath) as f:
            header = f.header

        return {
            "status": "success",
            "file": filepath,
            "point_count": header.point_count,
            "version": f"{header.version.major}.{header.version.minor}",
            "format": header.point_format_id,
            "bounds": {
                "x": (header.min_x, header.max_x),
                "y": (header.min_y, header.max_y),
                "z": (header.min_z, header.max_z),
            },
            "scales": (header.x_scale, header.y_scale, header.z_scale),
            "offsets": (header.x_offset, header.y_offset, header.z_offset),
        }

    except ImportError:
        return {"status": "error", "message": "Laspy not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def read_point_cloud(
    filepath: str,
    dimensions: Optional[List[str]] = None,
    max_points: int = 100000,
) -> Dict:
    """
    Read point cloud data from LAS/LAZ file.

    Args:
        filepath: Path to LAS/LAZ file
        dimensions: Point dimensions to read (default: x, y, z)
        max_points: Maximum points to read

    Returns:
        Dict with point cloud data
    """
    if dimensions is None:
        dimensions = ["x", "y", "z"]

    try:
        import laspy

        las = laspy.read(filepath)
        n_points = min(len(las.points), max_points)

        data = {}
        for dim in dimensions:
            if hasattr(las, dim):
                data[dim] = getattr(las, dim)[:n_points].tolist()

        return {
            "status": "success",
            "points_read": n_points,
            "total_points": len(las.points),
            "dimensions": list(data.keys()),
            "data_sample": {k: v[:5] for k, v in data.items()},
            "bounds": {
                "x": (float(las.x.min()), float(las.x.max())),
                "y": (float(las.y.min()), float(las.y.max())),
                "z": (float(las.z.min()), float(las.z.max())),
            },
        }

    except ImportError:
        return {"status": "error", "message": "Laspy not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
