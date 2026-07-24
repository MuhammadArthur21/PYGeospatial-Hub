# 🌍 PyGeospatial Hub

> **One-stop platform untuk seluruh ekosistem Python Geospatial Libraries.**
> Bayangkan gabungan *Anaconda Cloud + Google Colab + VS Code + GitHub*, tapi fokus penuh pada geospasial.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev)
[![PostGIS](https://img.shields.io/badge/PostGIS-16-336791)](https://postgis.net)

---

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Screenshot / Preview](#screenshot--preview)
- [Tech Stack](#tech-stack)
- [Arsitektur](#arsitektur)
- [Struktur Proyek](#struktur-proyek)
- [Quick Start](#quick-start)
  - [Prasyarat](#prasyarat)
  - [Setup Backend](#setup-backend)
  - [Setup Frontend](#setup-frontend)
  - [Docker Full Stack](#docker-full-stack)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Library Registry](#library-registry)
- [Keamanan](#keamanan)
- [Lisensi](#lisensi)

---

## ✨ Fitur Utama

### 📚 Library Index
Database **100+ library geospasial Python** yang terorganisir, lengkap dengan deskripsi, kategori, tingkat kesulitan, dan panduan instalasi. Navigasi per kategori: Core Geospatial, Remote Sensing, Machine Learning, Point Cloud, Web Mapping, dan masih banyak lagi.

### 🧪 Interactive Sandbox
Tulis dan eksekusi kode Python geospasial langsung dari browser. Setiap eksekusi berjalan di **container Docker terisolasi** dengan:
- Resource limits (CPU, memory, timeout)
- Static code analysis untuk mencegah operasi berbahaya
- Output real-time via WebSocket
- Library geospasial pre-installed

### 🛠️ Tools Marketplace
Tools siap pakai tanpa coding:
- **Distance Calculator** — hitung jarak antar koordinat
- **Buffer Geometry** — buat buffer di sekitar geometry
- **Spatial Join** — temukan titik dalam poligon
- **Clip Raster** — potong raster dengan poligon
- **Merge Shapefiles** — gabungkan multiple file
- **Geocode Address** — konversi alamat ke koordinat
- **Extract OSM Data** — ambil data OpenStreetMap
- **Generate Tiles** — buat peta tile dari raster
- **Network Analysis** — analisis jaringan jalan via OSMnx

### 🗺️ Visualization Engine
Auto-render hasil analisis ke peta interaktif (Leaflet) dan chart (Plotly):
- Map Viewer dengan multiple layer support
- Chart & grafik otomatis
- Export ke GeoJSON, PNG

### 📖 Documentation Hub
Dokumentasi terpusat untuk setiap library, tutorial langkah-demi-langkah, dan panduan belajar dari tingkat pemula hingga mahir.

### 👥 Community
Bagikan script, tools, dan berkolaborasi:
- Sistem komentar per script/tool
- Upvote & downvote
- Subscription tiers (Free, Pro, Team, Enterprise)

### 🔧 Lainnya
- **Spatial Converter** — konversi antar format geospasial (GeoJSON ↔ KML ↔ Shapefile)
- **AI Assistant** — bantuan kode berbasis AI untuk debugging geospasial
- **Workflow Builder** — bangun pipeline geospasial visual
- **Dashboard** — statistik penggunaan dan monitoring

---

## 🖥️ Tech Stack

| **Layer** | **Teknologi** |
|-----------|--------------|
| **Backend Framework** | FastAPI 0.115 + Uvicorn + Gunicorn |
| **Frontend** | React 18 + Vite 5 + Tailwind CSS 3 |
| **GIS Core** | Shapely 2.1, GeoPandas 1.0, Rasterio 1.4, Pyproj 3.6, GDAL 3.8, Fiona 1.9 |
| **Raster & Remote Sensing** | Xarray, Rioxarray, NetCDF4, Rasterstats, SatPy, PySTAC |
| **Web Mapping** | Folium, Geemap, Leafmap, Leaflet + React-Leaflet |
| **Visualization** | Matplotlib, Plotly, Cartopy, Contextily, Hvplot, GeoViews, Seaborn |
| **Spatial Analysis** | PySAL, ESDA, Mapclassify, OSMnx, NetworkX, Momepy, Spaghetti |
| **Point Cloud & LiDAR** | LasPy, Open3D, PyVista |
| **ML for Geo** | Scikit-learn, TorchGeo, SAM-Geo, Segment-Geospatial |
| **Geocoding & Routing** | GeoPy, OpenRouteService |
| **Database** | PostgreSQL 16 + PostGIS 3.4 |
| **Cache & Queue** | Redis 7, Celery 5 |
| **Object Storage** | MinIO / S3-compatible |
| **Container** | Docker, Docker Compose |
| **Orchestration** | Kubernetes (k8s manifests included) |
| **Monitoring** | Prometheus, Grafana |
| **Auth** | JWT, Authlib, OAuth2 |

---

## 🏗️ Arsitektur

```
┌──────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                    │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────────┐  │
│  │  Pages  │ │Components│ │  Hooks   │ │ API Services    │  │
│  └────┬────┘ └────┬─────┘ └────┬─────┘ └────────┬────────┘  │
│       └────────────┼────────────┼─────────────────┘           │
└────────────────────┼────────────┼─────────────────────────────┘
                     │            │
               REST API     WebSocket
                     │            │
┌────────────────────┼────────────┼─────────────────────────────┐
│                    ▼            ▼                             │
│            FastAPI Backend (Uvicorn + Gunicorn)               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐  │
│  │  Routes  │ │ Services │ │  Models  │ │ Middleware     │  │
│  │  (v1)    │ │  Layer   │ │(SQLAlch.)│ │ Auth / Rate    │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └───────┬────────┘  │
│       └────────────┼────────────┼────────────────┘           │
│                    ▼            ▼                             │
│           ┌────────────┐ ┌────────────┐                      │
│           │ PostgreSQL │ │   Redis    │                      │
│           │  +PostGIS  │ │  +Celery   │                      │
│           └────────────┘ └────────────┘                      │
│                    │                                          │
│                    ▼                                          │
│           ┌────────────────────────────┐                     │
│           │   Docker Sandbox Runner    │                     │
│           │  (Isolated per-execution)  │                     │
│           │  - CPU/Memory limits       │                     │
│           │  - Read-only filesystem    │                     │
│           │  - Static code scanning    │                     │
│           └────────────────────────────┘                     │
│                    │                                          │
│                    ▼                                          │
│           ┌────────────────────────────┐                     │
│           │     MinIO Object Store     │                     │
│           └────────────────────────────┘                     │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 Struktur Proyek

```
PYGeospatial-Hub/
├── backend/                      # FastAPI Backend
│   ├── app/
│   │   ├── api/                  # API Routes
│   │   │   ├── v1/               # API v1 endpoints
│   │   │   │   ├── ai.py         # AI Assistant
│   │   │   │   ├── categories.py # Library categories
│   │   │   │   ├── comments.py   # Community comments
│   │   │   │   ├── converter.py  # Spatial format converter
│   │   │   │   ├── dashboard.py  # Usage dashboard
│   │   │   │   ├── libraries.py  # Library registry
│   │   │   │   ├── sandbox.py    # Code execution
│   │   │   │   ├── scripts.py    # User scripts
│   │   │   │   ├── subscriptions.py # Tier management
│   │   │   │   ├── tools.py      # Pre-built tools
│   │   │   │   ├── uploads.py    # File uploads
│   │   │   │   ├── users.py      # User management
│   │   │   │   ├── visualizations.py # Map/chart render
│   │   │   │   ├── votes.py      # Voting system
│   │   │   │   └── workspace.py  # Workspaces
│   │   │   ├── auth.py           # Authentication
│   │   │   └── routes.py         # Router registration
│   │   ├── geo_libs/             # Geospatial wrappers
│   │   │   ├── core_geospatial/  # Shapely, GeoPandas, Rasterio, etc.
│   │   │   ├── databases/        # PostGIS, Spatialite
│   │   │   ├── geocoding_routing/
│   │   │   ├── machine_learning/
│   │   │   ├── point_cloud_lidar/
│   │   │   ├── remote_sensing/
│   │   │   ├── spatial_analysis/
│   │   │   ├── utilities/
│   │   │   ├── visualization/
│   │   │   └── web_mapping/
│   │   ├── middleware/            # Auth, rate limiter, errors
│   │   ├── models/               # SQLAlchemy models
│   │   ├── services/             # Business logic
│   │   ├── tasks/                # Celery async tasks
│   │   ├── tools/                # Pre-built geospatial tools
│   │   ├── utils/                # Helpers (logger, scanner, etc.)
│   │   ├── config.py             # App configuration
│   │   ├── main.py               # FastAPI entry point
│   │   └── seed_db.py            # Database seeder
│   ├── tests/                    # Backend tests
│   ├── requirements.txt
│   ├── Dockerfile
│   └── qa_test.py
├── frontend/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/                # Page views
│   │   ├── hooks/                # Custom hooks
│   │   ├── services/             # API client
│   │   ├── context/              # React context
│   │   ├── data/                 # Static data
│   │   ├── utils/                # Helpers
│   │   └── styles/               # Global CSS
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── data/                         # Sample data & metadata
│   ├── metadata/                 # Library registry JSON
│   └── sample_datasets/          # GeoJSON, GeoTIFF, Shapefile, LiDAR
├── docs/                         # Documentation
│   ├── tutorials/                # Step-by-step guides
│   ├── API_DOCS.md
│   ├── ARCHITECTURE.md
│   ├── INSTALLATION.md
│   └── USER_GUIDE.md
├── k8s/                          # Kubernetes manifests
├── docker-compose.yml            # Full stack orchestration
├── prometheus.yml                # Prometheus config
└── .github/workflows/            # CI/CD
```

---

## 🚀 Quick Start

### Prasyarat

- **Python 3.10+**
- **Node.js 18+**
- **Docker & Docker Compose** (untuk setup containerized)
- **PostgreSQL + PostGIS** (atau gunakan Docker)

### Setup Backend (Local)

```bash
# 1. Clone repository
git clone https://github.com/MuhammadArthur21/PYGeospatial-Hub.git
cd PYGeospatial-Hub

# 2. Setup virtual environment
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Linux/Mac
# source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Jalankan server
uvicorn app.main:app --reload
```

Backend akan berjalan di **http://localhost:8000**
- API Docs (Swagger): http://localhost:8000/api/docs
- API Docs (ReDoc): http://localhost:8000/api/redoc
- Health check: http://localhost:8000/health

### Setup Frontend (Local)

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di **http://localhost:5173**

### Docker Setup (Full Stack)

```bash
# Jalankan semua service (backend, PostgreSQL, Redis, MinIO, Prometheus, Grafana)
docker-compose up -d

# Lihat logs
docker-compose logs -f
```

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:8000 | 8000 |
| API Docs | http://localhost:8000/api/docs | 8000 |
| PostgreSQL | localhost:5432 | 5432 |
| Redis | localhost:6379 | 6379 |
| MinIO Console | http://localhost:9001 | 9001 |
| Prometheus | http://localhost:9090 | 9090 |
| Grafana | http://localhost:3000 | 3000 |

---

## 📚 API Documentation

Dokumentasi API lengkap tersedia secara interaktif:

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **Dokumentasi statis**: [docs/API_DOCS.md](docs/API_DOCS.md)

### Endpoint Utama

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/v1/libraries` | Daftar semua library |
| GET | `/api/v1/libraries/{id}` | Detail library |
| GET | `/api/v1/categories` | Kategori library |
| GET | `/api/v1/tools` | Daftar tools |
| POST | `/api/v1/sandbox/execute` | Eksekusi kode Python |
| POST | `/api/v1/sandbox/ws/{id}` | WebSocket output |
| POST | `/api/v1/converter/convert` | Konversi format spasial |
| POST | `/api/v1/ai/suggest` | Saran AI untuk error |
| GET/POST | `/api/v1/comments` | CRUD komentar |
| POST | `/api/v1/uploads` | Upload file spasial |
| GET | `/api/v1/subscriptions/tiers` | Daftar tier |

---

## 🧪 Testing

```bash
# Backend tests (51 tests)
cd backend
python -m pytest tests/ -v

# Test specific file
python -m pytest tests/test_libraries.py -v

# Dengan coverage
pip install pytest-cov
python -m pytest tests/ --cov=app
```

Frontend:
```bash
cd frontend
npm run build    # Production build
npm run lint     # ESLint
```

---

## 📦 Library Registry

PyGeospatial Hub memiliki database **100+ library geospasial Python** yang terorganisir dalam kategori:

| Kategori | Contoh Library |
|----------|---------------|
| **Core Geospatial** | Shapely, GeoPandas, Rasterio, Fiona, Pyproj, GDAL |
| **Remote Sensing** | Rioxarray, SatPy, PySTAC, Rasterstats |
| **Web Mapping** | Folium, Leafmap, Geemap, Ipyleaflet |
| **Spatial Analysis** | PySAL, OSMnx, NetworkX, Momepy |
| **Machine Learning** | Scikit-learn, TorchGeo, SAM-Geo |
| **Point Cloud & LiDAR** | LasPy, Open3D, PyVista |
| **Databases** | GeoAlchemy2, Psycopg2, Spatialite |
| **Visualization** | Matplotlib, Plotly, Cartopy, Hvplot |
| **Geocoding & Routing** | GeoPy, OpenRouteService, Google Maps |
| **Utilities** | PyGeodesy, SimpleKML, OWSLib |

Data registry: [data/metadata/libraries_registry.json](data/metadata/libraries_registry.json)

---

## 🔒 Keamanan

- **Sandbox Isolation**: Setiap eksekusi kode berjalan di container Docker terisolasi dengan filesystem read-only
- **Static Code Analysis**: Scanning AST sebelum eksekusi untuk memblokir operasi berbahaya
- **Resource Limits**: CPU, memory, dan timeout per eksekusi
- **JWT Authentication**: Token-based authentication untuk semua API
- **Rate Limiting**: Middleware pembatasan request
- **File Validation**: Validasi tipe dan ukuran file upload
- **Non-root User**: Container berjalan dengan user non-root

---

## 🐳 Deployment

### Docker Compose (Production-like)

```bash
docker-compose up -d --build
```

### Kubernetes

```bash
kubectl apply -f k8s/deployment.yaml
```

### Environment Variables

Konfigurasi melalui environment variables (copy `.env` dari template):

```bash
DATABASE_URL=postgresql://user:password@host:5432/pygeospatial_hub
REDIS_URL=redis://host:6379/0
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-here
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
```

---

## 🤝 Kontribusi

Kami menyambut kontribusi! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

Pastikan semua test lulus sebelum mengirim PR.

---

## 📄 Lisensi

Didistribusikan di bawah **MIT License**. Lihat [LICENSE](LICENSE) untuk informasi lebih lanjut.

---

## 🙏 Acknowledgments

- Dibangun di atas ekosistem open-source geospasial Python yang luar biasa
- OpenStreetMap untuk data spasial
- Seluruh kontributor open-source library yang terdaftar

---

<p align="center">
  <b>Made with ❤️ for the Geospatial Python Community</b><br>
  <a href="https://github.com/MuhammadArthur21/PYGeospatial-Hub">GitHub</a> •
  <a href="https://github.com/MuhammadArthur21/PYGeospatial-Hub/issues">Issues</a> •
  <a href="https://github.com/MuhammadArthur21/PYGeospatial-Hub/discussions">Discussions</a>
</p>
