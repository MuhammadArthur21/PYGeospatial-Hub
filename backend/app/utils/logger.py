# PyGeospatial Hub - Common Utilities

import logging
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger("pygeospatial-hub")


def get_file_extension(filename: str) -> str:
    """Get file extension in lowercase"""
    _, ext = os.path.splitext(filename)
    return ext.lower()


def is_allowed_file(filename: str, allowed_extensions: str) -> bool:
    """Check if file extension is in allowed list"""
    ext = get_file_extension(filename)
    return ext in [e.strip().lower() for e in allowed_extensions.split(",")]
