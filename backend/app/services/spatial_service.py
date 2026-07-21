# PyGeospatial Hub - Spatial Service
# Advanced geospatial analysis and processing

"""
Service for complex geospatial operations combining multiple libraries.
Provides high-level spatial analysis functions.
"""

from typing import Optional, Dict, List, Tuple
from shapely.geometry import shape, mapping, Point
from app.utils.logger import logger


class SpatialService:
    """High-level spatial analysis service"""

    @staticmethod
    def analyze_geometry(geojson_input: dict) -> Dict:
        """
        Analyze a geometry and return comprehensive metrics.

        Args:
            geojson_input: GeoJSON geometry object

        Returns:
            Dict with geometric properties
        """
        geom = shape(geojson_input)
        result = {
            "type": geom.geom_type,
            "is_valid": geom.is_valid,
            "area": geom.area if hasattr(geom, "area") else 0,
            "length": geom.length if hasattr(geom, "length") else 0,
            "bounds": list(geom.bounds) if hasattr(geom, "bounds") else [],
            "centroid": list(geom.centroid.coords[0]) if hasattr(geom, "centroid") else [],
        }
        return result

    @staticmethod
    def find_overlaps(geojson_collection: dict) -> List[Dict]:
        """
        Find overlapping features in a collection.

        Args:
            geojson_collection: GeoJSON FeatureCollection

        Returns:
            List of overlapping feature pairs
        """
        features = geojson_collection.get("features", [])
        overlaps = []

        for i, feat_a in enumerate(features):
            geom_a = shape(feat_a["geometry"])
            for j, feat_b in enumerate(features[i + 1:], i + 1):
                geom_b = shape(feat_b["geometry"])
                if geom_a.intersects(geom_b):
                    overlap = geom_a.intersection(geom_b)
                    overlaps.append({
                        "feature_a": i,
                        "feature_b": j,
                        "overlap_area": overlap.area,
                        "overlap_geojson": mapping(overlap),
                    })

        return overlaps

    @staticmethod
    def nearest_neighbor(
        target_geojson: dict,
        candidates_geojson: dict,
        max_results: int = 5,
    ) -> List[Dict]:
        """
        Find nearest neighbors to a target geometry.

        Args:
            target_geojson: Target geometry
            candidates_geojson: GeoJSON FeatureCollection of candidates
            max_results: Maximum number of results

        Returns:
            List of nearest neighbors sorted by distance
        """
        target = shape(target_geojson)
        target_center = target.centroid if hasattr(target, "centroid") else target

        candidates = candidates_geojson.get("features", [])
        distances = []

        for idx, candidate in enumerate(candidates):
            cand_geom = shape(candidate["geometry"])
            cand_center = cand_geom.centroid if hasattr(cand_geom, "centroid") else cand_geom
            distance = target_center.distance(cand_center)
            distances.append({
                "index": idx,
                "distance": distance,
                "properties": candidate.get("properties", {}),
                "geometry": mapping(cand_geom),
            })

        distances.sort(key=lambda x: x["distance"])
        return distances[:max_results]

    @staticmethod
    def coordinate_summary(lon: float, lat: float) -> Dict:
        """
        Get geographic context for a coordinate.

        Args:
            lon: Longitude
            lat: Latitude

        Returns:
            Dict with geographic info
        """
        point = Point(lon, lat)
        return {
            "coordinates": {"lon": lon, "lat": lat},
            "hemisphere_north": lat > 0,
            "hemisphere_east": lon > 0,
            "latitude_band": "Equatorial" if abs(lat) < 23.5 else
                             "Tropical" if abs(lat) < 35 else
                             "Temperate" if abs(lat) < 66.5 else "Polar",
            "utm_zone": int((lon + 180) / 6) + 1,
        }
