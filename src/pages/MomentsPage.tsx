import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.tsx'

interface Milestone {
  date: string
  title: string
  emoji?: string
  description: string
  image: string
  alt: string
  node: { icon: string; className: string }
  tape: string
  secretLabel: string
  secretIcon: string
  secret: string
}

interface Floater {
  id: string
  emoji: string
  left: number
  top: number
  dx: string
}

const MILESTONES: Milestone[] = [
  {
    date: 'Oct 14, 2023',
    title: 'นัดกาแฟครั้งแรกที่ The Corner Cafe',
    description: 'กาแฟสองแก้วที่ยังอุ่นอยู่ และสามชั่วโมงแห่งความประหม่าที่ผ่านไปเหมือนไม่กี่นาที',
    image: '/images/latte.jpg',
    alt: 'แก้วลาเต้ลายหัวใจบนโต๊ะไม้ในคาเฟ่',
    node: { icon: 'favorite', className: 'bg-primary' },
    tape: 'bg-primary-fixed-dim/70',
    secretLabel: 'ไดอารี่ลับของเขา',
    secretIcon: 'stylus_note',
    secret: '“คุณทำน้ำตาลหกแล้วหัวเราะน่ารักมาก ฉันตกหลุมรักตรงนั้นเลย”',
  },
  {
    date: 'Dec 22, 2023',
    title: 'ชมดาวที่ท่าเรือ',
    description: 'ลมหนาวพัดมา ห่มผ้าพันคอผืนเดียวกัน แล้วนับกลุ่มดาวที่พาดผ่านไป',
    image: '/images/pier.jpg',
    alt: 'ท้องฟ้ายามค่ำคืนเหนือท่าเรือไม้ที่สะท้อนแสงดาว',
    node: { icon: 'nightlight_round', className: 'bg-secondary' },
    tape: 'bg-secondary-fixed',
    secretLabel: 'คำสารภาพลับของเธอ',
    secretIcon: 'auto_stories',
    secret: '“อากาศ 4 องศา แต่มือฉันอุ่นตอนจับมือเธอ”',
  },
  {
    date: 'May 04, 2024',
    title: 'ทริปแรกและพระอาทิตย์ตกทะเล',
    description: 'กระจกเปิดสุด ผมยุ่ง และละอองเกลือจากทะเลโชยมา',
    image: '/images/roadtrip.jpg',
    alt: 'พระอาทิตย์ตกชายฝั่งบนถนนริมผา',
    node: { icon: 'wb_sunny', className: 'bg-tertiary-container' },
    tape: 'bg-tertiary-fixed-dim/70',
    secretLabel: 'ความทรงจำที่ยังไม่เคยเผย',
    secretIcon: 'music_note',
    secret: '“เราร้องตามเพลงทุกเพลงในเพลย์ลิสต์อย่างห่วยแตกมาก”',
  },
  {
    date: 'Aug 18, 2024',
    title: 'วันฝนตกกับการทำอาหารพัง',
    emoji: '🤣',
    description: 'แป้งเปรอะจมูก เสียงสัญญาณควันเตือนดังลั่น และพิซซ่าสั่งกลับบ้านที่อร่อยที่สุดเท่าที่เคยกิน',
    image: '/images/pancakes.jpg',
    alt: 'แพนเค้กไหม้ ๆ ราดสตรอว์เบอร์รีบนเคาน์เตอร์ครัว',
    node: { icon: 'sentiment_very_satisfied', className: 'bg-primary' },
    tape: 'bg-primary-fixed-dim/70',
    secretLabel: 'ความทรงจำแบบไม่กรอง',
    secretIcon: 'menu_book',
    secret: '“แม้จะไหม้เกรียม มันก็เป็นแพนเค้กที่อร่อยที่สุด เพราะคุณทำด้วยความรัก”',
  },
]

const REACTIONS = ['💖', '🥹', '✨']

function createFloater(emoji: string, rect: DOMRect): Floater {
  return {
    id: `${Date.now()}-${Math.random()}`,
    emoji,
    left: rect.right - 60 + (Math.random() * 40 - 20),
    top: rect.top + 10,
    dx: `${Math.random() * 60 - 30}px`,
  }
}

