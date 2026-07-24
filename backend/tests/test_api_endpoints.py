import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_libraries_list():
    response = client.get("/api/v1/libraries")
    assert response.status_code == 200
    res_json = response.json()
    assert "data" in res_json
    assert isinstance(res_json["data"], list)
    assert res_json["total"] > 0

def test_read_comments_by_target():
    response = client.get("/api/v1/comments/geopandas-buffer?target_type=script")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_post_comment():
    payload = {
        "target_type": "script",
        "target_id": "test-script-1",
        "content": "UnitTest comment body",
        "author": "PyTest Agent"
    }
    response = client.post("/api/v1/comments", json=payload)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()
    assert data["content"] == "UnitTest comment body"
    assert data["author"] == "PyTest Agent"

def test_get_subscriptions_usage():
    response = client.get("/api/v1/subscriptions/usage")
    assert response.status_code == 200
    data = response.json()
    assert "tier" in data
    assert "remaining_runs" in data

def test_ai_suggestion():
    payload = {
        "code": "import shapely\np = Point(0, 0)",
        "error_msg": "NameError: name 'Point' is not defined"
    }
    response = client.post("/api/v1/ai/suggest", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "suggestion" in data

def test_ai_explain_code():
    payload = {
        "code": "import geopandas as gpd\ngdf = gpd.read_file('test.geojson')\ngdf['geom'] = gdf.buffer(0.01)"
    }
    response = client.post("/api/v1/ai/explain", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "summary" in data
    assert "line_by_line" in data
    assert len(data["line_by_line"]) == 3

def test_spatial_converter():
    payload = {
        "source_format": "geojson",
        "target_format": "kml",
        "data": '{"type": "FeatureCollection", "features": []}',
        "target_crs": "EPSG:4326"
    }
    response = client.post("/api/v1/converter/convert", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "summary" in data
