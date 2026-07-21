import { useState } from 'react'
import { ArrowRight, Move, Plus, Trash2, Save, Settings, GripVertical } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

const availableBlocks = [
  { id: 'buffer', name: 'Buffer Geometry', category: 'Vector', icon: '⬜' },
  { id: 'clip', name: 'Clip Raster', category: 'Raster', icon: '✂️' },
  { id: 'geocode', name: 'Geocode Address', category: 'Geocoding', icon: '📍' },
  { id: 'distance', name: 'Calculate Distance', category: 'Analysis', icon: '📏' },
  { id: 'merge', name: 'Merge Files', category: 'Vector', icon: '🔗' },
  { id: 'join', name: 'Spatial Join', category: 'Analysis', icon: '🔀' },
  { id: 'rasterize', name: 'Rasterize', category: 'Raster', icon: '📐' },
  { id: 'network', name: 'Network Analysis', category: 'Analysis', icon: '🔍' },
]

export default function WorkflowBuilder() {
  const [blocks, setBlocks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [...new Set(availableBlocks.map(b => b.category))]

  const addBlock = (block) => {
    setBlocks([...blocks, { ...block, instanceId: Date.now() }])
  }

  const removeBlock = (instanceId) => {
    setBlocks(blocks.filter(b => b.instanceId !== instanceId))
  }

  const moveBlock = (index, direction) => {
    const newBlocks = [...blocks]
    const target = index + direction
    if (target < 0 || target >= newBlocks.length) return
    ;[newBlocks[index], newBlocks[target]] = [newBlocks[target], newBlocks[index]]
    setBlocks(newBlocks)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-2">
          <span className="gradient-text">Workflow</span> Builder
        </h1>
        <p className="text-earth-500 dark:text-dark-accent/60">
          Drag and drop tools to create automated geospatial pipelines
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tool Palette */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <Settings size={18} className="text-primary-600 dark:text-dark-accent" />
              <CardTitle>Tool Blocks</CardTitle>
            </CardHeader>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <button onClick={() => setSelectedCategory('all')}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  selectedCategory === 'all'
                    ? 'bg-primary-100 text-primary-700 dark:bg-dark-accent/20 dark:text-dark-accent'
                    : 'bg-earth-100 text-earth-600 dark:bg-dark-surface dark:text-dark-accent/70'
                }`}>All</button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedCategory === cat
                      ? 'bg-primary-100 text-primary-700 dark:bg-dark-accent/20 dark:text-dark-accent'
                      : 'bg-earth-100 text-earth-600 dark:bg-dark-surface dark:text-dark-accent/70'
                  }`}>{cat}</button>
              ))}
            </div>
            <div className="space-y-1.5">
              {availableBlocks
                .filter(b => selectedCategory === 'all' || b.category === selectedCategory)
                .map(block => (
                  <div key={block.id}
                    onClick={() => addBlock(block)}
                    className="flex items-center gap-2 p-2 rounded-lg cursor-pointer
                             hover:bg-earth-100 dark:hover:bg-dark-hover transition-colors group">
                    <span className="text-lg">{block.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-earth-800 dark:text-dark-text">{block.name}</p>
                      <p className="text-xs text-earth-400 dark:text-dark-accent/50">{block.category}</p>
                    </div>
                    <Plus size={14} className="text-primary-500 dark:text-dark-accent opacity-0 group-hover:opacity-100" />
                  </div>
                ))}
            </div>
          </Card>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-3">
          <Card className="min-h-[400px]">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <ArrowRight size={18} className="text-primary-600 dark:text-dark-accent" />
                  <CardTitle>Pipeline Canvas</CardTitle>
                </div>
                {blocks.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-earth-500 dark:text-dark-accent/60">{blocks.length} blocks</span>
                    <button onClick={() => setBlocks([])} className="btn-ghost text-xs text-rose-500">Clear</button>
                  </div>
                )}
              </div>
            </CardHeader>

            {blocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-earth-400 dark:text-dark-accent/50">
                <Move size={40} className="mb-3 opacity-50" />
                <p className="text-sm">Click tool blocks from the left panel to build your pipeline</p>
              </div>
            ) : (
              <div className="space-y-2">
                {blocks.map((block, index) => (
                  <div key={block.instanceId}
                    className="flex items-center gap-3 p-3 rounded-lg bg-earth-50 dark:bg-dark-surface border border-earth-200 dark:border-dark-border group">
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => moveBlock(index, -1)} className="text-earth-400 hover:text-primary-600 dark:hover:text-dark-accent p-0.5">
                        <span className="text-[10px]">▲</span>
                      </button>
                      <button onClick={() => moveBlock(index, 1)} className="text-earth-400 hover:text-primary-600 dark:hover:text-dark-accent p-0.5">
                        <span className="text-[10px]">▼</span>
                      </button>
                    </div>
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-primary-100 to-sage-100 dark:from-dark-accent/20 dark:to-dark-accent/10 flex items-center justify-center text-sm">
                      {block.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-earth-800 dark:text-dark-text">
                        #{index + 1} {block.name}
                      </p>
                      <p className="text-xs text-earth-400 dark:text-dark-accent/50">{block.category}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="btn-ghost p-1.5">
                        <Settings size={14} />
                      </button>
                      <button onClick={() => removeBlock(block.instanceId)}
                        className="btn-ghost p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    <Save size={16} />
                    Run Pipeline ({blocks.length} steps)
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
