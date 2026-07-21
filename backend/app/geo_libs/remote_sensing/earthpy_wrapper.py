"""
EarthPy — Helper functions for Earth science data workflows.

Simplifies common earth science data tasks including
download, plot, and stack operations.
"""

from typing import Optional, Dict, List


def download_data(url: str, output_path: str) -> Dict:
    """
    Download earth science data from a URL.

    Args:
        url: Data download URL
        output_path: Local file path to save

    Returns:
        Dict with download status
    """
    import os

    try:
        import earthpy.data as data

        data.download(url, output_path)

        return {
            "status": "success",
            "url": url,
            "saved_to": output_path,
            "size_bytes": os.path.getsize(output_path) if os.path.exists(output_path) else 0,
        }

    except ImportError:
        return {
            "status": "fallback",
            "message": "EarthPy not available. Use direct download.",
            "url": url,
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
