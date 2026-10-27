import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.tsx'

interface WaveBar {
  id: string
  h: number
  color: string
}

interface Reason {
  title: string
  description: string
  icon: string
  iconClass: string
  image: string
  alt: string
  caption: string
}

const WAVE: WaveBar[] = [
  { id: 'wave-1', h: 14, color: 'bg-primary/30' },
  { id: 'wave-2', h: 20, color: 'bg-primary/40' },
  { id: 'wave-3', h: 28, color: 'bg-primary' },
  { id: 'wave-4', h: 16, color: 'bg-primary' },
  { id: 'wave-5', h: 24, color: 'bg-secondary' },
  { id: 'wave-6', h: 32, color: 'bg-secondary' },
  { id: 'wave-7', h: 20, color: 'bg-primary' },
  { id: 'wave-8', h: 12, color: 'bg-primary/50' },
  { id: 'wave-9', h: 24, color: 'bg-secondary/70' },
  { id: 'wave-10', h: 28, color: 'bg-primary' },
  { id: 'wave-11', h: 16, color: 'bg-primary/40' },
  { id: 'wave-12', h: 12, color: 'bg-secondary/50' },
  { id: 'wave-13', h: 24, color: 'bg-primary/70' },
  { id: 'wave-14', h: 10, color: 'bg-primary/30' },
  { id: 'wave-15', h: 18, color: 'bg-secondary/40' },
  { id: 'wave-16', h: 20, color: 'bg-primary/60' },
]

const REASONS: Reason[] = [
  {
    title: 'เสียงหัวเราะติดหูของคุณ',
    description:
      'ทุกครั้งที่ได้ยินมุกตลกเฉิ่ม ๆ ใบหน้าของคุณจะสว่างขึ้นทันที ห้องธรรมดาก็อบอุ่นขึ้นได้ในพริบตา',
    icon: 'auto_awesome',
    iconClass: 'bg-primary-fixed/60 text-primary',
    image: '/images/laugh.jpg',
    alt: 'คนกำลังหัวเราะอย่างมีความสุขในห้องที่มีแสงแดดส่องถึง',
    caption: 'ทุกวัน',
  },
  {
    title: 'ความรู้สึกปลอดภัยที่คุณมอบให้',
    description:
      'ไม่ว่าโลกจะวุ่นวายแค่ไหน กอดเดียวจากคุณก็รีเซ็ตทุกอย่างได้ หัวใจของฉันสงบอยู่ข้างคุณ',
    icon: 'wb_sunny',
    iconClass: 'bg-secondary-fixed text-secondary',
    image: '/images/hug.jpg',
    alt: 'กอดอ่อนโยนห่มผ้าห่มถักช่วงพลบค่ำ',
    caption: 'ท่าเรือที่ปลอดภัยของฉัน',
  },
  {
    title: 'ความใจดีของคุณต่อคนแปลกหน้า',
    description:
      'การได้เห็นคุณดูแลสัตว์จรจัดและขอบคุณบาริสต้าทุกคน หัวใจอ่อนโยนของคุณหาได้ยากมาก',
    icon: 'volunteer_activism',
    iconClass: 'bg-tertiary-fixed text-tertiary',
    image: '/images/cup.jpg',
    alt: 'มือที่ถือแก้วเซรามิกอุ่น ๆ ลายหัวใจ',
    caption: 'หัวใจทองคำแท้',
  },
  {
    title: 'บทสนทนาลึก ๆ ตอนตีสอง',
    description:
      "คุยกันเรื่องจักรวาลคู่ขนาน กระท่อมในฝันของเรา และความลับเฉิ่ม ๆ เวลาหยุดนิ่งเมื่อฉันได้คุยกับคุณ",
    icon: 'bedtime',
    iconClass: 'bg-secondary-fixed/70 text-secondary',
    image: '/images/stars.jpg',
    alt: 'เงาคนสองคนดูดาวใต้ท้องฟ้ายามค่ำคืน',
    caption: 'ถึงดวงดาว',
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
          <span className="font-label-sm text-label-sm uppercase tracking-wider">เหตุผลที่ชอบเธอ</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface">สิ่งเล็ก ๆ ที่ขโมยหัวใจฉันไป</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
          ปัดหรือแตะแต่ละโน้ตเพื่อค้นพบว่าอะไรทำให้คุณไม่มีใครแทนได้
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
          <span>ไปที่คูปองความรักของเรา</span>
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

  const handleSeekKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') setProgress((p) => Math.max(p - 5, 0))
    if (e.key === 'ArrowRight') setProgress((p) => Math.min(p + 5, 100))
  }

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
            <span className="font-label-md text-label-md text-on-surface">ข้อความเสียงถึงคุณ</span>
            <span className="font-label-sm text-label-sm text-tertiary">01:24 • อัดตอนดึก</span>
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
          aria-label={playing ? 'หยุดโน้ตเสียง' : 'เล่นโน้ตเสียง'}
          onClick={() => setPlaying((p) => !p)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0"
        >
          <Icon name={playing ? 'pause' : 'play_arrow'} filled className="text-[24px]" />
        </button>

        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <div className="flex items-center justify-between gap-[3px] h-8 px-1">
            {WAVE.map((bar, i) => (
              <span
                key={bar.id}
                className={`w-1 rounded-full ${bar.color} transition-all duration-300`}
                style={{ height: `${heights[i]}px` }}
              />
            ))}
          </div>
          <div
            ref={trackRef}
            role="slider"
            tabIndex={0}
            aria-label="ปรับตำแหน่งข้อความเสียง"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            onClick={seek}
            onKeyDown={handleSeekKey}
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
          “เฮ้ ฉันอยากพูดมันออกมาดัง ๆ เพื่อให้คุณฟังได้ทุกครั้งที่ต้องการกำลังใจ...”
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
          ของที่ระลึกคัดสรร
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
                  เหตุผลที่ {i + 1}
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
                <span>{liked[i] ? 'เก็บไว้ในใจแล้ว' : 'เก็บไว้ในใจ'}</span>
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
    setFeedback(`${PILLS[i].emoji} จดจำโน้ตนี้แล้ว!`)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setFeedback(null), 1800)
  }

  return (
    <section className="w-full max-w-md mx-auto rounded-lg bg-surface-container-low/90 backdrop-blur-md p-space-md flex flex-col gap-space-sm shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-label-md text-label-md text-on-surface">ส่งปฏิกิริยาให้หน้านี้</span>
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
