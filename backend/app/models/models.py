# PyGeospatial Hub - SQLAlchemy Database Models

from sqlalchemy import create_engine, Column, Integer, String, Text, Boolean, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func
from geoalchemy2 import Geometry

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    tools = relationship("Tool", back_populates="creator")
    executions = relationship("Execution", back_populates="user")
    datasets = relationship("SpatialDataset", back_populates="user")
    scripts = relationship("SavedScript", back_populates="user")


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    icon = Column(String(50))
    description = Column(Text)

    libraries = relationship("Library", back_populates="category")


class Library(Base):
    __tablename__ = "libraries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    description = Column(Text)
    documentation_url = Column(String(500))
    pypi_url = Column(String(500))
    difficulty_level = Column(String(50))
    tags = Column(JSON)
    created_at = Column(DateTime, server_default=func.now())

    category = relationship("Category", back_populates="libraries")


class Tool(Base):
    __tablename__ = "tools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    library_ids = Column(JSON)
    description = Column(Text)
    code = Column(Text)
    created_by = Column(Integer, ForeignKey("users.id"))
    is_public = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())

    creator = relationship("User", back_populates="tools")


class Execution(Base):
    __tablename__ = "executions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    code = Column(Text, nullable=False)
    result = Column(JSON)
    status = Column(String(50), default="pending")
    execution_time = Column(Float)
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="executions")


class SpatialDataset(Base):
    __tablename__ = "spatial_datasets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(255))
    file_path = Column(String(500))
    file_type = Column(String(50))
    geometry = Column(Geometry(geometry_type="GEOMETRY", srid=4326))
    metadata = Column(JSON)
    uploaded_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="datasets")


class SavedScript(Base):
    __tablename__ = "saved_scripts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255))
    code = Column(Text)
    description = Column(Text)
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="scripts")
