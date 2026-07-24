import { Link } from 'react-router-dom'
import {
  BookOpen, PlayCircle, Wrench, Map,
  ArrowRight, ChevronRight, Star, Code2
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/Card'

const features = [
  {
    icon: BookOpen,
    title: 'Library Index',
    description: '100+ Python geospatial libraries organized, documented & ready to use',
    path: '/libraries',
    color: 'from-primary-500 to-primary-300 dark:from-dark-accent dark:to-dark-text',
  },
  {
    icon: PlayCircle,
    title: 'Interactive Sandbox',
    description: 'Write & execute Python geo code instantly in your browser — zero install',
    path: '/sandbox',
    color: 'from-primary-600 to-sage-400 dark:from-dark-accent dark:to-sage-300',
  },
  {
    icon: Wrench,
    title: 'Tools Marketplace',
    description: 'Pre-built geospatial tools: buffer, clip, geocode, spatial join & more',
    path: '/tools',
    color: 'from-earth-600 to-earth-400 dark:from-dark-accent dark:to-sage-400',
  },
  {
    icon: Map,
    title: 'Visualization Engine',
    description: 'Auto-render results to interactive maps & charts with one click',
    path: '/sandbox',
    color: 'from-primary-400 to-sage-300 dark:from-dark-accent dark:to-dark-text',
  },
]

const stats = [
  { label: 'Geo Libraries', value: '100+' },
  { label: 'Pre-built Tools', value: '50+' },
  { label: 'Community Scripts', value: '500+' },
  { label: 'Active Users', value: '5,000+' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-100/50 via-transparent to-earth-50 
                        dark:from-dark-accent/5 dark:via-transparent dark:to-dark-bg pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl 
                        dark:bg-dark-accent/5" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl 
                        dark:bg-dark-accent/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm text-primary-700 dark:text-dark-accent mb-8 animate-fade-in">
              <Star size={14} className="fill-primary-500 text-primary-500 dark:fill-dark-accent dark:text-dark-accent" />
              Your Complete Geospatial Python Ecosystem
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up">
              <span className="gradient-text">Geospatial Python</span>
              <br />
              <span className="text-earth-900 dark:text-dark-text">Zero Install. Full Power.</span>
            </h1>

            <p className="text-lg sm:text-xl text-earth-600 dark:text-dark-accent/80 max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed">
              One platform to explore, learn, and execute{' '}
              <span className="text-primary-600 dark:text-dark-accent font-semibold">100+ geospatial libraries</span>.
              No setup. No configuration. Just pure geospatial analysis from your browser.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link to="/sandbox" className="btn-primary text-lg px-8 py-3 flex items-center gap-2">
                <PlayCircle size={20} />
                Try Sandbox Now
                <ArrowRight size={16} />
              </Link>
              <Link to="/libraries" className="btn-secondary text-lg px-8 py-3 flex items-center gap-2">
                <BookOpen size={20} />
                Browse Libraries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card items-center text-center">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-3">
            Everything Geospatial,{' '}
            <span className="gradient-text">One Platform</span>
          </h2>
          <p className="text-earth-500 dark:text-dark-accent/60 max-w-xl mx-auto">
            From browsing libraries to executing complex spatial analysis — all in your browser.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.title} to={feature.path}>
                <Card hover className="h-full group">
                  <CardHeader>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} 
                                   flex items-center justify-center shadow-md`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardDescription>{feature.description}</CardDescription>
                  <div className="mt-4 flex items-center gap-1 text-primary-600 dark:text-dark-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                    <ChevronRight size={14} />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/50 to-sage-100/50 
                        dark:from-dark-accent/5 dark:to-dark-surface" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-earth-900 dark:text-dark-text mb-4">
            Ready to Explore Geospatial Python?
          </h2>
          <p className="text-earth-600 dark:text-dark-accent/80 max-w-lg mx-auto mb-8">
            Jump into the sandbox and start analyzing spatial data — no sign-up required.
          </p>
          <Link to="/sandbox" className="btn-primary text-lg px-8 py-3 inline-flex items-center gap-2">
            <Code2 size={20} />
            Start Coding Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-earth-200 dark:border-dark-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-earth-500 dark:text-dark-accent/60">
              © 2026 PyGeospatial Hub — Open Geospatial Platform
            </span>
            <div className="flex items-center gap-6 text-sm text-earth-500 dark:text-dark-accent/60">
              <Link to="/docs" className="hover:text-primary-600 dark:hover:text-dark-text transition-colors">Documentation</Link>
              <Link to="/docs" className="hover:text-primary-600 dark:hover:text-dark-text transition-colors">API</Link>
              <a href="https://github.com/your-org/pygeospatial-hub" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-dark-text transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
