# PyGeospatial Hub — Installation Guide

## Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-org/pygeospatial-hub.git
cd pygeospatial-hub
```

### 2. Backend Setup

#### Prerequisites
- Python 3.10+ installed
- PostgreSQL 15+ with PostGIS extension
- Redis (optional, for task queue)

#### Steps
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Initialize database
# Create a PostgreSQL database named 'pygeospatial_hub'
# Enable PostGIS extension:
# CREATE EXTENSION postgis;

# Run development server
uvicorn app.main:app --reload
```

### 3. Frontend Setup

#### Prerequisites
- Node.js 18+ installed

#### Steps
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at **http://localhost:5173**

### 4. Docker Setup (Alternative)

For a fully containerized environment:

```bash
# Start all services
docker-compose up -d

# Services:
# - Backend API: http://localhost:8000
# - API Docs: http://localhost:8000/api/docs
# - MinIO Console: http://localhost:9001
```

## Environment Variables

See `backend/.env.example` for all configuration options:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://pygeo:pygeo_password@localhost:5432/pygeospatial_hub` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379/0` |
| `MINIO_ENDPOINT` | MinIO/S3 endpoint | `localhost:9000` |
| `JWT_SECRET_KEY` | Secret for JWT tokens | (change in production) |
| `SECRET_KEY` | App secret key | (change in production) |

## API Documentation

Once the backend is running:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

## Troubleshooting

### GDAL Installation Issues
On Windows, install GDAL via OSGeo4W or use the Docker setup.

### PostgreSQL/PostGIS Issues
Ensure PostGIS extension is enabled:
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### Port Conflicts
Default ports:
- Frontend: 5173
- Backend: 8000
- PostgreSQL: 5432
- Redis: 6379
- MinIO API: 9000
- MinIO Console: 9001
