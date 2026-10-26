import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.tsx'

interface Reason {
  title: string
  description: string
  icon: string
  iconClass: string
  image: string
  alt: string
  caption: string
}

const WAVE = [
  { h: 14, color: 'bg-primary/30' },
  { h: 20, color: 'bg-primary/40' },
  { h: 28, color: 'bg-primary' },
  { h: 16, color: 'bg-primary' },
  { h: 24, color: 'bg-secondary' },
  { h: 32, color: 'bg-secondary' },
  { h: 20, color: 'bg-primary' },
  { h: 12, color: 'bg-primary/50' },
  { h: 24, color: 'bg-secondary/70' },
  { h: 28, color: 'bg-primary' },
  { h: 16, color: 'bg-primary/40' },
  { h: 12, color: 'bg-secondary/50' },
  { h: 24, color: 'bg-primary/70' },
  { h: 10, color: 'bg-primary/30' },
  { h: 18, color: 'bg-secondary/40' },
  { h: 20, color: 'bg-primary/60' },
]

const REASONS: Reason[] = [
  {
    title: 'Your infectious laugh',
    description:
      'The way your whole face lights up whenever you hear a silly dad joke. It turns ordinary rooms warm instantly.',
    icon: 'auto_awesome',
    iconClass: 'bg-primary-fixed/60 text-primary',
    image: '/images/laugh.jpg',
    alt: 'Someone laughing joyfully in a sunlit room',
    caption: 'Every single day',
  },
  {
    title: 'How safe you make me feel',
    description:
      'No matter how chaotic the world gets, one hug from you resets everything. My heart finds peace beside yours.',
    icon: 'wb_sunny',
    iconClass: 'bg-secondary-fixed text-secondary',
    image: '/images/hug.jpg',
    alt: 'A tender embrace wrapped in a knitted blanket at dusk',
    caption: 'My safe harbor',
  },
  {
    title: 'Your kindness to strangers',
    description:
      'Watching you care for stray animals and say thank you to every barista. Your tender heart is so rare.',
    icon: 'volunteer_activism',
    iconClass: 'bg-tertiary-fixed text-tertiary',
    image: '/images/cup.jpg',
    alt: 'Gentle hands holding a warm ceramic cup with heart latte art',
    caption: 'Pure gold heart',
  },
  {
    title: 'Our 2 AM deep talks',
    description:
      "Talking about parallel universes, our dream cottage, and silly secrets. Time stops when I'm speaking with you.",
    icon: 'bedtime',
    iconClass: 'bg-secondary-fixed/70 text-secondary',
    image: '/images/stars.jpg',
    alt: 'Two silhouettes stargazing beneath a starry sky',
    caption: 'To the stars',
  },
]

const PILLS = [
  { emoji: '🥰', count: 12 },
  { emoji: '🥺', count: 7 },
  { emoji: '💖', count: 28 },
  { emoji: '✨', count: 19 },
]

export default function ReasonsPage() {
  return (
    <div className="flex flex-col w-full px-margin pb-space-xl gap-space-lg relative overflow-hidden">
      <div className="absolute -top-16 -left-20 w-64 h-64 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-80 -right-24 w-72 h-72 bg-primary-fixed/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-12 w-60 h-60 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <header className="flex flex-col gap-space-xs text-center max-w-md mx-auto w-full pt-space-xs">
        <div className="inline-flex items-center justify-center gap-1.5 self-center px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary backdrop-blur-md">
          <Icon name="favorite" filled className="text-[16px]" />
          <span className="font-label-sm text-label-sm uppercase tracking-wider">Reasons Why</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Little Things That Stole My Heart</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
          Swipe or tap each note to discover what makes you irreplaceable.
        </p>
      </header>

      <VoiceMemo />
      <ReasonCarousel />
      <ReactionRibbon />

      <footer className="w-full max-w-md mx-auto pt-space-xs">
        <Link
          to="/coupons"
          className="w-full py-4 px-space-lg rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
        >
          <span>Continue To Our Love Coupons</span>
          <Icon name="arrow_forward" className="text-[20px]" />
        </Link>
      </footer>
    </div>
  )
}

