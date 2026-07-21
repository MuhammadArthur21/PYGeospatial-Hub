import pytest
from app.utils.security_scanner import scan_python_code

def test_safe_geospatial_script():
    safe_code = """
import shapely
from shapely.geometry import Point, Polygon

p = Point(106.8, -6.2)
poly = Polygon([(106, -6), (107, -6), (107, -7), (106, -7)])
print(poly.contains(p))
"""
    result = scan_python_code(safe_code)
    assert result.is_safe is True
    assert len(result.issues) == 0

def test_forbidden_os_import():
    malicious_code = """
import os
os.system("rm -rf /")
"""
    result = scan_python_code(malicious_code)
    assert result.is_safe is False
    assert any("os" in issue for issue in result.issues)

def test_forbidden_subprocess_import():
    malicious_code = """
import subprocess
subprocess.run(["ls", "-la"])
"""
    result = scan_python_code(malicious_code)
    assert result.is_safe is False
    assert any("subprocess" in issue for issue in result.issues)

def test_forbidden_eval_call():
    malicious_code = """
code = "print('hacked')"
eval(code)
"""
    result = scan_python_code(malicious_code)
    assert result.is_safe is False
    assert any("eval" in issue for issue in result.issues)

def test_forbidden_attribute_call():
    malicious_code = """
import shutil
shutil.rmtree('/tmp')
"""
    result = scan_python_code(malicious_code)
    assert result.is_safe is False
    assert any("shutil" in issue or "rmtree" in issue for issue in result.issues)
