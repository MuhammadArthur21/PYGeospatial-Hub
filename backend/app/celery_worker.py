# PyGeospatial Hub - Celery Task Queue Configuration
# For heavy geospatial job processing (Section 6.1, 16)

from celery import Celery
from app.config import settings

celery_app = Celery(
    "pygeospatial",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
    include=["app.tasks.geo_tasks"],
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_soft_time_limit=300,  # 5 minutes
    task_time_limit=600,  # 10 minutes
    worker_max_tasks_per_child=50,
)


def get_task(task_id: str):
    """Get task result by ID"""
    return celery_app.AsyncResult(task_id)
