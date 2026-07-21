import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, BookOpen, PlayCircle, Code, Tag, Layers, Copy, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/Card'
import { getLibraryById } from '@/data/librariesData'
import api from '@/services/api'

// Code templates for libraries
const CODE_TEMPLATES = {
  shapely: `from shapely.geometry import Point, Polygon, LineString
import json

# Create geometries
point = Point(106.8272, -6.1751)  # Jakarta Monas
polygon = Polygon([(106.68,-6.10),(106.97,-6.10),(106.97,-6.37),(106.68,-6.37)])
line = LineString([(106.68,-6.20),(106.97,-6.20)])

# Operations
print(f"Contains: {polygon.contains(point)}")
print(f"Buffered area: {point.buffer(0.01).area:.6f}")
print(f"Intersects line: {polygon.intersects(line)}")`,

  geopandas: `import geopandas as gpd
import json

# Load built-in dataset
world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
asia = world[world['continent'] == 'Asia'].copy()

# Analysis
print(asia[['name', 'pop_est']].head(5).to_string())
print(f"Total countries in Asia: {len(asia)}")

# Output GeoJSON for map visualization
print(asia.to_json())`,

  rasterio: `import rasterio
import numpy as np
from rasterio.transform import from_bounds

# Create synthetic DEM data
data = np.random.randint(0, 500, (100, 100)).astype('float32')
transform = from_bounds(106.5, -6.5, 107.1, -5.9, 100, 100)

print(f"Raster shape: {data.shape}, Min elev: {data.min():.0f}m, Max elev: {data.max():.0f}m")`,

  pyproj: `from pyproj import Transformer, CRS

# Transform Jakarta coordinates from WGS84 to Web Mercator
t = Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True)
x, y = t.transform(106.8272, -6.1751)
print(f"WGS84:        lon=106.8272, lat=-6.1751")
print(f"Web Mercator: x={x:.2f}m, y={y:.2f}m")`,

  folium: `import folium

# Create interactive map centered on Jakarta
m = folium.Map(location=[-6.2088, 106.8456], zoom_start=11)
folium.Marker([-6.1751, 106.8272], popup="Monas", tooltip="Monas").add_to(m)

print("Map created successfully with Folium!")`,

  geopy: `from geopy.distance import geodesic

jakarta = (-6.2088, 106.8456)
surabaya = (-7.2575, 112.7521)
dist = geodesic(jakarta, surabaya).kilometers
print(f"Distance Jakarta → Surabaya: {dist:.1f} km")`,
}

export default function LibraryDetail() {
  const { id } = useParams()
  const [lib, setLib] = useState(() => getLibraryById(id))
  const [copied, setCopied] = useState(false)

  const codeTemplate = CODE_TEMPLATES[id] || lib?.code_template || `# Example for ${lib?.name || id}\nimport ${id}\nprint("Library ${lib?.name || id} loaded!")`

  useEffect(() => {
    api.get(`/libraries/${id}`)
      .then(res => { if (res.data) setLib(res.data) })
      .catch(() => {}) // Keep static fallback
  }, [id])

  const copyCode = () => {
    navigator.clipboard.writeText(codeTemplate)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!lib) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-earth-900 dark:text-dark-text mb-4">Library Not Found</h2>
        <p className="text-earth-500 dark:text-dark-accent/60 mb-8">Library dengan ID "{id}" tidak ditemukan.</p>
        <Link to="/libraries" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Kembali ke Library Index
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/libraries" className="inline-flex items-center gap-2 text-earth-500 dark:text-dark-accent/70 hover:text-primary-600 dark:hover:text-dark-text mb-6 transition-colors text-sm">
        <ArrowLeft size={16} />
        Kembali ke Library Index
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <Card>
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-300 dark:from-dark-accent dark:to-dark-accent/50 flex items-center justify-center text-2xl text-white font-bold shadow-md">
                {lib.name?.[0] || '?'}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <CardTitle className="text-2xl">{lib.name}</CardTitle>
                  <span className={`badge ${
                    lib.difficulty === 'beginner' ? 'badge-beginner' :
                    lib.difficulty === 'intermediate' ? 'badge-intermediate' : 'badge-advanced'
                  }`}>
                    {lib.difficulty || 'intermediate'}
                  </span>
                </div>
                <p className="text-sm text-earth-500 dark:text-dark-accent/60">
                  {lib.category ? `Category: ${lib.category} • ` : ''}v{lib.version || 'latest'}
                </p>
              </div>
            </CardHeader>
            <p className="text-earth-700 dark:text-dark-text/80 leading-relaxed mt-2">{lib.description}</p>
          </Card>

          {/* Quick Start Code */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code size={18} className="text-primary-600 dark:text-dark-accent" />
                <CardTitle>Quick Start Example</CardTitle>
              </div>
              <button onClick={copyCode} className="btn-ghost text-xs flex items-center gap-1">
                {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
              </button>
            </CardHeader>
            <div className="code-area p-4 overflow-x-auto rounded-lg bg-[#1a1a2e] text-green-300">
              <pre><code className="text-xs font-mono">{codeTemplate}</code></pre>
            </div>
            <div className="mt-4 flex gap-3">
              <Link to="/sandbox" state={{ initialCode: codeTemplate }} className="btn-primary inline-flex items-center gap-2 text-sm">
                <PlayCircle size={16} />
                Try in Sandbox
              </Link>
            </div>
          </Card>

          {/* Use Cases */}
          {lib.use_cases && lib.use_cases.length > 0 && (
            <Card>
              <CardHeader>
                <Layers size={18} className="text-primary-600 dark:text-dark-accent" />
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {lib.use_cases.map((uc, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-earth-700 dark:text-dark-text/80 bg-earth-50 dark:bg-dark-border p-2.5 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary-500 dark:bg-dark-accent" />
                    {uc}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <PlayCircle size={18} className="text-primary-600 dark:text-dark-accent" />
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              <Link to="/sandbox" state={{ initialCode: codeTemplate }} className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
                <PlayCircle size={16} />
                Try in Sandbox
              </Link>
              {lib.docs && (
                <a href={lib.docs} target="_blank" rel="noopener noreferrer"
                   className="btn-secondary w-full flex items-center justify-center gap-2 text-sm">
                  <BookOpen size={16} />
                  Documentation
                  <ExternalLink size={14} />
                </a>
              )}
              {lib.pypi && (
                <a href={lib.pypi} target="_blank" rel="noopener noreferrer"
                   className="btn-ghost w-full flex items-center justify-center gap-2 text-sm">
                  View on PyPI
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </Card>

          {lib.tags && lib.tags.length > 0 && (
            <Card>
              <CardHeader>
                <Tag size={18} className="text-primary-600 dark:text-dark-accent" />
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <div className="flex flex-wrap gap-2">
                {lib.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-dark-accent/15 dark:text-dark-accent border border-primary-200 dark:border-dark-accent/30 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
