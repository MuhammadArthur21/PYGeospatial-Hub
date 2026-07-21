import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Wrench, PlayCircle, ArrowRight, Loader } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import api from '@/services/api'

export default function ToolsMarketplace() {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (search) params.search = search
    if (activeCategory) params.category = activeCategory

    api.get('/tools', { params })
      .then((res) => {
        setTools(res.data || [])
        setLoading(false)
      })
      .catch(() => {
        setTools([])
        setLoading(false)
      })
  }, [search, activeCategory])

  const categories = [...new Set(tools.map((t) => t.category))]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-2">
          <span className="gradient-text">Tools</span> Marketplace
        </h1>
        <p className="text-earth-500 dark:text-dark-accent/60">
          Pre-built geospatial tools ready to use — no coding required
        </p>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => { setActiveCategory(''); setSearch('') }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === ''
              ? 'bg-primary-100 text-primary-700 dark:bg-dark-accent/20 dark:text-dark-accent'
              : 'bg-white text-earth-600 dark:bg-dark-surface dark:text-dark-accent/70'
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
                ? 'bg-primary-100 text-primary-700 dark:bg-dark-accent/20 dark:text-dark-accent'
                : 'bg-white text-earth-600 dark:bg-dark-surface dark:text-dark-accent/70'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader size={24} className="animate-spin text-primary-500" />
          <span className="ml-2 text-earth-500">Loading tools...</span>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link key={tool.id} to={`/sandbox?tool=${tool.id}`}>
              <Card hover>
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-earth-100 to-earth-200 dark:from-dark-accent/10 dark:to-dark-accent/5 flex items-center justify-center">
                    <Wrench size={18} className="text-earth-600 dark:text-dark-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="truncate">{tool.name}</CardTitle>
                    <span className="text-xs text-earth-400 dark:text-dark-accent/50">{tool.category}</span>
                  </div>
                </CardHeader>
                <CardDescription>{tool.description}</CardDescription>
                <div className="mt-3 flex items-center gap-2 text-xs text-primary-600 dark:text-dark-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle size={12} />
                  Try Tool <ArrowRight size={12} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
