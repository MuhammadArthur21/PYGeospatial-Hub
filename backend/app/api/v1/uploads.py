# PyGeospatial Hub - File Uploads API
# Handle spatial dataset uploads with FileService

from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends
from typing import Optional
from app.services.file_service import FileService
from app.utils.logger import logger

router = APIRouter()


@router.post("")
async def upload_file(
    file: UploadFile = File(...),
    name: Optional[str] = Form(None),
):
    """
    Upload a spatial dataset (shapefile, GeoJSON, GeoTIFF, LAS/LAZ).
    Stores file locally and returns metadata.
    """
    try:
        content = await file.read()
        filename = name or file.filename or "unnamed"

        # Validate
        valid, err = FileService.validate_file(filename, len(content))
        if not valid:
            raise HTTPException(status_code=400, detail=err)

        # Store (default user_id 0 for anonymous)
        metadata = FileService.store_file(user_id=0, filename=filename, content=content)

        logger.info(f"Upload successful: {filename} ({len(content)} bytes)")
        return metadata

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Upload failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@router.get("/{upload_id}")
async def get_upload_status(upload_id: str):
    """Get upload status and metadata"""
    metadata = FileService.get_file_metadata(user_id=0, file_id=upload_id)
    if not metadata:
        raise HTTPException(status_code=404, detail="Upload not found")
    return metadata


@router.get("")
async def list_uploads():
    """List all uploaded files"""
    files = FileService.list_user_files(user_id=0)
    return {"total": len(files), "files": files}


@router.delete("/{upload_id}")
async def delete_upload(upload_id: str):
    """Delete an uploaded file"""
    success = FileService.delete_file(user_id=0, file_id=upload_id)
    if not success:
        raise HTTPException(status_code=404, detail="Upload not found")
    return {"status": "deleted", "id": upload_id}
