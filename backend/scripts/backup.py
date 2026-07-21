#!/usr/bin/env python
"""
PyGeospatial Hub - Backup Script (Section 15.4)
Creates daily database and file backups.
Run via cron: 0 2 * * * python backup.py
"""

import os
import shutil
import datetime
import subprocess
import sys

BACKUP_DIR = "backups"
DB_NAME = "pygeospatial_hub"
DB_USER = "pygeo"
DATA_DIRS = ["data/uploads", "data/metadata"]


def backup_database():
    """Backup PostgreSQL database"""
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{BACKUP_DIR}/db_{timestamp}.sql"

    os.makedirs(BACKUP_DIR, exist_ok=True)

    try:
        subprocess.run(
            ["pg_dump", "-U", DB_USER, "-h", "localhost", DB_NAME, "-f", filename],
            check=True,
            capture_output=True,
        )
        print(f"✓ Database backup: {filename}")
        return True
    except FileNotFoundError:
        print("⚠ pg_dump not found - database backup skipped")
        return False
    except subprocess.CalledProcessError as e:
        print(f"✗ Database backup failed: {e}")
        return False


def backup_files():
    """Backup uploaded files and metadata"""
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{BACKUP_DIR}/files_{timestamp}.tar.gz"

    os.makedirs(BACKUP_DIR, exist_ok=True)

    existing_dirs = [d for d in DATA_DIRS if os.path.exists(d)]
    if not existing_dirs:
        print("⚠ No data directories found - file backup skipped")
        return False

    try:
        subprocess.run(
            ["tar", "-czf", filename] + existing_dirs,
            check=True,
            capture_output=True,
        )
        print(f"✓ File backup: {filename}")
        return True
    except Exception as e:
        print(f"✗ File backup failed: {e}")
        return False


def cleanup_old(keep_days: int = 30):
    """Delete backups older than keep_days"""
    cutoff = datetime.datetime.now() - datetime.timedelta(days=keep_days)
    for f in os.listdir(BACKUP_DIR):
        fpath = os.path.join(BACKUP_DIR, f)
        mtime = datetime.datetime.fromtimestamp(os.path.getmtime(fpath))
        if mtime < cutoff:
            os.remove(fpath)
            print(f"  Removed old backup: {f}")


if __name__ == "__main__":
    print(f"=== PyGeospatial Backup ({datetime.datetime.now()}) ===")
    backup_database()
    backup_files()
    cleanup_old()
    print("=== Backup Complete ===")
