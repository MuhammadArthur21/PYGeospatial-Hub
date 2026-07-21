import { Search, FileText, Code, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

const docSections = [
  {
    title: 'Getting Started', icon: '🚀',
    items: ['Quick Start Guide', 'Installation', 'Platform Overview', 'Your First Analysis'],
  },
  {
    title: 'Core Concepts', icon: '📚',
    items: ['Libraries Registry', 'Sandbox Environment', 'File Uploads', 'Visualization Engine'],
  },
  {
    title: 'API Reference', icon: '🔌',
    items: ['Authentication', 'Libraries API', 'Sandbox API', 'Tools API', 'Uploads API'],
  },
  {
    title: 'Tutorials', icon: '📖',
    items: ['Shapely Guide', 'GeoPandas Guide', 'Rasterio Guide', 'Folium Guide'],
  },
  {
    title: 'Community', icon: '👥',
    items: ['Sharing Scripts', 'Tools Marketplace', 'Contributing Guidelines'],
  },
]

export default function Documentation() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-900 mb-2">
          <span className="gradient-text">Documentation</span>
        </h1>
        <p className="text-earth-500">
          Complete guide to the PyGeospatial Hub platform and API
        </p>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
        <input type="text" placeholder="Search documentation..." className="input-field pl-10" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {docSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <span className="text-2xl">{section.icon}</span>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              {section.items.map((item) => (
                <a key={item} href="#"
                  className="flex items-center justify-between px-3 py-2 rounded-lg
                           text-sm text-earth-500 hover:text-primary-700 hover:bg-primary-50 
                           transition-colors group cursor-pointer">
                  <span className="flex items-center gap-2">
                    <FileText size={14} className="text-earth-400" />
                    {item}
                  </span>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <Code size={20} className="text-primary-600" />
          <CardTitle>Quick API Access</CardTitle>
          <CardDescription>Base URL: http://localhost:8000/api/v1</CardDescription>
        </CardHeader>
        <div className="space-y-2 text-sm">
          {[
            { method: 'GET', path: '/libraries', desc: 'List all libraries' },
            { method: 'GET', path: '/categories', desc: 'List categories' },
            { method: 'POST', path: '/sandbox/execute', desc: 'Execute code' },
            { method: 'POST', path: '/uploads', desc: 'Upload dataset' },
          ].map((endpoint) => (
            <div key={endpoint.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-earth-100">
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                endpoint.method === 'GET'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-sage-100 text-sage-700'
              }`}>
                {endpoint.method}
              </span>
              <code className="font-mono text-xs text-earth-700">/api/v1{endpoint.path}</code>
              <span className="text-earth-500 ml-auto">{endpoint.desc}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
