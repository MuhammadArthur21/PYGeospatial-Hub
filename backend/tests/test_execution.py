# PyGeospatial Hub - Execution Tests
# Tests for sandbox execution engine and code validation

import pytest, docker
from unittest.mock import patch, MagicMock


class TestStaticCodeScan:
    """Test the security static code scanner"""

    def test_allow_import_geopandas(self):
        """Test allowing safe geospatial imports"""
        from app.services.execution_service import static_code_scan
        safe, reason = static_code_scan("import geopandas as gpd")
        assert safe

    def test_allow_shapely_import(self):
        """Test allowing shapely imports"""
        from app.services.execution_service import static_code_scan
        safe, reason = static_code_scan("from shapely.geometry import Point")
        assert safe

    def test_block_os_import(self):
        """Test blocking os module"""
        from app.services.execution_service import static_code_scan
        safe, _ = static_code_scan("import os")
        assert not safe

    def test_block_subprocess_run(self):
        """Test blocking subprocess.run"""
        from app.services.execution_service import static_code_scan
        safe, _ = static_code_scan("from subprocess import run")
        assert not safe

    def test_block_eval_call(self):
        """Test blocking eval()"""
        from app.services.execution_service import static_code_scan
        safe, _ = static_code_scan("eval('print(1)')")
        assert not safe

    def test_block_file_deletion(self):
        """Test blocking dangerous file operations"""
        from app.services.execution_service import static_code_scan
        safe, _ = static_code_scan("import shutil\nshutil.rmtree('/')")
        assert not safe

    def test_allow_common_geo_operations(self):
        """Test allowing common geospatial operations"""
        from app.services.execution_service import static_code_scan
        code = """
import geopandas as gpd
from shapely.geometry import Point
import numpy as np
import matplotlib.pyplot as plt

gdf = gpd.read_file('data.geojson')
point = Point(1.0, 2.0)
print(gdf.head())
        """
        safe, _ = static_code_scan(code)
        assert safe

    def test_block_system_call(self):
        """Test blocking os.system"""
        from app.services.execution_service import static_code_scan
        safe, reason = static_code_scan("import os\nos.system('ls')")
        assert not safe


class TestSandboxExecutor:
    """Test the sandbox executor (with mocked Docker)"""

    @patch.object(docker, 'from_env')
    def test_execute_success(self, mock_from_env):
        """Test successful code execution"""
        from app.services.execution_service import SandboxExecutor
    
        # Mock container
        mock_container = MagicMock()
        mock_container.wait.return_value = {"StatusCode": 0}
        mock_container.logs.side_effect = [
            b"Hello World\n[EXECUTION_SUCCESS]\n",
            b"",
        ]

        # Mock Docker client
        mock_client = MagicMock()
        mock_client.containers.run.return_value = mock_container
        mock_from_env.return_value = mock_client

        executor = SandboxExecutor()
        result = executor.execute("print('Hello World')")

        assert result["status"] == "success"
        assert "Hello" in result["output"]

    @patch.object(docker, 'from_env')
    def test_execute_timeout(self, mock_from_env):
        """Test execution timeout handling"""
        from app.services.execution_service import SandboxExecutor

        mock_container = MagicMock()
        mock_container.wait.side_effect = Exception("timeout")

        mock_client = MagicMock()
        mock_client.containers.run.return_value = mock_container
        mock_from_env.return_value = mock_client

        executor = SandboxExecutor()
        result = executor.execute("print('test')", timeout=1)

        assert result["status"] == "error"

    @patch.object(docker, 'from_env')
    def test_sandbox_creation_failure(self, mock_from_env):
        """Test handling of Docker failure"""
        from app.services.execution_service import SandboxExecutor

        mock_client = MagicMock()
        mock_client.containers.run.side_effect = Exception("Docker not available")
        mock_from_env.return_value = mock_client

        executor = SandboxExecutor()
        result = executor.execute("print('test')")

        assert result["status"] == "error"