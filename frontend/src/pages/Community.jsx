import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Code, MessageCircle, Heart, Share2, Bookmark, Clock, ArrowUp } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

const sampleScripts = [
  { id: 1, title: 'Jakarta Buffer Analysis', author: 'geo_expert', lang: 'python', upvotes: 24, comments: 5, desc: 'Create buffer zones around Jakarta landmarks using Shapely', saved: true },
  { id: 2, title: 'Land Cover Classification', author: 'gis_dev', lang: 'python', upvotes: 18, comments: 3, desc: 'Classify satellite imagery using Rasterio and NumPy', saved: false },
  { id: 3, title: 'Road Network Extraction', author: 'mapper42', lang: 'python', upvotes: 15, comments: 7, desc: 'Extract and analyze OSM road networks with OSMnx', saved: false },
  { id: 4, title: 'DEM Visualization', author: 'terrain_analyst', lang: 'python', upvotes: 12, comments: 2, desc: '3D Digital Elevation Model visualization with matplotlib', saved: true },
  { id: 5, title: 'Geocoding Pipeline', author: 'spatial_dev', lang: 'python', upvotes: 9, comments: 1, desc: 'Batch geocode addresses using GeoPy', saved: false },
]

export default function Community() {
  const [scripts] = useState(sampleScripts)
  const [filter, setFilter] = useState('trending')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-2">
            <span className="gradient-text">Community</span> Scripts
          </h1>
          <p className="text-earth-500 dark:text-dark-accent/60">
            Discover, share, and collaborate on geospatial Python scripts
          </p>
        </div>
        <Link to="/sandbox" className="btn-primary flex items-center gap-2">
          <Code size={16} />
          Share Script
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['trending', 'recent', 'most_upvoted', 'most_commented'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              filter === f
                ? 'bg-primary-100 text-primary-700 dark:bg-dark-accent/20 dark:text-dark-accent'
                : 'bg-white text-earth-600 dark:bg-dark-surface dark:text-dark-accent/70'
            }`}
          >
            {f.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {scripts.map((script) => (
          <Card key={script.id} hover>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 min-w-[40px]">
                <button className="p-1 hover:bg-primary-50 dark:hover:bg-dark-hover rounded">
                  <ArrowUp size={18} className="text-earth-400 hover:text-primary-600 dark:hover:text-dark-accent" />
                </button>
                <span className="text-sm font-semibold text-earth-700 dark:text-dark-text">{script.upvotes}</span>
              </div>
              <div className="flex-1 min-w-0">
                <Link to="/sandbox" className="text-lg font-semibold text-earth-900 dark:text-dark-text hover:text-primary-600 dark:hover:text-dark-accent">
                  {script.title}
                </Link>
                <p className="text-sm text-earth-500 dark:text-dark-accent/60 mt-1">{script.desc}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-earth-400 dark:text-dark-accent/50">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {script.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={12} />
                    {script.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    Python
                  </span>
                  <button className="ml-auto flex items-center gap-1 hover:text-primary-600 dark:hover:text-dark-accent">
                    <Heart size={12} className={script.saved ? 'fill-red-400 text-red-400' : ''} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-dark-accent">
                    <Bookmark size={12} className={script.saved ? 'fill-primary-500 text-primary-500' : ''} />
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-dark-accent">
                    <Share2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
