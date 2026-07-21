import { useState } from 'react'
import { Plus, Trash2, ArrowRight, PlayCircle, Settings, CheckCircle2, Sparkles, Sliders } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { useNavigate } from 'react-router-dom'

const AVAILABLE_NODES = [
  { id: 'load_geojson', label: 'Load GeoJSON / Shapefile', type: 'input', icon: '📁', category: 'Input' },
  { id: 'buffer_geom', label: 'Buffer Geometry (Shapely)', type: 'process', icon: '⭕', category: 'Spatial Operation' },
  { id: 'clip_raster', label: 'Clip Raster (Rasterio)', type: 'process', icon: '✂️', category: 'Spatial Operation' },
  { id: 'spatial_join', label: 'Spatial Join (GeoPandas)', type: 'process', icon: '🔗', category: 'Analysis' },
  { id: 'geocode', label: 'Geocode Address (Geopy)', type: 'process', icon: '📍', category: 'Geocoding' },
  { id: 'export_map', label: 'Render Web Map (Folium)', type: 'output', icon: '🗺️', category: 'Output' },
]

export default function WorkflowBuilder() {
  const navigate = useNavigate()
  const [pipeline, setPipeline] = useState([
    { instanceId: 'n1', ...AVAILABLE_NODES[0], paramVal: 'indonesia_provinces.geojson' },
    { instanceId: 'n2', ...AVAILABLE_NODES[1], paramVal: '0.01 degree (~1.1km)' },
    { instanceId: 'n3', ...AVAILABLE_NODES[5], paramVal: 'Folium Interactive' },
  ])

  const addNode = (node) => {
    setPipeline([
      ...pipeline,
      { instanceId: `node_${Date.now()}`, ...node, paramVal: 'Default Config' }
    ])
  }

  const removeNode = (index) => {
    setPipeline(pipeline.filter((_, i) => i !== index))
  }

  const generatePipelinePythonCode = () => {
    let code = `# Auto-generated Workflow Pipeline by PyGeospatial Hub\n`
    code += `import geopandas as gpd\nfrom shapely.geometry import Point, Polygon\nimport folium\n\n`
    code += `# Step 1: Load Input Dataset\n`
    code += `gdf = gpd.read_file('sample_dataset.geojson')\nprint(f"Loaded {len(gdf)} spatial features")\n\n`
    code += `# Step 2: Spatial Processing\n`
    code += `buffered_gdf = gdf.copy()\nbuffered_gdf['geometry'] = buffered_gdf['geometry'].buffer(0.01)\nprint("Buffer operation completed successfully")\n\n`
    code += `# Step 3: Interactive Visualization\n`
    code += `m = folium.Map(location=[-6.2088, 106.8456], zoom_start=10)\n`
    code += `folium.GeoJson(buffered_gdf.to_json()).add_to(m)\n`
    code += `print("Folium map rendered with pipeline output!")\n`
    return code
  }

  const handleRunPipelineInSandbox = () => {
    const code = generatePipelinePythonCode()
    navigate('/sandbox', { state: { initialCode: code } })
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="glass-card p-6 bg-gradient-to-r from-primary-900/10 via-earth-100/30 to-sage-100/20 dark:from-dark-accent/10 dark:to-dark-surface">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary-500 text-white dark:bg-dark-accent dark:text-dark-bg shadow-md">
              <Sliders size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-earth-900 dark:text-dark-text">Visual Workflow Builder</h2>
              <p className="text-xs text-earth-600 dark:text-dark-accent/70">
                Susun alat analisis geospasial menjadi satu alur kerja otomatis tanpa perlu mengetik kode dari awal.
              </p>
            </div>
          </div>
          <button
            onClick={handleRunPipelineInSandbox}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <PlayCircle size={16} />
            Jalankan Pipeline di Sandbox
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Node Library Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Plus size={16} className="text-primary-600 dark:text-dark-accent" />
                Pilih Modul Tool
              </CardTitle>
              <CardDescription className="text-xs">Klik untuk menambah modul ke kanvas pipeline</CardDescription>
            </CardHeader>
            <div className="space-y-2 mt-2">
              {AVAILABLE_NODES.map((node) => (
                <button
                  key={node.id}
                  onClick={() => addNode(node)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-earth-50 dark:bg-dark-border hover:bg-primary-50 dark:hover:bg-dark-accent/20 text-left transition-all border border-earth-200 dark:border-dark-border/50 group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{node.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-earth-800 dark:text-dark-text">{node.label}</p>
                      <span className="text-[10px] text-earth-400 dark:text-dark-accent/50">{node.category}</span>
                    </div>
                  </div>
                  <Plus size={14} className="text-earth-400 group-hover:text-primary-600 dark:group-hover:text-dark-accent transition-colors" />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Visual Pipeline Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary-600 dark:text-dark-accent" />
                <CardTitle className="text-sm">Kanvas Alur Kerja Pipeline ({pipeline.length} Modul)</CardTitle>
              </div>
              {pipeline.length > 0 && (
                <button
                  onClick={() => setPipeline([])}
                  className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"
                >
                  <Trash2 size={13} /> Clear Canvas
                </button>
              )}
            </CardHeader>

            <div className="p-4 bg-earth-50 dark:bg-dark-bg/60 rounded-xl min-h-[320px] flex flex-col gap-4 justify-center border border-dashed border-earth-300 dark:border-dark-border">
              {pipeline.length === 0 ? (
                <div className="text-center py-12">
                  <Sliders size={36} className="mx-auto text-earth-300 dark:text-dark-accent/30 mb-2" />
                  <p className="text-xs text-earth-500 dark:text-dark-accent/60">Kanvas masih kosong. Tambahkan modul tool dari panel kiri.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pipeline.map((node, index) => (
                    <div key={node.instanceId} className="flex flex-col items-center">
                      <div className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-dark-surface border border-earth-200 dark:border-dark-border shadow-sm hover:border-primary-400 transition-all">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 dark:bg-dark-accent/20 dark:text-dark-accent flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <span className="text-xl">{node.icon}</span>
                          <div>
                            <p className="text-xs font-bold text-earth-900 dark:text-dark-text">{node.label}</p>
                            <p className="text-[11px] text-earth-500 dark:text-dark-accent/60 font-mono mt-0.5">
                              Config: {node.paramVal}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeNode(index)}
                            className="p-1.5 rounded-lg text-earth-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {index < pipeline.length - 1 && (
                        <div className="my-1.5 flex items-center justify-center text-primary-500 dark:text-dark-accent">
                          <ArrowRight size={16} className="rotate-90" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
