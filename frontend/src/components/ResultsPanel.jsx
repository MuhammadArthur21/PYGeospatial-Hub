import { Terminal, XCircle, CheckCircle, Download, FileJson } from 'lucide-react'

export default function ResultsPanel({ output, type = 'text', geojsonData = null }) {
  const isError = type === 'error'

  const handleDownloadGeoJSON = () => {
    if (!geojsonData) return
    const blob = new Blob([JSON.stringify(geojsonData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pygeospatial_output_${Date.now()}.geojson`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-earth-400 dark:text-dark-accent/40 p-6">
        <Terminal size={32} className="mb-3 opacity-40" />
        <p className="text-sm">Click <kbd className="px-1.5 py-0.5 text-xs bg-earth-100 dark:bg-dark-border rounded font-mono">Run</kbd> to execute your code</p>
        <p className="text-xs mt-1 opacity-60">Output akan muncul di sini</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#1a1a2e] dark:bg-[#0d0d1a]">
      {/* Header bar */}
      <div className={`flex items-center justify-between px-3 py-1.5 text-xs border-b flex-shrink-0 ${
        isError
          ? 'border-rose-800/50 bg-rose-950/50 text-rose-400'
          : 'border-primary-900/40 bg-[#16213e]/80 text-primary-400'
      }`}>
        <div className="flex items-center gap-2">
          {isError
            ? <><XCircle size={12} /> Error</>
            : <><CheckCircle size={12} /> Output Execution</>
          }
        </div>

        {geojsonData && (
          <button
            onClick={handleDownloadGeoJSON}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-600/80 hover:bg-primary-500 text-white text-[11px] font-semibold transition-colors"
            title="Download hasil geometri sebagai file .geojson"
          >
            <Download size={12} /> Download GeoJSON
          </button>
        )}
      </div>

      {/* Output content */}
      <div className="flex-1 overflow-auto p-3">
        <pre className={`text-xs font-mono whitespace-pre-wrap leading-relaxed ${
          isError ? 'text-rose-300' : 'text-green-300'
        }`}>
          {output}
        </pre>
      </div>
    </div>
  )
}
