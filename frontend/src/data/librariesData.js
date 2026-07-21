/**
 * Static fallback data from libraries_registry.json
 * Digunakan saat backend API tidak tersedia.
 */
export const LIBRARIES_REGISTRY = {
  categories: [
    {
      id: 'core_geospatial', name: 'Core Geospatial', icon: '📍',
      description: 'Fundamental geospatial data handling libraries',
      libraries: [
        { id: 'shapely', name: 'Shapely', version: '2.1.0', description: 'Geometric operations on planar features', docs: 'https://shapely.readthedocs.io/', pypi: 'https://pypi.org/project/Shapely/', tags: ['geometry', 'vector'], difficulty: 'beginner', use_cases: ['Buffer geometry', 'Intersect shapes', 'Simplify polygons'] },
        { id: 'geopandas', name: 'GeoPandas', version: '1.0.1', description: 'Extends pandas to support geospatial data operations', docs: 'https://geopandas.readthedocs.io/', pypi: 'https://pypi.org/project/geopandas/', tags: ['dataframe', 'vector', 'analysis'], difficulty: 'intermediate', use_cases: ['Spatial join', 'Choropleth maps', 'Data aggregation'] },
        { id: 'rasterio', name: 'Rasterio', version: '1.4.1', description: 'Professional raster data I/O library built on GDAL', docs: 'https://rasterio.readthedocs.io/', pypi: 'https://pypi.org/project/rasterio/', tags: ['raster', 'io', 'satellite', 'tiff'], difficulty: 'intermediate', use_cases: ['Read satellite imagery', 'Clip raster', 'Reproject raster'] },
        { id: 'fiona', name: 'Fiona', version: '1.9.6', description: 'Read and write vector spatial file formats', docs: 'https://fiona.readthedocs.io/', pypi: 'https://pypi.org/project/fiona/', tags: ['io', 'vector', 'shapefile', 'geojson'], difficulty: 'intermediate', use_cases: ['Read shapefile', 'Write GeoJSON', 'Format conversion'] },
        { id: 'pyproj', name: 'Pyproj', version: '3.6.1', description: 'Cartographic transformations and coordinate system operations', docs: 'https://pyproj.readthedocs.io/', pypi: 'https://pypi.org/project/pyproj/', tags: ['crs', 'projection', 'transformation'], difficulty: 'beginner', use_cases: ['Reproject coordinates', 'CRS transformation', 'Geodesic distance'] },
        { id: 'gdal', name: 'GDAL', version: '3.8.2', description: 'Geospatial Data Abstraction Library for raster and vector', docs: 'https://gdal.org/', pypi: 'https://pypi.org/project/GDAL/', tags: ['raster', 'vector', 'format-conversion'], difficulty: 'advanced', use_cases: ['Format conversion', 'Raster warping', 'Data extraction'] },
      ],
    },
    {
      id: 'remote_sensing', name: 'Remote Sensing & Raster', icon: '🛰️',
      description: 'Satellite imagery and raster data processing',
      libraries: [
        { id: 'satpy', name: 'Satpy', version: '0.51.0', description: 'Python library for reading and manipulating satellite data', docs: 'https://satpy.readthedocs.io/', pypi: 'https://pypi.org/project/satpy/', tags: ['satellite', 'imagery', 'band'], difficulty: 'advanced', use_cases: ['Read satellite data', 'Composite imagery', 'Band manipulation'] },
        { id: 'sentinelsat', name: 'SentinelSat', version: '1.1.1', description: 'Search and download Sentinel satellite imagery', docs: 'https://sentinelsat.readthedocs.io/', pypi: 'https://pypi.org/project/sentinelsat/', tags: ['sentinel', 'esa', 'download'], difficulty: 'intermediate', use_cases: ['Search satellite imagery', 'Download Sentinel data', 'Automated acquisition'] },
        { id: 'rasterstats', name: 'Rasterstats', version: '0.19.0', description: 'Summarize raster data based on vector geometries', docs: 'https://pythonhosted.org/rasterstats/', pypi: 'https://pypi.org/project/rasterstats/', tags: ['zonal', 'statistics', 'vector-raster'], difficulty: 'intermediate', use_cases: ['Zonal statistics', 'Extract raster values', 'Summary by polygon'] },
        { id: 'earthpy', name: 'EarthPy', version: '0.9.4', description: 'A collection of functions for working with spatial data', docs: 'https://earthpy.readthedocs.io/', pypi: 'https://pypi.org/project/earthpy/', tags: ['education', 'plot', 'raster'], difficulty: 'beginner', use_cases: ['Plot raster bands', 'Stack bands', 'Hillshade'] },
      ],
    },
    {
      id: 'web_mapping', name: 'Web Mapping & Visualization', icon: '🗺️',
      description: 'Interactive maps and web-based visualization',
      libraries: [
        { id: 'folium', name: 'Folium', version: '0.18.0', description: 'Create interactive Leaflet maps from Python data', docs: 'https://python-visualization.github.io/folium/', pypi: 'https://pypi.org/project/folium/', tags: ['map', 'leaflet', 'interactive'], difficulty: 'beginner', use_cases: ['Create interactive maps', 'Plot GeoJSON data', 'Add map layers'] },
        { id: 'ipyleaflet', name: 'ipyleaflet', version: '0.19.0', description: 'Interactive Leaflet maps for Jupyter notebooks', docs: 'https://ipyleaflet.readthedocs.io/', pypi: 'https://pypi.org/project/ipyleaflet/', tags: ['jupyter', 'map', 'interactive', 'widget'], difficulty: 'intermediate', use_cases: ['Notebook maps', 'Widget integration', 'Real-time mapping'] },
        { id: 'keplergl', name: 'Kepler.gl', version: '0.3.2', description: 'High-performance web-based geospatial visualization', docs: 'https://docs.kepler.gl/', pypi: 'https://pypi.org/project/keplergl/', tags: ['visualization', 'big-data', '3d'], difficulty: 'intermediate', use_cases: ['Large dataset viz', '3D mapping', 'Spatial analysis'] },
        { id: 'mapboxgl-jupyter', name: 'Mapboxgl-Jupyter', version: '0.7.1', description: 'Mapbox GL JS for Jupyter notebooks and Python', docs: 'https://github.com/mapbox/mapboxgl-jupyter', pypi: 'https://pypi.org/project/mapboxgl/', tags: ['mapbox', 'jupyter', '3d'], difficulty: 'intermediate', use_cases: ['Mapbox tiles', '3D extrusion', 'Custom styles'] },
      ],
    },
    {
      id: 'spatial_analysis', name: 'Spatial Analysis', icon: '📐',
      description: 'Statistical and network spatial analysis',
      libraries: [
        { id: 'pysal', name: 'PySAL', version: '2024.1', description: 'Python Spatial Analysis Library for geospatial data science', docs: 'https://pysal.org/', pypi: 'https://pypi.org/project/pysal/', tags: ['analysis', 'statistics', 'spatial'], difficulty: 'advanced', use_cases: ['Spatial autocorrelation', 'Cluster analysis', 'Spatial regression'] },
        { id: 'osmnx', name: 'OSMnx', version: '1.9.3', description: 'Download and analyze OpenStreetMap street networks', docs: 'https://osmnx.readthedocs.io/', pypi: 'https://pypi.org/project/osmnx/', tags: ['osm', 'network', 'street'], difficulty: 'advanced', use_cases: ['Download street networks', 'Network analysis', 'Urban morphology'] },
        { id: 'networkx', name: 'NetworkX', version: '3.3', description: 'Network analysis and graph theory for spatial networks', docs: 'https://networkx.org/', pypi: 'https://pypi.org/project/networkx/', tags: ['graph', 'network', 'topology'], difficulty: 'intermediate', use_cases: ['Shortest path', 'Network centrality', 'Graph analysis'] },
        { id: 'rtree', name: 'Rtree', version: '1.2.0', description: 'R-tree spatial indexing for fast spatial queries', docs: 'https://rtree.readthedocs.io/', pypi: 'https://pypi.org/project/Rtree/', tags: ['index', 'spatial', 'performance'], difficulty: 'advanced', use_cases: ['Spatial indexing', 'Nearest neighbor', 'Intersection queries'] },
        { id: 'scipy', name: 'SciPy Spatial', version: '1.14.0', description: 'Scientific computing with spatial distance and Delaunay', docs: 'https://scipy.org/', pypi: 'https://pypi.org/project/scipy/', tags: ['science', 'distance', 'delaunay'], difficulty: 'intermediate', use_cases: ['Voronoi diagrams', 'Nearest neighbor', 'Spatial statistics'] },
      ],
    },
    {
      id: 'visualization', name: 'Visualization', icon: '📊',
      description: 'Geospatial data visualization tools',
      libraries: [
        { id: 'matplotlib', name: 'Matplotlib', version: '3.9.2', description: 'Comprehensive plotting and visualization library', docs: 'https://matplotlib.org/', pypi: 'https://pypi.org/project/matplotlib/', tags: ['plot', 'chart', 'static'], difficulty: 'beginner', use_cases: ['Create plots', 'Data visualization', 'Publication figures'] },
        { id: 'plotly', name: 'Plotly', version: '5.24.1', description: 'Interactive graphing library with choropleth and scatter maps', docs: 'https://plotly.com/python/', pypi: 'https://pypi.org/project/plotly/', tags: ['interactive', 'chart', 'web', 'choropleth'], difficulty: 'beginner', use_cases: ['Interactive charts', 'Choropleth maps', 'Scatter maps'] },
        { id: 'cartopy', name: 'Cartopy', version: '0.23.0', description: 'Map projection and geospatial data visualization', docs: 'https://scitools.org.uk/cartopy/', pypi: 'https://pypi.org/project/cartopy/', tags: ['map', 'projection', 'visualization'], difficulty: 'intermediate', use_cases: ['Map projections', 'Coastline plotting', 'Thematic maps'] },
        { id: 'contextily', name: 'Contextily', version: '1.6.0', description: 'Add background tile maps to matplotlib/geopandas plots', docs: 'https://contextily.readthedocs.io/', pypi: 'https://pypi.org/project/contextily/', tags: ['basemap', 'tiles', 'background'], difficulty: 'beginner', use_cases: ['Add basemaps', 'Context tiles', 'Static maps'] },
        { id: 'geoplot', name: 'Geoplot', version: '0.5.1', description: 'High-level geospatial plotting library', docs: 'https://residentmario.github.io/geoplot/', pypi: 'https://pypi.org/project/geoplot/', tags: ['plot', 'high-level', 'choropleth'], difficulty: 'beginner', use_cases: ['KDE plots', 'Choropleth', 'Cartogram'] },
      ],
    },
    {
      id: 'geocoding_routing', name: 'Geocoding & Routing', icon: '📍',
      description: 'Address geocoding and route optimization',
      libraries: [
        { id: 'geopy', name: 'GeoPy', version: '2.4.0', description: 'Python geocoding toolbox supporting multiple providers', docs: 'https://geopy.readthedocs.io/', pypi: 'https://pypi.org/project/geopy/', tags: ['geocoding', 'address', 'coordinates'], difficulty: 'beginner', use_cases: ['Address geocoding', 'Reverse geocoding', 'Distance calculation'] },
        { id: 'openrouteservice', name: 'OpenRouteService', version: '1.1.2', description: 'Python client for OpenRouteService directions API', docs: 'https://openrouteservice-py.readthedocs.io/', pypi: 'https://pypi.org/project/openrouteservice/', tags: ['routing', 'directions', 'isochrone'], difficulty: 'intermediate', use_cases: ['Route optimization', 'Isochrones', 'Directions'] },
        { id: 'geocoder', name: 'Geocoder', version: '1.38.1', description: 'Simple and consistent geocoding library', docs: 'https://geocoder.readthedocs.io/', pypi: 'https://pypi.org/project/geocoder/', tags: ['geocoding', 'simple', 'multiple-providers'], difficulty: 'beginner', use_cases: ['IP geocoding', 'Address lookup', 'Batch geocoding'] },
      ],
    },
    {
      id: 'databases', name: 'Databases', icon: '🗄️',
      description: 'Spatial database connectivity and ORM',
      libraries: [
        { id: 'geoalchemy2', name: 'GeoAlchemy2', version: '0.15.1', description: 'SQLAlchemy GIS extension for spatial databases', docs: 'https://geoalchemy-2.readthedocs.io/', pypi: 'https://pypi.org/project/GeoAlchemy2/', tags: ['orm', 'sqlalchemy', 'postgis'], difficulty: 'advanced', use_cases: ['Spatial ORM', 'PostGIS queries', 'GIS models'] },
        { id: 'psycopg2', name: 'Psycopg2', version: '2.9.9', description: 'PostgreSQL database adapter for Python', docs: 'https://www.psycopg.org/docs/', pypi: 'https://pypi.org/project/psycopg2/', tags: ['database', 'postgresql', 'sql'], difficulty: 'intermediate', use_cases: ['Direct SQL queries', 'Database connection', 'Data ingestion'] },
        { id: 'spatialite', name: 'pysqlite-binary', version: '0.4.6', description: 'SpatiaLite — spatial extension for SQLite', docs: 'https://www.gaia-gis.it/gaia-sins/spatialite-sql-5.1.0.html', pypi: 'https://pypi.org/project/pysqlite-binary/', tags: ['sqlite', 'spatial', 'lightweight'], difficulty: 'intermediate', use_cases: ['Lightweight spatial DB', 'Offline GIS', 'Embedded DB'] },
      ],
    },
    {
      id: 'point_cloud_lidar', name: 'Point Cloud & LiDAR', icon: '☁️',
      description: '3D point cloud data processing',
      libraries: [
        { id: 'laspy', name: 'Laspy', version: '2.5.4', description: 'Read and write LAS/LAZ LiDAR point cloud files', docs: 'https://laspy.readthedocs.io/', pypi: 'https://pypi.org/project/laspy/', tags: ['lidar', 'point-cloud', 'las'], difficulty: 'intermediate', use_cases: ['Read LAS files', 'Point cloud manipulation', 'LiDAR processing'] },
        { id: 'pdal', name: 'PDAL Python', version: '3.0.2', description: 'Point Data Abstraction Library for point cloud processing', docs: 'https://pdal.io/', pypi: 'https://pypi.org/project/pdal/', tags: ['pipeline', 'lidar', 'filter'], difficulty: 'advanced', use_cases: ['Point cloud filtering', 'LiDAR segmentation', 'Classification'] },
        { id: 'open3d', name: 'Open3D', version: '0.18.0', description: '3D data processing library for point clouds and meshes', docs: 'http://www.open3d.org/docs/', pypi: 'https://pypi.org/project/open3d/', tags: ['3d', 'mesh', 'point-cloud', 'visualization'], difficulty: 'advanced', use_cases: ['3D visualization', 'Surface reconstruction', 'ICP registration'] },
      ],
    },
    {
      id: 'utilities', name: 'Utilities', icon: '🔧',
      description: 'Geospatial utility libraries',
      libraries: [
        { id: 'haversine', name: 'Haversine', version: '2.8.0', description: 'Calculate great-circle distances between geographic points', docs: 'https://pypi.org/project/haversine/', pypi: 'https://pypi.org/project/haversine/', tags: ['distance', 'coordinates', 'math'], difficulty: 'beginner', use_cases: ['Distance calculation', 'Coordinate math', 'Quick measurement'] },
        { id: 'geojson', name: 'Geojson', version: '3.1.0', description: 'Python bindings and encoding/decoding for GeoJSON', docs: 'https://github.com/jazzband/geojson', pypi: 'https://pypi.org/project/geojson/', tags: ['geojson', 'serialization', 'format'], difficulty: 'beginner', use_cases: ['Create GeoJSON', 'Validate GeoJSON', 'Geometry manipulation'] },
        { id: 's2sphere', name: 'S2Sphere', version: '0.4.0', description: 'S2 geometry library for spherical computations', docs: 'https://s2sphere.readthedocs.io/', pypi: 'https://pypi.org/project/s2sphere/', tags: ['sphere', 'earth', 's2'], difficulty: 'advanced', use_cases: ['Spatial indexing on sphere', 'Cell covering', 'Nearby search'] },
        { id: 'pygeodesy', name: 'PyGeodesy', version: '24.9.7', description: 'Geodesy and geomatics library for Python', docs: 'https://mrJean1.github.io/PyGeodesy/', pypi: 'https://pypi.org/project/PyGeodesy/', tags: ['geodesy', 'ellipsoid', 'earth'], difficulty: 'advanced', use_cases: ['Ellipsoid calculations', 'Datum transformations', 'Geodetic math'] },
        { id: 'geomet', name: 'Geomet', version: '1.1.0', description: 'Convert GeoJSON to WKT/WKB and back', docs: 'https://github.com/geomet/geomet', pypi: 'https://pypi.org/project/geomet/', tags: ['wkt', 'wkb', 'conversion'], difficulty: 'beginner', use_cases: ['WKT to GeoJSON', 'WKB parsing', 'Geometry conversion'] },
      ],
    },
  ],
}

/** Flatten all libraries from registry into a single list */
export function getAllLibraries() {
  return LIBRARIES_REGISTRY.categories.flatMap(cat =>
    cat.libraries.map(lib => ({
      ...lib,
      category: cat.name,
      category_id: cat.id,
      category_icon: cat.icon,
    }))
  )
}

/** Get a library by ID */
export function getLibraryById(id) {
  return getAllLibraries().find(lib => lib.id === id) || null
}

/** Get all categories */
export function getCategories() {
  return LIBRARIES_REGISTRY.categories.map(({ id, name, icon, description, libraries }) => ({
    id, name, icon, description, count: libraries.length,
  }))
}

/** Search libraries */
export function searchLibraries({ query = '', category = '', difficulty = '' } = {}) {
  let libs = getAllLibraries()
  if (query) {
    const q = query.toLowerCase()
    libs = libs.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.tags.some(t => t.toLowerCase().includes(q))
    )
  }
  if (category) libs = libs.filter(l => l.category_id === category)
  if (difficulty) libs = libs.filter(l => l.difficulty === difficulty)
  return libs
}
