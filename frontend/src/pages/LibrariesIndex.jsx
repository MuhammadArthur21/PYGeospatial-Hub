import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen, Filter, Loader } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { libraryService } from '@/services/libraryService'

const categories = [
  { id: 'core_geospatial', name: 'Core Geospatial', icon: '📍' },
  { id: 'remote_sensing', name: 'Remote Sensing', icon: '🛰️' },
  { id: 'web_mapping', name: 'Web Mapping', icon: '🗺️' },
  { id: 'spatial_analysis', name: 'Spatial Analysis', icon: '📐' },
  { id: 'visualization', name: 'Visualization', icon: '📊' },
  { id: 'geocoding_routing', name: 'Geocoding & Routing', icon: '📍' },
  { id: 'databases', name: 'Databases', icon: '🗄️' },
  { id: 'point_cloud_lidar', name: 'Point Cloud & LiDAR', icon: '☁️' },
  { id: 'utilities', name: 'Utilities', icon: '🔧' },
]

export default function LibrariesIndex() {
  const [libraries, setLibraries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (search) params.search = search
    if (activeCategory) params.category = activeCategory
    if (difficulty) params.difficulty = difficulty

    libraryService.list(params)
      .then((res) => {
        setLibraries(res.data || res || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [search, activeCategory, difficulty])

  const filteredLibraries = Array.isArray(libraries) ? libraries :
                           libraries.data ? libraries.data : []

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
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`sidebar-item w-full text-sm ${activeCategory === cat.id ? 'active' : ''}`}
                >
                  <span>{cat.icon}</span>
                  <span className="flex-1 text-left">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader size={24} className="animate-spin text-primary-500" />
              <span className="ml-2 text-earth-500">Loading libraries...</span>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredLibraries.map((lib) => (
                <Link key={lib.id} to={`/libraries/${lib.id}`}>
                  <Card hover>
                    <CardHeader>
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-sage-100 dark:from-dark-accent/20 dark:to-dark-accent/10
                                    flex items-center justify-center text-lg text-primary-700 dark:text-dark-accent font-semibold">
                        {lib.name?.[0] || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="truncate">{lib.name}</CardTitle>
                        <span className={`badge ${
                          lib.difficulty === 'beginner' ? 'badge-beginner' :
                          lib.difficulty === 'intermediate' ? 'badge-intermediate' : 'badge-advanced'
                        }`}>
                          {lib.difficulty || 'N/A'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardDescription>{lib.description?.slice(0, 60)}...</CardDescription>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredLibraries.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-earth-300 dark:text-dark-accent/30 mb-4" />
              <p className="text-earth-500 dark:text-dark-accent/60">No libraries found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
