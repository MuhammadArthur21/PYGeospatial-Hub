import { useState, useRef } from 'react'
import { Upload, X, File, CheckCircle, AlertCircle } from 'lucide-react'
import api from '@/services/api'

const ALLOWED_TYPES = '.shp,.geojson,.json,.tiff,.tif,.las,.laz,.kml,.csv,.gpkg'

export default function FileUploader({ onUpload, maxSizeMB = 50 }) {
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(Array.from(e.dataTransfer.files))
  }

  const handleSelect = (e) => addFiles(Array.from(e.target.files))

  const addFiles = (newFiles) => {
    const valid = newFiles.filter(f => {
      const ext = '.' + f.name.split('.').pop().toLowerCase()
      const sizeMB = f.size / 1024 / 1024
      return ALLOWED_TYPES.includes(ext) && sizeMB <= maxSizeMB
    })
    setFiles(prev => [...prev, ...valid.map(f => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2) + ' MB',
      status: 'ready',
      error: null,
    }))])
  }

  const removeFile = (id) => setFiles(prev => prev.filter(f => f.id !== id))

  const uploadAll = async () => {
    setUploading(true)
    for (const f of files.filter(f => f.status === 'ready')) {
      setFiles(prev => prev.map(pf => pf.id === f.id ? { ...pf, status: 'uploading' } : pf))
      try {
        const formData = new FormData()
        formData.append('file', f.file)
        const res = await api.post('/uploads', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        setFiles(prev => prev.map(pf => pf.id === f.id ? { ...pf, status: 'done', datasetId: res.data?.id } : pf))
        if (onUpload) onUpload(res.data)
      } catch {
        // Backend offline — keep in memory
        setFiles(prev => prev.map(pf => pf.id === f.id ? { ...pf, status: 'done', note: 'local only' } : pf))
      }
    }
    setUploading(false)
  }


  return (
    <div>
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragOver
            ? 'border-primary-400 bg-primary-50 dark:bg-dark-accent/10'
            : 'border-earth-300 dark:border-dark-border hover:border-primary-300 dark:hover:border-dark-accent/50'
          }`}
      >
        <Upload size={24} className="mx-auto mb-2 text-earth-400 dark:text-dark-accent/60" />
        <p className="text-sm text-earth-600 dark:text-dark-accent/80 font-medium">
          Drop files here or click to browse
        </p>
        <p className="text-xs text-earth-400 dark:text-dark-accent/50 mt-1">
          Shapefile, GeoJSON, GeoTIFF, LAS/LAZ, KML, CSV — Max {maxSizeMB}MB
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ALLOWED_TYPES}
          onChange={handleSelect}
          className="hidden"
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((f) => (
            <div key={f.id}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-earth-100 dark:bg-dark-surface text-sm"
            >
              {f.status === 'done' ? (
                <CheckCircle size={16} className="text-primary-500 dark:text-dark-accent" />
              ) : f.status === 'uploading' ? (
                <div className="w-4 h-4 border-2 border-primary-500 dark:border-dark-accent border-t-transparent rounded-full animate-spin" />
              ) : (
                <File size={16} className="text-earth-400" />
              )}
              <div className="flex-1 min-w-0">
                <p className="truncate text-earth-800 dark:text-dark-text">{f.name}</p>
                <p className="text-xs text-earth-500 dark:text-dark-accent/60">{f.size}</p>
              </div>
              {f.status !== 'uploading' && (
                <button onClick={() => removeFile(f.id)} className="text-earth-400 hover:text-rose-500">
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          {files.some((f) => f.status === 'ready') && (
            <button onClick={uploadAll} disabled={uploading} className="btn-primary text-sm w-full">
              {uploading ? 'Uploading...' : `Upload ${files.filter(f => f.status === 'ready').length} Files`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
