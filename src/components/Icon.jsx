export default function Icon({ name, filled = false, className = '', style }) {
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
