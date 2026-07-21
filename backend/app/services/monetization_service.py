# PyGeospatial Hub - Monetization Model (Section 18)
# Tier definitions for Free/Pro/Team/Enterprise

from typing import Dict, List, Optional


class MonetizationTier:
    """Monetization tier definition"""

    TIERS = {
        "free": {
            "name": "Free",
            "price_monthly": 0,
            "executions_per_day": 5,
            "max_file_size_mb": 10,
            "storage_mb": 50,
            "libraries": "basic",
            "features": ["Sandbox", "Library Index", "Basic Tools"],
        },
        "pro": {
            "name": "Pro",
            "price_monthly": 15,
            "executions_per_day": None,  # Unlimited
            "max_file_size_mb": 100,
            "storage_mb": 1024,
            "libraries": "all",
            "features": [
                "Unlimited executions",
                "Large datasets",
                "Workflow builder",
                "Priority support",
                "Export visualizations",
            ],
        },
        "team": {
            "name": "Team",
            "price_monthly": 45,
            "executions_per_day": None,
            "max_file_size_mb": 500,
            "storage_mb": 10240,
            "libraries": "all",
            "features": [
                "Everything in Pro",
                "Team workspace",
                "Shared datasets",
                "Private tools",
                "Collaboration",
                "Admin dashboard",
            ],
        },
        "enterprise": {
            "name": "Enterprise",
            "price_monthly": None,  # Custom pricing
            "executions_per_day": None,
            "max_file_size_mb": None,  # Custom
            "storage_mb": None,
            "libraries": "all + custom",
            "features": [
                "Everything in Team",
                "On-premise deployment",
                "SSO integration",
                "SLA guarantee",
                "Custom library integration",
                "Dedicated support",
            ],
        },
    }

    @classmethod
    def get_tier_info(cls, tier: str) -> Optional[Dict]:
        return cls.TIERS.get(tier)

    @classmethod
    def list_tiers(cls) -> List[Dict]:
        return [
            {
                "id": tier_id,
                **info,
                "is_current": tier_id == "free",
            }
            for tier_id, info in cls.TIERS.items()
        ]

    @classmethod
    def check_limit(cls, tier: str, action: str, current: int) -> bool:
        """Check if user has reached their tier limit"""
        info = cls.TIERS.get(tier)
        if not info:
            return False

        limits = {
            "execution": info["executions_per_day"],
            "file_size": info["max_file_size_mb"],
            "storage": info["storage_mb"],
        }

        limit = limits.get(action)
        if limit is None:  # Unlimited
            return True
        return current < limit
