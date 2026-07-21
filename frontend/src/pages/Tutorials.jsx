import { BookOpen, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

const tutorials = [
  {
    id: 'getting-started', title: 'Getting Started with PyGeospatial Hub',
    description: 'Learn the basics of the platform and how to run your first geospatial analysis.',
    difficulty: 'Beginner', duration: '10 min', category: 'Basics', icon: '🚀',
  },
  {
    id: 'shapely-basics', title: 'Shapely Geometry Operations',
    description: 'Learn how to create, manipulate, and analyze geometric objects using Shapely.',
    difficulty: 'Beginner', duration: '20 min', category: 'Core', icon: '📍',
  },
  {
    id: 'geopandas-intro', title: 'GeoPandas for Spatial Data Analysis',
    description: 'Explore spatial data manipulation and analysis using GeoPandas DataFrames.',
    difficulty: 'Intermediate', duration: '30 min', category: 'Core', icon: '📊',
  },
  {
    id: 'raster-processing', title: 'Raster Data Processing with Rasterio',
    description: 'Learn to read, write, and process satellite imagery and raster datasets.',
    difficulty: 'Intermediate', duration: '25 min', category: 'Raster', icon: '🛰️',
  },
  {
    id: 'coordinate-systems', title: 'Understanding Coordinate Systems',
    description: 'Master CRS transformations and map projections using Pyproj.',
    difficulty: 'Beginner', duration: '15 min', category: 'Basics', icon: '🌐',
  },
  {
    id: 'interactive-maps', title: 'Creating Interactive Maps with Folium',
    description: 'Build beautiful interactive web maps directly from your Python code.',
    difficulty: 'Intermediate', duration: '20 min', category: 'Visualization', icon: '🗺️',
  },
]

export default function Tutorials() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-900 mb-2">
          <span className="gradient-text">Tutorials</span> & Guides
        </h1>
        <p className="text-earth-500">
          Step-by-step guides from beginner to advanced geospatial analysis
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <Link key={tutorial.id} to="/sandbox">
            <Card hover>
              <CardHeader>
                <div className="text-2xl">{tutorial.icon}</div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base truncate">{tutorial.title}</CardTitle>
                  <span className={`text-xs font-medium ${
                    tutorial.difficulty === 'Beginner' ? 'text-primary-600' :
                    tutorial.difficulty === 'Intermediate' ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {tutorial.difficulty}
                  </span>
                </div>
              </CardHeader>
              <CardDescription>{tutorial.description}</CardDescription>
              <div className="flex items-center gap-4 mt-4 text-xs text-earth-500">
                <span className="flex items-center gap-1">
                  <BookOpen size={12} />
                  {tutorial.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {tutorial.duration}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
