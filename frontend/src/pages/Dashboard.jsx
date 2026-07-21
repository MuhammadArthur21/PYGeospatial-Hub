import {
  LayoutDashboard, Code, Download, Eye, Clock,
  TrendingUp, BarChart3, Users, BookOpen
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

const stats = [
  { label: 'Executions Today', value: '47', icon: Code, change: '+12%', color: 'from-primary-500 to-emerald-500' },
  { label: 'Saved Scripts', value: '12', icon: BookOpen, change: '+3', color: 'from-ocean-500 to-blue-500' },
  { label: 'Datasets Uploaded', value: '8', icon: Download, change: '+1', color: 'from-purple-500 to-pink-500' },
  { label: 'Storage Used', value: '156 MB', icon: Eye, change: 'of 500 MB', color: 'from-amber-500 to-orange-500' },
]

const recentScripts = [
  { id: 1, title: 'Jakarta Buffer Analysis', updated: '2 hours ago', status: 'draft' },
  { id: 2, title: 'Land Cover Classification', updated: '1 day ago', status: 'published' },
  { id: 3, title: 'Road Network Extraction', updated: '3 days ago', status: 'draft' },
]

const recentExecutions = [
  { id: 4821, status: 'success', duration: '2.3s', time: '5 min ago', library: 'GeoPandas' },
  { id: 4820, status: 'success', duration: '1.8s', time: '15 min ago', library: 'Shapely' },
  { id: 4819, status: 'failed', duration: '0.5s', time: '1 hour ago', library: 'Rasterio' },
  { id: 4818, status: 'success', duration: '3.1s', time: '2 hours ago', library: 'Pyproj' },
]

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-gray-400">
          Your personal overview of activity and usage
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="stat-card">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} 
                              flex items-center justify-center`}>
                  <Icon size={16} className="text-white" />
                </div>
                <span className="text-xs text-green-400 font-medium">{stat.change}</span>
              </div>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Scripts */}
        <Card>
          <CardHeader>
            <BookOpen size={18} className="text-primary-400" />
            <CardTitle>Recent Scripts</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {recentScripts.map((script) => (
              <div key={script.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg
                         hover:bg-surface-800 transition-colors cursor-pointer">
                <div>
                  <p className="text-sm text-gray-200 font-medium">{script.title}</p>
                  <p className="text-xs text-gray-500">Updated {script.updated}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  script.status === 'published'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {script.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/sandbox" className="btn-ghost text-sm mt-4 w-full text-center">
            Create New Script
          </Link>
        </Card>

        {/* Recent Executions */}
        <Card>
          <CardHeader>
            <Clock size={18} className="text-primary-400" />
            <CardTitle>Recent Executions</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {recentExecutions.map((exec) => (
              <div key={exec.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg
                         hover:bg-surface-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    exec.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  <div>
                    <p className="text-sm text-gray-200 font-medium">#{exec.id} - {exec.library}</p>
                    <p className="text-xs text-gray-500">{exec.time}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{exec.duration}</span>
              </div>
            ))}
          </div>
          <Link to="/sandbox" className="btn-ghost text-sm mt-4 w-full text-center">
            View All Executions
          </Link>
        </Card>
      </div>
    </div>
  )
}
