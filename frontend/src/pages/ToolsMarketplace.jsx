import { useState } from 'react'
import { Search, Wrench, PlayCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

const tools = [
  {
    id: 'buffer',
    name: 'Buffer Geometry',
    description: 'Create a buffer zone around points, lines, or polygons',
    category: 'Vector',
    uses: ['Spatial analysis', 'Proximity analysis'],
    popular: true,
  },
  {
    id: 'clip',
    name: 'Clip Raster',
    description: 'Clip a raster dataset to a polygon boundary',
    category: 'Raster',
    uses: ['Extract region of interest', 'Crop satellite imagery'],
    popular: true,
  },
  {
    id: 'geocode',
    name: 'Geocode Address',
    description: 'Convert addresses to geographic coordinates',
    category: 'Geocoding',
    uses: ['Address lookup', 'Coordinate conversion'],
    popular: true,
  },
  {
    id: 'distance',
    name: 'Calculate Distance',
    description: 'Calculate distances between geographic points',
    category: 'Analysis',
    uses: ['Route planning', 'Proximity measurement'],
    popular: false,
  },
  {
    id: 'merge',
    name: 'Merge Shapefiles',
    description: 'Combine multiple shapefiles into one',
    category: 'Vector',
    uses: ['Data integration', 'Batch processing'],
    popular: true,
  },
  {
    id: 'rasterize',
    name: 'Rasterize Vector',
    description: 'Convert vector data to raster format',
    category: 'Raster',
    uses: ['Convert to raster', 'Create raster masks'],
    popular: false,
  },
  {
    id: 'osm',
    name: 'Extract OSM Data',
    description: 'Download and filter OpenStreetMap data',
    category: 'Data',
    uses: ['Get map data', 'Extract features'],
    popular: true,
  },
  {
    id: 'join',
    name: 'Spatial Join',
    description: 'Join attributes based on spatial relationships',
    category: 'Analysis',
    uses: ['Attribute enrichment', 'Spatial queries'],
    popular: false,
  },
  {
    id: 'tiles',
    name: 'Generate Tiles',
    description: 'Generate map tiles from raster data',
    category: 'Raster',
    uses: ['Web maps', 'Tile serving'],
    popular: false,
  },
  {
    id: 'network',
    name: 'Analyze Network',
    description: 'Analyze road networks and routing',
    category: 'Analysis',
    uses: ['Network analysis', 'Shortest path'],
    popular: false,
  },
]

export default function ToolsMarketplace() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [...new Set(tools.map((t) => t.category))]
  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                         tool.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          <span className="gradient-text">Tools</span> Marketplace
        </h1>
        <p className="text-gray-400">
          Pre-built geospatial tools ready to use — no coding required
        </p>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
              : 'bg-surface-800 text-gray-400 border border-surface-700 hover:bg-surface-700'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                : 'bg-surface-800 text-gray-400 border border-surface-700 hover:bg-surface-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <Link key={tool.id} to={`/sandbox?tool=${tool.id}`}>
            <Card hover>
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 
                              flex items-center justify-center">
                  <Wrench size={18} className="text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="truncate">{tool.name}</CardTitle>
                  <span className="text-xs text-gray-500">{tool.category}</span>
                </div>
                {tool.popular && (
                  <span className="badge-beginner text-[10px]">Popular</span>
                )}
              </CardHeader>
              <CardDescription>{tool.description}</CardDescription>
              <div className="mt-3 flex items-center gap-2 text-xs text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle size={12} />
                Try Tool
                <ArrowRight size={12} />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
