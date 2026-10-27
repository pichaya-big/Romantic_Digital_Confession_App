import { useEffect, useRef, useState } from 'react'
import Icon from '../components/Icon.tsx'

const DODGE_PHRASES = [
  'ว้ายปุ่มวิ่งหนีแล้ว! 🏃💨',
  'พยายามดีมาก! กดไม่ได้หรอก! 🙈',
  'เกือบได้แล้ว... ไม่ได้! 💖',
  'มีคำตอบที่ถูกต้องแค่ข้อเดียว! ✨',
  'โชคชะตากำหนดให้เป็น YES! 🥰',
]

type Phase = 'proposal' | 'leaving' | 'celebration'

const DEFAULT_NO_TEXT = 'ขอคิดก่อนนะ... 🤔'

export default function QuestionPage() {
  const [phase, setPhase] = useState<Phase>('proposal') // 'proposal' | 'leaving' | 'celebration'
  const [dodgeCount, setDodgeCount] = useState(0)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [toast, setToast] = useState<string | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms))
  }

  const dodge = () => {
    setDodgeCount((c) => c + 1)
    setOffset({
      x: (Math.random() - 0.5) * 140,
      y: (Math.random() - 0.5) * 40,
    })
  }

  const noText = dodgeCount === 0 ? DEFAULT_NO_TEXT : DODGE_PHRASES[(dodgeCount - 1) % DODGE_PHRASES.length]

  const showToast = (message: string) => {
    setToast(message)
    later(() => setToast(null), 2600)
  }

  const accept = () => {
    if (phase !== 'proposal') return
    setPhase('leaving')
    later(() => setPhase('celebration'), 400)
  }

  const replay = () => {
    setPhase('proposal')
    setDodgeCount(0)
    setOffset({ x: 0, y: 0 })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col w-full relative overflow-hidden px-margin py-space-md max-w-md mx-auto">
      <div className="pointer-events-none absolute -top-12 -left-16 w-64 h-64 rounded-full bg-primary-fixed-dim/40 blur-3xl -z-10 animate-pulse [animation-duration:6s]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-secondary-fixed/50 blur-3xl -z-10 animate-pulse [animation-duration:8s]" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-tertiary-fixed-dim/30 blur-3xl -z-10 animate-pulse [animation-duration:7s]" />

      {phase !== 'celebration' && (
        <div
          className={`flex flex-col gap-space-lg w-full transition-all duration-700 ${
            phase === 'leaving' ? 'opacity-0 -translate-y-4' : ''
          }`}
        >
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm shadow-sm">
              <Icon name="favorite" filled className="text-[14px]" />
              บทที่ 5 • ช่วงเวลาสำคัญ
            </span>
          </div>

          <div className="relative w-full rounded-lg bg-surface-container-lowest/80 backdrop-blur-xl shadow-xl overflow-hidden p-space-lg flex flex-col items-center text-center">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-secondary via-primary-container to-tertiary" />
            <div className="absolute -top-16 inset-x-0 mx-auto w-36 h-36 bg-gradient-to-tr from-primary-fixed-dim via-primary-container/20 to-secondary-fixed rounded-full blur-2xl pointer-events-none" />

            <div className="relative mb-space-md w-16 h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg shadow-primary-container/30">
              <Icon name="verified" filled className="text-[32px]" />
              <div className="absolute inset-0 rounded-full border border-surface-container-lowest/30 animate-ping opacity-40" />
            </div>

            <p className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest mb-space-xs">
              จากส่วนลึกของหัวใจฉัน
            </p>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-space-md leading-tight">
              “ทุกช่วงเวลากับคุณคือบทที่ฉันชอบที่สุด คุณจะเป็นคู่ชีวิตของฉันไหม?”
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs leading-relaxed">
              ผ่านทุกเสียงหัวเราะเบา ๆ ข้อความดึก ๆ และความคิดที่ไม่ได้พูดออกมา คุณทำให้การเดินทางนี้กลายเป็นบทกวี
            </p>

            <figure className="mt-space-lg w-full rounded-DEFAULT overflow-hidden shadow-md bg-surface-container-low p-2">
              <img
                src="/images/couple.jpg"
                alt="คู่รักสองคนจูงมือกันท่ามกลางพระอาทิตย์ตก"
                className="w-full h-44 object-cover rounded-DEFAULT"
              />
              <figcaption className="pt-2 pb-1 text-center font-label-sm text-label-sm text-on-surface-variant flex items-center justify-center gap-1">
                <Icon name="photo_camera" className="text-[14px]" />
                <span>ที่ที่ความรักตลอดไปเริ่มต้น</span>
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-col items-center gap-space-md w-full relative min-h-[140px] pt-space-xs">
            <button
              type="button"
              onClick={accept}
              className="group relative w-full py-4 px-6 rounded-full bg-gradient-to-r from-primary-container to-tertiary text-on-primary font-headline-sm text-headline-sm shadow-xl shadow-primary-container/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">YES! ตอบตกลงนับพันครั้ง!</span>
              <Icon name="favorite" filled className="relative z-10 transition-transform group-hover:scale-125" />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/0 via-surface-container-lowest/25 to-surface-container-lowest/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            <div className="relative w-full flex justify-center h-12 items-center">
              <button
                type="button"
                onMouseEnter={dodge}
                onTouchStart={dodge}
                onClick={dodge}
                style={{ transform: dodgeCount ? `translate(${offset.x}px, ${offset.y}px) scale(0.92)` : undefined }}
                className={`px-5 py-2 rounded-full font-label-md text-label-md shadow-sm transition-all duration-200 flex items-center gap-1.5 touch-none ${
                  dodgeCount
                    ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span>{noText}</span>
                <Icon name="sentiment_neutral" className="text-[16px]" />
              </button>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant/70 text-center flex items-center justify-center gap-1">
              <Icon name="switch_left" className="text-[14px]" />
              ผนึกไว้ด้วยความรักที่ไม่มีเงื่อนไข
            </p>
          </div>
        </div>
      )}

      {phase === 'celebration' && (
        <div className="flex flex-col gap-space-lg w-full">
          <Confetti />

          <div className="flex flex-col items-center text-center gap-space-xs">
            <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-1 animate-bounce">
              <Icon name="celebration" filled className="text-[32px]" />
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">เธอตอบตกลงแล้ว! ♥</h1>
            <p className="font-body-md text-body-md text-tertiary">
              บทของเราในฐานะคู่ชีวิตตลอดไปได้เริ่มต้นอย่างเป็นทางการแล้วตอนนี้
            </p>
          </div>

          <div className="relative w-full rounded-lg bg-surface-container-lowest shadow-2xl overflow-hidden flex flex-col">
            <div className="h-3 w-full bg-gradient-to-r from-secondary via-primary-container to-tertiary" />
            <div className="p-space-lg flex flex-col gap-space-md relative">
              <div className="absolute right-4 top-8 opacity-10 pointer-events-none">
                <Icon name="verified" className="text-[110px] text-primary" />
              </div>

              <div className="flex justify-between items-start gap-2">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-tertiary tracking-widest uppercase">
                    สหภาพที่ได้รับการยืนยัน
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">ใบรับรองอย่างเป็นทางการของเรา</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1 shrink-0">
                  <Icon name="verified_user" filled className="text-[14px]" />
                  LIFETIME
                </span>
              </div>

              <div className="grid grid-cols-2 gap-space-sm pt-2">
                <div className="p-3 rounded-DEFAULT bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">ออกให้แก่</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">คู่แท้ของฉัน</span>
                </div>
                <div className="p-3 rounded-DEFAULT bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">วันที่มีผล</span>
                  <span className="font-headline-sm text-headline-sm text-primary mt-0.5">วันนี้และตลอดไป</span>
                </div>
              </div>

              <div className="p-3 rounded-DEFAULT bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">รหัสทะเบียน</span>
                  <span className="font-label-md text-label-md text-on-surface font-mono tracking-wider">
                    #LOVE-2024-INFINITY
                  </span>
                </div>
                <Icon name="favorite" filled className="text-primary text-[28px]" />
              </div>

              <div className="relative py-2 flex items-center justify-center">
                <div className="w-full border-t border-dashed border-outline-variant" />
                <div className="absolute -left-8 w-6 h-6 rounded-full bg-surface" />
                <div className="absolute -right-8 w-6 h-6 rounded-full bg-surface" />
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-space-xs min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md shrink-0">
                    <Icon name="auto_awesome" filled className="text-[20px]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface font-bold">Heartstrings Registry</span>
                    <span className="font-label-sm text-[10px] text-on-surface-variant">คำสัญญาถาวรที่เปลี่ยนแปลงไม่ได้</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-sm text-[10px] text-tertiary uppercase">ตราประทับแท้</span>
                  <span className="font-headline-sm text-headline-sm text-primary italic font-serif">♥ Forever ♥</span>
                </div>
              </div>
            </div>

            <div className="relative w-full h-28 overflow-hidden bg-surface-container-high">
              <img src="/images/rings.jpg" alt="แหวนเงินวางข้างกุหลาบสีชมพูและจดหมายลายมือ" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
            </div>
          </div>

          <div className="flex flex-col gap-space-sm w-full pt-space-xs">
            <button
              type="button"
              onClick={() => showToast('ดาวน์โหลดบัตรที่ระลึกอย่างเป็นทางการแล้ว! 💌')}
              className="w-full py-3.5 px-space-md rounded-full bg-primary-container text-on-primary font-headline-sm text-headline-sm shadow-lg shadow-primary-container/25 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
            >
              <Icon name="download" className="text-[20px]" />
              ดาวน์โหลดบัตรที่ระลึก
            </button>
            <button
              type="button"
              onClick={() => showToast('เทมเพลตพร้อมโพสต์แล้ว! 📸')}
              className="w-full py-3 px-space-md rounded-full bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="share" className="text-[18px] text-primary" />
              แชร์ไปยัง Instagram Story
            </button>
            <button
              type="button"
              onClick={replay}
              className="w-full py-2.5 px-space-md rounded-full bg-transparent text-tertiary font-label-md text-label-md hover:bg-surface-container-low/50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Icon name="replay" className="text-[18px]" />
              เล่นจดหมายใหม่ตั้งแต่ต้น
            </button>
          </div>
        </div>
      )}

      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-20 inset-x-margin mx-auto max-w-xs px-4 py-2.5 rounded-full bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm shadow-xl flex items-center justify-center gap-2 transition-all duration-300 z-50 ${
          toast ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Icon name="check_circle" className="text-[16px] text-primary-fixed" />
        <span>{toast}</span>
      </div>
    </div>
  )
}

function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const colors = ['#E11D48', '#FB7185', '#FDA4AF', '#A78BFA', '#FBBF24', '#F472B6']
    const particles = Array.from({ length: 65 }, () => ({
      x: width / 2,
      y: height / 3,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.8) * 14,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      isHeart: Math.random() > 0.65,
    }))

    const DURATION = 5000
    const start = performance.now()
    let frame = 0

    const drawHeart = (size: number) => {
      const top = size * 0.3
      ctx.beginPath()
      ctx.moveTo(0, top)
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, top)
      ctx.bezierCurveTo(-size / 2, (size + top) / 2, 0, size, 0, size)
      ctx.bezierCurveTo(0, size, size / 2, (size + top) / 2, size / 2, top)
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, top)
      ctx.fill()
    }

    const draw = (now: number) => {
      const elapsed = now - start
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.22
        p.vx *= 0.98
        p.rotation += p.rotationSpeed

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, 1 - elapsed / DURATION)
        ctx.fillStyle = p.color
        if (p.isHeart) {
          drawHeart(p.size)
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        }
        ctx.restore()
      }

      if (elapsed < DURATION) {
        frame = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, width, height)
      }
    }

    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 w-full h-full z-40" />
}
