import type { CSSProperties } from 'react'

interface IconProps {
  name: string
  filled?: boolean
  className?: string
  style?: CSSProperties
}

export default function Icon({ name, filled = false, className = '', style }: Readonly<IconProps>) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0", ...style }}
    >
      {name}
    </span>
  )
}
