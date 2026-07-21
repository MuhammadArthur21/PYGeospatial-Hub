# PyGeospatial Hub - Application Constants

# File size limits (in bytes)
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB

# Allowed file extensions
ALLOWED_SPATIAL_EXTENSIONS = {
    ".shp": "Shapefile",
    ".geojson": "GeoJSON",
    ".json": "GeoJSON",
    ".tiff": "GeoTIFF",
    ".tif": "GeoTIFF",
    ".las": "LAS LiDAR",
    ".laz": "LAZ LiDAR",
    ".kml": "KML",
    ".kmz": "KMZ",
    ".csv": "CSV with coordinates",
    ".gpkg": "GeoPackage",
    ".gpx": "GPX",
}

# Difficulty levels
DIFFICULTY_LEVELS = ["beginner", "intermediate", "advanced"]

# Execution statuses
EXECUTION_STATUSES = ["pending", "queued", "running", "success", "failed", "timeout"]

# Default pagination
DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 100
