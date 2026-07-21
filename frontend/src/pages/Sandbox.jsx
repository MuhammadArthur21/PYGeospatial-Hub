import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Play, RotateCcw, Save, Download, Share2, Upload, Terminal } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/Card'

const defaultCode = `import geopandas as gpd
import matplotlib.pyplot as plt

world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
asia = world[world['continent'] == 'Asia']

fig, ax = plt.subplots(figsize=(10, 6))
asia.plot(ax=ax, color='#99AD7A', edgecolor='white')
ax.set_title('Asian Countries')
plt.show()
`

const templates = {
  shapely: `from shapely.geometry import Point, Polygon

point = Point(106.8, -6.2)
polygon = Polygon([(106.7, -6.3), (106.9, -6.3), (106.9, -6.1), (106.7, -6.1)])

print(f"Contains: {polygon.contains(point)}")
print(f"Distance: {point.distance(polygon)}")
buffered = polygon.buffer(0.01)
print(f"Area: {buffered.area}")`,
  geopandas: `import geopandas as gpd

world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
asia = world[world['continent'] == 'Asia']
print(asia[['name', 'pop_est', 'geometry']].head())
asia['area_km2'] = asia.geometry.area / 1e6
print(f"Total area: {asia['area_km2'].sum():.2f} km²")`,
  rasterio: `import rasterio
import numpy as np

data = np.random.rand(100, 100).astype('float32')
with rasterio.open('sample.tif', 'w', driver='GTiff', height=100, width=100,
                    count=1, dtype='float32', crs='EPSG:4326') as dst:
    dst.write(data, 1)
print("Raster created!")`,
  pyproj: `from pyproj import Transformer

t = Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True)
x, y = t.transform(106.8, -6.2)
print(f"Mercator: {x:.2f}, {y:.2f}")`,
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
      prev.includes(libId) ? prev.filter((id) => id !== libId) : [...prev, libId]
    )
  }

  const runCode = () => {
    setIsRunning(true)
    setOutput('Executing in sandbox...\n')
    setTimeout(() => {
      setOutput(
        '>>> Sandbox Execution (Demo)\n' +
        '─────────────────────────────\n' +
        'Libraries loaded successfully ✓\n' +
        'Code execution completed ✓\n' +
        '─────────────────────────────\n'
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
      <div className="hidden lg:block w-64 border-r border-earth-200 bg-white/50 p-4 overflow-y-auto">
        <h3 className="text-xs font-semibold text-earth-600 uppercase tracking-wider mb-4">
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
                selectedLibs.includes(lib.id) ? 'bg-primary-500' : 'bg-earth-300'
              }`} />
              {lib.name}
            </button>
          ))}
        </div>
        <h3 className="text-xs font-semibold text-earth-600 uppercase tracking-wider mb-4">
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

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-earth-200 bg-white/50">
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
            <button className="btn-ghost text-sm p-1.5"><Download size={14} /></button>
            <button className="btn-ghost text-sm p-1.5"><Share2 size={14} /></button>
          </div>
        </div>

        <div className="flex-1 code-area rounded-none border-0">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-transparent text-earth-800 p-4 font-mono text-sm resize-none focus:outline-none border-0"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="hidden lg:block w-96 border-l border-earth-200 bg-white/50 flex flex-col">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-earth-200 bg-white/50">
          <Terminal size={14} className="text-earth-400" />
          <span className="text-sm text-earth-600">Output</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <pre className="text-sm text-earth-700 font-mono whitespace-pre-wrap">
            {output || 'Click "Run" to execute your code...'}
          </pre>
        </div>
      </div>
    </div>
  )
}