function VoiceMemo() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(40)
  const [heights, setHeights] = useState(WAVE.map((w) => w.h))
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!playing) return undefined
    const id = setInterval(() => {
      setProgress((p) => (p + 2) % 100)
      setHeights(WAVE.map(() => Math.floor(Math.random() * 20) + 8))
    }, 350)
    return () => clearInterval(id)
  }, [playing])

  const seek = (e: MouseEvent<HTMLDivElement>) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    setProgress(Math.round(ratio * 100))
  }

  return (
    <section className="w-full max-w-md mx-auto rounded-lg bg-surface-container-lowest/80 backdrop-blur-xl p-space-md shadow-lg flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Icon name="mic" className="text-[18px]" />
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface">A Voice Memo For You</span>
            <span className="font-label-sm text-label-sm text-tertiary">01:24 • Recorded late night</span>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed/60 text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1">
          <Icon name="headphones" className="text-[14px]" />
          Listen
        </span>
      </div>

      <div className="flex items-center gap-3 py-1">
        <button
          type="button"
          aria-label={playing ? 'Pause audio note' : 'Play audio note'}
          onClick={() => setPlaying((p) => !p)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0"
        >
          <Icon name={playing ? 'pause' : 'play_arrow'} filled className="text-[24px]" />
        </button>

        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <div className="flex items-center justify-between gap-[3px] h-8 px-1">
            {WAVE.map((bar, i) => (
              <span
                key={i}
                className={`w-1 rounded-full ${bar.color} transition-all duration-300`}
                style={{ height: `${heights[i]}px` }}
              />
            ))}
          </div>
          <div
            ref={trackRef}
            onClick={seek}
            className="relative w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden cursor-pointer"
          >
            <div
              className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded bg-surface-container-low/70 p-space-sm flex items-start gap-2">
        <Icon name="format_quote" className="text-[16px] text-tertiary shrink-0 mt-0.5" />
        <p className="font-body-sm text-body-sm text-on-surface-variant italic">
          “Hey, I wanted to say this out loud so you could always listen when you need a reminder...”
        </p>
      </div>
    </section>
  )
}

function ReasonCarousel() {
  const [index, setIndex] = useState(1)
  const [liked, setLiked] = useState(() => REASONS.map(() => false))
  const trackRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const track = trackRef.current
    if (!track || track.children.length < 2) return
    const cards = track.children as HTMLCollectionOf<HTMLElement>
    const step = cards[1].offsetLeft - cards[0].offsetLeft
    const next = Math.round(track.scrollLeft / step) + 1
    setIndex(Math.min(Math.max(next, 1), REASONS.length))
  }

  const toggleLike = (i: number) => {
    setLiked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  return (
    <section className="w-full max-w-md mx-auto flex flex-col gap-space-sm">
      <div className="flex items-center justify-between px-1">
        <span className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
          <Icon name="auto_awesome" filled className="text-[18px] text-primary" />
          Curated Keepsakes
        </span>
        <span className="font-label-sm text-label-sm text-tertiary px-2 py-0.5 rounded-full bg-tertiary-fixed/40">
          {index} of {REASONS.length}
        </span>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-space-md overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 px-1"
      >
        {REASONS.map((reason, i) => (
          <article
            key={reason.title}
            className="min-w-[84vw] sm:min-w-[340px] snap-center rounded-lg bg-surface-container-lowest/85 backdrop-blur-xl p-space-lg shadow-md flex flex-col justify-between gap-space-md relative overflow-hidden transition-all duration-300 active:scale-[0.98]"
          >
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className={`w-10 h-10 rounded-full ${reason.iconClass} flex items-center justify-center`}>
                  <Icon name={reason.icon} filled className="text-[22px]" />
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Reason #{i + 1}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">{reason.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{reason.description}</p>
            </div>

            <div className="h-32 w-full rounded-md overflow-hidden relative shadow-inner">
              <img src={reason.image} alt={reason.alt} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => toggleLike(i)}
                aria-pressed={liked[i]}
                className={`flex items-center gap-1.5 transition-colors font-label-sm text-label-sm hover:text-primary ${
                  liked[i] ? 'text-primary' : 'text-tertiary'
                }`}
              >
                <Icon name="favorite" filled={liked[i]} className="text-[18px]" />
                <span>{liked[i] ? 'Cherished' : 'Cherish this'}</span>
              </button>
              <span className="font-label-sm text-label-sm text-on-surface-variant/80">{reason.caption}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ReactionRibbon() {
  const [counts, setCounts] = useState(() => PILLS.map((p) => p.count))
  const [feedback, setFeedback] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const react = (i: number) => {
    setCounts((prev) => prev.map((c, idx) => (idx === i ? c + 1 : c)))
    setFeedback(`${PILLS[i].emoji} Note remembered!`)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setFeedback(null), 1800)
  }

  return (
    <section className="w-full max-w-md mx-auto rounded-lg bg-surface-container-low/90 backdrop-blur-md p-space-md flex flex-col gap-space-sm shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-label-md text-label-md text-on-surface">Send a reaction to this screen</span>
        <span
          className={`font-label-sm text-label-sm text-primary transition-opacity ${feedback ? 'opacity-100' : 'opacity-0'}`}
        >
          {feedback ?? ' '}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 pt-1">
        {PILLS.map((pill, i) => (
          <button
            key={pill.emoji}
            type="button"
            onClick={() => react(i)}
            className="flex-1 py-2 px-3 rounded-full bg-surface-container-lowest shadow-sm hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
          >
            <span className="text-xl">{pill.emoji}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">{counts[i]}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
