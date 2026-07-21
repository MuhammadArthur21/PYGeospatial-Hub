"""
Scikit-learn wrapper — Machine learning for spatial data.
Provides classification, clustering, and regression for geospatial analysis.
"""

from typing import Optional, Dict, List
import numpy as np


def classify_landcover(
    features: List[List[float]],
    labels: List[int],
    new_data: List[List[float]],
    method: str = "random_forest",
) -> Dict:
    """
    Classify land cover using ML.

    Args:
        features: Training feature vectors
        labels: Training labels
        new_data: New data to classify
        method: 'random_forest', 'svm', 'knn'

    Returns:
        Dict with predictions
    """
    try:
        if method == "random_forest":
            from sklearn.ensemble import RandomForestClassifier
            model = RandomForestClassifier(n_estimators=100, random_state=42)
        elif method == "svm":
            from sklearn.svm import SVC
            model = SVC(kernel='rbf', random_state=42)
        else:
            from sklearn.neighbors import KNeighborsClassifier
            model = KNeighborsClassifier(n_neighbors=5)

        model.fit(features, labels)
        predictions = model.predict(new_data)
        confidence = model.predict_proba(new_data).max(axis=1) if hasattr(model, "predict_proba") else None

        return {
            "status": "success",
            "classifier": method,
            "n_classes": len(set(labels)),
            "predictions": predictions.tolist(),
            "confidence": confidence.tolist() if confidence is not None else None,
        }

    except ImportError:
        return {"status": "error", "message": "scikit-learn not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def cluster_spatial(
    coordinates: List[List[float]],
    eps: float = 0.01,
    min_samples: int = 5,
) -> Dict:
    """
    Cluster spatial points using DBSCAN.

    Args:
        coordinates: List of [lon, lat] pairs
        eps: Maximum distance between points in a cluster
        min_samples: Minimum points per cluster

    Returns:
        Dict with cluster assignments
    """
    try:
        from sklearn.cluster import DBSCAN

        coords = np.array(coordinates)
        clustering = DBSCAN(eps=eps, min_samples=min_samples).fit(coords)

        n_clusters = len(set(clustering.labels_)) - (1 if -1 in clustering.labels_ else 0)

        return {
            "status": "success",
            "algorithm": "DBSCAN",
            "n_clusters": n_clusters,
            "n_noise": int((clustering.labels_ == -1).sum()),
            "labels": clustering.labels_.tolist(),
        }

    except ImportError:
        return {"status": "error", "message": "scikit-learn not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