export default function MomentsPage() {
  const [count, setCount] = useState(365)
  const [floaters, setFloaters] = useState<Floater[]>([])
  const reactionRef = useRef<HTMLDivElement>(null)

  const sendReaction = (emoji: string) => {
    setCount((c) => c + 1)
    const rect = reactionRef.current?.getBoundingClientRect()
    if (!rect) return
    const floater = createFloater(emoji, rect)
    setFloaters((prev) => [...prev, floater])
    setTimeout(() => setFloaters((prev) => prev.filter((f) => f.id !== floater.id)), 1000)
  }

  return (
    <div className="flex flex-col w-full px-margin pb-space-xl relative overflow-hidden">
      <div className="absolute -top-16 -left-20 w-64 h-64 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-80 -right-24 w-72 h-72 bg-primary-fixed/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <section className="flex flex-col items-center text-center gap-space-xs pt-space-md max-w-md mx-auto">
        <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm backdrop-blur-md">
          <Icon name="auto_awesome" filled className="text-[14px]" />
          <span>บทที่ 1: เรื่องราวของเรา</span>
          <span className="text-on-surface-variant">•</span>
          <span>365 วันและยังนับต่อ</span>
        </div>
        <h1 className="font-display-lg-mobile text-display-lg-mobile text-on-surface mt-space-xs">
          ช่วงเวลาที่หวานที่สุดของเรา
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
          ทุกวินาทีถูกถักทอด้วยเสียงหัวเราะกระซิบและกรอบ Polaroid แตะแต่ละความทรงจำเพื่อเปิดโน้ตลับ
        </p>
      </section>

      {/* Timeline */}
      <div className="relative max-w-md w-full mx-auto mt-space-lg pl-14">
        <div className="absolute left-[22px] top-0 bottom-0 border-l-2 border-dashed border-primary/30" />
        {MILESTONES.map((m, i) => (
          <MilestoneItem key={m.title} milestone={m} tilt={i % 2 === 0 ? '-rotate-1' : 'rotate-1'} />
        ))}
      </div>

      {/* Reactions + next chapter */}
      <section className="w-full max-w-md mx-auto mt-space-md flex flex-col gap-space-md">
        <div
          ref={reactionRef}
          className="relative rounded-lg bg-surface-container-low/90 backdrop-blur-md p-space-md flex items-center justify-between gap-space-sm shadow-sm"
        >
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">ย้อนประกายรัก</span>
            <div className="flex items-center gap-1 text-primary">
              <Icon name="favorite" filled className="text-[16px]" />
              <span className="font-label-md text-label-md text-on-surface">{count}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">ปฏิกิริยาหวาน ๆ</span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs">
            {REACTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                aria-label={`ส่งปฏิกิริยา ${emoji}`}
                onClick={() => sendReaction(emoji)}
                className="w-11 h-11 rounded-full bg-surface-container-lowest shadow-sm text-xl flex items-center justify-center transition-transform active:scale-90 hover:scale-105"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <Link
          to="/reasons"
          className="w-full py-4 px-space-lg rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
        >
          <span>บทต่อไป: เหตุผลที่ชอบเธอ</span>
          <Icon name="arrow_forward" className="text-[20px]" />
        </Link>
      </section>

      {floaters.map((f) => (
        <span
          key={f.id}
          aria-hidden="true"
          className="pointer-events-none fixed z-50 text-2xl select-none animate-float-up"
          style={{ left: f.left, top: f.top, '--dx': f.dx } as CSSProperties}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  )
}

function MilestoneItem({ milestone, tilt }: Readonly<{ milestone: Milestone; tilt: string }>) {
  const [flipped, setFlipped] = useState(false)

  const toggleFlip = () => setFlipped((f) => !f)

  return (
    <div className="relative pb-10 last:pb-0">
      <div
        className={`absolute -left-14 top-2 w-11 h-11 rounded-full ${milestone.node.className} text-on-primary shadow-md flex items-center justify-center`}
      >
        <Icon name={milestone.node.icon} filled className="text-[20px]" />
      </div>

      <div className={`relative ${tilt} transition-transform duration-300`}>
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-sm ${milestone.tape} opacity-80 z-10`} />
        <button
          type="button"
          className="relative block w-full text-left [perspective:1200px]"
          aria-pressed={flipped}
          aria-label={`${milestone.title}, ${flipped ? 'แสดงรูป' : 'เปิดโน้ตลับ'}`}
          onClick={toggleFlip}
        >
          <div
            className={`grid transition-transform duration-700 [transform-style:preserve-3d] ${
              flipped ? '[transform:rotateY(180deg)]' : ''
            }`}
          >
            {/* Front */}
            <div className="[grid-area:1/1] [backface-visibility:hidden] bg-surface-container-lowest rounded-md shadow-lg p-3 pb-4 cursor-pointer">
              <div className="relative rounded-DEFAULT overflow-hidden aspect-[4/3]">
                <img src={milestone.image} alt={milestone.alt} className="w-full h-full object-cover" />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-surface/90 text-on-surface font-label-sm text-label-sm">
                  {milestone.date}
                </span>
              </div>
              <div className="pt-3 flex flex-col gap-space-xs">
                <div className="flex items-center gap-1">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface leading-snug">{milestone.title}</h2>
                  {milestone.emoji && <span>{milestone.emoji}</span>}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{milestone.description}</p>
                <span className="mt-1 w-full py-2 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm flex items-center justify-center gap-1.5">
                  <Icon name="lock_open" className="text-[14px]" />
                  แตะเพื่อพลิกและดูโน้ตลับ
                </span>
              </div>
            </div>

            {/* Back */}
            <div className="[grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-md shadow-lg p-space-lg bg-gradient-to-br from-primary-fixed/70 via-surface-container-lowest to-secondary-fixed/60 flex flex-col justify-between gap-space-md cursor-pointer">
              <div className="flex items-center gap-space-xs text-primary">
                <Icon name={milestone.secretIcon} filled className="text-[20px]" />
                <span className="font-label-md text-label-md uppercase tracking-wider">{milestone.secretLabel}</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface italic">{milestone.secret}</p>
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1">
                  <Icon name="favorite" filled className="text-[14px] text-primary" />
                  {milestone.date}
                </span>
                <span>พลิกกลับ</span>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
