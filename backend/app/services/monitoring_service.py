# PyGeospatial Hub - Prometheus + Grafana Monitoring Config
# Observability setup (Section 15.3)

PROMETHEUS_CONFIG = """
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'pygeospatial-backend'
    static_configs:
      - targets: ['backend:8000']
    metrics_path: '/metrics'

  - job_name: 'pygeospatial-redis'
    static_configs:
      - targets: ['redis:6379']

  - job_name: 'pygeospatial-postgres'
    static_configs:
      - targets: ['db:9187']
"""

GRAFANA_DATASOURCE = """
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
"""

GRAFANA_DASHBOARD = """
{
  "title": "PyGeospatial Hub Monitoring",
  "panels": [
    {"title": "API Requests", "type": "graph", "targets": [{"expr": "rate(http_requests_total[5m])"}]},
    {"title": "Sandbox Executions", "type": "stat", "targets": [{"expr": "sandbox_executions_total"}]},
    {"title": "Error Rate", "type": "graph", "targets": [{"expr": "rate(http_errors_total[5m])"}]},
    {"title": "Active Users", "type": "stat", "targets": [{"expr": "active_users"}]}
  ]
}
"""


def get_prometheus_config() -> str:
    return PROMETHEUS_CONFIG


def get_grafana_datasource() -> str:
    return GRAFANA_DATASOURCE


def get_grafana_dashboard() -> str:
    return GRAFANA_DASHBOARD
