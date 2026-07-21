# PyGeospatial Hub - Backend App Config
# Application settings loaded from environment variables

from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # App
    APP_NAME: str = "PyGeospatial Hub"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    SECRET_KEY: str = "change-this-to-a-random-secret-key"

    # Database
    DATABASE_URL: str = "postgresql://pygeo:pygeo_password@localhost:5432/pygeospatial_hub"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # MinIO / S3
    MINIO_ENDPOINT: str = "localhost:9000"
    MINIO_ACCESS_KEY: str = "pygeo_access"
    MINIO_SECRET_KEY: str = "pygeo_secret"
    MINIO_BUCKET: str = "pygeospatial-datasets"
    MINIO_SECURE: bool = False

    # Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"

    # JWT
    JWT_SECRET_KEY: str = "change-this-to-a-jwt-secret"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 1440

    # Sandbox
    SANDBOX_TIMEOUT_SECONDS: int = 300
    SANDBOX_MAX_MEMORY_MB: int = 512
    SANDBOX_CPU_LIMIT: int = 1
    MAX_FILE_SIZE_MB: int = 50
    ALLOWED_EXTENSIONS: str = ".shp,.geojson,.tiff,.tif,.las,.laz,.kml,.csv,.gpkg"

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
