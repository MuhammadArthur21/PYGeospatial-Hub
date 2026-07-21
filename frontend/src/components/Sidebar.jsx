import { Link } from 'react-router-dom'
import { BookOpen, Wrench, PlayCircle, FileText, Home } from 'lucide-react'

const menuGroups = [
  {
    label: 'Main',
    items: [
      { path: '/', label: 'Home', icon: Home },
      { path: '/libraries', label: 'Libraries', icon: BookOpen },
      { path: '/categories', label: 'Categories', icon: BookOpen },
    ],
  },
  {
    label: 'Tools',
    items: [
      { path: '/tools', label: 'Marketplace', icon: Wrench },
      { path: '/sandbox', label: 'Sandbox', icon: PlayCircle },
    ],
  },
  {
    label: 'Learn',
    items: [
      { path: '/tutorials', label: 'Tutorials', icon: FileText },
      { path: '/docs', label: 'Documentation', icon: FileText },
    ],
  },
]

export default function Sidebar({ isOpen = true }) {
  return (
    <aside className={`w-56 bg-white/50 dark:bg-dark-surface/50 border-r border-earth-200 dark:border-dark-border py-4 ${isOpen ? '' : 'hidden'}`}>
      {menuGroups.map((group) => (
        <div key={group.label} className="mb-4">
          <h3 className="px-4 text-xs font-semibold text-earth-500 dark:text-dark-accent/60 uppercase tracking-wider mb-2">
            {group.label}
          </h3>
          {group.items.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-2 text-sm text-earth-600 dark:text-dark-accent/70 
                         hover:text-primary-600 dark:hover:text-dark-text hover:bg-primary-50 dark:hover:bg-dark-hover 
                         transition-colors"
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </div>
      ))}
    </aside>
  )
}
