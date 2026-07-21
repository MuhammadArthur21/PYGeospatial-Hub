# Additional database models per PYGeospatial.md Section 10.1
# Comments, Subscriptions, and Audit Logs

from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime, ForeignKey, JSON
from app.models.models import Base
from sqlalchemy.sql import func


class Comment(Base):
    """Comments on public scripts and tools"""
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    target_type = Column(String(50), nullable=False)  # 'script' | 'tool'
    target_id = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now())


class Subscription(Base):
    """User subscription/tier information"""
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    tier = Column(String(50), default="free")  # free | pro | team | enterprise
    started_at = Column(DateTime, server_default=func.now())
    expires_at = Column(DateTime, nullable=True)


class AuditLog(Base):
    """Security audit log for sandbox executions"""
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    execution_id = Column(Integer, ForeignKey("executions.id"), nullable=True)
    action = Column(String(100), nullable=False)
    detail = Column(JSON, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
