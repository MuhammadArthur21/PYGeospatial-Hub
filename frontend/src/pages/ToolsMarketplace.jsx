import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Wrench, PlayCircle, ArrowRight, Sliders } from 'lucide-react'
import WorkflowBuilder from '@/components/WorkflowBuilder'
import api from '@/services/api'

const TOOL_TEMPLATES = {
  buffer: `from shapely.geometry import Point, Polygon
import json

# === Buffer Geometry Tool ===
# Buat zona penyangga di sekitar fitur geometri

# Contoh: Buffer 0.01 derajat (~1km) di sekitar Monas
monas = Point(106.8272, -6.1751)
buffer = monas.buffer(0.01)

print(f"Buffer area: {buffer.area:.6f} sq deg")

# Output GeoJSON
from shapely.geometry import mapping
print(json.dumps({
  "type": "FeatureCollection",
  "features": [
    {"type": "Feature", "geometry": mapping(monas), "properties": {"name": "Pusat"}},
    {"type": "Feature", "geometry": mapping(buffer), "properties": {"name": "Buffer 1km"}}
  ]
}))`,

  clip: `import rasterio
import numpy as np
from rasterio.transform import from_bounds

# === Clip Raster Tool ===
# Potong raster ke batas poligon

# Buat raster sintetis
data = np.random.randint(0, 500, (100, 100)).astype('float32')
transform = from_bounds(106.5, -6.5, 107.1, -5.9, 100, 100)

print(f"Raster shape: {data.shape}")
print(f"Min: {data.min():.1f}, Max: {data.max():.1f}, Mean: {data.mean():.1f}")

with rasterio.open('/tmp/sample.tif', 'w', driver='GTiff',
    height=100, width=100, count=1, dtype='float32',
    crs='EPSG:4326', transform=transform) as dst:
    dst.write(data, 1)
print("Raster siap untuk di-clip dengan poligon!")`,

  geocode: `from geopy.geocoders import Nominatim

# === Geocode Address Tool ===
# Konversi alamat ke koordinat

geolocator = Nominatim(user_agent="pygeo_tools")

alamat = "Monas, Jakarta, Indonesia"
lokasi = geolocator.geocode(alamat)
print(f"Alamat: {alamat}")
print(f"Koordinat: ({lokasi.latitude}, {lokasi.longitude})")
print(f"Lengkap: {lokasi.address}")

# Reverse geocode
reverse = geolocator.reverse(f"{lokasi.latitude}, {lokasi.longitude}")
print(f"Reverse: {reverse.address}")`,

  distance: `import math

# === Calculate Distance Tool ===
# Hitung jarak geodesik antar titik

def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

titik = {
    "Jakarta": (-6.2088, 106.8456),
    "Surabaya": (-7.2575, 112.7521),
    "Bandung": (-6.9175, 107.6191),
    "Medan": (3.5952, 98.6722),
}
for kota1, coord1 in titik.items():
    for kota2, coord2 in titik.items():
        if kota1 < kota2:
            d = haversine(*coord1, *coord2)
            print(f"{kota1} → {kota2}: {d:.1f} km")`,

  merge: `import geopandas as gpd
import json

# === Merge Shapefiles Tool ===
# Gabungkan dataset vektor

# Load 2 dataset contoh
asia = gpd.read_file('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')

# Filter contoh: Asia dan Eropa
asia_continent = asia[asia['continent'] == 'Asia']
europe_continent = asia[asia['continent'] == 'Europe']

# Merge
merged = gpd.GeoDataFrame(pd.concat([asia_continent, europe_continent], ignore_index=True))
print(f"Asia: {len(asia_continent)} negara")
print(f"Eropa: {len(europe_continent)} negara")
print(f"Total setelah merge: {len(merged)} negara")
print(merged[['name', 'continent']].head(10).to_string())`,

  rasterize: `import numpy as np
import json

# === Rasterize Vector Tool ===
# Ubah vektor ke raster

# Buat grid sederhana
grid_size = 50
data = np.zeros((grid_size, grid_size))

# Simulasi rasterize: isi area circular
cx, cy = grid_size//2, grid_size//2
for i in range(grid_size):
    for j in range(grid_size):
        dist = np.sqrt((i-cx)**2 + (j-cy)**2)
        if dist < 20:
            data[i, j] = 255 - dist * 10

print(f"Grid: {data.shape}")
print(f"Piksel bernilai: {np.count_nonzero(data)}")
print(f"Range nilai: {data.min():.0f} - {data.max():.0f}")`,

  osm: `import osmnx as ox
import networkx as nx

# === Extract OSM Data Tool ===
# Download data OpenStreetMap

place = "Jakarta Pusat, Indonesia"
G = ox.graph_from_place(place, network_type="drive")

print(f"Node: {len(G.nodes)}, Edge: {len(G.edges)}")

stats = ox.basic_stats(G)
print(f"Panjang total jalan: {stats['street_length_total']:.0f} m")
print(f"Rata-rata panjang: {stats['street_length_avg']:.0f} m")
print(f"Kepadatan: {stats['street_density_km']:.2f} km/km²")`,

  join: `import geopandas as gpd
import pandas as pd
import json

# === Spatial Join Tool ===
# Gabungkan atribut spasial antar layer

world = gpd.read_file('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')

# Buat titik kota contoh
cities_data = {
    'city': ['Jakarta', 'Surabaya', 'Bangkok', 'Tokyo', 'Mumbai'],
    'lat': [-6.2, -7.25, 13.75, 35.68, 19.08],
    'lon': [106.8, 112.75, 100.52, 139.76, 72.88],
}
cities = gpd.GeoDataFrame(
    cities_data,
    geometry=gpd.points_from_xy(cities_data['lon'], cities_data['lat']),
    crs='EPSG:4326'
)

# Spatial join: cari negara untuk setiap kota
joined = gpd.sjoin(cities, world[['name', 'continent', 'geometry']], how='left', predicate='within')
print(joined[['city', 'name', 'continent']].to_string())`,

  tiles: `import numpy as np
import json

# === Generate Tiles Tool ===
# Hasilkan map tiles dari raster

# Contoh: buat grid tile sederhana
size = 256
tile = np.random.randint(0, 255, (size, size, 3), dtype='uint8')
print(f"Tile size: {tile.shape}")
print(f"R: {tile[:,:,0].mean():.0f}, G: {tile[:,:,1].mean():.0f}, B: {tile[:,:,2].mean():.0f}")
print("Tile XYZ siap untuk web map!")`,

  network: `import osmnx as ox
import networkx as nx

# === Analyze Network Tool ===
# Analisis jaringan jalan

place = "Bandung, Indonesia"
G = ox.graph_from_place(place, network_type="drive")

print(f"Node: {len(G.nodes)}, Edge: {len(G.edges)}")

# Shortest path antara 2 node
nodes = list(G.nodes)
if len(nodes) > 1:
    try:
        path = nx.shortest_path(G, nodes[0], nodes[-1], weight='length')
        length = sum(G.edges[u, v, 0]['length'] for u, v in zip(path[:-1], path[1:]))
        print(f"Shortest path: {len(path)} node, {length:.0f} m")
    except:
        print("Tidak ada path antara 2 node tersebut")

stats = ox.basic_stats(G)
print(f"Kepadatan: {stats['street_density_km']:.2f} km/km²")`,
}

