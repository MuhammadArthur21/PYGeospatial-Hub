# PyGeospatial Hub - File Handler
# Utilities for file upload, validation, and storage

import os
import uuid
from pathlib import Path
from app.config import settings
from app.utils.logger import logger


UPLOAD_DIR = Path("uploads")


def get_upload_path(user_id: int, filename: str) -> Path:
    """Generate a safe file path for uploads"""
    ext = os.path.splitext(filename)[1].lower()
    unique_name = f"{uuid.uuid4().hex}{ext}"
    user_dir = UPLOAD_DIR / str(user_id)
    user_dir.mkdir(parents=True, exist_ok=True)
    return user_dir / unique_name


def validate_file_size(file_size: int) -> bool:
    """Check if file size is within allowed limits"""
    max_bytes = settings.MAX_FILE_SIZE_MB * 1024 * 1024
    return file_size <= max_bytes


def get_file_type(filename: str) -> str:
    """Determine file type from extension"""
    ext = os.path.splitext(filename)[1].lower()
    type_map = {
        ".shp": "shapefile",
        ".geojson": "geojson",
        ".json": "geojson",
        ".tiff": "geotiff",
        ".tif": "geotiff",
        ".las": "las",
        ".laz": "laz",
    }
    return type_map.get(ext, "unknown")
