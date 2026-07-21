import { useState } from 'react'
import { Search, Wrench, PlayCircle, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

const toolCategories = ['Vector', 'Raster', 'Analysis', 'Geocoding', 'Data']

const tools = [
  { id: 'buffer', name: 'Buffer Geometry', category: 'Vector', desc: 'Create buffer zones around geometries', popular: true },
  { id: 'clip', name: 'Clip Raster', category: 'Raster', desc: 'Clip raster to polygon boundary', popular: true },
  { id: 'geocode', name: 'Geocode Address', category: 'Geocoding', desc: 'Convert addresses to coordinates', popular: true },
  { id: 'distance', name: 'Distance Calculator', category: 'Analysis', desc: 'Calculate distances between points', popular: false },
  { id: 'merge', name: 'Merge Files', category: 'Vector', desc: 'Combine multiple files into one', popular: true },
  { id: 'join', name: 'Spatial Join', category: 'Analysis', desc: 'Join attributes spatially', popular: false },
]

export default function ToolsLibrary({ onSelect }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = tools.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || t.category === category
    return matchSearch && matchCat
  })

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => setCategory('all')}
          className={`px-2 py-1 rounded text-xs font-medium ${
            category === 'all'
              ? 'bg-primary-100 text-primary-700 dark:bg-dark-accent/20 dark:text-dark-accent'
              : 'bg-earth-100 text-earth-600 dark:bg-dark-surface dark:text-dark-accent/70'
          }`}
        >
          All
        </button>
        {toolCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-2 py-1 rounded text-xs font-medium ${
              category === cat
                ? 'bg-primary-100 text-primary-700 dark:bg-dark-accent/20 dark:text-dark-accent'
                : 'bg-earth-100 text-earth-600 dark:bg-dark-surface dark:text-dark-accent/70'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onSelect?.(tool.id)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                     hover:bg-earth-100 dark:hover:bg-dark-hover transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-earth-100 to-earth-200 
                          dark:from-dark-accent/10 dark:to-dark-accent/5 flex items-center justify-center">
              <Wrench size={14} className="text-earth-600 dark:text-dark-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-earth-800 dark:text-dark-text truncate">{tool.name}</p>
              <p className="text-xs text-earth-500 dark:text-dark-accent/60">{tool.category}</p>
            </div>
            {tool.popular && <span className="badge-beginner text-[10px]">Popular</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
