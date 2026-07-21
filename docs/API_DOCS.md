# PyGeospatial Hub - API Documentation

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

### Auth Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login, returns JWT |
| POST | `/auth/refresh` | Refresh access token |

### Libraries

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/libraries` | List all libraries |
| GET | `/libraries/{id}` | Get library details |
| POST | `/libraries` | Create library (admin) |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | List all categories |
| GET | `/categories/{id}` | Get category details |

### Tools

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tools` | List all tools |
| POST | `/tools` | Create custom tool |
| PUT | `/tools/{id}` | Update tool |
| DELETE | `/tools/{id}` | Delete tool |

### Sandbox

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/sandbox/execute` | Execute code in sandbox |
| GET | `/sandbox/executions/{id}` | Get execution status |
| WS | `/sandbox/ws/{id}` | Real-time execution updates |

### Uploads

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/uploads` | Upload spatial dataset |
| GET | `/uploads/{id}` | Get upload status |

### Visualizations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/visualizations/{execution_id}` | Get rendered visualization |

## Error Format

All errors follow a consistent format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```
