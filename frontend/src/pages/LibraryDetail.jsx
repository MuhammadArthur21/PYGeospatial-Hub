import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, BookOpen, PlayCircle, Code, Tag, Layers, Loader } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/Card'
import api from '@/services/api'

export default function LibraryDetail() {
  const { id } = useParams()
  const [lib, setLib] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(`/libraries/${id}`)
      .then((res) => {
        setLib(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const copyCode = () => {
    if (lib?.code_template) {
      navigator.clipboard.writeText(lib.code_template)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Loader size={32} className="animate-spin text-primary-500 mx-auto mb-4" />
        <p className="text-earth-500">Loading library...</p>
      </div>
    )
  }

  if (error || !lib) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-earth-900 dark:text-dark-text mb-4">Library Not Found</h2>
        <p className="text-earth-500 dark:text-dark-accent/60 mb-8">The library you're looking for doesn't exist.</p>
        <Link to="/libraries" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Libraries
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/libraries" className="inline-flex items-center gap-2 text-earth-500 dark:text-dark-accent/70 hover:text-primary-600 dark:hover:text-dark-text mb-6 transition-colors">
        <ArrowLeft size={16} />
        Back to Libraries
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-300 dark:from-dark-accent dark:to-dark-accent/50
                            flex items-center justify-center text-2xl text-white font-bold shadow-md">
                {lib.name?.[0] || '?'}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <CardTitle className="text-2xl">{lib.name}</CardTitle>
                  <span className={`badge ${
                    lib.difficulty === 'beginner' ? 'badge-beginner' :
                    lib.difficulty === 'intermediate' ? 'badge-intermediate' : 'badge-advanced'
                  }`}>
                    {lib.difficulty || 'N/A'}
                  </span>
                </div>
                <p className="text-sm text-earth-500 dark:text-dark-accent/60">v{lib.version || 'latest'}</p>
              </div>
            </CardHeader>
            <p className="text-earth-700 dark:text-dark-text/80 leading-relaxed">{lib.description}</p>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code size={18} className="text-primary-600 dark:text-dark-accent" />
                <CardTitle>Quick Start</CardTitle>
              </div>
              {lib.code_template && (
                <button onClick={copyCode} className="btn-ghost text-xs">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </CardHeader>
            <div className="code-area p-4 overflow-x-auto">
              <pre><code>{lib.code_template || '# Install: pip install ' + lib.name?.toLowerCase() || ''}</code></pre>
            </div>
            <div className="mt-4">
              <Link to={`/sandbox?library=${lib.id}`} className="btn-primary inline-flex items-center gap-2">
                <PlayCircle size={16} />
                Try in Sandbox
              </Link>
            </div>
          </Card>

          {lib.use_cases && lib.use_cases.length > 0 && (
            <Card>
              <CardHeader>
                <Layers size={18} className="text-primary-600 dark:text-dark-accent" />
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <div className="grid grid-cols-2 gap-3">
                {lib.use_cases.map((uc, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-earth-700 dark:text-dark-text/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-dark-accent" />
                    {uc}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <PlayCircle size={18} className="text-primary-600 dark:text-dark-accent" />
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              <Link to={`/sandbox?library=${lib.id}`} className="btn-primary w-full flex items-center justify-center gap-2">
                <PlayCircle size={16} />
                Try in Sandbox
              </Link>
              {lib.docs && (
                <a href={lib.docs} target="_blank" rel="noopener noreferrer"
                   className="btn-secondary w-full flex items-center justify-center gap-2">
                  <BookOpen size={16} />
                  Read Documentation
                  <ExternalLink size={14} />
                </a>
              )}
              {lib.pypi && (
                <a href={lib.pypi} target="_blank" rel="noopener noreferrer"
                   className="btn-ghost w-full flex items-center justify-center gap-2">
                  View on PyPI
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </Card>

          {lib.tags && lib.tags.length > 0 && (
            <Card>
              <CardHeader>
                <Tag size={18} className="text-primary-600 dark:text-dark-accent" />
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <div className="flex flex-wrap gap-2">
                {lib.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium
                    bg-primary-50 text-primary-700 dark:bg-dark-accent/15 dark:text-dark-accent border border-primary-200 dark:border-dark-accent/30">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
