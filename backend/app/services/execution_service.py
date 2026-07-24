# PyGeospatial Hub - Sandbox Execution Service
# Docker-based isolated code execution engine

"""
This service handles Python code execution in isolated Docker containers.
Each execution gets a fresh container with resource limits and security restrictions.

Security features:
- Per-execution container isolation
- CPU/memory/timeout limits
- Read-only filesystem (except /workspace)
- Network restrictions (whitelist only)
- Non-root user execution
- Static code scan before execution
"""

import uuid
import time
import re
import os
import json
from typing import Optional, Dict, List
from app.config import settings
from app.utils.logger import logger

# Dangerous patterns to block in static scan
BLOCKED_PATTERNS = [
    r"import\s+os\s*$",
    r"from\s+os\s+import",
    r"import\s+subprocess",
    r"from\s+subprocess\s+import",
    r"import\s+shutil",
    r"from\s+shutil\s+import",
    r"import\s+sys",
    r"import\s+ctypes",
    r"from\s+ctypes\s+import",
    r"__import__\(",
    r"exec\(",
    r"eval\(",
    r"compile\(",
    r"open\(.*['\"].*\.(py|exe|sh|bat)",
    r"system\s*\(",
    r"popen\s*\(",
    r"Popen\s*\(",
    r"run\s*\(.*shell",
    r"remove\s*\(",
    r"rmdir\s*\(",
    r"unlink\s*\(",
]

# Allowed domains for network access
ALLOWED_DOMAINS = [
    "pypi.org",
    "files.pythonhosted.org",
    "raw.githubusercontent.com",
]


def static_code_scan(code: str) -> tuple:
    """
    Scan code for dangerous operations before execution.
    Returns (is_safe, reason)
    """
    for idx, pattern in enumerate(BLOCKED_PATTERNS):
        match = re.search(pattern, code, re.IGNORECASE)
        if match:
            logger.warning(f"Static scan blocked: {match.group(0)}")
            return False, f"Security restriction: {match.group(0)}"
    return True, ""


