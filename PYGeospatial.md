# 🌍 PyGeospatial Hub — Dokumen Spesifikasi Produk & Teknis (Lengkap)

> **One-stop platform untuk seluruh ekosistem Python Geospatial Libraries.**
> Bayangkan gabungan *Anaconda Cloud + Google Colab + VS Code + GitHub*, tapi fokus penuh pada geospasial.

**Nama Produk:** PyGeospatial Hub
**Versi Dokumen:** 2.0 (Super Detail Edition)
**Status:** Draft Perencanaan — Pra-Development
**Tipe Dokumen:** Product Requirements Document (PRD) + Technical Design Document (TDD)

---

## 📑 Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Visi, Misi & Konsep Inti](#2-visi-misi--konsep-inti)
3. [Struktur Tim & Peran (RACI)](#3-struktur-tim--peran-raci)
4. [Fitur Utama](#4-fitur-utama)
5. [Desain UI/UX & Alur Navigasi](#5-desain-uiux--alur-navigasi)
6. [Arsitektur Sistem](#6-arsitektur-sistem)
7. [Tech Stack](#7-tech-stack)
8. [Struktur Folder Proyek](#8-struktur-folder-proyek)
9. [Kategorisasi Library (Registry)](#9-kategorisasi-library-registry)
10. [Skema Database](#10-skema-database)
11. [Rancangan API Endpoints](#11-rancangan-api-endpoints)
12. [Alur Pengguna (User Flow)](#12-alur-pengguna-user-flow)
13. [Keamanan & Isolasi Sandbox](#13-keamanan--isolasi-sandbox)
14. [Strategi QA & Testing](#14-strategi-qa--testing)
15. [DevOps, Infrastruktur & Observability](#15-devops-infrastruktur--observability)
16. [Roadmap Pengembangan](#16-roadmap-pengembangan)
17. [Manajemen Proyek & Timeline](#17-manajemen-proyek--timeline)
18. [Model Monetisasi](#18-model-monetisasi)
19. [Manajemen Risiko](#19-manajemen-risiko)
20. [Metrik Keberhasilan (KPI)](#20-metrik-keberhasilan-kpi)
21. [Glosarium](#21-glosarium)
22. [Langkah Selanjutnya](#22-langkah-selanjutnya)

---

## 1. Ringkasan Eksekutif

PyGeospatial Hub adalah platform web terpusat yang menyatukan **100+ library geospasial Python** dalam satu ekosistem yang tertata rapi, dapat dicoba langsung tanpa instalasi apa pun (*zero-install*), dan mudah dibagikan ke komunitas GIS/geospasial Indonesia maupun global.

Masalah yang ingin diselesaikan:

| Masalah Saat Ini | Solusi PyGeospatial Hub |
|---|---|
| Instalasi library geospasial (GDAL, GEOS, PROJ) rumit dan sering gagal karena dependency sistem | Sandbox cloud siap pakai, tidak perlu instalasi lokal |
| Dokumentasi tiap library tersebar di banyak situs berbeda | Documentation Hub terpusat dengan format seragam |
| Sulit menemukan library yang tepat untuk use-case tertentu | Library Index dengan filter kategori, tag, dan tingkat kesulitan |
| Tidak ada tempat berbagi script/tools geospasial siap pakai | Community Hub + Tools Marketplace |
| Visualisasi hasil analisis butuh setup terpisah (matplotlib, folium, dsb) | Visualization Engine otomatis merender ke peta/chart interaktif |

**Empat pilar utama produk:**

| Pilar | Deskripsi |
|---|---|
| 📚 **Library Index** | Katalog terstruktur seluruh geo-library, lengkap dokumentasi & contoh |
| 🧪 **Interactive Sandbox** | Tulis & eksekusi kode Python geospasial langsung di browser |
| 🛠️ **Tools Marketplace** | Tools siap pakai (Buffer Geometry, Geocode Address, dll) tanpa perlu coding |
| 🗺️ **Visualization Engine** | Auto-render hasil ke peta interaktif & chart |

---

## 2. Visi, Misi & Konsep Inti

### 2.1 Visi
Menjadi platform nomor satu di dunia bagi praktisi, peneliti, dan pelajar untuk belajar, bereksperimen, dan berkolaborasi dengan ekosistem Python geospasial — tanpa hambatan instalasi maupun kurva belajar yang curam.

### 2.2 Misi
1. Menyediakan akses instan (zero-install) ke 100+ library geospasial Python melalui sandbox berbasis cloud.
2. Menstandardisasi dan mengagregasi dokumentasi geospasial yang tersebar di berbagai sumber.
3. Membangun komunitas berbagi tools, script, dan dataset geospasial.
4. Menurunkan barrier-to-entry bagi pemula yang ingin belajar analisis geospasial dengan Python.
5. Menyediakan visualisasi hasil analisis secara instan tanpa konfigurasi tambahan.

### 2.3 Target Pengguna (User Persona)

| Persona | Kebutuhan Utama | Fitur yang Paling Relevan |
|---|---|---|
| **Mahasiswa/Pelajar GIS** | Belajar tanpa ribet instalasi, tutorial jelas | Sandbox, Tutorials, Library Index |
| **Praktisi GIS/Konsultan** | Eksekusi cepat, tools siap pakai, kolaborasi tim | Tools Marketplace, Workflow Builder, Team Tier |
| **Data Scientist/Peneliti** | Eksperimen cepat, akses banyak library sekaligus | Sandbox, Notebook Mode, Library Registry |
| **Developer GIS** | Referensi API, contoh kode, integrasi | Documentation Hub, Code Snippets |
| **Instansi Pemerintah/Perusahaan** | Deployment aman, kontrol akses, SLA | Enterprise Tier, SSO, On-Premise |

---

## 3. Struktur Tim & Peran (RACI)

Sebelum implementasi dimulai, tim proyek dibagi menjadi empat kelompok besar. Berikut rincian peran, tanggung jawab, dan deliverable dari masing-masing posisi.

### 3.1 Perancang Tampilan (Desain)

Sebelum kode ditulis, tampilan dan alur website **wajib** dirancang terlebih dahulu agar produk nyaman digunakan sejak awal.

#### UI/UX Designer
| Aspek | Detail |
|---|---|
| **Tanggung jawab utama** | Menentukan alur navigasi (UX) agar pengguna tidak bingung berpindah antar Library Index → Sandbox → Visualisasi → Community |
| **Deliverable** | Wireframe low-fidelity, mockup high-fidelity (Figma), design system (warna, tipografi, komponen), prototype interaktif |
| **Fokus UI** | Warna, tombol, tata letak, konsistensi komponen (lihat [Bab 5](#5-desain-uiux--alur-navigasi)) |
| **Fokus UX** | Peta alur pengguna (user journey), heuristik usability, aksesibilitas (kontras warna, keyboard navigation) |
| **Kolaborasi dengan** | Front-End Developer (handoff desain), Product Manager (validasi kebutuhan pengguna) |

### 3.2 Tim Pengembang (Programmer)

| Peran | Tanggung Jawab | Tools/Stack Terkait |
|---|---|---|
| **Front-End Developer** | Implementasi UI dari desain Figma ke kode React, integrasi dengan REST/WebSocket API, state management, responsivitas | React, TypeScript, Tailwind CSS, Zustand/React Query |
| **Back-End Developer** | Membangun REST API, business logic, integrasi database, sandbox execution engine, keamanan API | FastAPI, PostgreSQL/PostGIS, Redis, Celery |
| **Full-Stack Developer** | Menjembatani front-end dan back-end, membangun fitur end-to-end, membantu ketika ada bottleneck di salah satu sisi | Seluruh stack di atas |

### 3.3 Tim Kualitas & Infrastruktur

Website yang baik harus bebas dari error dan dapat diakses banyak orang tanpa kendala.

#### QA (Quality Assurance) / Tester
- Tugas utamanya adalah "merusak" website secara sengaja untuk mencari celah (bug) sebelum diluncurkan ke publik.
- Menulis test case, melakukan regression testing, exploratory testing, dan uji keamanan sandbox.
- Detail lengkap ada di [Bab 14 — Strategi QA & Testing](#14-strategi-qa--testing).

#### DevOps Engineer / Sysadmin
- Mengelola infrastruktur server, CI/CD pipeline, container orchestration, monitoring, dan skalabilitas.
- Memastikan sandbox execution aman dan terisolasi dari sistem produksi.
- Detail lengkap ada di [Bab 15 — DevOps, Infrastruktur & Observability](#15-devops-infrastruktur--observability).

### 3.4 Manajemen Proyek

#### Project Manager (PM)
- Memastikan proyek selesai tepat waktu dan tidak melebihi anggaran.
- Mengatur sprint planning, backlog prioritas, dan komunikasi lintas tim.
- Detail lengkap ada di [Bab 17 — Manajemen Proyek & Timeline](#17-manajemen-proyek--timeline).

### 3.5 Matriks RACI Ringkas

| Aktivitas | UI/UX | Front-End | Back-End | Full-Stack | QA | DevOps | PM |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Wireframe & Mockup | R/A | C | I | I | I | I | C |
| Implementasi UI | C | R/A | I | C | I | I | C |
| API & Business Logic | I | C | R/A | C | I | I | C |
| Sandbox Execution Engine | I | I | R/A | C | C | C | C |
| Testing & Bug Report | I | C | C | C | R/A | I | I |
| Deployment & Monitoring | I | I | C | I | C | R/A | I |
| Sprint Planning & Prioritas | C | C | C | C | C | C | R/A |

*R = Responsible, A = Accountable, C = Consulted, I = Informed*

---

## 4. Fitur Utama

### 4.1 Libraries Index & Browser
- Pencarian & filter berdasarkan kategori, tingkat kesulitan, dan tag.
- Template quick-start per library (kode langsung bisa dijalankan di sandbox).
- Panduan instalasi otomatis (requirements generator berdasarkan library yang dipilih).
- Manajemen dependency antar library (deteksi konflik versi).
- Rating & jumlah penggunaan tiap library sebagai indikator popularitas.

### 4.2 Interactive Sandbox
- Code editor dengan syntax highlighting (Monaco Editor — mesin yang sama dengan VS Code).
- Eksekusi kode Python secara real-time di container terisolasi.
- Terminal output & error log dengan stack trace yang mudah dibaca.
- Upload/download file (shapefile, GeoTIFF, GeoJSON, LAS/LAZ, KML, CSV dengan koordinat).
- Riwayat & version management tiap eksekusi (rollback ke versi kode sebelumnya).
- Mode Notebook opsional (mirip Jupyter) untuk eksplorasi bertahap sel demi sel.
- Auto-save draft kode setiap beberapa detik.

### 4.3 Tools Marketplace
- Tools siap pakai: buffer, clip raster, geocode, spatial join, merge shapefile, dll.
- Workflow builder drag-and-drop untuk menyusun beberapa tools menjadi pipeline.
- Simpan & bagikan tools kustom buatan sendiri (publik/privat).
- Versi tools dengan changelog agar pengguna tahu pembaruan apa yang terjadi.

### 4.4 Visualization Engine
- Peta interaktif (Leaflet / Mapbox GL) dengan layer control.
- Dukungan visualisasi 3D (point cloud, terrain, digital elevation model).
- Chart & statistik otomatis (Plotly/Bokeh) — histogram, scatter, choropleth.
- Render real-time saat eksekusi selesai, tanpa perlu refresh halaman (via WebSocket).
- Export hasil visualisasi ke PNG/SVG/HTML interaktif.

### 4.5 Documentation Hub
- Agregator dokumentasi resmi tiap library dalam format seragam.
- API reference internal untuk endpoint PyGeospatial Hub sendiri.
- Tutorial & contoh kode siap pakai, terstruktur dari pemula ke mahir.
- Galeri code snippets dari komunitas, dapat difilter berdasarkan use-case.

### 4.6 Community & Sharing
- Publikasi script/notebook secara publik atau privat.
- Publikasi tools kustom ke marketplace dengan sistem review sederhana.
- Integrasi version control ala Git (histori perubahan script).
- Komentar & kolaborasi antar pengguna, termasuk fork script orang lain.
- Sistem upvote/bookmark untuk konten komunitas terbaik.

### 4.7 AI Assistant (Fase 3+)
- Bantuan debugging kode geospasial secara kontekstual.
- Saran optimasi kode (misal: penggunaan spatial index yang lebih efisien).
- Penjelasan error message dalam bahasa yang mudah dipahami.

---

## 5. Desain UI/UX & Alur Navigasi

### 5.1 Prinsip Desain
1. **Clarity over cleverness** — antarmuka harus jelas, terutama bagi pemula yang baru belajar geospasial.
2. **Konsistensi komponen** — satu design system dipakai di seluruh halaman (button, card, modal, table).
3. **Feedback instan** — setiap aksi (run code, upload file, save tool) memberi indikator status yang jelas (loading, success, error).
4. **Progressive disclosure** — fitur lanjutan (workflow builder, AI assistant) tidak membebani tampilan awal pengguna baru.
5. **Aksesibilitas** — kontras warna memenuhi WCAG AA, navigasi dapat dilakukan via keyboard.

### 5.2 Struktur Navigasi Utama
```
Navbar (global)
├── Home
├── Libraries (Index & Kategori)
├── Tools Marketplace
├── Sandbox
├── Tutorials & Documentation
├── Community
└── Dashboard (setelah login)
      ├── My Scripts
      ├── My Tools
      ├── My Datasets
      └── Account Settings
```

### 5.3 Design System (ringkas)

| Elemen | Ketentuan |
|---|---|
| **Warna Primer** | Hijau-biru (identik nuansa peta/bumi) sebagai warna aksen utama |
| **Warna Netral** | Skala abu-abu untuk latar dan teks sekunder |
| **Warna Semantik** | Hijau = sukses eksekusi, Merah = error, Kuning = warning/timeout |
| **Tipografi** | Sans-serif untuk UI umum, monospace (mis. Fira Code) untuk code editor |
| **Komponen** | Dibangun dengan shadcn/ui di atas Tailwind CSS agar konsisten dan dapat digunakan ulang |
| **Layout** | Grid responsif 12 kolom, breakpoint mobile/tablet/desktop |

### 5.4 Wireframe Halaman Kunci (deskripsi tekstual)

**Halaman Sandbox:**
```
┌─────────────────────────────────────────────┐
│ Navbar                                       │
├───────────────┬───────────────┬─────────────┤
│ Library/Tools  │  Code Editor  │ Map/Chart   │
│ Sidebar        │  (Monaco)     │ Viewer      │
│                ├───────────────┤             │
│                │ Terminal/Log  │             │
└───────────────┴───────────────┴─────────────┘
```

**Halaman Library Detail:**
```
┌─────────────────────────────────────────────┐
│ Nama Library + Badge Difficulty + Tags       │
├─────────────────────────┬────────────────────┤
│ Deskripsi & Use Case      │ Quick Actions:    │
│ Dokumentasi ringkas       │ [Try in Sandbox]  │
│ Contoh kode               │ [Baca Dokumentasi]│
└─────────────────────────┴────────────────────┘
```

---

## 6. Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                    │
│   Library Browser │ Code Editor │ Map Viewer │ Dashboard │
└───────────────────────────┬──────────────────────────────┘
                             │ REST / WebSocket
┌───────────────────────────▼──────────────────────────────┐
│                    BACKEND (FastAPI)                      │
│  Auth │ Library Service │ Execution Engine │ Viz Service   │
└───────────┬────────────────────────────┬──────────────────┘
            │                            │
┌───────────▼────────────┐   ┌───────────▼────────────────┐
│ PostgreSQL + PostGIS     │   │ Sandbox Runner (Docker)    │
│ (metadata, users, data)  │   │ Isolated per-execution env │
└───────────────────────────┘   └──────────────────────────┘
            │
┌───────────▼────────────┐
│ Redis (cache & queue)    │
│ Celery (heavy geo jobs)  │
└───────────────────────────┘
```

**Alur singkat:** Frontend mengirim kode → Backend memvalidasi → Sandbox Runner mengeksekusi dalam container terisolasi → Hasil (geometry/raster/chart) dikembalikan → Visualization Engine merender ke peta/chart di frontend.

### 6.1 Komponen Tambahan (Detail)

| Komponen | Fungsi |
|---|---|
| **API Gateway / Nginx** | Reverse proxy, load balancing, rate limiting global, terminasi TLS/SSL |
| **Execution Queue (Celery + Redis)** | Mengantre job eksekusi berat (raster besar, batch job) agar tidak membebani API secara langsung |
| **Object Storage (S3-compatible)** | Menyimpan file upload pengguna (shapefile, GeoTIFF, LAS/LAZ) secara terpisah dari database |
| **WebSocket Service** | Mengirim update status eksekusi & hasil visualisasi secara real-time ke frontend |
| **JupyterHub/JupyterLab Kernel (opsional)** | Backend eksekusi mode notebook, terpisah dari sandbox single-run |

---

## 7. Tech Stack

### 7.1 Backend

| Komponen | Teknologi |
|---|---|
| Framework | FastAPI (Python 3.11+) |
| Database | PostgreSQL + PostGIS |
| Cache | Redis |
| Task Queue | Celery (untuk proses geo berat: raster besar, batch job) |
| Container Sandbox | Docker (isolasi per eksekusi/library) |
| Auth | JWT + OAuth2 |
| Object Storage | MinIO / Amazon S3 (kompatibel) |
| ORM | SQLAlchemy + GeoAlchemy2 |

### 7.2 Frontend

| Komponen | Teknologi |
|---|---|
| Framework | React 18 + TypeScript |
| Code Editor | Monaco Editor |
| Mapping | Leaflet.js / Mapbox GL |
| Visualisasi | Plotly / Bokeh |
| UI | Tailwind CSS + shadcn/ui |
| State Management | Zustand / React Query |
| Build Tool | Vite |

### 7.3 Infrastruktur

| Komponen | Teknologi |
|---|---|
| Containerization | Docker + Docker Compose (Kubernetes opsional di Fase 4 untuk skala besar) |
| Reverse Proxy | Nginx |
| Deployment | Gunicorn + Uvicorn workers |
| Jupyter Backend | JupyterHub/JupyterLab kernel (opsional untuk notebook mode) |
| Monitoring | Prometheus + Grafana (opsional Fase 3+) |
| Logging Terpusat | Loki / ELK Stack (opsional Fase 3+) |
| CI/CD | GitHub Actions |

---

## 8. Struktur Folder Proyek

```
geospatial-python-hub/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                    # Entry point FastAPI
│   │   ├── config.py                  # Konfigurasi environment
│   │   │
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── routes.py              # Registrasi semua router
│   │   │   ├── auth.py                # Login, register, refresh token
│   │   │   └── v1/
│   │   │       ├── libraries.py       # CRUD libraries
│   │   │       ├── categories.py      # CRUD categories
│   │   │       ├── tools.py           # CRUD tools
│   │   │       ├── sandbox.py         # Execution engine endpoint
│   │   │       ├── uploads.py         # File management
│   │   │       └── visualizations.py  # Render hasil eksekusi
│   │   │
│   │   ├── models/
│   │   │   ├── library.py
│   │   │   ├── category.py
│   │   │   ├── tool.py
│   │   │   ├── user.py
│   │   │   ├── execution.py
│   │   │   └── spatial_dataset.py
│   │   │
│   │   ├── services/
│   │   │   ├── library_service.py
│   │   │   ├── execution_service.py
│   │   │   ├── visualization_service.py
│   │   │   ├── file_service.py
│   │   │   ├── spatial_service.py
│   │   │   └── ai_assistant.py        # AI helper untuk saran/debug kode geo
│   │   │
│   │   ├── geo_libs/                  # Wrapper untuk 100+ library
│   │   │   ├── __init__.py
│   │   │   ├── core_geospatial/
│   │   │   │   ├── shapely_wrapper.py
│   │   │   │   ├── fiona_wrapper.py
│   │   │   │   ├── rasterio_wrapper.py
│   │   │   │   ├── geopandas_wrapper.py
│   │   │   │   ├── gdal_wrapper.py
│   │   │   │   └── pyproj_wrapper.py
│   │   │   ├── remote_sensing/
│   │   │   │   ├── satpy_wrapper.py
│   │   │   │   ├── sentinelsat_wrapper.py
│   │   │   │   ├── rasterstats_wrapper.py
│   │   │   │   ├── rio_tiler_wrapper.py
│   │   │   │   └── earthpy_wrapper.py
│   │   │   ├── web_mapping/
│   │   │   │   ├── folium_wrapper.py
│   │   │   │   ├── ipyleaflet_wrapper.py
│   │   │   │   ├── keplergl_wrapper.py
│   │   │   │   ├── mapboxgl_wrapper.py
│   │   │   │   └── geojson_wrapper.py
│   │   │   ├── spatial_analysis/
│   │   │   │   ├── pysal_wrapper.py
│   │   │   │   ├── osmnx_wrapper.py
│   │   │   │   ├── networkx_wrapper.py
│   │   │   │   ├── tobler_wrapper.py
│   │   │   │   └── rtree_wrapper.py
│   │   │   ├── visualization/
│   │   │   │   ├── cartopy_wrapper.py
│   │   │   │   ├── geoplot_wrapper.py
│   │   │   │   ├── contextily_wrapper.py
│   │   │   │   └── plotly_wrapper.py
│   │   │   ├── geocoding_routing/
│   │   │   │   ├── geopy_wrapper.py
│   │   │   │   ├── openrouteservice_wrapper.py
│   │   │   │   └── geocoder_wrapper.py
│   │   │   ├── databases/
│   │   │   │   ├── geoalchemy2_wrapper.py
│   │   │   │   ├── spatialite_wrapper.py
│   │   │   │   └── postgis_wrapper.py
│   │   │   ├── point_cloud_lidar/
│   │   │   │   ├── laspy_wrapper.py
│   │   │   │   └── pdal_wrapper.py
│   │   │   └── utilities/
│   │   │       ├── haversine_wrapper.py
│   │   │       ├── geomet_wrapper.py
│   │   │       ├── s2sphere_wrapper.py
│   │   │       └── pygeodesy_wrapper.py
│   │   │
│   │   ├── tools/                     # Pre-built tools siap pakai
│   │   │   ├── buffer_geometry.py
│   │   │   ├── clip_raster.py
│   │   │   ├── geocode_address.py
│   │   │   ├── calculate_distance.py
│   │   │   ├── merge_shapefiles.py
│   │   │   ├── rasterize_vector.py
│   │   │   ├── extract_osm_data.py
│   │   │   ├── spatial_join.py
│   │   │   ├── generate_tiles.py
│   │   │   └── analyze_network.py
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.py
│   │   │   ├── validators.py
│   │   │   ├── constants.py
│   │   │   ├── file_handler.py
│   │   │   ├── error_handler.py
│   │   │   └── decorators.py
│   │   │
│   │   └── middleware/
│   │       ├── auth_middleware.py
│   │       ├── rate_limiter.py
│   │       └── error_middleware.py
│   │
│   ├── tests/
│   │   ├── test_libraries.py
│   │   ├── test_tools.py
│   │   ├── test_execution.py
│   │   └── test_integrations.py
│   │
│   ├── notebooks/                     # Contoh notebook Jupyter
│   │   ├── shapely_intro.ipynb
│   │   ├── rasterio_processing.ipynb
│   │   └── geopandas_analysis.ipynb
│   │
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── MapViewer.jsx
│   │   │   ├── ResultsPanel.jsx
│   │   │   ├── FileUploader.jsx
│   │   │   └── ToolsLibrary.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── LibrariesIndex.jsx
│   │   │   ├── LibraryDetail.jsx
│   │   │   ├── CategoriesView.jsx
│   │   │   ├── CategoryDetail.jsx
│   │   │   ├── ToolsMarketplace.jsx
│   │   │   ├── Sandbox.jsx
│   │   │   ├── Tutorials.jsx
│   │   │   ├── Documentation.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── libraryService.js
│   │   │   └── executionService.js
│   │   │
│   │   ├── hooks/
│   │   │   ├── useLibraries.js
│   │   │   ├── useExecution.js
│   │   │   └── useVisualization.js
│   │   │
│   │   ├── styles/
│   │   │   └── globals.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
│
├── data/
│   ├── sample_datasets/
│   │   ├── shapefile_samples/
│   │   ├── geotiff_samples/
│   │   ├── geojson_samples/
│   │   └── lidar_samples/
│   └── metadata/
│       └── libraries_registry.json
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API_DOCS.md
│   ├── INSTALLATION.md
│   ├── USER_GUIDE.md
│   ├── DEVELOPER_GUIDE.md
│   └── tutorials/
│       ├── getting_started.md
│       ├── shapely_guide.md
│       ├── geopandas_guide.md
│       └── rasterio_guide.md
│
├── docker-compose.yml                 # Orkestrasi utama seluruh service
├── .env.example
├── README.md
└── LICENSE
```

---

## 9. Kategorisasi Library (Registry)

File referensi: `data/metadata/libraries_registry.json`

```json
{
  "categories": [
    {
      "id": "core_geospatial",
      "name": "Core Geospatial",
      "icon": "📍",
      "description": "Penanganan data geospasial fundamental",
      "libraries": [
        {
          "id": "shapely",
          "name": "Shapely",
          "version": "2.1.0",
          "description": "Operasi geometri pada fitur planar",
          "docs": "https://shapely.readthedocs.io/",
          "pypi": "https://pypi.org/project/Shapely/",
          "tags": ["geometry", "vector"],
          "difficulty": "beginner",
          "use_cases": ["Buffer geometry", "Intersect shapes", "Simplify polygons"]
        },
        {
          "id": "fiona",
          "name": "Fiona",
          "version": "1.9.0",
          "description": "Baca dan tulis format file vektor spasial",
          "docs": "https://fiona.readthedocs.io/",
          "pypi": "https://pypi.org/project/fiona/",
          "tags": ["io", "vector", "shapefile", "geojson"],
          "difficulty": "intermediate",
          "use_cases": ["Baca shapefile", "Tulis GeoJSON", "Konversi format"]
        }
      ]
    },
    {
      "id": "remote_sensing",
      "name": "Remote Sensing & Raster",
      "icon": "🛰️",
      "description": "Pemrosesan citra satelit dan data raster",
      "libraries": []
    },
    {
      "id": "web_mapping",
      "name": "Web Mapping & Visualization",
      "icon": "🗺️",
      "description": "Peta interaktif dan visualisasi berbasis web",
      "libraries": []
    },
    {
      "id": "spatial_analysis",
      "name": "Spatial Analysis",
      "icon": "📐",
      "description": "Analisis statistik & jaringan spasial",
      "libraries": []
    },
    {
      "id": "point_cloud_lidar",
      "name": "Point Cloud & LiDAR",
      "icon": "☁️",
      "description": "Pemrosesan data titik awan 3D",
      "libraries": []
    }
  ]
}
```

> 📌 **Catatan:** Registry ini akan bertambah bertahap seiring Fase 1–4 (lihat [Roadmap](#16-roadmap-pengembangan)), dari 5 library inti menjadi 100+ library.

### 9.1 Skema Field Library (Referensi Kontributor)

Ketika menambahkan library baru ke registry, setiap entri wajib memiliki field berikut:

| Field | Tipe | Wajib | Keterangan |
|---|---|:---:|---|
| `id` | string | ✅ | Slug unik, huruf kecil, tanpa spasi |
| `name` | string | ✅ | Nama resmi library |
| `version` | string | ✅ | Versi stabil terbaru yang didukung sandbox |
| `description` | string | ✅ | Deskripsi singkat 1 kalimat |
| `docs` | url | ✅ | Tautan dokumentasi resmi |
| `pypi` | url | ✅ | Tautan halaman PyPI |
| `tags` | array | ✅ | Kata kunci pencarian |
| `difficulty` | enum | ✅ | `beginner` \| `intermediate` \| `advanced` |
| `use_cases` | array | ✅ | Minimal 2 contoh penggunaan nyata |

---

## 10. Skema Database (PostgreSQL + PostGIS)

```sql
-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(50),
  description TEXT
);

-- Libraries
CREATE TABLE libraries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  description TEXT,
  documentation_url VARCHAR(500),
  pypi_url VARCHAR(500),
  difficulty_level VARCHAR(50),
  tags JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tools
CREATE TABLE tools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  library_ids JSONB,
  description TEXT,
  code TEXT,
  created_by INTEGER REFERENCES users(id),
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Executions (sandbox runs)
CREATE TABLE executions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  code TEXT NOT NULL,
  result JSONB,
  status VARCHAR(50) DEFAULT 'pending',   -- pending | running | success | failed
  execution_time NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Spatial Datasets
CREATE TABLE spatial_datasets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255),
  file_path VARCHAR(500),
  file_type VARCHAR(50),
  geometry GEOMETRY,
  metadata JSONB,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Saved Scripts
CREATE TABLE saved_scripts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255),
  code TEXT,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexing spasial untuk performa query
CREATE INDEX idx_spatial_datasets_geometry ON spatial_datasets USING GIST (geometry);
```

### 10.1 Tabel Tambahan (Rekomendasi Pengembangan Lanjutan)

```sql
-- Komentar pada script/tools publik
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  target_type VARCHAR(50),   -- 'script' | 'tool'
  target_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscription / Tier langganan
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  tier VARCHAR(50) DEFAULT 'free',  -- free | pro | team | enterprise
  started_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Audit log untuk keamanan sandbox
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  execution_id INTEGER REFERENCES executions(id),
  action VARCHAR(100),
  detail JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 10.2 Ringkasan Relasi Antar Tabel

| Tabel | Berelasi Dengan | Jenis Relasi |
|---|---|---|
| `libraries` | `categories` | Many-to-One |
| `tools` | `users` | Many-to-One (created_by) |
| `executions` | `users` | Many-to-One |
| `spatial_datasets` | `users` | Many-to-One |
| `saved_scripts` | `users` | Many-to-One |
| `comments` | `users`, (`scripts`/`tools`) | Many-to-One (polymorphic) |
| `subscriptions` | `users` | One-to-One (aktif) |
| `audit_logs` | `users`, `executions` | Many-to-One |

---

## 11. Rancangan API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/v1/auth/register` | Registrasi user baru |
| POST | `/api/v1/auth/login` | Login, mengembalikan JWT |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| GET | `/api/v1/libraries` | List semua library (dengan filter/search) |
| GET | `/api/v1/libraries/{id}` | Detail satu library |
| GET | `/api/v1/categories` | List kategori |
| GET | `/api/v1/tools` | List tools yang tersedia |
| POST | `/api/v1/tools` | Buat tool kustom baru |
| PUT | `/api/v1/tools/{id}` | Perbarui tool kustom |
| DELETE | `/api/v1/tools/{id}` | Hapus tool kustom |
| POST | `/api/v1/sandbox/execute` | Eksekusi kode di sandbox terisolasi |
| GET | `/api/v1/sandbox/executions/{id}` | Status & hasil eksekusi |
| WS | `/api/v1/sandbox/ws/{execution_id}` | Stream status eksekusi real-time |
| POST | `/api/v1/uploads` | Upload dataset spasial |
| GET | `/api/v1/visualizations/{execution_id}` | Ambil hasil render (peta/chart) |
| GET | `/api/v1/scripts` | List script publik/privat milik user |
| POST | `/api/v1/scripts` | Simpan script baru |
| GET | `/api/v1/scripts/{id}` | Detail satu script |
| POST | `/api/v1/scripts/{id}/comments` | Tambah komentar pada script |
| GET | `/api/v1/users/{id}/profile` | Profil publik pengguna |
| GET | `/api/v1/dashboard/summary` | Ringkasan aktivitas user (untuk Dashboard) |

### 11.1 Contoh Payload — Eksekusi Sandbox

**Request**
```json
POST /api/v1/sandbox/execute
{
  "code": "import geopandas as gpd\ngdf = gpd.read_file('sample.geojson')\nprint(gdf.head())",
  "libraries": ["geopandas"],
  "dataset_id": 12
}
```

**Response**
```json
{
  "execution_id": 4821,
  "status": "queued",
  "estimated_time_seconds": 3
}
```

### 11.2 Konvensi Umum API
- Semua response error mengikuti format konsisten: `{ "error": { "code": "...", "message": "..." } }`
- Semua endpoint yang butuh autentikasi menggunakan header `Authorization: Bearer <token>`
- Pagination menggunakan query parameter `?page=&limit=`
- Versi API disematkan pada path (`/api/v1/...`) agar mudah bermigrasi ke v2 di masa depan.

---

## 12. Alur Pengguna (User Flow)

```
Login
  │
  ▼
Dashboard
  │
  ├── Browse Libraries (Index)
  │     ├── Filter by Category
  │     ├── Lihat Detail + Dokumentasi
  │     └── Quick Start Template
  │
  ├── Tools Marketplace
  │     ├── Gunakan Tool Siap Pakai
  │     └── Susun Custom Workflow
  │
  ├── Sandbox Lab
  │     ├── Tulis Kode di Editor
  │     ├── Upload Data Spasial
  │     ├── Eksekusi
  │     ├── Visualisasi Hasil di Peta
  │     └── Simpan / Bagikan / Unduh
  │
  └── Tutorials & Dokumentasi
        ├── Panduan Step-by-step
        ├── Video Tutorial
        └── Contoh Kode
```

### 12.1 Contoh Skenario Konkret

1. User membuka **Library Browser** → memilih **Shapely** → membaca dokumentasi + contoh kode.
2. Klik **"Try It"** → Sandbox terbuka dengan template siap pakai.
3. User menulis kode buffer geometry → klik **Execute**.
4. Backend menjalankan kode di container terisolasi → hasil geometry dikembalikan sebagai GeoJSON.
5. Visualization Engine otomatis me-render hasil ke peta interaktif.
6. User bisa **Download** hasil atau **Share** ke komunitas.

### 12.2 Skenario Tambahan — Kolaborasi Tim (Tier Team)
1. Anggota tim membuat *private workspace* → mengundang rekan kerja via email.
2. Rekan kerja membuka script bersama di Sandbox → melakukan editing kolaboratif.
3. Hasil disimpan sebagai `saved_scripts` dengan `is_public = false`, hanya terlihat anggota workspace.
4. Tim mem-publish tool hasil kolaborasi ke marketplace internal workspace.

---

## 13. Keamanan & Isolasi Sandbox

Karena platform ini mengeksekusi kode Python milik pengguna, keamanan sandbox adalah aspek **paling kritis** dari seluruh sistem.

| Aspek Keamanan | Implementasi |
|---|---|
| **Isolasi per eksekusi** | Setiap run kode berjalan dalam container Docker terpisah, tanpa akses ke filesystem host |
| **Resource limit** | Batasi CPU, memori, dan waktu eksekusi (timeout) per container agar tidak terjadi abuse |
| **Network restriction** | Sandbox tidak memiliki akses internet bebas, kecuali ke domain yang di-whitelist (mis. untuk geocoding API) |
| **Read-only base image** | Base image Python + geo-libs bersifat read-only; hanya folder kerja user yang writable |
| **Rate limiting** | Batasi jumlah eksekusi per user per menit lewat `rate_limiter.py` |
| **Validasi input** | Kode discan sebelum eksekusi untuk mencegah operasi berbahaya (mis. akses filesystem sistem, subprocess ke luar sandbox) |
| **Audit log** | Semua eksekusi dicatat di tabel `executions` (dan `audit_logs`) untuk keperluan monitoring dan debugging |
| **User & Group Isolation** | Container dijalankan sebagai non-root user dengan UID terbatas |
| **Secrets Management** | Kredensial API pihak ketiga (geocoding, dsb.) disimpan di secret manager, tidak pernah masuk ke kode sandbox pengguna |

### 13.1 Alur Validasi Eksekusi
```
Kode diterima Backend
    │
    ▼
Static Scan (cari import berbahaya, subprocess, os.system, dsb.)
    │
    ▼
Lolos? ──Tidak──▶ Tolak + kirim pesan error ke user
    │
   Ya
    │
    ▼
Kirim ke Execution Queue (Celery)
    │
    ▼
Sandbox Runner: container baru, resource limit aktif
    │
    ▼
Timeout / Selesai → hasil dikembalikan → container dihancurkan
```

---

## 14. Strategi QA & Testing

QA/Tester bertugas "merusak" website secara sengaja untuk menemukan celah (bug) sebelum website diluncurkan ke publik.

### 14.1 Jenis Pengujian

| Jenis Testing | Cakupan | Tools |
|---|---|---|
| **Unit Testing** | Fungsi individual di service & wrapper library | Pytest (backend), Jest/Vitest (frontend) |
| **Integration Testing** | Interaksi antar service (API ↔ Database ↔ Sandbox) | Pytest + testcontainers |
| **End-to-End (E2E) Testing** | Alur pengguna penuh dari login hingga eksekusi sandbox | Playwright / Cypress |
| **Security Testing** | Uji coba escape sandbox, injection, brute-force login | OWASP ZAP, manual penetration testing |
| **Load & Stress Testing** | Simulasi banyak eksekusi sandbox bersamaan | Locust / k6 |
| **Regression Testing** | Memastikan fitur lama tidak rusak setelah rilis baru | Test suite otomatis di CI/CD |
| **Usability Testing** | Uji kenyamanan alur navigasi bersama pengguna nyata | Moderated user testing session |

### 14.2 Contoh Skenario Uji Keamanan Sandbox
- Mencoba menjalankan `import os; os.system("rm -rf /")` → harus ditolak oleh static scan.
- Mencoba mengakses jaringan di luar whitelist → harus diblokir oleh network restriction.
- Mencoba eksekusi kode dengan infinite loop → harus dihentikan oleh timeout.
- Mencoba upload file berukuran sangat besar → harus ditolak oleh validasi ukuran file.

### 14.3 Definisi Selesai (Definition of Done)
Sebuah fitur dianggap selesai jika:
1. Lolos unit test dan integration test dengan code coverage minimal yang disepakati tim.
2. Lolos review kode oleh minimal satu developer lain.
3. Tidak ada bug kritis/blocker terbuka terkait fitur tersebut.
4. Sudah diuji di staging environment oleh QA.

---

## 15. DevOps, Infrastruktur & Observability

DevOps Engineer/Sysadmin bertanggung jawab memastikan aplikasi berjalan stabil, aman, dan dapat diskalakan.

### 15.1 CI/CD Pipeline
```
Push ke branch ──▶ Lint & Static Analysis ──▶ Unit Test ──▶ Build Docker Image
        │                                                          │
        ▼                                                          ▼
   Pull Request Review                                   Deploy ke Staging
        │                                                          │
        ▼                                                          ▼
   Merge ke main ───────────────────────────────────▶ Deploy ke Production
```

### 15.2 Lingkungan Deployment

| Environment | Tujuan | Karakteristik |
|---|---|---|
| **Development** | Kerja harian developer | Data dummy, fitur eksperimental aktif |
| **Staging** | Uji QA sebelum rilis | Mirror konfigurasi production, data sampel |
| **Production** | Pengguna nyata | Monitoring aktif, backup rutin, resource dijaga ketat |

### 15.3 Observability

| Aspek | Tools | Tujuan |
|---|---|---|
| **Metrics** | Prometheus + Grafana | Memantau CPU/memori sandbox, jumlah eksekusi per menit |
| **Logging** | Loki / ELK Stack | Melacak error backend & sandbox secara terpusat |
| **Alerting** | Grafana Alerting / PagerDuty | Notifikasi otomatis saat resource kritis atau error rate tinggi |
| **Uptime Monitoring** | UptimeRobot / Better Uptime | Memastikan layanan dapat diakses 24/7 |

### 15.4 Strategi Backup & Disaster Recovery
- Backup database PostgreSQL/PostGIS harian (retensi minimal 30 hari).
- Snapshot object storage (dataset & file upload) berkala.
- Dokumentasi runbook pemulihan bencana (disaster recovery) yang diuji berkala.

---

## 16. Roadmap Pengembangan

### 🟢 Fase 1 — MVP (2–3 bulan)
- [ ] Setup infrastruktur backend (FastAPI + PostgreSQL + PostGIS)
- [ ] Integrasi 5 library inti: Shapely, GeoPandas, Rasterio, Pyproj, GDAL
- [ ] Sandbox execution dasar (single container, tanpa queue)
- [ ] Frontend dasar: Library Index, Code Editor, Map Viewer
- [ ] Desain UI/UX dasar (wireframe → mockup → design system awal)

### 🟡 Fase 2 (2–3 bulan)
- [ ] Tambah 15+ library baru (remote sensing, web mapping, spatial analysis)
- [ ] Tools Marketplace dengan tools pre-built
- [ ] Autentikasi & profil user
- [ ] Integrasi database penuh (saved scripts, datasets)
- [ ] Implementasi CI/CD pipeline dasar

### 🟠 Fase 3 (2–3 bulan)
- [ ] Fitur komunitas (share, comment, publish tools)
- [ ] Visualisasi lanjutan (3D, point cloud)
- [ ] AI Assistant untuk bantu debugging & saran kode geospasial
- [ ] Optimasi performa (caching, query tuning)
- [ ] Monitoring & observability penuh (Prometheus + Grafana)

### 🔵 Fase 4 (Ongoing)
- [ ] Tambahkan sisa library hingga 100+
- [ ] Integrasi Machine Learning geospasial (mis. klasifikasi citra satelit)
- [ ] Aplikasi mobile
- [ ] Fitur enterprise (private workspace, SSO, on-premise deployment)
- [ ] Migrasi orkestrasi ke Kubernetes bila skala pengguna besar

---

## 17. Manajemen Proyek & Timeline

Project Manager (PM) memastikan proyek selesai tepat waktu dan tidak melebihi anggaran.

### 17.1 Metodologi
Proyek direkomendasikan menggunakan **Agile Scrum** dengan sprint 2 minggu, terdiri dari:
- Sprint Planning (awal sprint)
- Daily Stand-up (harian, singkat)
- Sprint Review/Demo (akhir sprint)
- Sprint Retrospective (evaluasi proses tim)

### 17.2 Ringkasan Timeline Tingkat Tinggi

| Fase | Durasi Estimasi | Output Utama |
|---|---|---|
| Perancangan (UI/UX + Arsitektur) | 3–4 minggu | Wireframe, mockup, dokumen arsitektur |
| Fase 1 — MVP | 2–3 bulan | Platform dasar dengan 5 library inti |
| Fase 2 | 2–3 bulan | Marketplace, autentikasi, 20+ library |
| Fase 3 | 2–3 bulan | Komunitas, AI Assistant, observability |
| Fase 4 | Berkelanjutan | 100+ library, enterprise, mobile |

### 17.3 Tugas Utama PM
- Mengelola backlog produk bersama stakeholder.
- Mengoordinasikan lintas tim (Desain, Front-End, Back-End, QA, DevOps).
- Memantau anggaran dan risiko proyek (lihat [Bab 19](#19-manajemen-risiko)).
- Melaporkan progres ke pemangku kepentingan secara berkala.

---

## 18. Model Monetisasi

| Tier | Fitur | Target |
|---|---|---|
| **Free** | Sandbox terbatas, 5 eksekusi/hari, library dasar | Pelajar, hobiis |
| **Pro** | Eksekusi tanpa batas, dataset lebih besar, workflow builder | Praktisi GIS individu |
| **Team** | Kolaborasi workspace, private tools, shared datasets | Tim/konsultan geospasial |
| **Enterprise** | Deployment on-premise, SSO, SLA, custom library integration | Instansi pemerintah/perusahaan besar |

---

## 19. Manajemen Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Sandbox escape / eksploitasi keamanan | Tinggi | Isolasi container ketat, static scan, audit log, penetration testing rutin |
| Beban server tinggi saat eksekusi bersamaan | Sedang–Tinggi | Task queue (Celery), auto-scaling, resource limit per container |
| Ketergantungan pada versi library pihak ketiga | Sedang | Registry versi terkelola, pengujian kompatibilitas rutin |
| Keterlambatan pengembangan karena scope creep | Sedang | Backlog prioritas ketat, review scope tiap sprint |
| Adopsi pengguna rendah di awal | Sedang | Onboarding yang mudah, tutorial lengkap, komunitas aktif sejak Fase 1 |
| Biaya infrastruktur cloud membengkak | Sedang | Monitoring biaya, batas eksekusi tier Free, optimasi resource sandbox |

---

## 20. Metrik Keberhasilan (KPI)

| Kategori | Metrik | Target Awal (6 bulan pasca-MVP) |
|---|---|---|
| **Adopsi** | Jumlah pengguna terdaftar | 5.000+ pengguna |
| **Engagement** | Rata-rata eksekusi sandbox per pengguna aktif/minggu | 10+ eksekusi |
| **Konten** | Jumlah library terdaftar di registry | 40+ library |
| **Komunitas** | Jumlah script/tools publik dibagikan | 500+ item |
| **Kualitas** | Tingkat keberhasilan eksekusi sandbox (tanpa error sistem) | > 95% |
| **Retensi** | Retensi pengguna bulanan (MAU/registered) | > 30% |
| **Monetisasi** | Konversi Free → Pro | 3–5% |

---

## 21. Glosarium

| Istilah | Penjelasan |
|---|---|
| **GIS** | Geographic Information System, sistem untuk mengelola dan menganalisis data spasial |
| **Sandbox** | Lingkungan eksekusi kode terisolasi agar aman dari sistem produksi |
| **PostGIS** | Ekstensi PostgreSQL untuk menyimpan dan mengkueri data geospasial |
| **GeoJSON** | Format standar terbuka untuk merepresentasikan fitur geografis dalam JSON |
| **LiDAR** | Light Detection and Ranging, teknologi penginderaan jarak menggunakan laser |
| **CRS** | Coordinate Reference System, sistem referensi koordinat geografis |
| **Raster** | Data spasial berbasis grid/piksel (mis. citra satelit) |
| **Vector (spasial)** | Data spasial berbasis titik, garis, dan poligon |
| **Workflow Builder** | Fitur drag-and-drop untuk menyusun beberapa tools menjadi satu alur kerja otomatis |

---

## 22. Langkah Selanjutnya

1. Setup struktur repository sesuai [Struktur Folder Proyek](#8-struktur-folder-proyek).
2. Selesaikan wireframe & mockup UI/UX sebelum development dimulai (lihat [Bab 5](#5-desain-uiux--alur-navigasi)).
3. Inisialisasi backend dengan FastAPI + Dockerfile.
4. Setup PostgreSQL + PostGIS (docker-compose).
5. Buat wrapper untuk 5 library inti (Fase 1).
6. Bangun frontend skeleton (React + Vite + Tailwind).
7. Implementasikan sandbox execution engine dengan isolasi Docker.
8. Susun rencana pengujian QA sejak awal (bukan setelah fitur selesai).
9. Siapkan pipeline CI/CD dasar bersama DevOps sejak Fase 1.
10. Tulis dokumentasi awal (`README.md`, `INSTALLATION.md`).
11. Deploy MVP ke staging environment, lakukan usability testing dengan pengguna nyata.
12. Kumpulkan feedback awal sebelum melanjutkan ke Fase 2.

---

*Dokumen ini adalah dokumen hidup (living document) dan akan diperbarui seiring perkembangan proyek PyGeospatial Hub melalui setiap fase roadmap.*
