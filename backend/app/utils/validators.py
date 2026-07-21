# PyGeospatial Hub - Input Validators

import re


def validate_username(username: str) -> bool:
    """Validate username: 3-50 chars, alphanumeric and underscores only"""
    return bool(re.match(r"^[a-zA-Z0-9_]{3,50}$", username))


def validate_email(email: str) -> bool:
    """Basic email format validation"""
    return bool(re.match(r"^[^@]+@[^@]+\.[^@]+$", email))


def validate_password(password: str) -> tuple:
    """
    Validate password strength.
    Returns (is_valid, message)
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters"
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search(r"\d", password):
        return False, "Password must contain at least one number"
    return True, "Password is valid"
