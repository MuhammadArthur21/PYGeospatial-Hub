import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Wrench, PlayCircle, ArrowRight, Sliders, Layers } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import WorkflowBuilder from '@/components/WorkflowBuilder'
import api from '@/services/api'

const STATIC_TOOLS = [
  { id: 'buffer_geometry', name: 'Buffer Geometry', category: 'Vector Operations', description: 'Buat zona penyangga di sekitar fitur titik, garis, atau polygon dengan jarak tertentu.', icon: '⭕' },
  { id: 'clip_raster', name: 'Clip Raster by Polygon', category: 'Raster Processing', description: 'Potong citra satelit atau GeoTIFF berdasarkan batas poligon kawasan.', icon: '✂️' },
  { id: 'geocode_address', name: 'Geocode Address', category: 'Geocoding', description: 'Konversi alamat teks menjadi titik koordinat lintang & bujur secara otomatis.', icon: '📍' },
  { id: 'calculate_distance', name: 'Calculate Distance (Geodesic)', category: 'Vector Operations', description: 'Hitung jarak akurat di atas elipsoid bumi menggunakan formula Haversine/Vincenty.', icon: '📏' },
  { id: 'spatial_join', name: 'Spatial Join', category: 'Vector Operations', description: 'Gabungkan atribut spasial antar dua layer GeoDataFrame berdasarkan relasi lokasi.', icon: '🔗' },
  { id: 'rasterize_vector', name: 'Rasterize Vector', category: 'Raster Processing', description: 'Ubah data vektor poligon menjadi grid raster dengan nilai atribut piksel.', icon: '▦' },
]

export default function ToolsMarketplace() {
  const [tools, setTools] = useState(STATIC_TOOLS)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [tab, setTab] = useState('marketplace') // 'marketplace' or 'builder'

  useEffect(() => {
    api.get('/tools')
      .then((res) => {
        if (res.data && res.data.length > 0) setTools(res.data)
      })
      .catch(() => {}) // Keep static tools fallback
  }, [])

  const categories = [...new Set(tools.map((t) => t.category))]

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || tool.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !activeCategory || tool.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Tab Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-2">
            <span className="gradient-text">Tools</span> Marketplace & Builder
          </h1>
          <p className="text-earth-500 dark:text-dark-accent/60 text-sm">
            Perkakas analisis geospasial siap pakai & kanvas visual workflow builder.
          </p>
        </div>

        <div className="flex items-center p-1 bg-earth-100 dark:bg-dark-surface rounded-xl border border-earth-200 dark:border-dark-border self-start md:self-auto">
          <button
            onClick={() => setTab('marketplace')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              tab === 'marketplace'
                ? 'bg-white text-earth-900 dark:bg-dark-accent dark:text-dark-bg shadow-sm'
                : 'text-earth-600 dark:text-dark-accent/70 hover:text-earth-900 dark:hover:text-dark-text'
            }`}
          >
            <Wrench size={14} />
            Pre-built Tools
          </button>
          <button
            onClick={() => setTab('builder')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              tab === 'builder'
                ? 'bg-white text-earth-900 dark:bg-dark-accent dark:text-dark-bg shadow-sm'
                : 'text-earth-600 dark:text-dark-accent/70 hover:text-earth-900 dark:hover:text-dark-text'
            }`}
          >
            <Sliders size={14} />
            Workflow Builder
          </button>
        </div>
      </div>

      {tab === 'builder' ? (
        <WorkflowBuilder />
      ) : (
        <>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
              <input
                type="text"
                placeholder="Cari tools geospasial..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveCategory('')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  activeCategory === ''
                    ? 'bg-primary-600 text-white dark:bg-dark-accent dark:text-dark-bg'
                    : 'bg-white text-earth-600 dark:bg-dark-surface dark:text-dark-accent/70 border border-earth-200 dark:border-dark-border'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-primary-600 text-white dark:bg-dark-accent dark:text-dark-bg'
                      : 'bg-white text-earth-600 dark:bg-dark-surface dark:text-dark-accent/70 border border-earth-200 dark:border-dark-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <Link key={tool.id} to="/sandbox">
                <Card hover className="h-full flex flex-col justify-between group">
                  <div>
                    <CardHeader>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-earth-100 to-earth-200 dark:from-dark-accent/20 dark:to-dark-accent/10 flex items-center justify-center text-lg">
                        {tool.icon || '🛠️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="truncate text-base">{tool.name}</CardTitle>
                        <span className="text-xs text-earth-400 dark:text-dark-accent/50">{tool.category}</span>
                      </div>
                    </CardHeader>
                    <CardDescription className="text-xs leading-relaxed mt-1">{tool.description}</CardDescription>
                  </div>
                  <div className="mt-4 pt-3 border-t border-earth-100 dark:border-dark-border flex items-center justify-between text-xs text-primary-600 dark:text-dark-accent font-medium">
                    <span className="flex items-center gap-1">
                      <PlayCircle size={14} /> Try Tool
                    </span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <Wrench size={48} className="mx-auto text-earth-300 dark:text-dark-accent/30 mb-4" />
              <p className="text-earth-500 dark:text-dark-accent/60">Tidak ada tools yang sesuai.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
