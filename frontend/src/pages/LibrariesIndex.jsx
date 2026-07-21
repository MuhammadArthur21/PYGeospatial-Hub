import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, BookOpen } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import api from '@/services/api'

export default function LibrariesIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [libraries, setLibraries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '')
  const [difficulty, setDifficulty] = useState('')

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (search) params.search = search
    if (activeCategory) params.category = activeCategory
    if (difficulty) params.difficulty = difficulty
    api.get('/libraries', { params: { ...params, limit: 200 } })
      .then(res => {
        const data = res.data?.data || (Array.isArray(res.data) ? res.data : [])
        setLibraries(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [search, activeCategory, difficulty])

  const filteredLibraries = useMemo(() => {
    let libs = libraries
    if (search) {
      const q = search.toLowerCase()
      libs = libs.filter(l =>
        l.name?.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q) ||
        l.tags?.some(t => t.toLowerCase().includes(q))
      )
    }
    if (activeCategory) libs = libs.filter(l => (l.category_id || l.category) === activeCategory)
    if (difficulty) libs = libs.filter(l => l.difficulty === difficulty)
    return libs
  }, [libraries, search, activeCategory, difficulty])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-2">
          <span className="gradient-text">Library</span> Index
        </h1>
        <p className="text-earth-500 dark:text-dark-accent/60">
          Browse, search, and explore Python geospatial libraries
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
          <input
            type="text"
            placeholder="Search libraries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="select-field max-w-[150px]"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-earth-700 dark:text-dark-text uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory('')}
                className={`sidebar-item w-full text-sm ${!activeCategory ? 'active' : ''}`}
              >
                <BookOpen size={16} />
                All Libraries
              </button>
              {[
  { id: 'core_geospatial', name: 'Core Geospatial', icon: '📍' },
  { id: 'remote_sensing', name: 'Remote Sensing', icon: '🛰️' },
  { id: 'web_mapping', name: 'Web Mapping', icon: '🗺️' },
  { id: 'spatial_analysis', name: 'Spatial Analysis', icon: '📐' },
  { id: 'visualization', name: 'Visualization', icon: '📊' },
  { id: 'geocoding_routing', name: 'Geocoding & Routing', icon: '📍' },
  { id: 'databases', name: 'Databases', icon: '🗄️' },
  { id: 'point_cloud_lidar', name: 'Point Cloud & LiDAR', icon: '☁️' },
  { id: 'machine_learning', name: 'Machine Learning', icon: '🤖' },
  { id: 'utilities', name: 'Utilities', icon: '🔧' },
].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`sidebar-item w-full text-sm ${activeCategory === cat.id ? 'active' : ''}`}
                >
                  <span>{cat.icon}</span>
                  <span className="flex-1 text-left">{cat.name}</span>
                  <span className="text-xs text-earth-400 dark:text-dark-accent/40">{cat.count}</span>
                </button>
              ))}</div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <p className="text-xs text-earth-400 dark:text-dark-accent/50 mb-3">
            {filteredLibraries.length} library ditemukan
          </p>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredLibraries.map((lib) => (
              <Link key={lib.id} to={`/libraries/${lib.id}`}>
                <Card hover>
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-sage-100 dark:from-dark-accent/20 dark:to-dark-accent/10
                                  flex items-center justify-center text-lg font-bold text-primary-700 dark:text-dark-accent">
                      {lib.name?.[0] || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="truncate">{lib.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`badge ${
                          lib.difficulty === 'beginner' ? 'badge-beginner' :
                          lib.difficulty === 'intermediate' ? 'badge-intermediate' : 'badge-advanced'
                        }`}>
                          {lib.difficulty}
                        </span>
                        {lib.category && (
                          <span className="text-xs text-earth-400 dark:text-dark-accent/40 truncate">{lib.category}</span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardDescription>{lib.description?.slice(0, 80)}{lib.description?.length > 80 ? '...' : ''}</CardDescription>
                  {lib.tags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {lib.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-earth-100 dark:bg-dark-border text-earth-500 dark:text-dark-accent/60 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>

          {filteredLibraries.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-earth-300 dark:text-dark-accent/30 mb-4" />
              <p className="text-earth-500 dark:text-dark-accent/60">Tidak ada library yang sesuai.</p>
              <button onClick={() => { setSearch(''); setActiveCategory(''); setDifficulty('') }}
                className="btn-ghost text-sm mt-2">Reset filter</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