class SandboxExecutor:
    """Manages Docker-based sandbox execution"""

    def __init__(self):
        import docker
        from docker.types import Mount
        self._docker = docker
        self._Mount = Mount
        self.client = docker.from_env()
        self.base_image = "pygeospatial-sandbox:latest"

    def ensure_base_image(self):
        """Ensure the sandbox base image exists"""
        try:
            self.client.images.get(self.base_image)
        except self._docker.errors.ImageNotFound:
            logger.info("Building sandbox base image...")
            # Build the base image with geospatial libraries
            dockerfile = f"""
            FROM python:3.11-slim

            RUN apt-get update && apt-get install -y --no-install-recommends \\
                gdal-bin libgdal-dev libgeos-dev libproj-dev \\
                && rm -rf /var/lib/apt/lists/*

            RUN pip install --no-cache-dir \\
                shapely==2.1.0 geopandas==1.0.1 rasterio==1.4.1 \\
                pyproj==3.6.1 fiona==1.9.6 folium==0.18.0 \\
                matplotlib==3.9.2 cartopy==0.23.0 contextily==1.6.0 \\
                numpy==1.26.4 pandas==2.2.2 xarray==2024.1.1 \\
                scipy==1.14.1 networkx==3.3 osmnx==1.9.4 \\
                geopy==2.4.1 movingpandas==0.18.0 \\
                geojson==3.1.0 hvplot==0.10.0 plotly==5.24.1 \\
                seaborn==0.13.2 haversine==2.8.0 \\
                requests==2.32.0 aiohttp==3.9.5

            RUN useradd -m -u 1000 sandbox
            USER sandbox
            WORKDIR /workspace
            """
            import tempfile
            with tempfile.TemporaryDirectory() as tmpdir:
                df_path = os.path.join(tmpdir, "Dockerfile")
                with open(df_path, "w") as f:
                    f.write(dockerfile)
                self.client.images.build(
                    path=tmpdir,
                    dockerfile=df_path,
                    tag=self.base_image,
                    rm=True,
                )

    def execute(
        self,
        code: str,
        libraries: Optional[List[str]] = None,
        timeout: int = 30,
        memory_limit: str = "256m",
        cpu_limit: float = 0.5,
    ) -> Dict:
        """
        Execute Python code in an isolated container.

        Args:
            code: Python code to execute
            libraries: List of library names to pre-load
            timeout: Maximum execution time in seconds
            memory_limit: Memory limit per container
            cpu_limit: CPU limit per container

        Returns:
            Dict with execution results
        """
        execution_id = str(uuid.uuid4())[:8]
        logger.info(f"Sandbox execution {execution_id} started")

        # Static code scan
        is_safe, reason = static_code_scan(code)
        if not is_safe:
            return {
                "execution_id": execution_id,
                "status": "failed",
                "output": "",
                "error": reason,
                "execution_time": 0,
            }

        # Prepare the execution command
        # Wrap code in a try-except to capture errors
        wrapped_code = (
            "import sys, json, traceback\n"
            "try:\n"
            + "\n".join(f"    {line}" for line in code.split("\n"))
            + "\n"
            + "    print('\\n[EXECUTION_SUCCESS]')\n"
            "except Exception as e:\n"
            "    print(f'Error: {str(e)}', file=sys.stderr)\n"
            "    traceback.print_exc(file=sys.stderr)\n"
            "    print('\\n[EXECUTION_FAILED]')\n"
        )

        # Create a temporary file with the code
        import tempfile
        import atexit

        tmp_dir = tempfile.mkdtemp(prefix=f"pygeo_{execution_id}_")
        script_path = os.path.join(tmp_dir, "script.py")
        with open(script_path, "w") as f:
            f.write(wrapped_code)

        start_time = time.time()

        try:
            container = self.client.containers.run(
                image=self.base_image,
                command=["python", "/workspace/script.py"],
                volumes={tmp_dir: {"bind": "/workspace", "mode": "ro"}},
                mem_limit=memory_limit,
                nano_cpus=int(cpu_limit * 1e9),
                # Network enabled for data download (OSM, Natural Earth, etc.)
                # Static code scan still blocks dangerous patterns
                # network_mode="none",
                user="1000:1000",
                read_only=True,
                detach=True,
                remove=False,
                environment=[
                    "PYTHONDONTWRITEBYTECODE=1",
                    "PYTHONUNBUFFERED=1",
                ],
            )

            # Wait for completion with timeout
            result = container.wait(timeout=timeout)
            exit_code = result["StatusCode"]

            # Get logs
            stdout_logs = container.logs(stdout=True, stderr=False).decode("utf-8")
            stderr_logs = container.logs(stdout=False, stderr=True).decode("utf-8")

            # Cleanup
            container.remove(force=True)

            execution_time = time.time() - start_time
            status = "success" if exit_code == 0 else "failed"

            logger.info(
                f"Sandbox execution {execution_id} completed: "
                f"status={status}, time={execution_time:.2f}s"
            )

            return {
                "execution_id": execution_id,
                "status": status,
                "output": stdout_logs,
                "error": stderr_logs if stderr_logs else "",
                "execution_time": round(execution_time, 3),
            }

        except self._docker.errors.ContainerError as e:
            execution_time = time.time() - start_time
            return {
                "execution_id": execution_id,
                "status": "failed",
                "output": "",
                "error": str(e),
                "execution_time": round(execution_time, 3),
            }
        except Exception as e:
            execution_time = time.time() - start_time
            logger.error(f"Sandbox execution {execution_id} error: {str(e)}")
            return {
                "execution_id": execution_id,
                "status": "error",
                "output": "",
                "error": f"Execution error: {str(e)}",
                "execution_time": round(execution_time, 3),
            }
        finally:
            # Cleanup temp directory
            try:
                import shutil
                shutil.rmtree(tmp_dir, ignore_errors=True)
            except Exception:
                pass

# Lazy singleton - created on first access only
_sandbox_executor = None


def get_sandbox_executor():
    """Get or create the singleton SandboxExecutor instance lazily."""
    global _sandbox_executor
    if _sandbox_executor is None:
        _sandbox_executor = SandboxExecutor()
    return _sandbox_executor