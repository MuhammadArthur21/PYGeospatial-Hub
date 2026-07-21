import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icon path issue
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

export default function MapViewer({ geojsonData, height = '400px', center = [-6.2, 106.8], zoom = 5 }) {
  const mapRef = useRef(null)

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const props = Object.entries(feature.properties)
        .map(([k, v]) => `<b>${k}:</b> ${v}`)
        .join('<br/>')
      layer.bindPopup(props)
    }

    // Style based on geometry type
    if (feature.geometry?.type === 'Polygon' || feature.geometry?.type === 'MultiPolygon') {
      layer.setStyle({
        fillColor: '#546B41',
        fillOpacity: 0.2,
        color: '#546B41',
        weight: 2,
        opacity: 0.8,
      })
    } else if (feature.geometry?.type === 'Point') {
      layer.setStyle({
        radius: 6,
        fillColor: '#728A58',
        fillOpacity: 0.8,
        color: '#435635',
        weight: 2,
      })
    }
  }

  if (!geojsonData) {
    return (
      <div
        style={{ height }}
        className="w-full rounded-lg bg-earth-100 dark:bg-dark-surface flex items-center justify-center"
      >
        <p className="text-earth-500 dark:text-dark-accent/60 text-sm">
          No map data available. Run code to see results.
        </p>
      </div>
    )
  }

  return (
    <div style={{ height }} className="w-full rounded-lg overflow-hidden border border-earth-200 dark:border-dark-border">
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          key={JSON.stringify(geojsonData)}
          data={geojsonData}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  )
}
