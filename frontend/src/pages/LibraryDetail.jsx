import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, ExternalLink, BookOpen, PlayCircle,
  Code, Tag, Layers
} from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/Card'

const libraryData = {
  shapely: {
    name: 'Shapely',
    version: '2.1.0',
    description: 'Manipulation and analysis of planar geometric objects. Shapely provides geometric operations for points, lines, and polygons.',
    difficulty: 'beginner',
    docs: 'https://shapely.readthedocs.io/',
    pypi: 'https://pypi.org/project/Shapely/',
    tags: ['geometry', 'vector', 'topology'],
    useCases: ['Buffer geometry', 'Intersect shapes', 'Simplify polygons', 'Spatial predicates'],
    code: `from shapely.geometry import Point, Polygon

# Create a point
point = Point(106.8, -6.2)

# Create a polygon
polygon = Polygon([
  (106.7, -6.3),
  (106.9, -6.3),
  (106.9, -6.1),
  (106.7, -6.1)
])

# Check if point is in polygon
print(polygon.contains(point))
print(point.within(polygon))`,
  },
  geopandas: {
    name: 'GeoPandas',
    version: '1.0.1',
    description: 'Extends pandas to support geospatial data types and operations. Makes working with geospatial data in Python easier.',
    difficulty: 'intermediate',
    docs: 'https://geopandas.readthedocs.io/',
    pypi: 'https://pypi.org/project/geopandas/',
    tags: ['dataframe', 'vector', 'analysis'],
    useCases: ['Read shapefiles', 'Spatial join', 'Choropleth maps', 'Data aggregation'],
    code: `import geopandas as gpd
gdf = gpd.read_file('sample.geojson')
print(gdf.head())
print(gdf.geometry.area)
joined = gpd.sjoin(gdf, other_gdf, predicate='intersects')`,
  },
  rasterio: {
    name: 'Rasterio',
    version: '1.4.1',
    description: 'Professional Python library for reading and writing geospatial raster data. Built on top of GDAL.',
    difficulty: 'intermediate',
    docs: 'https://rasterio.readthedocs.io/',
    pypi: 'https://pypi.org/project/rasterio/',
    tags: ['raster', 'band', 'satellite', 'tiff'],
    useCases: ['Read satellite imagery', 'Clip raster by polygon', 'Reproject rasters', 'Extract band statistics'],
    code: `import rasterio
with rasterio.open('image.tif') as src:
    band = src.read(1)
    print(f"CRS: {src.crs}")
    print(f"Bounds: {src.bounds}")
    print(f"Min: {band.min()}, Max: {band.max()}")`,
  },
  pyproj: {
    name: 'Pyproj',
    version: '3.6.1',
    description: 'Python bindings for PROJ cartographic transformations and coordinate system operations.',
    difficulty: 'beginner',
    docs: 'https://pyproj.readthedocs.io/',
    pypi: 'https://pypi.org/project/pyproj/',
    tags: ['crs', 'projection', 'transformation'],
    useCases: ['Reproject coordinates', 'Transform between CRS', 'Calculate geodesic distance'],
    code: `from pyproj import Transformer
transformer = Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True)
x, y = transformer.transform(106.8, -6.2)
print(f"Mercator: {x:.2f}, {y:.2f}")`,
  },
}

export default function LibraryDetail() {
  const { id } = useParams()
  const lib = libraryData[id]
  const [copied, setCopied] = useState(false)

  if (!lib) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-earth-900 mb-4">Library Not Found</h2>
        <p className="text-earth-500 mb-8">The library you're looking for doesn't exist.</p>
        <Link to="/libraries" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Libraries
        </Link>
      </div>
    )
  }

  const copyCode = () => {
    navigator.clipboard.writeText(lib.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/libraries" className="inline-flex items-center gap-2 text-earth-500 hover:text-primary-600 mb-6 transition-colors">
        <ArrowLeft size={16} />
        Back to Libraries
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-300 
                            flex items-center justify-center text-2xl text-white font-bold shadow-md">
                {lib.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <CardTitle className="text-2xl">{lib.name}</CardTitle>
                  <span className={`badge ${
                    lib.difficulty === 'beginner' ? 'badge-beginner' :
                    lib.difficulty === 'intermediate' ? 'badge-intermediate' : 'badge-advanced'
                  }`}>
                    {lib.difficulty}
                  </span>
                </div>
                <p className="text-sm text-earth-500">v{lib.version}</p>
              </div>
            </CardHeader>
            <p className="text-earth-700 leading-relaxed">{lib.description}</p>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code size={18} className="text-primary-600" />
                <CardTitle>Quick Start Example</CardTitle>
              </div>
              <button onClick={copyCode} className="btn-ghost text-xs">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </CardHeader>
            <div className="code-area p-4 overflow-x-auto">
              <pre><code>{lib.code}</code></pre>
            </div>
            <div className="mt-4">
              <Link to={`/sandbox?library=${id}`} className="btn-primary inline-flex items-center gap-2">
                <PlayCircle size={16} />
                Try in Sandbox
              </Link>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <Layers size={18} className="text-primary-600" />
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-3">
              {lib.useCases.map((uc, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-earth-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  {uc}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <PlayCircle size={18} className="text-primary-600" />
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              <Link to={`/sandbox?library=${id}`} className="btn-primary w-full flex items-center justify-center gap-2">
                <PlayCircle size={16} />
                Try in Sandbox
              </Link>
              <a href={lib.docs} target="_blank" rel="noopener noreferrer"
                 className="btn-secondary w-full flex items-center justify-center gap-2">
                <BookOpen size={16} />
                Read Documentation
                <ExternalLink size={14} />
              </a>
              <a href={lib.pypi} target="_blank" rel="noopener noreferrer"
                 className="btn-ghost w-full flex items-center justify-center gap-2">
                View on PyPI
                <ExternalLink size={14} />
              </a>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <Tag size={18} className="text-primary-600" />
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <div className="flex flex-wrap gap-2">
              {lib.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium
                  bg-primary-50 text-primary-700 border border-primary-200">
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
