# GeoPandas Guide — Spatial Data Analysis

GeoPandas extends pandas with geospatial capabilities, making it easy to work with vector data.

## Installation

```bash
pip install geopandas
```

## Reading Data

```python
import geopandas as gpd

# Read from file
gdf = gpd.read_file('data.geojson')

# Load sample data
world = gpd.read_file('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')
```

## Basic Operations

```python
# Filter by attribute
asia = world[world['continent'] == 'Asia']

# Calculate areas
asia['area_km2'] = asia.geometry.area / 1e6

# Spatial join
joined = gpd.sjoin(gdf1, gdf2, predicate='intersects')
```

## Visualization

```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(10, 6))
asia.plot(ax=ax, color='#99AD7A', edgecolor='white')
plt.show()
```

## Try It

Open the [Sandbox](/sandbox?library=geopandas) with a pre-configured GeoPandas template.
