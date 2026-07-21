import { useState, useRef } from 'react'
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet'
import { Layers, Box, Eye } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

const BASE_MAPS = {
  osm: {
    name: 'OpenStreetMap 2D',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
  },
  satellite: {
    name: 'Satelit Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Imagery',
  },
  topo: {
    name: '3D Terrain & Hillshade',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap contributors',
  },
}

export default function MapViewer({ geojsonData, height = '400px', center = [-6.2, 106.8], zoom = 5 }) {
  const mapRef = useRef(null)
  const [activeLayer, setActiveLayer] = useState('osm')
  const [is3DMode, setIs3DMode] = useState(false)

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const props = Object.entries(feature.properties)
        .map(([k, v]) => `<b>${k}:</b> ${v}`)
        .join('<br/>')
      layer.bindPopup(props)
    }

    if (typeof layer.setStyle === 'function') {
      if (feature.geometry?.type === 'Polygon' || feature.geometry?.type === 'MultiPolygon') {
        layer.setStyle({
          fillColor: is3DMode ? '#10B981' : '#546B41',
          fillOpacity: 0.3,
          color: is3DMode ? '#059669' : '#394A2B',
          weight: 2.5,
        })
      } else if (feature.geometry?.type === 'Point') {
        layer.setStyle({
          radius: 7,
          fillColor: '#3B82F6',
          fillOpacity: 0.85,
          color: '#1D4ED8',
          weight: 2,
        })
      }
    }
  }

  if (!geojsonData) {
    return (
      <div style={{ height }} className="w-full rounded-lg bg-earth-100 dark:bg-dark-surface flex flex-col items-center justify-center border border-earth-200 dark:border-dark-border p-6 text-center">
        <Box size={32} className="text-earth-400 dark:text-dark-accent/40 mb-2" />
        <p className="text-earth-600 dark:text-dark-accent/80 text-sm font-medium">Belum ada data geospasial</p>
        <p className="text-earth-400 dark:text-dark-accent/50 text-xs mt-1">Jalankan kode Python di Sandbox untuk melihat hasil peta/geometri interaktif</p>
      </div>
    )
  }

  return (
    <div style={{ height }} className="relative w-full rounded-lg overflow-hidden border border-earth-200 dark:border-dark-border group">
      {/* Top Map Layer Selector Bar */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-1.5 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md p-1 rounded-xl shadow-lg border border-earth-200 dark:border-dark-border">
        {Object.entries(BASE_MAPS).map(([key, map]) => (
          <button
            key={key}
            onClick={() => {
              setActiveLayer(key)
              if (key === 'topo') setIs3DMode(true)
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              activeLayer === key
                ? 'bg-primary-600 text-white dark:bg-dark-accent dark:text-dark-bg shadow-sm'
                : 'text-earth-600 dark:text-dark-accent/70 hover:bg-earth-100 dark:hover:bg-dark-border'
            }`}
          >
            {key === 'topo' ? <Box size={13} /> : <Layers size={13} />}
            {map.name}
          </button>
        ))}
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          key={activeLayer}
          attribution={BASE_MAPS[activeLayer].attribution}
          url={BASE_MAPS[activeLayer].url}
        />
        <GeoJSON
          key={JSON.stringify(geojsonData) + activeLayer}
          data={geojsonData}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  )
}
