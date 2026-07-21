# PyGeospatial Hub - Celery Geo Tasks
# Heavy geospatial processing tasks (Section 6.1)

from app.celery_worker import celery_app
from app.utils.logger import logger


@celery_app.task(bind=True, name="execute_geo_analysis")
def execute_geo_analysis(self, code: str, libraries: list = None):
    """
    Execute geospatial analysis code in background.
    Heavy operations like raster processing, large dataset analysis.
    """
    logger.info(f"Task {self.request.id} starting geo analysis")
    try:
        # Static code scan
        from app.services.execution_service import static_code_scan
        is_safe, reason = static_code_scan(code)
        if not is_safe:
            return {"status": "failed", "error": reason}

        # Execute in sandbox
        from app.services.execution_service import SandboxExecutor
        executor = SandboxExecutor()
        result = executor.execute(
            code=code,
            libraries=libraries or [],
            timeout=300,
            memory_limit="512m",
            cpu_limit=1.0,
        )
        return result

    except Exception as e:
        logger.error(f"Task {self.request.id} failed: {str(e)}")
        return {"status": "error", "error": str(e)}
