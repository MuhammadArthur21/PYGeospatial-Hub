# PyGeospatial Hub - Architecture

## System Overview

```
┌──────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                    │
│   Library Browser │ Code Editor │ Map Viewer │ Dashboard  │
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
└──────────────────────────┘   └──────────────────────────┘
            │
┌───────────▼────────────┐
│ Redis (cache & queue)   │
│ Celery (heavy geo jobs) │
└──────────────────────────┘
```

## Key Components

### Backend (FastAPI)
- **API Layer**: RESTful endpoints for libraries, tools, sandbox, auth
- **Service Layer**: Business logic for execution, visualization, file handling
- **Geo Libraries**: Wrapper modules for 100+ geospatial Python libraries
- **Database**: SQLAlchemy ORM with GeoAlchemy2 for spatial queries

### Frontend (React + Vite)
- **Pages**: Home, Libraries, Tools Marketplace, Sandbox, Tutorials, Docs, Dashboard
- **Components**: Navbar, Cards, Code Editor, Map Viewer, Results Panel
- **State**: Zustand for local state, React Query for server state

### Sandbox Runner
- **Isolation**: Each execution runs in a separate Docker container
- **Security**: Read-only filesystem, network restrictions, resource limits
- **Queue**: Celery + Redis for managing execution queue

## Data Flow

1. User writes code in the Sandbox editor
2. Frontend sends code to Backend via REST or WebSocket
3. Backend validates and scans code for security
4. Code is queued in Celery for execution
5. Sandbox Runner creates isolated container
6. Code executes with requested libraries
7. Results (geometry, raster, chart) are returned
8. Visualization Engine renders results
9. Frontend displays maps and charts
