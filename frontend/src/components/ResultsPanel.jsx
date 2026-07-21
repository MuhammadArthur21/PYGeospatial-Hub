import { Terminal, Map, Table, FileText } from 'lucide-react'
import MapViewer from './MapViewer'

export default function ResultsPanel({ output, type = 'text', geojsonData = null }) {
  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-earth-400 dark:text-dark-accent/50">
        <Terminal size={32} className="mb-2 opacity-50" />
        <p className="text-sm">Click "Run" to execute your code...</p>
      </div>
    )
  }

  const renderContent = () => {
    switch (type) {
      case 'map':
        return (
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-earth-500 dark:text-dark-accent/60 border-b border-earth-200 dark:border-dark-border">
              <Map size={14} />
              Map View
            </div>
            <div className="flex-1">
              <MapViewer geojsonData={geojsonData} height="100%" />
            </div>
          </div>
        )

      case 'table':
        return (
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2 text-xs text-earth-500 dark:text-dark-accent/60">
              <Table size={14} />
              Data Table
            </div>
            <pre className="text-sm text-earth-700 dark:text-dark-text/80 font-mono whitespace-pre-wrap overflow-auto max-h-full">
              {output}
            </pre>
          </div>
        )

      default:
        return (
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2 text-xs text-earth-500 dark:text-dark-accent/60">
              <FileText size={14} />
              Output
            </div>
            <pre className="text-sm text-earth-700 dark:text-dark-text/80 font-mono whitespace-pre-wrap overflow-auto max-h-full">
              {output}
            </pre>
          </div>
        )
    }
  }

  return (
    <div className="h-full overflow-hidden">
      {renderContent()}
    </div>
  )
}