const TOOLS = [
  { id: 'buffer', name: 'Buffer Geometry', category: 'Vector', description: 'Buat zona penyangga di sekitar fitur titik, garis, atau polygon dengan jarak tertentu.', icon: '⭕' },
  { id: 'clip', name: 'Clip Raster', category: 'Raster', description: 'Potong dataset raster ke batas poligon (misal: crop citra berdasarkan batas administrasi).', icon: '✂️' },
  { id: 'geocode', name: 'Geocode Address', category: 'Geocoding', description: 'Konversi alamat teks menjadi titik koordinat lintang & bujur secara otomatis.', icon: '📍' },
  { id: 'distance', name: 'Calculate Distance', category: 'Analysis', description: 'Hitung jarak geografis akurat antar titik menggunakan formula geodesik.', icon: '📏' },
  { id: 'merge', name: 'Merge Shapefiles', category: 'Vector', description: 'Gabungkan beberapa file shapefile atau GeoJSON menjadi satu dataset terpadu.', icon: '🔗' },
  { id: 'rasterize', name: 'Rasterize Vector', category: 'Raster', description: 'Ubah data vektor poligon menjadi grid raster dengan nilai atribut piksel.', icon: '▦' },
  { id: 'osm', name: 'Extract OSM Data', category: 'Data', description: 'Download data OpenStreetMap untuk area tertentu — jalan, bangunan, dan POI.', icon: '🌍' },
  { id: 'join', name: 'Spatial Join', category: 'Analysis', description: 'Gabungkan atribut spasial antar dua layer berdasarkan relasi lokasi (within, contains, intersects).', icon: '🔀' },
  { id: 'tiles', name: 'Generate Tiles', category: 'Raster', description: 'Hasilkan map tiles (XYZ) dari raster GeoTIFF untuk ditampilkan di web map.', icon: '🧩' },
  { id: 'network', name: 'Analyze Network', category: 'Analysis', description: 'Analisis jaringan jalan: shortest path, isochrone, dan centrality.', icon: '🛣️' },
]

