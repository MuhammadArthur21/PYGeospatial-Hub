# PyGeospatial Hub - Initial Test Suite
# QA testing strategy and basic tests

"""
Testing Strategy (per Section 14 of PYGeospatial.md):

1. Unit Testing - Individual functions in services & wrappers
2. Integration Testing - API ↔ Database ↔ Sandbox interaction
3. E2E Testing - Full user flows with Playwright
4. Security Testing - Sandbox escape attempts
5. Load Testing - Concurrent execution simulation
"""

import pytest
import json
from unittest.mock import Mock, patch


# ==== LIBRARY SERVICE TESTS ====

class TestLibraryService:
    """Test library registry operations"""

    def test_search_by_name(self):
        """Test searching libraries by name"""
        from app.services.library_service import LibraryService
        results = LibraryService.search_libraries(query="shapely")
        assert len(results) > 0
        assert any("shapely" in lib["name"].lower() for lib in results)

    def test_search_by_case_insensitive(self):
        """Test case-insensitive search"""
        from app.services.library_service import LibraryService
        results_upper = LibraryService.search_libraries(query="SHAPELY")
        results_lower = LibraryService.search_libraries(query="shapely")
        assert len(results_upper) == len(results_lower)

    def test_filter_by_difficulty(self):
        """Test filtering by difficulty level"""
        from app.services.library_service import LibraryService
        beginner_libs = LibraryService.search_libraries(difficulty="beginner")
        for lib in beginner_libs:
            assert lib["difficulty"] == "beginner"

    def test_get_nonexistent_library(self):
        """Test getting a library that doesn't exist"""
        from app.services.library_service import LibraryService
        result = LibraryService.get_library("nonexistent_lib_12345")
        assert result is None


# ==== STATIC SCAN TESTS ====

class TestStaticCodeScan:
    """Test security static code scanner"""

    def test_block_os_import(self):
        """Test blocking dangerous os module import"""
        from app.services.execution_service import static_code_scan
        safe, reason = static_code_scan("import os")
        assert not safe
        assert "import os" in reason.lower()

    def test_block_subprocess(self):
        """Test blocking subprocess"""
        from app.services.execution_service import static_code_scan
        safe, reason = static_code_scan("import subprocess\nsubprocess.run('ls')")
        assert not safe

    def test_allow_safe_code(self):
        """Test allowing safe geospatial code"""
        from app.services.execution_service import static_code_scan
        code = """
from shapely.geometry import Point
point = Point(106.8, -6.2)
print(point.x)
        """
        safe, reason = static_code_scan(code)
        assert safe

    def test_block_system_call(self):
        """Test blocking os.system calls"""
        from app.services.execution_service import static_code_scan
        safe, reason = static_code_scan("import os\nos.system('rm -rf /')")
        assert not safe

    def test_block_eval(self):
        """Test blocking eval()"""
        from app.services.execution_service import static_code_scan
        safe, reason = static_code_scan("eval('print(1)')")
        assert not safe


# ==== TOOLS TESTS ====

class TestGeospatialTools:
    """Test pre-built geospatial tools"""

    def test_calculate_distance(self):
        """Test distance calculation between Jakarta and Bandung"""
        from app.tools.buffer_geometry import calculate_distance
        result = calculate_distance(106.8, -6.2, 107.6, -6.9)
        assert result["distance_km"] > 100
        assert result["distance_km"] < 200

    def test_buffer_geometry_point(self):
        """Test buffer around a point"""
        from app.tools.buffer_geometry import buffer_geometry
        point_geojson = json.dumps({"type": "Point", "coordinates": [106.8, -6.2]})
        result = buffer_geometry(point_geojson, 0.1)
        geom = json.loads(result)
        assert geom["type"] == "Polygon"


# ==== WRAPPER TESTS ====

class TestShapelyWrapper:
    """Test Shapely wrapper functions"""

    def test_create_point(self):
        from app.geo_libs.core_geospatial.shapely_wrapper import create_point
        pt = create_point(106.8, -6.2)
        assert pt.x == 106.8
        assert pt.y == -6.2

    def test_calculate_area(self):
        from app.geo_libs.core_geospatial.shapely_wrapper import create_polygon, calculate_area
        poly = create_polygon([(0, 0), (1, 0), (1, 1), (0, 1)])
        area = calculate_area(poly)
        assert area == 1.0


class TestPyprojWrapper:
    """Test Pyproj wrapper functions"""

    def test_transform_coordinates(self):
        from app.geo_libs.core_geospatial.pyproj_wrapper import transform_coordinates
        x, y = transform_coordinates(106.8, -6.2)
        assert abs(x) > 0
        assert abs(y) > 0
