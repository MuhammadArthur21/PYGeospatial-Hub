import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Play, RotateCcw, Save, Download, Share2, Upload, Terminal } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/Card'

const defaultCode = `import geopandas as gpd
import matplotlib.pyplot as plt

# Load sample world data
world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))

# Filter for a specific continent
asia = world[world['continent'] == 'Asia']

# Create a basic plot
fig, ax = plt.subplots(figsize=(10, 6))
asia.plot(ax=ax, color='lightgreen', edgecolor='white')
ax.set_title('Asian Countries')
plt.show()
`

const templates = {
  shapely: `from shapely.geometry import Point, Polygon

# Create geometries
point = Point(106.8, -6.2)
polygon = Polygon([
    (106.7, -6.3),
    (106.9, -6.3),
    (106.9, -6.1),
    (106.7, -6.1)
])

# Spatial operations
print(f"Contains: {polygon.contains(point)}")
print(f"Distance: {point.distance(polygon)}")

# Buffer
buffered = polygon.buffer(0.01)
print(f"Area: {buffered.area}")
`,
  geopandas: `import geopandas as gpd

# Read sample data
world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))

# Filter and inspect
cities = world[world['continent'] == 'Asia']
print(cities[['name', 'pop_est', 'geometry']].head())

# Calculate areas
cities['area_km2'] = cities.geometry.area / 1e6
print(f"Total area: {cities['area_km2'].sum():.2f} km²")
`,
  rasterio: `import rasterio
import numpy as np

# Create sample raster data
data = np.random.rand(100, 100).astype('float32')

# Write to GeoTIFF
with rasterio.open(
    'sample.tif', 'w',
    driver='GTiff',
    height=100, width=100,
    count=1, dtype='float32',
    crs='EPSG:4326',
) as dst:
    dst.write(data, 1)

print("Raster created successfully!")
print(f"Shape: {data.shape}")
print(f"Mean value: {data.mean():.4f}")
`,
  pyproj: `from pyproj import Transformer

# Jakarta coordinates (WGS84)
jakarta_lon, jakarta_lat = 106.8, -6.2

# Transform to Web Mercator
transformer = Transformer.from_crs(
    "EPSG:4326", "EPSG:3857", always_xy=True
)
x, y = transformer.transform(jakarta_lon, jakarta_lat)
print(f"Web Mercator: {x:.2f}, {y:.2f}")

# Transform to UTM zone 48S
transformer_utm = Transformer.from_crs(
    "EPSG:4326", "EPSG:32748", always_xy=True
)
easting, northing = transformer_utm.transform(jakarta_lon, jakarta_lat)
print(f"UTM 48S: {easting:.2f}, {northing:.2f}")
`,
}

export default function Sandbox() {
  const [searchParams] = useSearchParams()
  const libraryParam = searchParams.get('library')

  const [code, setCode] = useState(
    libraryParam && templates[libraryParam] ? templates[libraryParam] : defaultCode
  )
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [selectedLibs, setSelectedLibs] = useState(
    libraryParam ? [libraryParam] : ['geopandas', 'matplotlib']
  )

  const libraryOptions = [
    { id: 'shapely', name: 'Shapely' },
    { id: 'geopandas', name: 'GeoPandas' },
    { id: 'rasterio', name: 'Rasterio' },
    { id: 'pyproj', name: 'Pyproj' },
    { id: 'fiona', name: 'Fiona' },
    { id: 'folium', name: 'Folium' },
    { id: 'matplotlib', name: 'Matplotlib' },
    { id: 'numpy', name: 'NumPy' },
  ]

  const toggleLibrary = (libId) => {
    setSelectedLibs((prev) =>
      prev.includes(libId)
        ? prev.filter((id) => id !== libId)
        : [...prev, libId]
    )
  }

  const runCode = () => {
    setIsRunning(true)
    setOutput('Executing in sandbox...\n')

    // Simulate execution (placeholder for actual sandbox API)
    setTimeout(() => {
      setOutput(
        '>>> Sandbox Execution (Demo)\n' +
        '─────────────────────────────\n' +
        'Libraries loaded successfully ✓\n' +
        'Code execution completed ✓\n' +
        '─────────────────────────────\n' +
        '\nConnect to the backend API for real execution.\n' +
        'This is the frontend interface ready for integration.\n'
      )
      setIsRunning(false)
    }, 1500)
  }

  const resetCode = () => {
    setCode(libraryParam && templates[libraryParam] ? templates[libraryParam] : defaultCode)
    setOutput('')
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Left - Library/Tools sidebar */}
      <div className="hidden lg:block w-64 border-r border-surface-800 p-4 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Libraries
        </h3>
        <div className="space-y-1 mb-6">
          {libraryOptions.map((lib) => (
            <button
              key={lib.id}
              onClick={() => toggleLibrary(lib.id)}
              className={`sidebar-item w-full text-sm ${
                selectedLibs.includes(lib.id) ? 'active' : ''
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                selectedLibs.includes(lib.id) ? 'bg-primary-400' : 'bg-surface-600'
              }`} />
              {lib.name}
            </button>
          ))}
        </div>

        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Actions
        </h3>
        <div className="space-y-2">
          <button className="btn-secondary w-full text-sm flex items-center gap-2 justify-center">
            <Upload size={14} />
            Upload File
          </button>
          <button className="btn-ghost w-full text-sm flex items-center gap-2 justify-center">
            <Save size={14} />
            Save Script
          </button>
        </div>
      </div>

      {/* Center - Code Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-surface-800 bg-surface-900/50">
          <div className="flex items-center gap-2">
            <button onClick={runCode} disabled={isRunning}
              className="btn-primary text-sm flex items-center gap-2 px-3 py-1.5">
              <Play size={14} className={isRunning ? 'animate-pulse' : ''} />
              {isRunning ? 'Running...' : 'Run'}
            </button>
            <button onClick={resetCode} className="btn-ghost text-sm p-1.5">
              <RotateCcw size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-sm p-1.5">
              <Download size={14} />
            </button>
            <button className="btn-ghost text-sm p-1.5">
              <Share2 size={14} />
            </button>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1 code-area rounded-none border-0">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-transparent text-gray-200 p-4 font-mono text-sm resize-none
                     focus:outline-none border-0"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Right - Output/Visualization panel */}
      <div className="hidden lg:block w-96 border-l border-surface-800 flex flex-col">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-surface-800 bg-surface-900/50">
          <Terminal size={14} className="text-gray-400" />
          <span className="text-sm text-gray-400">Output</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
            {output || 'Click "Run" to execute your code...'}
          </pre>
        </div>
      </div>
    </div>
  )
}
