# 🌍 PyGeospatial Hub

> **One-stop platform untuk seluruh ekosistem Python Geospatial Libraries.**
> Bayangkan gabungan *Anaconda Cloud + Google Colab + VS Code + GitHub*, tapi fokus penuh pada geospasial.

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- Docker & Docker Compose (for containerized setup)
- PostgreSQL + PostGIS (or use Docker)

### Setup Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### Docker Setup (Full Stack)

```bash
docker-compose up -d
```

## 📚 Features

- **📚 Library Index** - 100+ geospatial libraries, organized & searchable
- **🧪 Interactive Sandbox** - Write & execute Python geo code in browser
- **🛠️ Tools Marketplace** - Pre-built geospatial tools, no coding required
- **🗺️ Visualization Engine** - Auto-render results to maps & charts
- **📖 Documentation Hub** - Centralized docs & tutorials
- **👥 Community** - Share scripts, tools, collaborate

## 🏗️ Architecture

```
Frontend (React + Vite + Tailwind)
    ↕ REST / WebSocket
Backend (FastAPI + PostgreSQL/PostGIS + Redis)
    ↕ Docker Sandbox
Sandbox Runner (Isolated per-execution containers)
```

## 📁 Project Structure

```
├── backend/          # FastAPI backend
├── frontend/         # React + Vite frontend
├── data/             # Sample datasets & metadata
├── docs/             # Documentation
└── docker-compose.yml
```

## 🧪 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | FastAPI, SQLAlchemy, GeoAlchemy2 |
| **Frontend** | React 18, Vite, Tailwind CSS |
| **GIS Core** | Shapely, GeoPandas, Rasterio, Pyproj, GDAL |
| **Database** | PostgreSQL + PostGIS |
| **Cache** | Redis |
| **Object Storage** | MinIO / S3-compatible |
| **Container** | Docker |

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
