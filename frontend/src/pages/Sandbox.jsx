import { useState, useCallback, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Play, RotateCcw, Save, Download, Share2, Upload, Terminal,
  Map, Bot, Loader, CheckCircle, XCircle, Clock, Copy, Check, Sparkles, BookOpen
} from 'lucide-react'
import CodeEditor from '@/components/CodeEditor'
import ResultsPanel from '@/components/ResultsPanel'
import MapViewer from '@/components/MapViewer'
import FileUploader from '@/components/FileUploader'
import { executionService } from '@/services/executionService'
import api from '@/services/api'

// ── Templates ──────────────────────────────────────────────
const templates = {
  default: `import geopandas as gpd
import json

world = gpd.read_file('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')
print(world.columns.tolist())
print(world.head(5).to_string())`,

  shapely: `from shapely.geometry import Point, Polygon
import json

point = Point(106.8272, -6.1751)  # Jakarta (Monas)
polygon = Polygon([(106.68,-6.10),(106.97,-6.10),(106.97,-6.37),(106.68,-6.37)])

print(f"Point: {point}")
print(f"Contains point: {polygon.contains(point)}")
print(f"Distance to edge: {point.distance(polygon.exterior):.4f} degrees")

# Visualize as GeoJSON
from shapely.geometry import mapping
geojson = {
  "type": "FeatureCollection",
  "features": [
    {"type": "Feature", "geometry": mapping(polygon), "properties": {"name": "Jakarta Bbox"}},
    {"type": "Feature", "geometry": mapping(point), "properties": {"name": "Monas"}}
  ]
}
print(json.dumps(geojson))`,

  geopandas: `import geopandas as gpd
import json

world = gpd.read_file('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')
world['area_km2'] = world.geometry.area / 1e6
print(world[['name', 'pop_est', 'area_km2']].nlargest(5, 'area_km2').to_string())
print(world.to_json())`,

  rasterio: `import rasterio
import numpy as np

data = np.random.rand(100, 100).astype('float32')
with rasterio.open('sample.tif', 'w', driver='GTiff',
                   height=100, width=100, count=1,
                   dtype='float32', crs='EPSG:4326',
                   transform=rasterio.transform.from_bounds(106.5,-6.5,107.1,-5.9,100,100)) as dst:
    dst.write(data, 1)
print(f"Raster created! Shape: {data.shape}, Min: {data.min():.3f}, Max: {data.max():.3f}")`,

  pyproj: `from pyproj import Transformer, CRS
import json

t = Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True)
x, y = t.transform(106.8272, -6.1751)
print(f"WGS84:     lon=106.8272, lat=-6.1751")
print(f"Web Mercator: x={x:.2f}, y={y:.2f}")

crs_info = CRS("EPSG:4326")
print(f"CRS Name: {crs_info.name}")`,
}

const AI_TIPS = {
  geopandas: '💡 Tip: Gunakan `.to_crs("EPSG:3857")` sebelum operasi berbasis meter (buffer, area).',
  shapely: '💡 Tip: Selalu validasi geometry dengan `.is_valid` sebelum operasi kompleks.',
  rasterio: '💡 Tip: Gunakan `windowed reading` untuk raster besar agar hemat memori.',
  pyproj: '💡 Tip: Gunakan `always_xy=True` di Transformer agar urutan koordinat konsisten.',
  default: '💡 Tip: Tambahkan `print(gdf.to_json())` di akhir kode untuk visualisasi peta otomatis.',
}

