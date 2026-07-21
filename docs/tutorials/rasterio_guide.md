# Rasterio Guide — Raster Data Processing

Rasterio provides Pythonic access to GDAL for reading and writing geospatial raster data.

## Installation

```bash
pip install rasterio
```

## Reading Rasters

```python
import rasterio

with rasterio.open('satellite.tif') as src:
    band = src.read(1)
    print(f'CRS: {src.crs}')
    print(f'Bounds: {src.bounds}')
    print(f'Shape: {band.shape}')
```

## Writing Rasters

```python
import numpy as np
from rasterio.transform import from_bounds

data = np.random.rand(100, 100).astype('float32')
with rasterio.open('output.tif', 'w', driver='GTiff',
                    height=100, width=100, count=1,
                    dtype='float32', crs='EPSG:4326') as dst:
    dst.write(data, 1)
```

## Clipping

Clip a raster to a polygon boundary using `rasterio.mask.mask`.

## Try It

Open the [Sandbox](/sandbox?library=rasterio) with a pre-configured Rasterio template.
