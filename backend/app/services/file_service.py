# PyGeospatial Hub - File Service
# Handles file uploads, validation, and storage management

"""
Service for managing uploaded geospatial datasets.
Supports shapefile, GeoJSON, GeoTIFF, LAS/LAZ formats.
"""

import os
import uuid
import json
import hashlib
from pathlib import Path
from typing import Optional, Dict, List
from datetime import datetime
from app.config import settings
from app.utils.logger import logger

UPLOAD_BASE = Path("data/uploads")


class FileService:
    """Manages file uploads, storage, and metadata"""

    @staticmethod
    def ensure_upload_dir(user_id: int) -> Path:
        """Create user upload directory if it doesn't exist"""
        user_dir = UPLOAD_BASE / str(user_id)
        user_dir.mkdir(parents=True, exist_ok=True)
        return user_dir

    @staticmethod
    def validate_file(filename: str, file_size: int) -> tuple:
        """
        Validate a file before upload.
        Returns (is_valid, error_message)
        """
        # Check extension
        ext = os.path.splitext(filename)[1].lower()
        allowed = settings.ALLOWED_EXTENSIONS.split(",")
        if ext not in allowed:
            return False, f"Extension {ext} not allowed. Allowed: {', '.join(allowed)}"

        # Check size
        max_size = settings.MAX_FILE_SIZE_MB * 1024 * 1024
        if file_size > max_size:
            return False, f"File too large. Maximum: {settings.MAX_FILE_SIZE_MB}MB"

        return True, ""

    @staticmethod
    def store_file(user_id: int, filename: str, content: bytes) -> Dict:
        """
        Store an uploaded file and return metadata.
        """
        user_dir = FileService.ensure_upload_dir(user_id)
        file_id = uuid.uuid4().hex[:12]
        ext = os.path.splitext(filename)[1].lower()
        stored_name = f"{file_id}{ext}"
        file_path = user_dir / stored_name

        # Write file
        with open(file_path, "wb") as f:
            f.write(content)

        # Calculate checksum
        sha256 = hashlib.sha256(content).hexdigest()

        metadata = {
            "id": file_id,
            "original_name": filename,
            "stored_name": stored_name,
            "path": str(file_path),
            "size_bytes": len(content),
            "size_mb": round(len(content) / (1024 * 1024), 2),
            "extension": ext,
            "sha256": sha256,
            "user_id": user_id,
            "uploaded_at": datetime.utcnow().isoformat(),
        }

        # Save metadata
        meta_path = user_dir / f"{file_id}.meta.json"
        with open(meta_path, "w") as f:
            json.dump(metadata, f, indent=2)

        logger.info(f"File stored: {filename} ({len(content)} bytes) for user {user_id}")
        return metadata

    @staticmethod
    def get_file_metadata(user_id: int, file_id: str) -> Optional[Dict]:
        """Get file metadata by ID"""
        meta_path = UPLOAD_BASE / str(user_id) / f"{file_id}.meta.json"
        if meta_path.exists():
            with open(meta_path) as f:
                return json.load(f)
        return None

    @staticmethod
    def list_user_files(user_id: int) -> List[Dict]:
        """List all files uploaded by a user"""
        user_dir = UPLOAD_BASE / str(user_id)
        if not user_dir.exists():
            return []

        files = []
        for meta_file in sorted(user_dir.glob("*.meta.json"), reverse=True):
            with open(meta_file) as f:
                files.append(json.load(f))
        return files

    @staticmethod
    def delete_file(user_id: int, file_id: str) -> bool:
        """Delete a file and its metadata"""
        meta = FileService.get_file_metadata(user_id, file_id)
        if not meta:
            return False

        # Delete file
        file_path = Path(meta["path"])
        if file_path.exists():
            file_path.unlink()

        # Delete metadata
        meta_path = UPLOAD_BASE / str(user_id) / f"{file_id}.meta.json"
        if meta_path.exists():
            meta_path.unlink()

        logger.info(f"File deleted: {meta['original_name']} for user {user_id}")
        return True

    @staticmethod
    def get_storage_usage(user_id: int) -> Dict:
        """Get storage usage statistics for a user"""
        files = FileService.list_user_files(user_id)
        total_bytes = sum(f.get("size_bytes", 0) for f in files)
        return {
            "file_count": len(files),
            "total_bytes": total_bytes,
            "total_mb": round(total_bytes / (1024 * 1024), 2),
            "quota_bytes": settings.MAX_FILE_SIZE_MB * 1024 * 1024,
        }
