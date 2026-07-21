# PyGeospatial Hub - Rate Limiter Middleware
# Basic rate limiting for API endpoints

from fastapi import Request, HTTPException
import time
from collections import defaultdict

# Simple in-memory rate limiter (use Redis in production)
request_counts = defaultdict(list)
RATE_LIMIT = 60  # requests
RATE_LIMIT_WINDOW = 60  # seconds


async def rate_limit_middleware(request: Request, call_next):
    """Rate limit requests per IP address"""
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    window_start = now - RATE_LIMIT_WINDOW

    # Clean old entries
    request_counts[client_ip] = [
        t for t in request_counts[client_ip] if t > window_start
    ]

    # Check rate limit
    if len(request_counts[client_ip]) >= RATE_LIMIT:
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again later.",
        )

    request_counts[client_ip].append(now)
    response = await call_next(request)
    return response
