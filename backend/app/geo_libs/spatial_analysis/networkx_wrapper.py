"""
NetworkX — Network analysis and graph theory for spatial networks.

Provides tools for analyzing the structure and properties
of spatial and non-spatial networks.
"""

from typing import Optional, Dict, List, Any


def shortest_path(
    edges: List[tuple],
    source: str,
    target: str,
    weight: str = "weight",
) -> Dict:
    """
    Find the shortest path between two nodes in a graph.

    Args:
        edges: List of (node_a, node_b, {weight: value}) tuples
        source: Source node ID
        target: Target node ID
        weight: Edge weight attribute name

    Returns:
        Dict with shortest path result
    """
    try:
        import networkx as nx

        G = nx.Graph()
        G.add_edges_from(edges)

        path = nx.shortest_path(G, source=source, target=target, weight=weight)
        length = nx.shortest_path_length(G, source=source, target=target, weight=weight)

        return {
            "status": "success",
            "path": path,
            "length": length,
            "nodes_visited": len(path),
        }

    except ImportError:
        return {"status": "error", "message": "NetworkX not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def graph_stats(edges: List[tuple]) -> Dict:
    """Calculate basic graph statistics"""
    try:
        import networkx as nx

        G = nx.Graph()
        G.add_edges_from(edges)

        return {
            "status": "success",
            "nodes": G.number_of_nodes(),
            "edges": G.number_of_edges(),
            "density": nx.density(G),
            "is_connected": nx.is_connected(G) if G.number_of_nodes() > 0 else False,
        }

    except ImportError:
        return {"status": "error", "message": "NetworkX not available"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
