import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

const categories = [
  { id: 'core_geospatial', name: 'Core Geospatial', icon: '📍', description: 'Fundamental geospatial data handling', count: 6, color: 'from-primary-500 to-primary-300' },
  { id: 'remote_sensing', name: 'Remote Sensing', icon: '🛰️', description: 'Satellite imagery and raster analysis', count: 5, color: 'from-sage-500 to-sage-300' },
  { id: 'web_mapping', name: 'Web Mapping', icon: '🗺️', description: 'Interactive maps and web visualization', count: 4, color: 'from-primary-600 to-sage-400' },
  { id: 'spatial_analysis', name: 'Spatial Analysis', icon: '📐', description: 'Statistical and network spatial analysis', count: 5, color: 'from-earth-600 to-earth-400' },
  { id: 'visualization', name: 'Visualization', icon: '📊', description: 'Geospatial data visualization tools', count: 4, color: 'from-primary-400 to-sage-300' },
  { id: 'geocoding_routing', name: 'Geocoding & Routing', icon: '📍', description: 'Address geocoding and route planning', count: 3, color: 'from-sage-400 to-sage-200' },
  { id: 'databases', name: 'Databases', icon: '🗄️', description: 'Spatial databases and ORM', count: 3, color: 'from-earth-500 to-earth-300' },
  { id: 'point_cloud_lidar', name: 'Point Cloud & LiDAR', icon: '☁️', description: '3D point cloud data processing', count: 2, color: 'from-primary-500 to-sage-400' },
  { id: 'utilities', name: 'Utilities', icon: '🔧', description: 'Geospatial utility libraries', count: 4, color: 'from-earth-400 to-earth-200' },
]

export default function CategoriesView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-2">
          Library <span className="gradient-text">Categories</span>
        </h1>
        <p className="text-earth-500 dark:text-dark-accent/60">
          Browse geospatial libraries by category
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/libraries?category=${cat.id}`}>
            <Card hover className="h-full group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} 
                              flex items-center justify-center text-xl shadow-md`}>
                  {cat.icon}
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