export default function ToolsMarketplace() {
  const navigate = useNavigate()
  const [tools, setTools] = useState(TOOLS)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [tab, setTab] = useState('marketplace')

  useEffect(() => {
    api.get('/tools')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const merged = res.data.map(t => {
            const staticT = TOOLS.find(s => s.id === t.id)
            return { ...t, icon: staticT?.icon || '🛠️', description: staticT?.description || t.description }
          })
          if (merged.length > 0) setTools(merged)
        }
      })
      .catch(() => {})
  }, [])

  const handleUseTool = (tool) => {
    const code = TOOL_TEMPLATES[tool.id] || `# ${tool.name}\nprint("Tool ${tool.name} loaded!")`
    navigate('/sandbox', { state: { initialCode: code } })
  }

  const categories = [...new Set(tools.map((t) => t.category))].filter(Boolean)

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || tool.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !activeCategory || tool.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-2">
            <span className="gradient-text">Tools</span> Marketplace & Builder
          </h1>
          <p className="text-earth-500 dark:text-dark-accent/60 text-sm">
            Perkakas analisis geospasial siap pakai & kanvas visual workflow builder.
          </p>
        </div>
        <div className="flex items-center p-1 bg-earth-100 dark:bg-dark-surface rounded-xl border border-earth-200 dark:border-dark-border self-start md:self-auto">
          <button onClick={() => setTab('marketplace')} className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${tab === 'marketplace' ? 'bg-white text-earth-900 dark:bg-dark-accent dark:text-dark-bg shadow-sm' : 'text-earth-600 dark:text-dark-accent/70 hover:text-earth-900 dark:hover:text-dark-text'}`}>
            <Wrench size={14} /> Pre-built Tools
          </button>
          <button onClick={() => setTab('builder')} className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${tab === 'builder' ? 'bg-white text-earth-900 dark:bg-dark-accent dark:text-dark-bg shadow-sm' : 'text-earth-600 dark:text-dark-accent/70 hover:text-earth-900 dark:hover:text-dark-text'}`}>
            <Sliders size={14} /> Workflow Builder
          </button>
        </div>
      </div>

      {tab === 'builder' ? (
        <WorkflowBuilder />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
              <input type="text" placeholder="Cari tools geospasial..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <button onClick={() => setActiveCategory('')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${activeCategory === '' ? 'bg-primary-600 text-white dark:bg-dark-accent dark:text-dark-bg' : 'bg-white text-earth-600 dark:bg-dark-surface dark:text-dark-accent/70 border border-earth-200 dark:border-dark-border'}`}>All</button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${activeCategory === cat ? 'bg-primary-600 text-white dark:bg-dark-accent dark:text-dark-bg' : 'bg-white text-earth-600 dark:bg-dark-surface dark:text-dark-accent/70 border border-earth-200 dark:border-dark-border'}`}>{cat}</button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <button key={tool.id} onClick={() => handleUseTool(tool)} className="text-left w-full">
                <div className="card-hover rounded-xl border border-earth-200 dark:border-dark-border bg-white dark:bg-dark-surface p-5 h-full flex flex-col justify-between group transition-all hover:shadow-md hover:-translate-y-0.5">
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-earth-100 to-earth-200 dark:from-dark-accent/20 dark:to-dark-accent/10 flex items-center justify-center text-lg flex-shrink-0">
                        {tool.icon || '🛠️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-earth-900 dark:text-dark-text truncate">{tool.name}</h3>
                        <span className="text-xs text-earth-400 dark:text-dark-accent/50">{tool.category}</span>
                      </div>
                    </div>
                    <p className="text-xs text-earth-500 dark:text-dark-accent/60 leading-relaxed">{tool.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-earth-100 dark:border-dark-border flex items-center justify-between text-xs text-primary-600 dark:text-dark-accent font-medium">
                    <span className="flex items-center gap-1"><PlayCircle size={14} /> Try Tool</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <Wrench size={48} className="mx-auto text-earth-300 dark:text-dark-accent/30 mb-4" />
              <p className="text-earth-500 dark:text-dark-accent/60">Tidak ada tools yang sesuai.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
