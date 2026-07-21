# PyGeospatial Hub - AI Assistant API Endpoint

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
from app.services.ai_assistant import GeoAIAssistant

router = APIRouter()
assistant = GeoAIAssistant()


class SuggestRequest(BaseModel):
    code: str
    error: Optional[str] = ""
    selected_libraries: Optional[list] = []


class ExplainCodeRequest(BaseModel):
    code: str


@router.post("/suggest")
async def get_suggestion(request: SuggestRequest):
    """Get AI-powered code suggestions and error analysis"""
    if request.error:
        suggestion = assistant.analyze_error(request.code, request.error)
    else:
        tips = assistant.optimize_suggestions(request.code)
        suggestion = "\n".join(tips) if tips else "✅ Kode terlihat baik! Tidak ada saran optimasi yang terdeteksi."
    return {"suggestion": suggestion}


@router.post("/explain")
async def explain_code_snippet(request: ExplainCodeRequest):
    """Get line-by-line AI explanation of geospatial Python code"""
    lines = request.code.strip().split("\n")
    explanations = []
    
    for idx, line in enumerate(lines, start=1):
        clean_line = line.strip()
        if not clean_line:
            continue
        if clean_line.startswith("import") or clean_line.startswith("from"):
            explanation = "Mengload library/modul geospasial ke lingkungan runtime Python."
        elif "gpd.read_file" in clean_line:
            explanation = "Membaca file data spasial (GeoJSON/Shapefile) ke dalam GeoDataFrame."
        elif ".buffer(" in clean_line:
            explanation = "Membuat zona penyangga (buffer geometry) dengan jarak tertentu di sekitar fitur spasial."
        elif "folium.Map" in clean_line:
            explanation = "Menginisialisasi peta web interaktif Folium dengan koordinat pusat tertentu."
        elif ".to_crs(" in clean_line:
            explanation = "Mengubah Sistem Referensi Koordinat (CRS) geometri ke proyeksi baru."
        else:
            explanation = "Mengeksekusi kalkulasi atau ekspresi Python."
            
        explanations.append({
            "line_number": idx,
            "code": line,
            "explanation": explanation
        })

    summary = f"Script terdiri dari {len(lines)} baris kode geospasial untuk pemrosesan spasial dan visualisasi."
    return {
        "summary": summary,
        "line_by_line": explanations
    }


@router.get("/explain/{topic}")
async def explain_concept(topic: str):
    """Explain a geospatial concept"""
    explanation = assistant.explain_concept(topic)
    return {"topic": topic, "explanation": explanation}


@router.get("/tips/{library}")
async def get_library_tips(library: str):
    """Get optimization tips for a specific library"""
    tips_map = {
        "geopandas": [
            "Gunakan `.to_crs('EPSG:3857')` sebelum operasi berbasis meter",
            "Hindari `iterrows()` - gunakan vectorized operations",
            "Tambahkan spatial index dengan `.sindex` untuk query cepat",
        ],
        "shapely": [
            "Selalu validasi geometry dengan `.is_valid` sebelum operasi",
            "Gunakan `.buffer(0)` untuk memperbaiki geometry yang invalid",
            "Prefer `STRtree` untuk bulk spatial queries",
        ],
        "rasterio": [
            "Gunakan windowed reading untuk file besar",
            "Set `nodata` saat membuat raster baru",
            "Gunakan context manager `with rasterio.open()` agar file tertutup otomatis",
        ],
    }
    return {"library": library, "tips": tips_map.get(library, ["Tidak ada tips tersedia untuk library ini."])}
