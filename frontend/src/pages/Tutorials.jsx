import { useState } from 'react'
import { BookOpen, Clock, PlayCircle, Code, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

const tutorials = [
  {
    id: 'geopandas-intro',
    title: 'Pengenalan GeoPandas: Analisis Data Spasial Vektor',
    description: 'Pelajari dasar-dasar pemrosesan DataFrame geospasial, filtering atribut, dan visualisasi peta choropleth sederhana.',
    difficulty: 'Beginner',
    duration: '15 min',
    category: 'Vector Analysis',
    icon: '🗺️',
    code: `import geopandas as gpd

# Load dataset bawaan Natural Earth
world = gpd.read_file('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')

# Filter benua Asia
asia = world[world['continent'] == 'Asia'].copy()

# Tampilkan 5 negara dengan populasi terbesar
top_pop = asia.sort_values(by='pop_est', ascending=False)[['name', 'pop_est']].head(5)
print("=== Top 5 Populated Countries in Asia ===")
print(top_pop.to_string(index=False))

# Export ke GeoJSON untuk Map Viewer
print(asia.to_json())`,
  },
  {
    id: 'shapely-geometry',
    title: 'Manipulasi Geometri 2D dengan Shapely',
    description: 'Membuat polygon buffer, menghitung luas area, serta mengecek interseksi antar objek geospasial.',
    difficulty: 'Beginner',
    duration: '10 min',
    category: 'Core Geometries',
    icon: '📐',
    code: `from shapely.geometry import Point, Polygon, LineString

# Titik pusat (Monas, Jakarta)
monas = Point(106.8272, -6.1751)

# Zone Bounding Box DKI Jakarta (estimasi)
dkibox = Polygon([
    (106.68, -6.10),
    (106.97, -6.10),
    (106.97, -6.37),
    (106.68, -6.37)
])

# Buat Buffer 1km (~0.009 derajat)
buffer_zone = monas.buffer(0.009)

print(f"Monas berada di dalam DKI Jakarta? {dkibox.contains(monas)}")
print(f"Luas zona buffer Monas: {buffer_zone.area:.6f} sq deg")`,
  },
  {
    id: 'rasterio-basics',
    title: 'Membaca & Analisis Citra Satelit dengan Rasterio',
    description: 'Pemrosesan data raster, pembuatan GeoTIFF sintetis, dan kalkulasi nilai statistik piksel.',
    difficulty: 'Intermediate',
    duration: '20 min',
    category: 'Remote Sensing',
    icon: '🛰️',
    code: `import rasterio
import numpy as np
from rasterio.transform import from_bounds

# Buat citra DEM sintetis 100x100 piksel
data = np.random.randint(0, 1500, (100, 100)).astype('float32')
transform = from_bounds(106.5, -6.5, 107.1, -5.9, 100, 100)

print(f"Ukuran Grid: {data.shape}")
print(f"Elevasi Minimum: {data.min():.1f} mdpl")
print(f"Elevasi Maksimum: {data.max():.1f} mdpl")
print(f"Rata-rata Elevasi: {data.mean():.1f} mdpl")`,
  },
  {
    id: 'pyproj-crs',
    title: 'Transformasi Koordinat Sistem (CRS) dengan Pyproj',
    description: 'Mengubah koordinat geografis WGS84 (EPSG:4326) ke Web Mercator (EPSG:3857) untuk peta digital.',
    difficulty: 'Beginner',
    duration: '10 min',
    category: 'CRS & Projections',
    icon: '🌐',
    code: `from pyproj import Transformer, CRS

# Konversi WGS84 ke Web Mercator (Metrik)
transformer = Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True)

lon, lat = 106.8272, -6.1751
x, y = transformer.transform(lon, lat)

print(f"Koordinat Geografis (WGS84) : Lon={lon}, Lat={lat}")
print(f"Koordinat Proyeksi (Mercator): X={x:.2f} m, Y={y:.2f} m")`,
  },
  {
    id: 'distance-calculation',
    title: 'Kalkulasi Jarak Haversine vs Vincenty',
    description: 'Menghitung jarak akurat antar dua titik lokasi di permukaan bumi menggunakan formula matematis.',
    difficulty: 'Beginner',
    duration: '15 min',
    category: 'Geodesy',
    icon: '📏',
    code: `import math

def haversine(lat1, lon1, lat2, lon2):
    R = 6371.0 # Radius bumi dalam km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

# Monas (Jakarta) -> Tugu Pahlawan (Surabaya)
d = haversine(-6.1751, 106.8272, -7.2458, 112.7378)
print(f"Jarak Garis Lurus Jakarta - Surabaya: {d:.2f} km")`,
  },
  {
    id: 'folium-map',
    title: 'Peta Interaktif dengan Folium & Leaflet',
    description: 'Membuat peta web interaktif dengan penanda lokasi, tooltip, dan popup informasi.',
    difficulty: 'Intermediate',
    duration: '15 min',
    category: 'Web Mapping',
    icon: '📍',
    code: `import folium

# Inisialisasi peta berpusat di Indonesia
m = folium.Map(location=[-2.5489, 118.0149], zoom_start=5)

# Tambah penanda kota-kota besar
cities = [
    ("Jakarta", [-6.2088, 106.8456]),
    ("Surabaya", [-7.2575, 112.7521]),
    ("Bandung", [-6.9175, 107.6191]),
    ("Medan", [3.5952, 98.6722]),
]

for name, coords in cities:
    folium.Marker(coords, popup=name, tooltip=name).add_to(m)

print(f"Peta berhasil dibuat dengan {len(cities)} kota!")`,
  },
]

export default function Tutorials() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')

  const categories = ['All', 'Vector Analysis', 'Core Geometries', 'Remote Sensing', 'CRS & Projections', 'Web Mapping']

  const filteredTutorials = activeTab === 'All'
    ? tutorials
    : tutorials.filter(t => t.category === activeTab)

  const handleStartTutorial = (code) => {
    navigate('/sandbox', { state: { initialCode: code } })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="glass-card p-8 mb-8 bg-gradient-to-r from-primary-900/10 via-earth-100/30 to-sage-100/20 dark:from-dark-accent/10 dark:to-dark-surface border-earth-200 dark:border-dark-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-primary-500 text-white dark:bg-dark-accent dark:text-dark-bg">
            <Sparkles size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text">
              <span className="gradient-text">Interactive</span> Tutorials & Guides
            </h1>
            <p className="text-earth-600 dark:text-dark-accent/70 text-sm">
              Panduan langkah demi langkah dari tingkat pemula hingga tingkat lanjut. Klik "Jalankan di Sandbox" untuk langsung mencoba kode!
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === cat
                ? 'bg-primary-600 text-white dark:bg-dark-accent dark:text-dark-bg shadow-md'
                : 'bg-white dark:bg-dark-surface text-earth-700 dark:text-dark-text hover:bg-earth-100 dark:hover:bg-dark-border border border-earth-200 dark:border-dark-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tutorials Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <Card key={tutorial.id} hover className="flex flex-col justify-between group">
            <div>
              <CardHeader>
                <div className="text-3xl p-2.5 rounded-xl bg-earth-100 dark:bg-dark-border flex-shrink-0">
                  {tutorial.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      tutorial.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-earth-400 dark:text-dark-accent/50">
                      <Clock size={12} />
                      {tutorial.duration}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold line-clamp-1">{tutorial.title}</CardTitle>
                </div>
              </CardHeader>
              <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                {tutorial.description}
              </CardDescription>
            </div>

            <div className="pt-4 mt-4 border-t border-earth-100 dark:border-dark-border flex items-center justify-between">
              <span className="text-xs text-earth-400 dark:text-dark-accent/60 flex items-center gap-1 font-mono">
                <Code size={13} /> {tutorial.category}
              </span>
              <button
                onClick={() => handleStartTutorial(tutorial.code)}
                className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5 shadow-sm group-hover:scale-105 transition-transform"
              >
                <PlayCircle size={14} />
                Jalankan di Sandbox
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
