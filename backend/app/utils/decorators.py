# PyGeospatial Hub - Decorators

from functools import wraps
from typing import Callable
import time
from app.utils.logger import logger


def timing_decorator(func: Callable) -> Callable:
    """Log execution time of a function"""

    @wraps(func)
    async def wrapper(*args, **kwargs):
        start = time.time()
        result = await func(*args, **kwargs)
        elapsed = time.time() - start
        logger.debug(f"{func.__name__} took {elapsed:.3f}s")
        return result

    return wrapper


def handle_exceptions(func: Callable) -> Callable:
    """Catch and log exceptions"""

    @wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except Exception as e:
            logger.error(f"Error in {func.__name__}: {str(e)}")
            raise

    return wrapper
