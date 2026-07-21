# PyGeospatial Hub - Error Handling Middleware
# Global exception handlers

from fastapi import Request
from fastapi.responses import JSONResponse


class AppException(Exception):
    """Base application exception"""

    def __init__(self, status_code: int, code: str, message: str):
        self.status_code = status_code
        self.code = code
        self.message = message


async def global_error_handler(request: Request, exc: Exception):
    """Global exception handler that returns consistent error responses"""
    if isinstance(exc, AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": {
                    "code": exc.code,
                    "message": exc.message,
                }
            },
        )

    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occurred",
            }
        },
    )
