import { useState } from 'react'
import { Search, FileText, Code, ChevronRight, ChevronDown, ExternalLink, BookOpen, ArrowLeft } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

// Content extracted from actual docs/*.md files
const DOC_CONTENT = {
  'Quick Start Guide': {
    icon: '🚀',
    body: `## Quick Start Guide

### 1. Browse Libraries
Navigate to **Libraries** page to explore 100+ geospatial Python libraries.

### 2. Use the Sandbox
Go to **Sandbox**, select libraries, write Python code, click **Run**.

### 3. Use Pre-built Tools
Visit **Tools Marketplace** for ready-to-use geo operations (Buffer, Clip, Geocode, etc.)

### 4. Save & Share
Save scripts to your Dashboard and share with the community.`,
  },
  'Installation': {
    icon: '⚙️',
    body: `## Installation

### Backend
\`\`\`bash
cd backend
python -m venv venv
venv\\Scripts\\activate  # Windows
pip install -r requirements.txt
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### Docker (Full Stack)
\`\`\`bash
docker-compose up -d
\`\`\`

**Prerequisites:** Python 3.10+, Node.js 18+, PostgreSQL + PostGIS, Redis (optional)`,
  },
  'Platform Overview': {
    icon: '🌐',
    body: `## Platform Overview

**PyGeospatial Hub** is a one-stop platform for the entire Python Geospatial Libraries ecosystem.

### Architecture
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI + SQLAlchemy + GeoAlchemy2
- **GIS Core**: Shapely, GeoPandas, Rasterio, Pyproj, GDAL
- **Database**: PostgreSQL + PostGIS
- **Cache**: Redis
- **Container**: Docker

### Features
- 100+ geospatial libraries indexed & searchable
- Interactive sandbox with Monaco editor
- Pre-built geospatial tools marketplace
- Visualization engine (maps & charts)
- Community sharing & collaboration`,
  },
  'Your First Analysis': {
    icon: '📊',
    body: `## Your First Analysis

### Contoh: Analisis Buffer Sederhana
\`\`\`python
from shapely.geometry import Point

# Titik lokasi Monas, Jakarta
monas = Point(106.8272, -6.1751)

# Buat buffer 1km
buffer = monas.buffer(0.01)
print(f"Buffer area: {buffer.area:.4f} sq deg")
\`\`\`

### Contoh: Baca Data Spasial
\`\`\`python
import geopandas as gpd

# Load Natural Earth world data
world = gpd.read_file(
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/'
  'master/geojson/ne_110m_land.geojson'
)
asia = world[world['continent'] == 'Asia']
print(asia[['name', 'pop_est']].head())
\`\`\``,
  },
  'Libraries Registry': {
    icon: '📚',
    body: `## Libraries Registry

The Libraries Registry catalogs **100+ Python geospatial libraries** organized into 10 categories:

- **Core Geospatial** (12): Shapely, GeoPandas, Rasterio, GDAL, Pyproj, Fiona, dll.
- **Remote Sensing** (9): Satpy, SentinelSat, PySTAC, EODAG, dll.
- **Web Mapping** (7): Folium, ipyleaflet, Kepler.gl, Geemap, Leafmap
- **Spatial Analysis** (7): PySAL, OSMnx, NetworkX, Momepy
- **Visualization** (8): Matplotlib, Plotly, Cartopy, GeoViews
- **Geocoding & Routing** (5): GeoPy, OpenRouteService, Google Maps
- **Databases** (6): GeoAlchemy2, Psycopg2, DuckDB, GeoParquet
- **Point Cloud & LiDAR** (5): Laspy, PDAL, Open3D, PyVista
- **Machine Learning** (8): TorchGeo, Scikit-learn, SAM Geo, RasterVision
- **Utilities** (33): Haversine, GeoJSON, PyGeodesy, MovingPandas

Setiap library memiliki detail, dokumentasi, dan contoh kode.`,
  },
  'Sandbox Environment': {
    icon: '🧪',
    body: `## Sandbox Environment

The Sandbox is an interactive Python coding environment in your browser.

### Features
- **Monaco Editor** (VS Code engine) with syntax highlighting
- **Pre-installed geospatial libraries** ready to import
- **Real-time output** panel for stdout/stderr
- **Data upload** support for GeoJSON, Shapefile, GeoTIFF, LAS
- **Map visualization** auto-render for GeoJSON output

### Usage
1. Select libraries from the sidebar
2. Write code in the editor
3. Click **Run** to execute
4. View results in the output panel`,
  },
  'File Uploads': {
    icon: '📁',
    body: `## File Uploads

Supported file formats for upload and processing:

| Format | Extension | Description |
|--------|-----------|-------------|
| GeoJSON | .geojson | Vector data format |
| Shapefile | .shp | ESRI shapefile (zip) |
| GeoTIFF | .tif/.tiff | Raster satellite imagery |
| LAS/LAZ | .las/.laz | LiDAR point cloud |
| CSV | .csv | Tabular data with lat/lon |

Maximum file size: **50MB** per upload.`,
  },
  'Visualization Engine': {
    icon: '🗺️',
    body: `## Visualization Engine

Auto-render spatial data to interactive maps and charts.

### Supported Outputs
- **GeoJSON** → Interactive Leaflet map
- **Matplotlib** → Static publication-ready figures
- **Plotly** → Interactive charts
- **Folium** → Web maps with markers & popups

The engine detects output type and renders automatically.`,
  },
  'Authentication': {
    icon: '🔐',
    body: `## Authentication

All protected endpoints require a JWT token:

\`\`\`
Authorization: Bearer <your-token>
\`\`\`

### Auth Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login, returns JWT |
| POST | /auth/refresh | Refresh token |
| POST | /auth/logout | Invalidate token |

### Rate Limits
- Free tier: 100 requests/day
- Pro tier: 10,000 requests/day
- Enterprise: Unlimited`,
  },
  'Libraries API': {
    icon: '📖',
    body: `## Libraries API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /libraries | List all libraries |
| GET | /libraries/{id} | Get library details |
| GET | /categories | List categories |
| GET | /categories/{id} | Get category with libraries |

### Query Parameters (GET /libraries)
- \`search\` — Filter by name/description
- \`category\` — Filter by category ID
- \`difficulty\` — beginner/intermediate/advanced
- \`page\` / \`limit\` — Pagination`,
  },
  'Sandbox API': {
    icon: '⚡',
    body: `## Sandbox API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /sandbox/execute | Execute Python code |
| GET | /sandbox/status/{id} | Check execution status |
| POST | /sandbox/validate | Validate code syntax |

### Execute Code
\`\`\`json
POST /sandbox/execute
{
  "code": "print('Hello Geo!')",
  "libraries": ["shapely", "geopandas"],
  "timeout": 30
}
\`\`\`

Returns execution ID for status polling.`,
  },
  'Tools API': {
    icon: '🔧',
    body: `## Tools API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tools | List all pre-built tools |
| GET | /tools/{id} | Get tool details |

### Available Tools
- Buffer Geometry, Clip Raster, Geocode Address
- Calculate Distance, Merge Shapefiles
- Rasterize Vector, Extract OSM Data
- Spatial Join, Generate Tiles, Analyze Network`,
  },
  'Uploads API': {
    icon: '📤',
    body: `## Uploads API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /uploads | Upload a file |
| GET | /uploads | List user uploads |
| DELETE | /uploads/{id} | Delete file |

### Supported Formats
GeoJSON, Shapefile (zip), GeoTIFF, LAS/LAZ, CSV

Max file size: **50MB**`,
  },
  'Shapely Guide': {
    icon: '📐',
    body: `## Shapely Guide

Shapely is for geometric operations on planar features.

### Basic Operations
\`\`\`python
from shapely.geometry import Point, Polygon
from shapely.ops import unary_union

point = Point(106.8, -6.1)
polygon = Polygon([(106.6,-6.0), (107.0,-6.0), (107.0,-6.3), (106.6,-6.3)])

# Spatial predicates
print(polygon.contains(point))
print(polygon.intersects(point))

# Buffer
buffer = point.buffer(0.01)
print(f"Area: {buffer.area}")
\`\`\`

Full guide: \`docs/tutorials/shapely_guide.md\``,
  },
  'GeoPandas Guide': {
    icon: '🐼',
    body: `## GeoPandas Guide

GeoPandas extends pandas for geospatial data.

### Basic Usage
\`\`\`python
import geopandas as gpd

world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
asia = world[world['continent'] == 'Asia']

# Spatial join
cities = gpd.read_file('cities.geojson')
joined = gpd.sjoin(cities, asia, how='inner', predicate='within')
print(joined[['name', 'pop_est']])
\`\`\`

Full guide: \`docs/tutorials/geopandas_guide.md\``,
  },
  'Rasterio Guide': {
    icon: '🛰️',
    body: `## Rasterio Guide

Rasterio provides professional raster data I/O.

### Basic Usage
\`\`\`python
import rasterio
from rasterio.plot import show
import matplotlib.pyplot as plt

with rasterio.open('landsat.tif') as src:
    print(f"CRS: {src.crs}")
    print(f"Bounds: {src.bounds}")
    print(f"Shape: {src.shape}")
    
    # Read band 1
    band1 = src.read(1)
    print(f"Band 1 stats: min={band1.min()}, max={band1.max()}")
\`\`\`

Full guide: \`docs/tutorials/rasterio_guide.md\``,
  },
  'Folium Guide': {
    icon: '📍',
    body: `## Folium Guide

Folium creates interactive Leaflet maps from Python.

### Basic Usage
\`\`\`python
import folium

m = folium.Map(location=[-2.5, 118.0], zoom_start=5)
folium.Marker([-6.2, 106.8], popup="Jakarta").add_to(m)
m.save('map.html')
print("Map created!")
\`\`\``,
  },
  'Sharing Scripts': {
    icon: '🔗',
    body: `## Sharing Scripts

Share your geospatial analysis scripts with the community.

### How to Share
1. Save your script from the **Sandbox**
2. Set visibility to **Public**
3. Share the link with others
4. Others can fork, comment, and upvote

### Community Features
- Like and comment on scripts
- Fork and improve existing work
- Earn reputation points`,
  },
  'Tools Marketplace': {
    icon: '🔧',
    body: `## Tools Marketplace

Pre-built geospatial operations ready to use — no coding required.

### Categories
- **Vector**: Buffer, Spatial Join, Merge Shapefiles
- **Raster**: Clip Raster, Rasterize Vector, Generate Tiles
- **Geocoding**: Geocode Address
- **Analysis**: Calculate Distance, Analyze Network
- **Data**: Extract OSM Data

Click any tool to open the sandbox pre-configured with that operation.`,
  },
  'Contributing Guidelines': {
    icon: '🤝',
    body: `## Contributing Guidelines

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a Pull Request

### Code Standards
- Python: Follow PEP 8, type hints required
- JavaScript: ESLint with React Hooks plugin
- Tests: pytest for backend, Vitest for frontend`,
  },
}

