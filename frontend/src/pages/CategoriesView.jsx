import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { getCategories } from '@/data/librariesData'

const CAT_COLORS = [
  'from-primary-500 to-primary-300',
  'from-sage-500 to-sage-300',
  'from-primary-600 to-sage-400',
  'from-earth-600 to-earth-400',
  'from-primary-400 to-sage-300',
  'from-sage-400 to-sage-200',
  'from-earth-500 to-earth-300',
  'from-primary-500 to-sage-400',
  'from-purple-500 to-primary-300',
  'from-earth-400 to-earth-200',
]

const CAT_ICONS = ['📍','🛰️','🗺️','📐','📊','📍','🗄️','☁️','🤖','🔧']

export default function CategoriesView() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const cats = getCategories()
    setCategories(cats.map((c, i) => ({
      ...c,
      icon: c.icon || CAT_ICONS[i % CAT_ICONS.length],
      color: CAT_COLORS[i % CAT_COLORS.length],
    })))
  }, [])

  const totalLibs = categories.reduce((s, c) => s + c.count, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-2">
          Library <span className="gradient-text">Categories</span>
        </h1>
        <p className="text-earth-500 dark:text-dark-accent/60">
          Browse geospatial libraries by category — {totalLibs} total libraries
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/libraries?category=${cat.id}`}>
            <Card hover className="h-full group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} 
                              flex items-center justify-center text-xl shadow-md`}>
                  {cat.icon || '📦'}
                </div>
                <div className="flex-1">
                  <CardTitle>{cat.name}</CardTitle>
                  <span className="text-xs text-earth-400 dark:text-dark-accent/50">{cat.count} libraries</span>
                </div>
              </CardHeader>
              <CardDescription>{cat.description}</CardDescription>
              <div className="mt-3 flex items-center gap-1 text-primary-600 dark:text-dark-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Browse Category
                <ChevronRight size={14} />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