export default function Sandbox() {
  const [searchParams] = useSearchParams()
  const libraryParam = searchParams.get('library') || 'default'

  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem(`sandbox_draft_${libraryParam}`)
    return saved || templates[libraryParam] || templates.default
  })
  const [output, setOutput] = useState('')
  const [mapData, setMapData] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [execStatus, setExecStatus] = useState(null)
  const [execTime, setExecTime] = useState(null)
  const [showUploader, setShowUploader] = useState(false)
  const [activePanel, setActivePanel] = useState('terminal')
  const [showAI, setShowAI] = useState(false)
  const [aiTip, setAiTip] = useState(AI_TIPS.default)
  const [aiExplanation, setAiExplanation] = useState(null)
  const [isExplaining, setIsExplaining] = useState(false)
  const [selectedLibs, setSelectedLibs] = useState(libraryParam !== 'default' ? [libraryParam] : ['geopandas'])
  const [saveTitle, setSaveTitle] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [copied, setCopied] = useState(false)
  const autoSaveRef = useRef(null)

  useEffect(() => {
    autoSaveRef.current = setTimeout(() => {
      localStorage.setItem(`sandbox_draft_${libraryParam}`, code)
    }, 3000)
    return () => clearTimeout(autoSaveRef.current)
  }, [code, libraryParam])

  useEffect(() => {
    const lib = selectedLibs[0] || 'default'
    setAiTip(AI_TIPS[lib] || AI_TIPS.default)
  }, [selectedLibs])

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
    setSelectedLibs(prev => prev.includes(libId) ? prev.filter(id => id !== libId) : [...prev, libId])
    if (templates[libId]) setCode(templates[libId])
  }

  const tryExtractGeoJSON = (text) => {
    if (!text) return null
    const lines = text.split('\n').reverse()
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) continue
      try {
        const parsed = JSON.parse(trimmed)
        if (parsed && (parsed.type === 'FeatureCollection' || parsed.type === 'Feature' || parsed.coordinates)) {
          return parsed
        }
      } catch { continue }
    }
    return null
  }

  const runCode = useCallback(async () => {
    setIsRunning(true)
    setOutput('')
    setExecStatus(null)
    setExecTime(null)
    setMapData(null)

    try {
      const result = await executionService.execute(code, selectedLibs)
      const outputText = result.output || result.error || ''
      setOutput(outputText)
      setExecTime(result.execution_time)

      if (result.status === 'success' || result.status === 'completed') {
        setExecStatus('success')
        const geo = tryExtractGeoJSON(outputText)
        if (geo) {
          setMapData(geo)
          setActivePanel('map')
        } else {
          setActivePanel('terminal')
        }
      } else {
        setExecStatus('error')
        setActivePanel('terminal')
      }
    } catch (err) {
      const serverErr = err.response?.data?.error || err.response?.data?.detail || err.message || 'Execution error'
      setOutput(`⚠️ AST Security / Sandbox Error: ${serverErr}`)
      setExecStatus('error')
    } finally {
      setIsRunning(false)
    }
  }, [code, selectedLibs])

  const handleExplainCode = async () => {
    setIsExplaining(true)
    setShowAI(true)
    try {
      const res = await api.post('/ai/explain', { code })
      setAiExplanation(res.data)
    } catch {
      setAiExplanation({
        summary: "Script ini menggunakan library geospasial Python untuk memproses data vektor/raster.",
        line_by_line: code.split('\n').map((l, i) => ({ line_number: i+1, code: l, explanation: "Instruksi pemrosesan geospasial." }))
      })
    } finally {
      setIsExplaining(false)
    }
  }

  const handleSave = async () => {
    if (!saveTitle.trim()) return
    try {
      await executionService.saveScript(saveTitle, code, '', false)
      setShowSaveDialog(false)
      setSaveTitle('')
    } catch {
      const scripts = JSON.parse(localStorage.getItem('local_scripts') || '[]')
      scripts.push({ id: Date.now(), title: saveTitle, code, savedAt: new Date().toISOString() })
      localStorage.setItem('local_scripts', JSON.stringify(scripts))
      setShowSaveDialog(false)
      setSaveTitle('')
    }
  }

  const handleDownload = () => {
    const content = mapData ? JSON.stringify(mapData, null, 2) : output
    const ext = mapData ? '.geojson' : '.txt'
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pygeo_result${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    const url = `${window.location.origin}/sandbox?library=${selectedLibs[0] || 'geopandas'}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const resetCode = () => {
    const tpl = templates[libraryParam] || templates.default
    setCode(tpl)
    setOutput('')
    setExecStatus(null)
    setMapData(null)
    setAiExplanation(null)
    localStorage.removeItem(`sandbox_draft_${libraryParam}`)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* ── Left Sidebar ── */}
      <div className="hidden lg:flex lg:w-56 flex-col border-r border-earth-200 dark:border-dark-border bg-white/50 dark:bg-dark-surface/50">
        <div className="p-3 border-b border-earth-200 dark:border-dark-border">
          <h3 className="text-xs font-semibold text-earth-600 dark:text-dark-accent uppercase tracking-wider">Libraries</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {libraryOptions.map(lib => {
            const isActive = selectedLibs.includes(lib.id)
            return (
              <button key={lib.id} onClick={() => toggleLibrary(lib.id)}
                className={`sidebar-item w-full text-sm ${isActive ? 'active' : ''}`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? 'bg-primary-500 dark:bg-dark-accent' : 'bg-earth-300 dark:bg-dark-border'}`} />
                {lib.name}
              </button>
            )
          })}
        </div>

        <div className="p-2 border-t border-earth-200 dark:border-dark-border space-y-1">
          <button onClick={() => setShowUploader(v => !v)}
            className="btn-secondary w-full text-xs flex items-center gap-1.5 justify-center py-1.5">
            <Upload size={12} /> Upload File
          </button>
          <button onClick={() => setShowSaveDialog(true)}
            className="btn-ghost w-full text-xs flex items-center gap-1.5 justify-center py-1.5">
            <Save size={12} /> Save Script
          </button>
          <button onClick={() => setShowAI(v => !v)}
            className={`w-full text-xs flex items-center gap-1.5 justify-center py-1.5 rounded-lg transition-colors ${
              showAI ? 'bg-primary-100 text-primary-700 dark:bg-dark-accent/20 dark:text-dark-accent' : 'btn-ghost'
            }`}>
            <Bot size={12} /> AI Assistant
          </button>
        </div>
      </div>

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-earth-200 dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button id="run-code-btn" onClick={runCode} disabled={isRunning}
              className="btn-primary text-sm flex items-center gap-1.5 px-3 py-1.5">
              {isRunning ? <Loader size={13} className="animate-spin" /> : <Play size={13} />}
              {isRunning ? 'Running...' : 'Run'}
            </button>
            <button onClick={handleExplainCode} disabled={isExplaining}
              className="btn-secondary text-xs flex items-center gap-1 px-2.5 py-1.5">
              {isExplaining ? <Loader size={12} className="animate-spin" /> : <Sparkles size={12} className="text-amber-500" />}
              Explain Code
            </button>
            <button onClick={resetCode} className="btn-ghost text-sm p-1.5" title="Reset ke template">
              <RotateCcw size={13} />
            </button>
            {execStatus === 'success' && (
              <span className="flex items-center gap-1 text-xs text-primary-600 dark:text-dark-accent font-semibold">
                <CheckCircle size={12} /> {execTime && `${execTime}s`}
              </span>
            )}
            {execStatus === 'error' && (
              <span className="flex items-center gap-1 text-xs text-rose-500 font-semibold">
                <XCircle size={12} /> Execution Failed
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => setActivePanel('terminal')}
              className={`p-1.5 rounded-md text-sm transition-colors ${activePanel === 'terminal' ? 'bg-earth-100 dark:bg-dark-border text-earth-700 dark:text-dark-text' : 'btn-ghost'}`}
              title="Terminal output">
              <Terminal size={14} />
            </button>
            <button onClick={() => setActivePanel('map')}
              className={`p-1.5 rounded-md text-sm transition-colors ${activePanel === 'map' ? 'bg-earth-100 dark:bg-dark-border text-earth-700 dark:text-dark-text' : 'btn-ghost'}`}
              title="Map viewer">
              <Map size={14} />
            </button>
            <div className="w-px h-4 bg-earth-200 dark:bg-dark-border mx-1" />
            <button onClick={handleDownload} disabled={!output && !mapData}
              className="btn-ghost text-sm p-1.5" title="Download hasil">
              <Download size={14} />
            </button>
            <button onClick={handleShare} className="btn-ghost text-sm p-1.5" title="Copy share URL">
              {copied ? <Check size={14} className="text-primary-600" /> : <Share2 size={14} />}
            </button>
          </div>
        </div>

        {/* Split View */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
          <div className="flex flex-col flex-1 min-h-0">
            <CodeEditor value={code} onChange={setCode} height="100%" />
          </div>

          <div className="lg:w-[45%] flex flex-col border-t lg:border-t-0 lg:border-l border-earth-200 dark:border-dark-border min-h-0">
            <div className="flex border-b border-earth-200 dark:border-dark-border bg-white dark:bg-dark-surface flex-shrink-0">
              <button onClick={() => setActivePanel('terminal')}
                className={`px-4 py-2 text-xs font-medium flex items-center gap-1.5 border-b-2 transition-colors ${
                  activePanel === 'terminal'
                    ? 'border-primary-500 text-primary-700 dark:text-dark-accent'
                    : 'border-transparent text-earth-500 hover:text-earth-700'
                }`}>
                <Terminal size={12} /> Terminal Output
              </button>
              <button onClick={() => setActivePanel('map')}
                className={`px-4 py-2 text-xs font-medium flex items-center gap-1.5 border-b-2 transition-colors ${
                  activePanel === 'map'
                    ? 'border-primary-500 text-primary-700 dark:text-dark-accent'
                    : 'border-transparent text-earth-500 hover:text-earth-700'
                }`}>
                <Map size={12} /> Map View {mapData && <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-dark-accent" />}
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              {activePanel === 'terminal' && (
                <ResultsPanel output={output} type={execStatus === 'error' ? 'error' : 'text'} geojsonData={mapData} />
              )}
              {activePanel === 'map' && (
                <MapViewer geojsonData={mapData} height="100%" />
              )}
            </div>

            {showAI && (
              <div className="border-t border-earth-200 dark:border-dark-border bg-primary-50 dark:bg-dark-accent/5 p-3 flex-shrink-0 max-h-[200px] overflow-y-auto">
                <div className="flex items-start gap-2">
                  <Bot size={16} className="text-primary-600 dark:text-dark-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-primary-700 dark:text-dark-accent mb-1 flex items-center justify-between">
                      AI Code Explainer
                      <button onClick={() => setShowAI(false)} className="text-[10px] text-earth-400 hover:text-earth-600">✕ Close</button>
                    </p>
                    {aiExplanation ? (
                      <div className="space-y-1.5 text-xs text-earth-700 dark:text-dark-accent/80">
                        <p className="font-semibold">{aiExplanation.summary}</p>
                        {aiExplanation.line_by_line.map((item) => (
                          <div key={item.line_number} className="p-1.5 rounded bg-white dark:bg-dark-surface border border-earth-200 dark:border-dark-border text-[11px]">
                            <span className="font-mono text-primary-600 font-bold">L{item.line_number}:</span> {item.explanation}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-earth-600 dark:text-dark-accent/70 leading-relaxed">{aiTip}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
