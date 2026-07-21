import { cn } from '@/utils/cn'

function Card({ className, children, hover = false, ...props }) {
  const Comp = hover ? 'div' : 'div'
  return (
    <Comp
      className={cn(
        'glass-card p-6',
        hover && 'glass-card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
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
    <h3 className={cn('text-lg font-semibold text-white', className)} {...props}>
      {children}
    </h3>
  )
}

function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-sm text-gray-400', className)} {...props}>
      {children}
    </p>
  )
}

export { Card, CardHeader, CardTitle, CardDescription }
