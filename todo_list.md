# 📋 To-Do List: Fitur PYGeospatial Hub yang Belum Selesai (Berdasarkan PYGeospatial.md)

Dokumen ini merangkum seluruh item yang **belum selesai / siap untuk tahap pengembangan berikutnya (Fase 2 - 4)** berdasarkan spesifikasi resmi di `PYGeospatial.md`.

---

## 🔴 Prioritas Tinggi (Backend Services & Migration)

- [ ] **Aktivasi Container Infrastructure**
  - Jalankan `docker compose up -d` untuk menyalakan PostgreSQL + PostGIS, Redis, dan MinIO.
  - Verifikasi koneksi service di `localhost:5432` (Postgres), `localhost:6379` (Redis), dan `localhost:9000` (MinIO).

- [ ] **Migrasi Database PostgreSQL & Persistence Layer**
  - Buat migrasi Alembic (`alembic revision --autogenerate` & `alembic upgrade head`).
  - Ganti penyimpanan sementara (*in-memory dict/list*) pada route `auth.py`, `tools.py`, `comments.py`, `votes.py`, `scripts.py`, dan `uploads.py` dengan kueri SQLAlchemy nyata.
  - Hubungkan `spatial_datasets` ke PostGIS dengan indeks geospasial (`GIST (geometry)`).

- [ ] **Object Storage Integration (MinIO / AWS S3)**
  - Hubungkan service `uploads.py` ke MinIO bucket untuk menyimpan file `.shp`, `.geojson`, `.tiff`, dan `.las` secara independen dari filesystem lokal.

---

## 🟡 Prioritas Menengah (Fitur Visualisasi & Sandbox Real-Time)

- [ ] **WebSocket Streaming Endpoint**
  - Implementasikan router WebSocket `/api/v1/sandbox/ws/{execution_id}` untuk streaming log terminal dan progres eksekusi secara real-time ke frontend tanpa polling.

- [ ] **3D Point Cloud & LiDAR Visualization Engine**
  - Integrasikan viewer 3D (Three.js / Deck.gl / Potree) pada `MapViewer.jsx` untuk visualisasi data elevasi 3D (DEM, Point Cloud `.las`/`.laz`).

- [ ] **Static Code Security Scanner (Keamanan Sandbox)**
  - Buat scanner AST di `execution_service.py` untuk mendeteksi dan memblokir impor atau perintah berbahaya (seperti `os.system`, `subprocess`, `sys.exit`, atau penulisan ke sistem berkas host) sebelum dikirim ke Docker runner.

- [ ] **Workflow Builder Drag-and-Drop (Tools Marketplace)**
  - Buat canvas UI visual (misalnya menggunakan `React Flow`) yang memungkinkan pengguna menyambungkan beberapa tools geospasial (misal: *Clip Raster* ➔ *Buffer Vector* ➔ *Spatial Join*) menjadi satu pipeline analisis otomatis.

---

## 🔵 Prioritas Lanjutan (Fase 3 & 4 Roadmap)

- [ ] **Fitur Diskusi & Komentar Komunitas**
  - Hubungkan komponen UI komentar ke database (`/api/v1/scripts/{id}/comments`).

- [ ] **Model Monetisasi & Tier Management**
  - Implementasikan limitasi eksekusi berdasarkan tier pengguna:
    - **Free**: Maksimal 5 eksekusi/hari, dataset max 50MB.
    - **Pro**: Unlimited eksekusi, akses AI assistant penuh.
    - **Team / Enterprise**: Private Workspaces, SSO, & Custom Docker environment.

- [ ] **Automated Test Suite (QA & CI/CD)**
  - Tulis Unit Tests di `backend/tests/` menggunakan `pytest`.
  - Tulis E2E Tests untuk frontend menggunakan `Playwright` atau `Cypress`.
  - Tambahkan langkah testing otomatis pada pipeline `.github/workflows/ci.yml`.

- [ ] **Peningkatan Registry Library**
  - Menambahkan sisa library geospasial hingga mencapai target **100+ library** sesuai visi Fase 4.
