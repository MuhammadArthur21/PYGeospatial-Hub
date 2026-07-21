import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen, Filter } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

const categories = [
  { id: 'core', name: 'Core Geospatial', icon: '📍', count: 6 },
  { id: 'remote', name: 'Remote Sensing', icon: '🛰️', count: 5 },
  { id: 'web', name: 'Web Mapping', icon: '🗺️', count: 4 },
  { id: 'analysis', name: 'Spatial Analysis', icon: '📐', count: 5 },
  { id: 'viz', name: 'Visualization', icon: '📊', count: 4 },
  { id: 'geocoding', name: 'Geocoding & Routing', icon: '📍', count: 3 },
  { id: 'database', name: 'Databases', icon: '🗄️', count: 3 },
  { id: 'lidar', name: 'Point Cloud & LiDAR', icon: '☁️', count: 2 },
  { id: 'utilities', name: 'Utilities', icon: '🔧', count: 4 },
]

const sampleLibraries = [
  { id: 'shapely', name: 'Shapely', category: 'core', difficulty: 'beginner', desc: 'Geometric operations on planar features' },
  { id: 'geopandas', name: 'GeoPandas', category: 'core', difficulty: 'intermediate', desc: 'Extends pandas for geospatial data' },
  { id: 'rasterio', name: 'Rasterio', category: 'core', difficulty: 'intermediate', desc: 'Read and write raster data formats' },
  { id: 'pyproj', name: 'Pyproj', category: 'core', difficulty: 'beginner', desc: 'Coordinate transformations & projections' },
  { id: 'folium', name: 'Folium', category: 'web', difficulty: 'beginner', desc: 'Interactive leaflet maps from Python' },
  { id: 'osmnx', name: 'OSMnx', category: 'analysis', difficulty: 'advanced', desc: 'Download and analyze OpenStreetMap data' },
]

export default function LibrariesIndex() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredLibraries = sampleLibraries.filter((lib) => {
    const matchesSearch = lib.name.toLowerCase().includes(search.toLowerCase()) ||
                         lib.desc.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || lib.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-900 mb-2">
          <span className="gradient-text">Library</span> Index
        </h1>
        <p className="text-earth-500">
          Browse, search, and explore 100+ Python geospatial libraries
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
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-earth-400" />
          <span className="text-sm text-earth-500">Category:</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-earth-700 uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`sidebar-item w-full text-sm ${activeCategory === 'all' ? 'active' : ''}`}
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
                  <span className="text-xs text-earth-400">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredLibraries.map((lib) => (
              <Link key={lib.id} to={`/libraries/${lib.id}`}>
                <Card hover>
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-sage-100 
                                  flex items-center justify-center text-lg text-primary-700 font-semibold">
                      {lib.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="truncate">{lib.name}</CardTitle>
                      <span className={`badge ${
                        lib.difficulty === 'beginner' ? 'badge-beginner' :
                        lib.difficulty === 'intermediate' ? 'badge-intermediate' : 'badge-advanced'
                      }`}>
                        {lib.difficulty}
                      </span>
                    </div>
                  </CardHeader>
                  <CardDescription>{lib.desc}</CardDescription>
                </Card>
              </Link>
            ))}
          </div>

          {filteredLibraries.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-earth-300 mb-4" />
              <p className="text-earth-500">No libraries found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