const DOC_SECTIONS = [
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
  const [search, setSearch] = useState('')
  const [activeDoc, setActiveDoc] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const allItems = DOC_SECTIONS.flatMap(s => s.items)
  const filteredItems = search
    ? allItems.filter(i => i.toLowerCase().includes(search.toLowerCase()))
    : allItems

  const selectedDoc = activeDoc ? DOC_CONTENT[activeDoc] : null
  const selectedSection = activeDoc
    ? DOC_SECTIONS.find(s => s.items.includes(activeDoc))
    : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-2">
          <span className="gradient-text">Documentation</span>
        </h1>
        <p className="text-earth-500 dark:text-dark-accent/60">
          Complete guide to the PyGeospatial Hub platform and API
        </p>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
        <input
          type="text"
          placeholder="Search documentation..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setActiveDoc(null) }}
          className="input-field pl-10"
        />
      </div>

      {search && filteredItems.length > 0 && (
        <div className="glass-card p-4 mb-8 rounded-xl border border-earth-200 dark:border-dark-border">
          <p className="text-xs text-earth-500 dark:text-dark-accent/60 mb-2">Hasil pencarian:</p>
          <div className="flex flex-wrap gap-2">
            {filteredItems.map(item => (
              <button
                key={item}
                onClick={() => { setActiveDoc(item); setSearch('') }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-50 text-primary-700 dark:bg-dark-accent/15 dark:text-dark-accent border border-primary-200 dark:border-dark-accent/30 hover:bg-primary-100 transition-colors"
              >
                {DOC_CONTENT[item]?.icon} {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className={`col-span-12 ${activeDoc ? 'lg:col-span-3' : 'lg:col-span-12'} ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
          <div className={`grid ${activeDoc ? '' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {(search ? [] : DOC_SECTIONS).map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <span className="text-2xl">{section.icon}</span>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <div className="space-y-2">
                  {section.items.map((item) => {
                    const isActive = activeDoc === item
                    const doc = DOC_CONTENT[item]
                    return (
                      <button
                        key={item}
                        onClick={() => setActiveDoc(isActive ? null : item)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 dark:bg-dark-accent/15 dark:text-dark-accent'
                            : 'text-earth-500 hover:text-primary-700 hover:bg-primary-50 dark:text-dark-accent/60 dark:hover:text-dark-text dark:hover:bg-dark-border'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <FileText size={14} className="flex-shrink-0" />
                          <span>{item}</span>
                        </span>
                        {isActive ? (
                          <ChevronDown size={14} className="flex-shrink-0" />
                        ) : (
                          <ChevronRight size={14} className="flex-shrink-0 opacity-0 group-hover:opacity-100" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Doc Viewer */}
        {activeDoc && selectedDoc && (
          <div className="col-span-12 lg:col-span-9">
            <div className="flex items-center gap-2 mb-4 lg:hidden">
              <button
                onClick={() => setActiveDoc(null)}
                className="flex items-center gap-1 text-sm text-primary-600 dark:text-dark-accent hover:underline"
              >
                <ArrowLeft size={16} /> Back to docs
              </button>
            </div>

            <Card>
              <CardHeader>
                <span className="text-2xl">{selectedDoc.icon}</span>
                <div>
                  <CardTitle className="text-xl">{activeDoc}</CardTitle>
                  {selectedSection && (
                    <CardDescription>{selectedSection.title}</CardDescription>
                  )}
                </div>
              </CardHeader>
              <div className="prose prose-sm max-w-none dark:prose-invert px-6 pb-6">
                {selectedDoc.body.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-lg font-bold text-earth-900 dark:text-dark-text mt-6 mb-3">{line.slice(3)}</h2>
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={i} className="text-base font-semibold text-earth-800 dark:text-dark-text/90 mt-4 mb-2">{line.slice(4)}</h3>
                  }
                  if (line.startsWith('- **')) {
                    const match = line.match(/- \*\*(.+?)\*\*(.*)/)
                    if (match) return <li key={i} className="text-sm text-earth-700 dark:text-dark-text/80 ml-4"><strong>{match[1]}</strong>{match[2]}</li>
                  }
                  if (line.startsWith('- ')) {
                    return <li key={i} className="text-sm text-earth-700 dark:text-dark-text/80 ml-4">{line.slice(2)}</li>
                  }
                  if (line.startsWith('|')) {
                    if (line.includes('---')) return null
                    const cells = line.split('|').filter(Boolean).map(c => c.trim())
                    return (
                      <div key={i} className="flex text-sm py-1 border-b border-earth-100 dark:border-dark-border last:border-0">
                        {cells.map((c, j) => (
                          <span key={j} className={`flex-1 ${j === 0 ? 'font-semibold text-earth-800 dark:text-dark-text' : 'text-earth-600 dark:text-dark-text/70'}`}>{c}</span>
                        ))}
                      </div>
                    )
                  }
                  if (line.startsWith('```')) {
                    const lang = line.slice(3)
                    return (
                      <div key={i} className="relative group">
                        {lang && <span className="absolute top-2 right-2 text-xs text-earth-400 font-mono">{lang}</span>}
                      </div>
                    )
                  }
                  if (line.trim() === '') return <div key={i} className="h-2" />

                  // Check if this is inside a code block
                  return <p key={i} className="text-sm text-earth-700 dark:text-dark-text/80 leading-relaxed">{line}</p>
                })}
              </div>
            </Card>

            {/* Navigation between docs */}
            <div className="flex justify-between mt-6">
              {(() => {
                const allDocKeys = DOC_SECTIONS.flatMap(s => s.items)
                const idx = allDocKeys.indexOf(activeDoc)
                const prev = idx > 0 ? allDocKeys[idx - 1] : null
                const next = idx < allDocKeys.length - 1 ? allDocKeys[idx + 1] : null
                return (
                  <>
                    {prev ? (
                      <button onClick={() => setActiveDoc(prev)} className="flex items-center gap-1 text-sm text-primary-600 dark:text-dark-accent hover:underline">
                        <ArrowLeft size={14} /> {prev}
                      </button>
                    ) : <div />}
                    {next ? (
                      <button onClick={() => setActiveDoc(next)} className="flex items-center gap-1 text-sm text-primary-600 dark:text-dark-accent hover:underline">
                        {next} <ChevronRight size={14} />
                      </button>
                    ) : <div />}
                  </>
                )
              })()}
            </div>
          </div>
        )}
      </div>

      {/* API Quick Access */}
      {!search && !activeDoc && (
        <Card className="mt-8">
          <CardHeader>
            <Code size={20} className="text-primary-600 dark:text-dark-accent" />
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
              <div key={endpoint.path} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-earth-50 dark:bg-dark-border">
                <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                  endpoint.method === 'GET'
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                    : 'bg-sage-100 text-sage-700 dark:bg-sage-900/40 dark:text-sage-300'
                }`}>
                  {endpoint.method}
                </span>
                <code className="font-mono text-xs text-earth-700 dark:text-dark-text/80">/api/v1{endpoint.path}</code>
                <span className="text-earth-500 dark:text-dark-accent/60 ml-auto">{endpoint.desc}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
