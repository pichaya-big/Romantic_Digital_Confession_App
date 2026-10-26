import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.tsx'

const CORRECT_PIN = '1024'
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

interface Heart {
  id: string
  left: number
  size: number
  dx: string
  dy: string
  rot: string
}

export default function EnvelopePage() {
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [hearts, setHearts] = useState<Heart[]>([])
  const [opening, setOpening] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const unlocked = pin === CORRECT_PIN

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms))
  }

  const burstHearts = () => {
    const batch = Array.from({ length: 7 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      left: 50 + (Math.random() * 40 - 20),
      size: 16 + Math.floor(Math.random() * 12),
      dx: `${(Math.random() - 0.5) * 80}px`,
      dy: `${-(60 + Math.random() * 80)}px`,
      rot: `${Math.random() * 30 - 15}deg`,
    }))
    setHearts((prev) => [...prev, ...batch])
    later(() => setHearts((prev) => prev.filter((h) => !batch.includes(h))), 1500)
  }

  const handleDigit = (digit: string) => {
    if (error || pin.length >= 4 || unlocked) return
    const next = pin + digit
    setPin(next)
    if (next.length === 4 && next !== CORRECT_PIN) {
      setError(true)
      later(() => {
        setPin('')
        setError(false)
      }, 600)
    } else if (next === CORRECT_PIN) {
      burstHearts()
    }
  }

  const handleDelete = () => {
    if (error || unlocked) return
    setPin((p) => p.slice(0, -1))
  }

  const handleOpen = () => {
    if (!unlocked || opening) return
    burstHearts()
    setOpening(true)
    later(() => navigate('/moments'), 550)
  }

  return (
    <div className="flex flex-col w-full px-margin pt-space-md pb-space-xl relative overflow-hidden select-none">
      <div className="absolute -top-10 -left-12 w-64 h-64 bg-primary-fixed-dim/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-16 w-72 h-72 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none" />

      {/* Now playing pill */}
      <div className="w-full max-w-sm mx-auto mb-space-md">
        <div className="flex items-center justify-between gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-space-xs min-w-0">
            <Icon name="music_note" filled className="text-primary text-[18px] animate-pulse" />
            <span className="font-label-sm text-label-sm text-tertiary truncate">
              Now playing: <span className="font-semibold text-on-surface">Our Song (Lofi Acoustic)</span>
            </span>
          </div>
          <div aria-hidden="true" className="flex items-center gap-[3px] shrink-0 h-4 px-1">
            <span className="w-[3px] h-3 bg-primary rounded-full animate-bounce [animation-delay:0.1s] [animation-duration:0.9s]" />
            <span className="w-[3px] h-4 bg-tertiary-container rounded-full animate-bounce [animation-delay:0.25s] [animation-duration:0.7s]" />
            <span className="w-[3px] h-2 bg-secondary rounded-full animate-bounce [animation-delay:0.4s] [animation-duration:1.1s]" />
            <span className="w-[3px] h-3 bg-primary rounded-full animate-bounce [animation-delay:0.15s] [animation-duration:0.85s]" />
          </div>
        </div>
      </div>

      {/* Envelope card */}
      <div className="relative w-full max-w-sm mx-auto flex flex-col items-center">
        <div className="relative w-full rounded-lg bg-surface-container-lowest/85 backdrop-blur-lg shadow-xl p-space-lg flex flex-col items-center text-center overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary-fixed-dim via-primary-container to-secondary-fixed" />

          {/* Wax seal */}
          <div className="relative my-space-sm flex items-center justify-center">
            <div className="absolute w-28 h-28 rounded-full bg-primary-fixed/40 blur-xl animate-pulse" />
            <div
              className={`relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-primary-container via-primary to-on-primary-fixed-variant shadow-lg flex items-center justify-center transition-all duration-500 ${
                opening ? 'rotate-12 scale-125 opacity-0' : 'hover:scale-105 active:scale-95'
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-inner">
                <Icon name="favorite" filled className="text-on-primary text-[42px] drop-shadow" />
              </div>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-40 animate-ping pointer-events-none [animation-duration:3s]" />
            </div>
          </div>

          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-primary-fixed/60 text-on-primary-fixed font-label-sm text-label-sm mt-space-xs mb-space-xs">
            <Icon name="lock" className="text-[14px]" />
            <span>For Your Eyes Only</span>
          </div>

          <h2 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs leading-tight">
            A Sealed Letter For My Favorite Person
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs px-space-xs">
            Whispers, late-night promises, and the quiet moments between us, locked safely in time.
          </p>

          <div className="w-full mt-space-md pt-space-xs flex flex-col items-center">
            <label className="font-label-md text-label-md text-tertiary flex items-center gap-space-xs">
              <Icon name="key" className="text-[16px]" />
              Enter our special date
            </label>

            <div className="flex items-center justify-center gap-space-sm mt-space-sm">
              {[0, 1, 2, 3].map((i) => {
                const char = pin[i]
                return (
                  <div
                    key={i}
                    className={`w-12 h-14 rounded-DEFAULT flex flex-col items-center justify-center shadow-inner transition-all duration-300 ${
                      error
                        ? 'bg-error-container animate-wiggle'
                        : char !== undefined
                          ? 'bg-primary-fixed shadow-md'
                          : 'bg-surface-container-low'
                    }`}
                  >
                    {char !== undefined ? (
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">{char}</span>
                    ) : (
                      <Icon name="favorite" className="text-[20px] text-outline-variant" />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="h-7 mt-space-xs flex items-center justify-center">
              {unlocked ? (
                <p className="font-label-md text-label-md text-primary flex items-center gap-1">
                  <Icon name="favorite" filled className="text-[18px]" />
                  Passcode matched! Your heart is verified ❤️
                </p>
              ) : (
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span className="text-tertiary">Hint:</span> The night on the rooftop with hot cocoa ✨
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Keypad */}
        <div className="w-full mt-space-md bg-surface-container-lowest/60 backdrop-blur-md rounded-lg p-space-sm shadow-md">
          <div className="grid grid-cols-3 gap-space-xs max-w-xs mx-auto">
            {KEYS.map((key) => (
              <KeyButton key={key} onClick={() => handleDigit(key)}>
                {key}
              </KeyButton>
            ))}
            <button
              type="button"
              title="Auto Fill Correct Date"
              aria-label="Auto fill correct date"
              onClick={() => {
                setPin(CORRECT_PIN)
                burstHearts()
              }}
              className="h-12 rounded-full bg-transparent hover:bg-surface-container-low/50 text-tertiary flex items-center justify-center transition-transform active:scale-95"
            >
              <Icon name="lightbulb" className="text-[20px]" />
            </button>
            <KeyButton onClick={() => handleDigit('0')}>0</KeyButton>
            <button
              type="button"
              aria-label="Delete"
              onClick={handleDelete}
              className="h-12 rounded-full bg-transparent hover:bg-surface-container-low text-on-surface-variant flex items-center justify-center transition-transform active:scale-90"
            >
              <Icon name="backspace" className="text-[20px]" />
            </button>
          </div>
        </div>

        {/* Open CTA */}
        <div className="w-full mt-space-md relative">
          <button
            type="button"
            onClick={handleOpen}
            disabled={!unlocked}
            className={`relative w-full h-14 rounded-full bg-gradient-to-r from-primary-container via-primary to-tertiary text-on-primary font-label-md text-label-md shadow-lg flex items-center justify-center gap-space-sm transition-all duration-300 active:scale-95 overflow-hidden ${
              unlocked
                ? 'shadow-[0_0_28px_rgba(225,29,72,0.45)]'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <span
              className={`absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 transition-transform duration-1000 ${
                unlocked ? 'translate-x-full' : '-translate-x-full'
              }`}
            />
            <Icon name="mail" filled className="text-[22px]" />
            <span className="tracking-wide">Break Wax Seal &amp; Open</span>
          </button>
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {hearts.map((h) => (
              <span
                key={h.id}
                aria-hidden="true"
                className="material-symbols-outlined absolute text-primary select-none animate-float-heart"
                style={{
                  left: `${h.left}%`,
                  bottom: '12px',
                  fontSize: `${h.size}px`,
                  fontVariationSettings: "'FILL' 1",
                  '--dx': h.dx,
                  '--dy': h.dy,
                  '--rot': h.rot,
                } as CSSProperties}
              >
                favorite
              </span>
            ))}
          </div>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant/80 mt-space-sm text-center flex items-center justify-center gap-1">
          <Icon name="lock_reset" className="text-[14px] text-tertiary" />
          Can&apos;t recall? Tap the lightbulb for our warm memory.
        </p>
      </div>
    </div>
  )
}

function KeyButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-12 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-headline-sm text-headline-sm flex items-center justify-center transition-transform active:scale-90"
    >
      {children}
    </button>
  )
}
