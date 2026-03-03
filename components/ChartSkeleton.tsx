'use client'

interface ChartSkeletonProps {
  height?: number
  label?: string
  className?: string
}

export function ChartSkeleton({ height = 220, label = 'Loading chart...', className = '' }: ChartSkeletonProps) {
  return (
    <div
      className={`card flex items-center justify-center ${className}`}
      style={{ height, minHeight: height }}
      role="status"
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="whirl-chart-spinner" aria-hidden="true" />
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{label}</span>
      </div>
    </div>
  )
}
