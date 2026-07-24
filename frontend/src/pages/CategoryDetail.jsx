import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { getCategories, getAllLibraries } from '@/data/librariesData'

export default function CategoryDetail() {
  const { id } = useParams()
  const [cat, setCat] = useState(null)
  const [libs, setLibs] = useState([])

  useEffect(() => {
    const cats = getCategories()
    const found = cats.find(c => c.id === id)
    if (found) {
      setCat(found)
      const allLibs = getAllLibraries()
      setLibs(allLibs.filter(l => l.category_id === id))
    }
  }, [id])

  if (!cat) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-earth-900 dark:text-dark-text mb-4">Category Not Found</h2>
        <p className="text-earth-500 dark:text-dark-accent/60 mb-6">Kategori dengan ID "{id}" tidak ditemukan.</p>
        <Link to="/categories" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Categories
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/categories" className="inline-flex items-center gap-2 text-earth-500 dark:text-dark-accent/70 hover:text-primary-600 dark:hover:text-dark-text mb-6 transition-colors text-sm">
        <ArrowLeft size={16} />
        All Categories
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-300 
                      flex items-center justify-center text-2xl shadow-md">
          {cat.icon || '📦'}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text">{cat.name}</h1>
          <p className="text-earth-500 dark:text-dark-accent/60">{cat.description} — {cat.count} libraries</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {libs.map((lib) => (
          <Link key={lib.id} to={`/libraries/${lib.id}`}>
            <Card hover>
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-sage-100 dark:from-dark-accent/20 dark:to-dark-accent/10
                              flex items-center justify-center text-lg text-primary-700 dark:text-dark-accent font-semibold">
                  {lib.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="truncate">{lib.name}</CardTitle>
                  <span className={`badge ${
                    lib.difficulty === 'beginner' ? 'badge-beginner' :
                    lib.difficulty === 'intermediate' ? 'badge-intermediate' : 'badge-advanced'
                  }`}>
                    {lib.difficulty}
                  </span>
                </div>
              </CardHeader>
              <CardDescription>{lib.description?.slice(0, 80)}{lib.description?.length > 80 ? '...' : ''}</CardDescription>
            </Card>
          </Link>
        ))}
        {libs.length === 0 && (
          <div className="col-span-full text-center py-12">
            <BookOpen size={48} className="mx-auto text-earth-300 dark:text-dark-accent/30 mb-4" />
            <p className="text-earth-500 dark:text-dark-accent/60">No libraries in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
