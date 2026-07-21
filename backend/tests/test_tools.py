# PyGeospatial Hub - Tool Tests
# Unit tests for pre-built geospatial tools

import pytest
import json


class TestBufferGeometry:
    """Test buffer_geometry tool functions"""

    def test_calculate_distance_jakarta_bandung(self):
        """Test distance between two Indonesian cities"""
        from app.tools.buffer_geometry import calculate_distance
        result = calculate_distance(106.8, -6.2, 107.6, -6.9)
        assert result["distance_km"] > 100
        assert result["distance_km"] < 200
        assert result["from"]["lon"] == 106.8

    def test_calculate_distance_same_point(self):
        """Test distance from a point to itself is zero"""
        from app.tools.buffer_geometry import calculate_distance
        result = calculate_distance(106.8, -6.2, 106.8, -6.2)
        assert result["distance_meters"] == 0

    def test_buffer_geometry_point(self):
        """Test creating a buffer around a point"""
        from app.tools.buffer_geometry import buffer_geometry
        point_geojson = json.dumps({"type": "Point", "coordinates": [106.8, -6.2]})
        result = buffer_geometry(point_geojson, 0.1)
        geom = json.loads(result)
        assert geom["type"] == "Polygon"
        assert len(geom["coordinates"][0]) > 4  # Valid polygon has many vertices

    def test_merge_geojson_empty(self):
        """Test merging with empty list"""
        from app.tools.buffer_geometry import merge_geojson
        result = json.loads(merge_geojson([]))
        assert result["type"] == "FeatureCollection"
        assert result["features"] == []

    def test_spatial_join(self):
        """Test spatial join - finding points in polygon"""
        from app.tools.buffer_geometry import spatial_join_contains
        polygon = json.dumps({
            "type": "Polygon",
            "coordinates": [[[106.7, -6.3], [106.9, -6.3], [106.9, -6.1], [106.7, -6.1], [106.7, -6.3]]]
        })
        points = json.dumps({
            "type": "FeatureCollection",
            "features": [
                {"type": "Feature", "geometry": {"type": "Point", "coordinates": [106.8, -6.2]}},
                {"type": "Feature", "geometry": {"type": "Point", "coordinates": [107.0, -6.5]}},
            ]
        })
        results = spatial_join_contains(polygon, points)
        assert len(results) == 1  # Only first point is inside


class TestClipRaster:
    """Test raster clipping tool"""

    def test_clip_raster_missing_file(self):
        """Test handling of missing raster file"""
        from app.tools.clip_raster import clip_raster_by_polygon
        polygon = json.dumps({"type": "Point", "coordinates": [106.8, -6.2]})
        result = clip_raster_by_polygon("nonexistent.tif", polygon)
        assert result["status"] == "error"


class TestMergeShapefiles:
    """Test shapefile merging tool"""

    def test_merge_empty_list(self):
        """Test merge with empty path list"""
        from app.tools.merge_shapefiles import merge_shapefiles
        result = merge_shapefiles([])
        assert result["status"] == "error"
        assert "No valid files" in result["message"]


class TestNetworkAnalysis:
    """Test network analysis tool"""

    def test_analyze_network_no_osmnx(self):
        """Test graceful handling when OSMnx is not installed"""
        from app.tools.analyze_network import analyze_network
        result = analyze_network("Jakarta")
        assert result["status"] == "error"
        assert "OSMnx not available" in result["message"]
