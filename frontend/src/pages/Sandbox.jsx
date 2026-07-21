import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Play, RotateCcw, Save, Download, Share2, Upload, Terminal, Eye } from 'lucide-react'
import CodeEditor from '@/components/CodeEditor'
import ResultsPanel from '@/components/ResultsPanel'
import FileUploader from '@/components/FileUploader'

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
print(f"Distance: {point.distance(polygon)}")`,
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
  const [outputType, setOutputType] = useState('text')
  const [isRunning, setIsRunning] = useState(false)
  const [showUploader, setShowUploader] = useState(false)
  const [showOutput, setShowOutput] = useState(true)
  const [selectedLibs, setSelectedLibs] = useState(
    libraryParam ? [libraryParam] : ['geopandas']
  )

  const libraryOptions = [
    { id: 'shapely', name: 'Shapely', color: 'from-primary-500 to-primary-300' },
    { id: 'geopandas', name: 'GeoPandas', color: 'from-primary-600 to-sage-400' },
    { id: 'rasterio', name: 'Rasterio', color: 'from-earth-600 to-earth-400' },
    { id: 'pyproj', name: 'Pyproj', color: 'from-primary-400 to-sage-300' },
    { id: 'fiona', name: 'Fiona', color: 'from-sage-500 to-sage-300' },
    { id: 'folium', name: 'Folium', color: 'from-primary-500 to-sage-400' },
    { id: 'matplotlib', name: 'Matplotlib', color: 'from-earth-500 to-earth-300' },
    { id: 'numpy', name: 'NumPy', color: 'from-primary-600 to-primary-400' },
  ]

  const toggleLibrary = (libId) => {
    setSelectedLibs((prev) =>
      prev.includes(libId) ? prev.filter((id) => id !== libId) : [...prev, libId]
    )
  }

  const runCode = useCallback(() => {
    setIsRunning(true)
    setOutput('')
    setOutputType('text')

    // Simulate execution - in production, this calls the backend API
    setTimeout(() => {
      const executedCode = `>>> Python ${libraryParam || 'geopandas'} Execution
─────────────────────────────────────
Libraries: geos, proj, ${selectedLibs.join(', ')}
─────────────────────────────────────
✓ Environment initialized
✓ Code compiled
✓ Execution completed in 0.42s
─────────────────────────────────────

Output:
Hello from PyGeospatial Sandbox!`
      setOutput(executedCode)
      setOutputType('text')
      setIsRunning(false)
    }, 1200)
  }, [libraryParam, selectedLibs])

  const resetCode = () => {
    setCode(libraryParam && templates[libraryParam] ? templates[libraryParam] : defaultCode)
    setOutput('')
    setOutputType('text')
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Left Sidebar */}
      <div className="hidden lg:flex lg:w-64 flex-col border-r border-earth-200 dark:border-dark-border bg-white/50 dark:bg-dark-surface/50">
        <div className="p-4 border-b border-earth-200 dark:border-dark-border">
          <h3 className="text-xs font-semibold text-earth-600 dark:text-dark-accent uppercase tracking-wider">
            Libraries
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {libraryOptions.map((lib) => {
            const isActive = selectedLibs.includes(lib.id)
            return (
              <button
                key={lib.id}
                onClick={() => toggleLibrary(lib.id)}
                className={`sidebar-item w-full text-sm ${isActive ? 'active' : ''}`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-primary-500 dark:bg-dark-accent' : 'bg-earth-300 dark:bg-dark-border'
                }`} />
                {lib.name}
              </button>
            )
          })}
        </div>
        <div className="p-3 border-t border-earth-200 dark:border-dark-border space-y-2">
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="btn-secondary w-full text-sm flex items-center gap-2 justify-center"
          >
            <Upload size={14} />
            Upload File
          </button>
          <button className="btn-ghost w-full text-sm flex items-center gap-2 justify-center">
            <Save size={14} />
            Save Script
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-earth-200 dark:border-dark-border bg-white/50 dark:bg-dark-surface/50">
          <div className="flex items-center gap-2">
            <button onClick={runCode} disabled={isRunning}
              className="btn-primary text-sm flex items-center gap-2 px-3 py-1.5">
              <Play size={14} className={isRunning ? 'animate-pulse' : ''} />
              {isRunning ? 'Running...' : 'Run'}
            </button>
            <button onClick={resetCode} className="btn-ghost text-sm p-1.5" title="Reset code">
              <RotateCcw size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOutput(!showOutput)}
              className={`btn-ghost text-sm p-1.5 ${showOutput ? 'text-primary-600 dark:text-dark-accent' : ''}`}
              title="Toggle output panel"
            >
              <Terminal size={14} />
            </button>
            <button className="btn-ghost text-sm p-1.5"><Download size={14} /></button>
            <button className="btn-ghost text-sm p-1.5"><Share2 size={14} /></button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1">
          <CodeEditor value={code} onChange={setCode} height="100%" />
        </div>

        {/* File Uploader (expandable) */}
        {showUploader && (
          <div className="border-t border-earth-200 dark:border-dark-border bg-white dark:bg-dark-surface p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-earth-700 dark:text-dark-text">Upload Dataset</h4>
              <button onClick={() => setShowUploader(false)} className="btn-ghost p-1">
                <span className="text-xs">Close</span>
              </button>
            </div>
            <FileUploader />
          </div>
        )}

        {/* Output Panel (split view) */}
        {showOutput && output && (
          <div className="h-48 border-t border-earth-200 dark:border-dark-border bg-white dark:bg-dark-surface">
            <ResultsPanel output={output} type={outputType} />
          </div>
        )}
      </div>
    </div>
  )
}
