import { Link } from 'react-router-dom'
import { Check, Zap, Users, Building2, ArrowRight } from 'lucide-react'
import { Card } from '@/components/Card'

const tiers = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    icon: Users,
    description: 'Perfect for learning and exploring geospatial Python',
    color: 'from-earth-400 to-earth-300',
    features: ['Sandbox (5 executions/day)', 'Library Index access', 'Basic tools', 'Community scripts', '10 MB file uploads'],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$15',
    period: '/month',
    icon: Zap,
    description: 'For GIS practitioners who need unlimited power',
    color: 'from-primary-500 to-primary-300',
    features: ['Unlimited executions', '100 MB file uploads', '1 GB storage', 'Workflow builder', 'All tools & libraries', 'Export visualizations', 'Priority support'],
    cta: 'Start Pro',
    popular: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: '$45',
    period: '/month',
    icon: Users,
    description: 'Collaborate with your team on geospatial projects',
    color: 'from-primary-600 to-sage-400',
    features: ['Everything in Pro', '5 team members', 'Shared datasets', 'Private workspaces', 'Admin dashboard', 'Team analytics'],
    cta: 'Start Team',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    icon: Building2,
    description: 'For organizations needing security and scale',
    color: 'from-earth-600 to-earth-400',
    features: ['Everything in Team', 'Unlimited members', 'On-premise deployment', 'SSO integration', 'SLA guarantee', 'Custom integrations', 'Dedicated support'],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-earth-900 dark:text-dark-text mb-3">
          Simple, <span className="gradient-text">Transparent</span> Pricing
        </h1>
        <p className="text-earth-500 dark:text-dark-accent/60 max-w-xl mx-auto">
          Choose the plan that fits your needs. All plans include access to the full library registry.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => {
          const Icon = tier.icon
          return (
            <div key={tier.id} className={`relative ${tier.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary-600 dark:bg-dark-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <Card hover className={`h-full flex flex-col ${tier.popular ? 'ring-2 ring-primary-500 dark:ring-dark-accent' : ''}`}>
                <div className="flex-1">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-earth-900 dark:text-dark-text">{tier.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-3xl font-extrabold text-earth-900 dark:text-dark-text">{tier.price}</span>
                    <span className="text-earth-500 dark:text-dark-accent/60 text-sm ml-1">{tier.period}</span>
                  </div>
                  <p className="text-sm text-earth-500 dark:text-dark-accent/60 mb-6">{tier.description}</p>
                  <div className="space-y-2.5 mb-8">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm text-earth-700 dark:text-dark-text/80">
                        <Check size={14} className="mt-0.5 text-primary-600 dark:text-dark-accent shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  to={tier.id === 'enterprise' ? '/contact' : '/dashboard'}
                  className={`w-full py-2.5 rounded-lg text-sm font-medium text-center transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight size={14} />
                </Link>
              </Card>
            </div>
          )
        })}
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-earth-500 dark:text-dark-accent/60">
          All plans include free access to Library Index, Tutorials, and Documentation.
          <br />Need custom pricing? <a href="#" className="text-primary-600 dark:text-dark-accent hover:underline">Contact us</a>.
        </p>
      </div>
    </div>
  )
}
