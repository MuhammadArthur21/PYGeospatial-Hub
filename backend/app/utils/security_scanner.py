import ast

FORBIDDEN_MODULES = {
    'os', 'sys', 'subprocess', 'shutil', 'socket', 'ftplib', 'http.server',
    'importlib', 'pty', 'builtins', 'ctypes', 'multiprocessing', 'signal'
}

FORBIDDEN_CALLS = {
    'eval', 'exec', 'compile', '__import__', 'getattr', 'setattr', 'delattr'
}

DANGEROUS_ATTRIBUTES = {
    'system', 'popen', 'spawn', 'execve', 'unlink', 'remove', 'rmdir',
    'rmtree', 'chmod', 'chown', 'kill', 'terminate'
}

class SecurityScanResult:
    def __init__(self, is_safe: bool, issues: list):
        self.is_safe = is_safe
        self.issues = issues

    def to_dict(self):
        return {
            "is_safe": self.is_safe,
            "issues": self.issues
        }

def scan_python_code(code: str) -> SecurityScanResult:
    """
    Scans a Python script using AST to detect security risks
    (forbidden modules, dangerous calls, system commands).
    """
    issues = []
    
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        return SecurityScanResult(False, [f"Syntax Error: {str(e)}"])
    except Exception as e:
        return SecurityScanResult(False, [f"Failed to parse code: {str(e)}"])

    for node in ast.walk(tree):
        # 1. Check Import statements (e.g., import os, import subprocess)
        if isinstance(node, ast.Import):
            for alias in node.names:
                mod_name = alias.name.split('.')[0]
                if mod_name in FORBIDDEN_MODULES:
                    issues.append(f"Forbidden module import: '{alias.name}'")

        # 2. Check ImportFrom statements (e.g., from os import system)
        elif isinstance(node, ast.ImportFrom):
            if node.module:
                mod_name = node.module.split('.')[0]
                if mod_name in FORBIDDEN_MODULES:
                    issues.append(f"Forbidden module import: 'from {node.module}'")
            for alias in node.names:
                if alias.name in DANGEROUS_ATTRIBUTES:
                    issues.append(f"Forbidden function import: '{alias.name}'")

        # 3. Check Function Calls (e.g., eval(), exec())
        elif isinstance(node, ast.Call):
            if isinstance(node.func, ast.Name):
                if node.func.id in FORBIDDEN_CALLS:
                    issues.append(f"Forbidden call: '{node.func.id}()'")
            elif isinstance(node.func, ast.Attribute):
                if node.func.attr in DANGEROUS_ATTRIBUTES:
                    issues.append(f"Forbidden attribute call: '.{node.func.attr}()'")

        # 4. Check Dangerous Attributes
        elif isinstance(node, ast.Attribute):
            if node.attr in DANGEROUS_ATTRIBUTES:
                issues.append(f"Dangerous attribute access: '.{node.attr}'")

    is_safe = len(issues) == 0
    return SecurityScanResult(is_safe, issues)
