import { useState } from 'react'
import { BookOpen, Clock, PlayCircle, Code, Sparkles, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const tutorials = [
  {
    id: 'geopandas-intro',
    title: 'Pengenalan GeoPandas: Analisis Data Spasial Vektor',
    description: 'Pelajari dasar-dasar pemrosesan DataFrame geospasial, filtering atribut, dan visualisasi peta choropleth sederhana.',
    difficulty: 'Beginner',
    duration: '15 min',
    category: 'Vector Analysis',
    icon: '🗺️',
    steps: [
      '📥 **Load Data**: `gpd.read_file()` untuk membaca GeoJSON / Shapefile',
      '🔍 **Filter**: Filter baris berdasarkan atribut (contoh: benua Asia)',
      '📐 **Analisis**: Hitung luas area, populasi, atau statistik spasial',
      '🗺️ **Visualisasi**: Export ke GeoJSON untuk auto-render di Map Viewer',
      '💾 **Save**: Simpan hasil sebagai file GeoJSON atau Shapefile',
    ],
    code: `import geopandas as gpd

# Step 1: Load dataset Natural Earth
world = gpd.read_file('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')

# Step 2: Filter benua Asia
asia = world[world['continent'] == 'Asia'].copy()

# Step 3: Lihat 5 negara dengan populasi terbesar
top_pop = asia.sort_values(by='pop_est', ascending=False)[['name', 'pop_est']].head(5)
print("=== Top 5 Populated Countries in Asia ===")
print(top_pop.to_string(index=False))

# Step 4: Export ke GeoJSON untuk Map Viewer
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
    steps: [
      '📍 **Buat Geometri**: Point, LineString, Polygon dari koordinat',
      '⭕ **Buffer**: Zona penyangga di sekitar geometri',
      '🔍 **Predikat Spasial**: `contains()`, `intersects()`, `within()`',
      '📏 **Jarak & Luas**: Hitung jarak antar geometri dan luas area',
      '🗺️ **Visualisasi**: Output sebagai GeoJSON untuk map',
    ],
    code: `from shapely.geometry import Point, Polygon, LineString
import json

# Step 1: Buat geometri
monas = Point(106.8272, -6.1751)  # Monas Jakarta
dkibox = Polygon([
    (106.68, -6.10), (106.97, -6.10),
    (106.97, -6.37), (106.68, -6.37)
])

# Step 2: Uji predikat spasial
print(f"Monas di dalam DKI Jakarta? {dkibox.contains(monas)}")

# Step 3: Buat buffer
buffer_zone = monas.buffer(0.009)
print(f"Luas buffer Monas: {buffer_zone.area:.6f} sq deg")

# Step 4: Jarak ke tepi
print(f"Jarak Monas ke tepi Jakarta: {monas.distance(dkibox.exterior):.4f} deg")

# Step 5: Export ke GeoJSON
from shapely.geometry import mapping
geojson = {
    "type": "FeatureCollection",
    "features": [
        {"type": "Feature", "geometry": mapping(dkibox), "properties": {"name": "Jakarta"}},
        {"type": "Feature", "geometry": mapping(monas), "properties": {"name": "Monas"}},
    ]
}
print(json.dumps(geojson))`,
  },
  {
    id: 'rasterio-basics',
    title: 'Membaca & Membuat Raster dengan Rasterio',
    description: 'Pemrosesan data raster, pembuatan GeoTIFF sintetis, dan kalkulasi nilai statistik piksel.',
    difficulty: 'Intermediate',
    duration: '20 min',
    category: 'Remote Sensing',
    icon: '🛰️',
    steps: [
      '📦 **Import**: `rasterio` untuk membaca/menulis data raster',
      '🖼️ **Buat Raster**: Buat array numpy → simpan sebagai GeoTIFF',
      '📍 **CRS & Transform**: Atur sistem koordinat dan geotransform',
      '📊 **Statistik**: Hitung min, max, mean dari nilai piksel',
      '💾 **Export**: Simpan sebagai GeoTIFF siap digunakan',
    ],
    code: `import rasterio
import numpy as np
from rasterio.transform import from_bounds

# Step 1: Buat data DEM sintetis 100x100
data = np.random.randint(0, 1500, (100, 100)).astype('float32')

# Step 2: Tentukan batas geografis (Jakarta area)
transform = from_bounds(106.5, -6.5, 107.1, -5.9, 100, 100)

# Step 3: Statistik raster
print(f"Ukuran Grid: {data.shape}")
print(f"Elevasi Minimum: {data.min():.1f} mdpl")
print(f"Elevasi Maksimum: {data.max():.1f} mdpl")
print(f"Rata-rata Elevasi: {data.mean():.1f} mdpl")

# Step 4: Simpan sebagai GeoTIFF
with rasterio.open('/tmp/dem.tif', 'w', driver='GTiff',
    height=100, width=100, count=1,
    dtype='float32', crs='EPSG:4326',
    transform=transform) as dst:
    dst.write(data, 1)
print("Raster tersimpan sebagai dem.tif")`,
  },
  {
    id: 'pyproj-crs',
    title: 'Transformasi Koordinat (CRS) dengan Pyproj',
    description: 'Mengubah koordinat geografis WGS84 ke Web Mercator untuk peta digital.',
    difficulty: 'Beginner',
    duration: '10 min',
    category: 'CRS & Projections',
    icon: '🌐',
    steps: [
      '🔄 **Transformer**: Buat transformer dari CRS sumber ke target',
      '📍 **Koordinat**: Konversi lon/lat (WGS84) ke meter (Web Mercator)',
      '📖 **Info CRS**: Dapatkan nama, datum, dan proyeksi dari EPSG code',
      '📏 **Akurasi**: Perbedaan hasil proyeksi untuk analisis jarak',
    ],
    code: `from pyproj import Transformer, CRS

# Step 1: Buat transformer WGS84 -> Web Mercator
transformer = Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True)

# Step 2: Konversi koordinat Monas Jakarta
lon, lat = 106.8272, -6.1751
x, y = transformer.transform(lon, lat)

print(f"Koordinat Geografis (WGS84): Lon={lon}, Lat={lat}")
print(f"Web Mercator (meter): X={x:.2f}, Y={y:.2f}")

# Step 3: Info CRS
crs_wgs84 = CRS("EPSG:4326")
print(f"CRS Name: {crs_wgs84.name}")
print(f"Datum: {crs_wgs84.datum}")`,
  },
  {
    id: 'distance-calculation',
    title: 'Kalkulasi Jarak dengan Haversine Formula',
    description: 'Menghitung jarak akurat antar dua titik lokasi di permukaan bumi menggunakan formula matematis.',
    difficulty: 'Beginner',
    duration: '15 min',
    category: 'Geodesy',
    icon: '📏',
    steps: [
      '🌍 **Radius Bumi**: Gunakan radius 6371 km untuk kalkulasi',
      '📐 **Haversine Formula**: Hitung jarak great-circle antar titik',
      '📍 **Contoh**: Jakarta → Surabaya, Bandung, Medan',
      '📊 **Output**: Jarak dalam kilometer dengan 2 desimal',
      '🔁 **Bandingkan**: Hasil dengan Google Maps / Geopy',
    ],
    code: `import math

def haversine(lat1, lon1, lat2, lon2):
    """Hitung jarak great-circle antara dua titik"""
    R = 6371.0  # Radius bumi (km)
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat/2)**2 + 
         math.cos(math.radians(lat1)) * 
         math.cos(math.radians(lat2)) * 
         math.sin(dlon/2)**2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

# Jarak Jakarta - Surabaya
jakarta = (-6.1751, 106.8272)
surabaya = (-7.2458, 112.7378)
d = haversine(*jakarta, *surabaya)
print(f"Jakarta - Surabaya: {d:.2f} km")

# Jarak Jakarta - Bandung
bandung = (-6.9175, 107.6191)
d2 = haversine(*jakarta, *bandung)
print(f"Jakarta - Bandung: {d2:.2f} km")`,
  },
  {
    id: 'folium-map',
    title: 'Peta Interaktif dengan Folium & Leaflet',
    description: 'Membuat peta web interaktif dengan penanda lokasi, tooltip, dan popup informasi.',
    difficulty: 'Intermediate',
    duration: '15 min',
    category: 'Web Mapping',
    icon: '📍',
    steps: [
      '🗺️ **Buat Peta**: `folium.Map()` dengan pusat dan zoom',
      '📍 **Marker**: Tambah penanda lokasi dengan popup & tooltip',
      '🎨 **Styling**: Atur icon, warna marker, tile layer',
      '📝 **Info**: Tampilkan informasi detail di popup',
      '💾 **Export**: Simpan sebagai HTML atau lihat langsung',
    ],
    code: `import folium

# Step 1: Inisialisasi peta Indonesia
m = folium.Map(location=[-2.5489, 118.0149], zoom_start=5)

# Step 2: Tambah kota-kota besar
cities = [
    ("Jakarta", [-6.2088, 106.8456], "Ibu Kota Negara"),
    ("Surabaya", [-7.2575, 112.7521], "Kota Pahlawan"),
    ("Bandung", [-6.9175, 107.6191], "Kota Kembang"),
    ("Medan", [3.5952, 98.6722], "Kota Medan"),
    ("Makassar", [-5.1477, 119.4322], "Kota Makassar"),
]

for name, coords, desc in cities:
    folium.Marker(
        coords, 
        popup=f"<b>{name}</b><br>{desc}",
        tooltip=name
    ).add_to(m)

print(f"Peta berhasil dibuat dengan {len(cities)} kota!")
print("Simpan hasil sebagai HTML untuk dilihat di browser.")`,
  },
  {
    id: 'fiona-io',
    title: 'Membaca & Menulis File Spasial dengan Fiona',
    description: 'Membaca Shapefile, GeoJSON, dan format vektor lainnya menggunakan Fiona.',
    difficulty: 'Intermediate',
    duration: '15 min',
    category: 'Vector I/O',
    icon: '📂',
    steps: [
      '📖 **Baca File**: Buka Shapefile/GeoJSON dengan `fiona.open()`',
      '📋 **Lihat Schema**: Tampilkan atribut field dan tipe data',
      '🔍 **Filter**: Query fitur berdasarkan atribut',
      '✏️ **Tulis**: Buat file baru dari hasil filtering',
    ],
    code: `import fiona
import json

# Step 1: Baca GeoJSON
with fiona.open('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson') as src:
    print(f"Layer: {src.name}")
    print(f"CRS: {src.crs}")
    print(f"Schema: {src.schema}")
    print(f"Total fitur: {len(src)}")
    
    # Step 2: Baca 3 fitur pertama
    features = []
    for i, feat in enumerate(src):
        if i >= 3: break
        features.append(feat)
        print(f"  Fitur {i+1}: {feat['properties'].get('name', 'N/A')}")

print(json.dumps({"type": "FeatureCollection", "features": features}))`,
  },
  {
    id: 'geopy-geocode',
    title: 'Geocoding Alamat dengan GeoPy',
    description: 'Konversi alamat teks menjadi koordinat geografis menggunakan Nominatim (OSM).',
    difficulty: 'Beginner',
    duration: '10 min',
    category: 'Geocoding',
    icon: '📍',
    steps: [
      '🔍 **Setup**: Inisialisasi Nominatim geocoder dengan user agent',
      '📍 **Forward Geocode**: Ubah alamat → lat/lon',
      '🔄 **Reverse Geocode**: Ubah lat/lon → alamat',
      '📏 **Distance**: Hitung jarak antar hasil geocoding',
    ],
    code: `from geopy.geocoders import Nominatim
from geopy.distance import geodesic

# Step 1: Inisialisasi geocoder
geolocator = Nominatim(user_agent="pygeo_hub_tutorial")

# Step 2: Forward geocode — alamat ke koordinat
lokasi = geolocator.geocode("Monas, Jakarta, Indonesia")
print(f"Monas: ({lokasi.latitude}, {lokasi.longitude})")
print(f"Alamat: {lokasi.address}")

lokasi2 = geolocator.geocode("Tugu Pahlawan, Surabaya")
print(f"Tugu Pahlawan: ({lokasi2.latitude}, {lokasi2.longitude})")

# Step 3: Hitung jarak
jarak = geodesic(
    (lokasi.latitude, lokasi.longitude),
    (lokasi2.latitude, lokasi2.longitude)
).kilometers
print(f"Jarak: {jarak:.2f} km")`,
  },
  {
    id: 'osmnx-network',
    title: 'Analisis Jaringan Jalan dengan OSMnx',
    description: 'Download dan analisis jaringan jalan OpenStreetMap untuk suatu area.',
    difficulty: 'Advanced',
    duration: '25 min',
    category: 'Network Analysis',
    icon: '🛣️',
    steps: [
      '🌍 **Download**: Ambil jaringan jalan OSM untuk suatu kota',
      '📊 **Statistik**: Hitung panjang jalan, jumlah node, density',
      '📍 **Shortest Path**: Cari rute terpendek antara dua titik',
      '🗺️ **Visualisasi**: Plot jaringan jalan di atas peta',
    ],
    code: `import osmnx as ox
import networkx as nx

# Step 1: Download jaringan jalan Jakarta Pusat
G = ox.graph_from_place("Central Jakarta, Indonesia", 
                         network_type="drive")
print(f"Node: {len(G.nodes)}, Edge: {len(G.edges)}")

# Step 2: Statistik jaringan
stats = ox.basic_stats(G)
print(f"Total panjang jalan: {stats['street_length_total']:.0f} m")
print(f"Rata-rata panjang: {stats['street_length_avg']:.0f} m")
print(f"Kepadatan: {stats['street_density_km']:.2f} km/km²")

# Step 3: Cari shortest path antara 2 node terdekat
# (contoh: node pertama dan node terjauh)
nodes = list(G.nodes)
if len(nodes) > 1:
    path = nx.shortest_path(G, nodes[0], nodes[-1], weight='length')
    path_length = sum(G.edges[u,v,0]['length'] 
                     for u,v in zip(path[:-1], path[1:]))
    print(f"Shortest path length: {path_length:.0f} m")`,
  },
  {
    id: 'cartopy-maps',
    title: 'Peta Tematik dengan Cartopy & Matplotlib',
    description: 'Membuat peta tematik berkualitas publikasi dengan proyeksi peta dan data spasial.',
    difficulty: 'Intermediate',
    duration: '20 min',
    category: 'Visualization',
    icon: '📊',
    steps: [
      '🗺️ **Setup Peta**: Buat figure dengan proyeksi Cartopy',
      '🌍 **Base Map**: Tambah coastlines, borders, dan gridlines',
      '📊 **Data**: Plot data tematik (populasi, luas, dll)',
      '🎨 **Styling**: Atur colormap, legend, dan label',
      '💾 **Export**: Simpan sebagai PNG untuk publikasi',
    ],
    code: `import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cartopy.feature as cfeature

# Step 1: Buat figure dengan proyeksi
fig = plt.figure(figsize=(12, 8))
ax = fig.add_subplot(1, 1, 1, projection=ccrs.Robinson())

# Step 2: Tambah base map
ax.add_feature(cfeature.COASTLINE, linewidth=0.5)
ax.add_feature(cfeature.BORDERS, linewidth=0.3, alpha=0.5)
ax.add_feature(cfeature.LAND, color='lightgray')
ax.add_feature(cfeature.OCEAN, color='lightblue')
ax.add_feature(cfeature.LAKES, color='lightblue', alpha=0.5)

# Step 3: Gridlines
ax.gridlines(draw_labels=True, linewidth=0.2, color='gray')

plt.title("World Map - Robinson Projection", fontsize=14)
print("Peta siap! Gunakan plt.show() untuk menampilkan.")`,
  },
  {
    id: 'xarray-climate',
    title: 'Analisis Data Iklim dengan Xarray',
    description: 'Membaca dan menganalisis data NetCDF multi-dimensi untuk climate dan cuaca.',
    difficulty: 'Advanced',
    duration: '20 min',
    category: 'Climate Data',
    icon: '🌤️',
    steps: [
      '📦 **Load**: Buka file NetCDF dengan `xarray.open_dataset()`',
      '📊 **Eksplorasi**: Lihat dimensi, koordinat, dan variable',
      '📐 **Analisis**: Hitung rata-rata, seleksi waktu/daerah',
      '🗺️ **Visualisasi**: Plot data spasial dengan matplotlib',
    ],
    code: `import xarray as xr
import numpy as np

# Step 1: Buat data suhu sintetis
times = np.arange('2024-01-01', '2024-01-11', dtype='datetime64[D]')
lats = np.linspace(-10, 10, 20)
lons = np.linspace(100, 120, 20)

data = np.random.randn(len(times), len(lats), len(lons))

# Step 2: Buat Dataset xarray
ds = xr.Dataset({
    'temperature': (['time', 'lat', 'lon'], data)
}, coords={'time': times, 'lat': lats, 'lon': lons})

print(ds)
print(f"\\nRata-rata suhu: {ds.temperature.mean().values:.2f}")
print(f"Max suhu: {ds.temperature.max().values:.2f}")

# Step 3: Seleksi waktu tertentu
day1 = ds.sel(time='2024-01-01')
print(f"\\nSuhu 1 Jan: min={day1.temperature.min().values:.2f}")`,
  },
  {
    id: 'movingpandas-trajectory',
    title: 'Analisis Trajektori dengan MovingPandas',
    description: 'Menganalisis data pergerakan (GPS tracks, ship routes) menggunakan MovingPandas.',
    difficulty: 'Advanced',
    duration: '25 min',
    category: 'Movement Data',
    icon: '🚢',
    steps: [
      '📍 **Buat Trajektori**: Konversi titik GPS jadi trajectory',
      '📏 **Hitung Jarak**: Panjang total dan kecepatan rata-rata',
      '📍 **Stop Detection**: Deteksi titik berhenti dalam rute',
      '🗺️ **Visualisasi**: Plot trajectory di peta interaktif',
    ],
    code: `import pandas as pd
import geopandas as gpd
from shapely.geometry import Point

# Step 1: Buat data GPS sintetis (rute Jakarta -> Surabaya)
data = {
    'timestamp': pd.date_range('2024-01-01 08:00', periods=10, freq='30min'),
    'lat': [-6.2, -6.3, -6.5, -6.7, -6.9, -7.0, -7.1, -7.2, -7.3, -7.25],
    'lon': [106.8, 107.0, 107.5, 108.0, 108.5, 109.0, 109.5, 110.0, 111.0, 112.7],
}

# Step 2: Konversi ke GeoDataFrame
gdf = gpd.GeoDataFrame(
    data,
    geometry=[Point(x, y) for x, y in zip(data['lon'], data['lat'])],
    crs='EPSG:4326'
)

print(f"Total titik: {len(gdf)}")
print(f"Rentang waktu: {gdf['timestamp'].min()} - {gdf['timestamp'].max()}")

# Step 3: Hitung jarak antar titik (km)
from geopy.distance import geodesic
total_jarak = 0
for i in range(len(gdf)-1):
    a = (gdf.iloc[i]['lat'], gdf.iloc[i]['lon'])
    b = (gdf.iloc[i+1]['lat'], gdf.iloc[i+1]['lon'])
    total_jarak += geodesic(a, b).km

print(f"Total jarak tempuh: {total_jarak:.1f} km")
print(f"Waktu tempuh: ~{len(gdf)*0.5:.0f} jam")`,
  },
]

const TAGS = ['All', 'Vector Analysis', 'Core Geometries', 'Remote Sensing', 'CRS & Projections',
              'Geodesy', 'Web Mapping', 'Vector I/O', 'Geocoding', 'Network Analysis',
              'Visualization', 'Climate Data', 'Movement Data']

export default function Tutorials() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  const filteredTutorials = activeTab === 'All'
    ? tutorials
    : tutorials.filter(t => t.category === activeTab)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

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
              {tutorials.length} panduan langkah demi langkah dari tingkat pemula hingga tingkat lanjut.
              Klik <strong>"Jalankan di Sandbox"</strong> untuk langsung mencoba atau <strong>▶</strong> untuk lihat panduan.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {TAGS.map((cat) => (
          <button key={cat} onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === cat
                ? 'bg-primary-600 text-white dark:bg-dark-accent dark:text-dark-bg shadow-md'
                : 'bg-white dark:bg-dark-surface text-earth-700 dark:text-dark-text hover:bg-earth-100 dark:hover:bg-dark-border border border-earth-200 dark:border-dark-border'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Tutorials Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <div key={tutorial.id} className="glass-card rounded-xl border border-earth-200 dark:border-dark-border overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            {/* Card Header */}
            <div className="p-5 flex-1">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl p-2.5 rounded-xl bg-earth-100 dark:bg-dark-border flex-shrink-0">
                  {tutorial.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      tutorial.difficulty === 'Beginner'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : tutorial.difficulty === 'Intermediate'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-earth-400 dark:text-dark-accent/50">
                      <Clock size={12} />
                      {tutorial.duration}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-earth-900 dark:text-dark-text line-clamp-1">
                    {tutorial.title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-earth-500 dark:text-dark-accent/60 leading-relaxed">
                {tutorial.description}
              </p>

              {/* Steps Preview */}
              <div className="mt-3 space-y-1">
                {tutorial.steps.slice(0, 2).map((step, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-earth-400 dark:text-dark-accent/50">
                    <CheckCircle2 size={10} className="text-primary-500 dark:text-dark-accent shrink-0" />
                    <span className="truncate">{step.replace(/\*\*/g, '')}</span>
                  </div>
                ))}
                {tutorial.steps.length > 2 && (
                  <span className="text-[11px] text-primary-500 dark:text-dark-accent font-medium">
                    +{tutorial.steps.length - 2} langkah lagi
                  </span>
                )}
              </div>
            </div>

            {/* Expanded Steps */}
            {expandedId === tutorial.id && (
              <div className="px-5 pb-3 border-t border-earth-100 dark:border-dark-border pt-3">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-earth-700 dark:text-dark-text">📋 Langkah-langkah:</p>
                  {tutorial.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-earth-600 dark:text-dark-accent/70">
                      <CheckCircle2 size={12} className="text-primary-500 dark:text-dark-accent shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{
                        __html: step.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Preview */}
            {expandedId === tutorial.id && (
              <div className="px-5 pb-3">
                <div className="bg-[#1a1a2e] rounded-lg p-3 overflow-x-auto">
                  <pre className="text-[11px] font-mono text-green-300 leading-relaxed max-h-40 overflow-y-auto">
                    <code>{tutorial.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="px-5 py-3 border-t border-earth-100 dark:border-dark-border flex items-center justify-between">
              <span className="text-xs text-earth-400 dark:text-dark-accent/60 flex items-center gap-1 font-mono">
                <Code size={13} /> {tutorial.category}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleExpand(tutorial.id)}
                  className="btn-ghost text-xs flex items-center gap-1 py-1.5 px-2">
                  {expandedId === tutorial.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  {expandedId === tutorial.id ? 'Tutup' : 'Panduan'}
                </button>
                <button onClick={() => handleStartTutorial(tutorial.code)}
                  className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5 shadow-sm">
                  <PlayCircle size={14} />
                  Jalankan di Sandbox
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-earth-300 dark:text-dark-accent/30 mb-4" />
          <p className="text-earth-500 dark:text-dark-accent/60">Tidak ada tutorial untuk kategori ini.</p>
        </div>
      )}
    </div>
  )
}
