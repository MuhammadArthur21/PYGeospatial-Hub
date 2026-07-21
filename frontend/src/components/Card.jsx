import { cn } from '@/utils/cn'

function Card({ className, children, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'glass-card p-6 transition-all duration-300',
        hover && 'glass-card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('flex items-center gap-3 mb-4', className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('text-lg font-semibold text-earth-900', className)} {...props}>
      {children}
    </h3>
  )
}

function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-sm text-earth-500', className)} {...props}>
      {children}
    </p>
  )
}

export { Card, CardHeader, CardTitle, CardDescription }
