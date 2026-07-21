# PyGeospatial Hub - Auth API
# JWT-based authentication with password hashing

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
import hashlib
import hmac
import jwt

router = APIRouter()

# Simple in-memory user store (replace with database in production)
USERS = {}

# JWT configuration
JWT_SECRET = "pygeo-jwt-secret-change-in-production"
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION = timedelta(hours=24)


class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    refresh_token: Optional[str] = None
    username: Optional[str] = None


class UserProfile(BaseModel):
    id: int
    username: str
    email: str
    created_at: str


def hash_password(password: str) -> str:
    """Hash password using SHA-256 with salt"""
    salt = "pygeo_salt_2026"
    return hashlib.sha256(f"{salt}:{password}".encode()).hexdigest()


def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hash"""
    return hash_password(password) == hashed


def create_token(username: str) -> str:
    """Create a JWT access token"""
    payload = {
        "sub": username,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + JWT_EXPIRATION,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> Optional[dict]:
    """Decode and verify a JWT token"""
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    """Register a new user account"""
    if request.username in USERS:
        raise HTTPException(status_code=400, detail="Username already exists")

    for user_data in USERS.values():
        if user_data["email"] == request.email:
            raise HTTPException(status_code=400, detail="Email already registered")

    user_id = len(USERS) + 1
    USERS[request.username] = {
        "id": user_id,
        "username": request.username,
        "email": request.email,
        "password": hash_password(request.password),
        "created_at": datetime.utcnow().isoformat(),
    }

    token = create_token(request.username)
    return TokenResponse(
        access_token=token,
        username=request.username,
    )


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    """Login with username and password"""
    user = USERS.get(request.username)
    if not user or not verify_password(request.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = create_token(request.username)
    return TokenResponse(
        access_token=token,
        username=request.username,
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(token: str):
    """Refresh access token"""
    payload = decode_token(token)
    username = payload.get("sub")
    if username not in USERS:
        raise HTTPException(status_code=401, detail="User not found")

    new_token = create_token(username)
    return TokenResponse(access_token=new_token, username=username)


@router.get("/profile", response_model=UserProfile)
async def get_profile(token: str):
    """Get current user profile"""
    payload = decode_token(token)
    username = payload.get("sub")
    user = USERS.get(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return UserProfile(
        id=user["id"],
        username=user["username"],
        email=user["email"],
        created_at=user["created_at"],
    )
