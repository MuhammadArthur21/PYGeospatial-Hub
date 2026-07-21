# Shapely Guide — Geometry Operations

Shapely is a Python library for manipulation and analysis of planar geometric objects.

## Installation

```bash
pip install shapely
```

## Basic Geometries

```python
from shapely.geometry import Point, LineString, Polygon

point = Point(106.8, -6.2)
line = LineString([(106.7, -6.3), (106.9, -6.1)])
polygon = Polygon([(106.7, -6.3), (106.9, -6.3), (106.9, -6.1), (106.7, -6.1)])
```

## Spatial Operations

```python
# Buffer
buffered = polygon.buffer(0.01)

# Intersection
intersection = polygon.intersection(other_polygon)

# Within check
point.within(polygon)

# Distance
point.distance(polygon)
```

## Try It

Open the [Sandbox](/sandbox?library=shapely) with a pre-configured Shapely template.
