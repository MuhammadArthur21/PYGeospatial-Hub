# PyGeospatial Hub - Error Handler

from fastapi import Request
from fastapi.responses import JSONResponse


class NotFoundError(Exception):
    """Resource not found"""

    def __init__(self, resource: str, resource_id: int):
        self.message = f"{resource} with id {resource_id} not found"
        super().__init__(self.message)


class ValidationError(Exception):
    """Input validation error"""

    def __init__(self, field: str, message: str):
        self.message = f"{field}: {message}"
        super().__init__(self.message)


class SandboxError(Exception):
    """Sandbox execution error"""

    def __init__(self, message: str, details: dict = None):
        self.message = message
        self.details = details or {}
        super().__init__(self.message)
