import { useState } from 'react'
import { FileUp, ArrowRight, Download, RefreshCw, CheckCircle, Map, Layers, ShieldCheck } from 'lucide-react'
import MapViewer from '@/components/MapViewer'
import api from '@/services/api'

export default function Converter() {
  const [sourceFormat, setSourceFormat] = useState('geojson')
  const [targetFormat, setTargetFormat] = useState('kml')
  const [targetCrs, setTargetCrs] = useState('EPSG:4326')
  const [inputText, setInputText] = useState(`{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.8272, -6.1751]
      },
      "properties": {
        "name": "Monas Jakarta",
        "category": "Landmark"
      }
    }
  ]
}`)
  const [convertedResult, setConvertedResult] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [previewGeoJSON, setPreviewGeoJSON] = useState(null)

  // Local fallback: basic JS converter for offline use
  const localConvert = (data, source, target) => {
    try {
      const parsed = JSON.parse(data)
      if (source === 'geojson' && target === 'geojson') {
        return { status: 'success', summary: 'Format sama (GeoJSON → GeoJSON). Tidak ada perubahan.', result: JSON.stringify(parsed, null, 2) }
      }
      if (source === 'geojson' && target === 'kml') {
        const features = parsed.type === 'FeatureCollection' ? parsed.features : [parsed]
        let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Converted from GeoJSON</name>\n`
        features.forEach((f, i) => {
          const coords = f.geometry?.coordinates || []
          const props = f.properties || {}
          kml += `    <Placemark>
      <name>${props.name || `Feature ${i+1}`}</name>
      <description>${JSON.stringify(props)}</description>
      <Point>
        <coordinates>${coords[0]},${coords[1]},0</coordinates>
      </Point>
    </Placemark>\n`
        })
        kml += `  </Document>\n</kml>`
        return { status: 'success', summary: `Konversi lokal: ${features.length} fitur dari GeoJSON ke KML.`, result: kml }
      }
      return { status: 'error', summary: `Konversi ${source} → ${target} belum tersedia offline. Jalankan backend untuk konversi lengkap.` }
    } catch {
      return { status: 'error', summary: 'Gagal parse input JSON. Pastikan format GeoJSON valid.' }
    }
  }

  const handleConvert = async () => {
    setIsConverting(true)
    let result

    try {
      const res = await api.post('/converter/convert', {
        source_format: sourceFormat,
        target_format: targetFormat,
        data: inputText,
        target_crs: targetCrs
      })
      result = res.data
    } catch {
      // Backend offline — use local converter
      result = localConvert(inputText, sourceFormat, targetFormat)
    }

    setConvertedResult(result)

    try {
      const parsed = JSON.parse(inputText)
      if (parsed.type === 'FeatureCollection' || parsed.type === 'Feature') {
        setPreviewGeoJSON(parsed)
      } else {
        setPreviewGeoJSON(null)
      }
    } catch {
      setPreviewGeoJSON(null)
    }

    setIsConverting(false)
  }

  const handleDownload = () => {
    if (!convertedResult?.result) return
    const ext = targetFormat === 'geojson' ? 'geojson' : targetFormat === 'kml' ? 'kml' : 'txt'
    const blob = new Blob([convertedResult.result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `converted_spatial_${Date.now()}.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-1">
          <span className="gradient-text">Spatial Format</span> Converter
        </h1>
        <p className="text-earth-500 dark:text-dark-accent/60">
          Konversi format data spasial vektor (GeoJSON, KML) dan CRS proyeksi secara instan.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-lg font-bold text-earth-900 dark:text-dark-text flex items-center gap-2">
              <Layers size={18} className="text-primary-600 dark:text-dark-accent" />
              Konfigurasi Konversi
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-earth-600 dark:text-dark-accent/80 mb-1.5">Format Asal (Input)</label>
                <select value={sourceFormat} onChange={(e) => setSourceFormat(e.target.value)} className="select-field w-full text-xs">
                  <option value="geojson">GeoJSON (.geojson)</option>
                  <option value="kml">KML (.kml)</option>
                  <option value="csv">CSV (Lat / Lon)</option>
                  <option value="wkt">WKT (Well-Known Text)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-earth-600 dark:text-dark-accent/80 mb-1.5">Format Target (Output)</label>
                <select value={targetFormat} onChange={(e) => setTargetFormat(e.target.value)} className="select-field w-full text-xs">
                  <option value="kml">KML (.kml)</option>
                  <option value="geojson">GeoJSON (.geojson)</option>
                  <option value="csv">CSV (Lat / Lon)</option>
                  <option value="wkt">WKT (Well-Known Text)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-earth-600 dark:text-dark-accent/80 mb-1.5">Proyeksi Koordinat Target (CRS)</label>
              <select value={targetCrs} onChange={(e) => setTargetCrs(e.target.value)} className="select-field w-full text-xs">
                <option value="EPSG:4326">WGS 84 (EPSG:4326 - Derajat Lat/Lon)</option>
                <option value="EPSG:3857">Web Mercator (EPSG:3857 - Meter)</option>
                <option value="EPSG:23830">UTM Zone 48S Indonesia (EPSG:23830)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-earth-600 dark:text-dark-accent/80 mb-1.5">Data Spasial Input</label>
              <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} rows={8} className="font-mono text-xs input-field w-full leading-relaxed" placeholder="Paste konten GeoJSON / WKT / CSV di sini..." />
            </div>

            <button onClick={handleConvert} disabled={isConverting} className="btn-primary w-full py-2.5 flex items-center justify-center gap-2 text-sm">
              {isConverting ? <RefreshCw size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              {isConverting ? 'Mengonversi Format...' : 'Jalankan Konversi'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          {convertedResult && (
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-earth-900 dark:text-dark-text flex items-center gap-2">
                  <CheckCircle size={18} className="text-primary-600 dark:text-dark-accent" />
                  Hasil Konversi
                </h2>
                {convertedResult.result && (
                  <button onClick={handleDownload} className="btn-secondary text-xs flex items-center gap-1.5 px-3 py-1.5">
                    <Download size={14} /> Download File
                  </button>
                )}
              </div>

              <div className="p-3 rounded-lg bg-primary-50 dark:bg-dark-accent/10 border border-primary-100 dark:border-dark-accent/20 text-xs text-primary-800 dark:text-dark-accent">
                {convertedResult.summary}
              </div>

              {convertedResult.result && (
                <div>
                  <textarea readOnly value={convertedResult.result} rows={6} className="font-mono text-xs input-field w-full bg-earth-50 dark:bg-dark-bg/60" />
                </div>
              )}
            </div>
          )}

          {previewGeoJSON && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-earth-900 dark:text-dark-text flex items-center gap-2 mb-4">
                <Map size={18} className="text-primary-600 dark:text-dark-accent" />
                Preview Peta
              </h2>
              <div className="h-64 rounded-lg overflow-hidden border border-earth-200 dark:border-dark-border">
                <MapViewer geojsonData={previewGeoJSON} height="100%" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
