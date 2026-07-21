# PyGeospatial Hub - File Uploads API
# Handle spatial dataset uploads

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class UploadResponse(BaseModel):
    id: int
    name: str
    file_type: str
    size_bytes: int
    status: str  # uploaded | processing | ready | failed


@router.post("", response_model=UploadResponse)
async def upload_file(
    file: UploadFile = File(...),
    name: Optional[str] = Form(None),
):
    """Upload a spatial dataset (shapefile, GeoJSON, GeoTIFF, LAS/LAZ)"""
    # TODO: Implement file upload with validation
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{upload_id}", response_model=UploadResponse)
async def get_upload_status(upload_id: int):
    """Get upload status and metadata"""
    raise HTTPException(status_code=404, detail="Upload not found")
