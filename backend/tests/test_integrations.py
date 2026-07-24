# PyGeospatial Hub - Integration Tests
# Tests for API endpoints and service integration

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


class TestAPIEndpoints:
    """Test core API endpoints"""

    def test_root_endpoint(self):
        """Test the root health check endpoint"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "name" in data
        assert "version" in data
        assert data["status"] == "running"

    def test_health_check(self):
        """Test health check endpoint"""
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

    def test_libraries_list(self):
        """Test libraries endpoint returns 200"""
        response = client.get("/api/v1/libraries")
        assert response.status_code == 200
        data = response.json()
        # API returns paginated format: { data: [...], total, page, limit }
        if isinstance(data, dict):
            assert "data" in data
            assert isinstance(data["data"], list)
            assert data["total"] > 0
        else:
            assert isinstance(data, list)

    def test_categories_list(self):
        """Test categories endpoint returns 200"""
        response = client.get("/api/v1/categories")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

    def test_tools_list(self):
        """Test tools endpoint returns 200"""
        response = client.get("/api/v1/tools")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

    def test_sandbox_execute(self):
        """Test sandbox execution endpoint"""
        response = client.post("/api/v1/sandbox/execute", json={
            "code": "print('hello')",
            "libraries": [],
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "execution_id" in data
        assert data["status"] in ("success", "queued", "failed"), f"Unexpected status: {data['status']}"