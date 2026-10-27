import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.tsx'

interface QuizOption {
  label: string
  sub: string
  icon: string
  iconClass: string
}

interface Quiz {
  question: string
  hint: string
  options: QuizOption[]
}

interface Coupon {
  id: string
  golden?: boolean
  code: string
  codeClass: string
  codeIcon?: string
  statusDot?: string | null
  statusIcon?: string
  statusText: string
  statusClass: string
  title: string
  description: string
  metaLabel: string
  metaValue: string
  metaClass: string
  buttonIcon: string
  buttonLabel: string
  buttonClass: string
  tearLabel: string
  tearClass?: string
  serial: string
  serialClass: string
  bars: string[]
  barClass: string
  stampClass: string
  stampIcon: string
  stampText: string
}

const QUIZ: Quiz = {
  question: '“ใครพูดว่า ‘คิดถึงนะ’ ก่อน?”',
  hint: 'เลือกว่าใครเป็นคนเริ่มก่อน ตอบตามความจริงนะ!',
  options: [
    { label: 'คุณเลย!', sub: 'ไม่ลังเลเลยสักนิด', icon: 'sentiment_satisfied_alt', iconClass: 'text-secondary' },
    { label: 'แน่นอนว่าฉัน', sub: 'หน้าแดงทันที', icon: 'favorite', iconClass: 'text-primary' },
    { label: 'พร้อมกันเลย', sub: 'เชื่อมจิตกันจริง ๆ', icon: 'sync_alt', iconClass: 'text-tertiary' },
    { label: 'ข้อความตีสาม', sub: 'หลักฐานยังอยู่', icon: 'music_note', iconClass: 'text-secondary-container' },
  ],
}

const COUPONS: Coupon[] = [
  {
    id: 'coupon-1',
    code: '#HS-001 • SWEET REWARD',
    codeClass: 'bg-primary-fixed text-on-primary-fixed',
    statusDot: 'bg-primary animate-ping',
    statusText: 'ใช้งานได้ • เหลือ 1 ครั้ง',
    statusClass: 'text-tertiary',
    title: 'ชานมไข่มุกตามสั่ง',
    description: 'ขนาดไหนก็ได้ ท็อปปิ้งไข่มุกไม่จำกัด ปรับความหวานหรือน้ำแข็งตามที่คุณชอบ',
    metaLabel: 'สิทธิ์ของผู้ถือ',
    metaValue: 'ไม่มีถามสักคำ',
    metaClass: 'text-primary',
    buttonIcon: 'touch_app',
    buttonLabel: 'แตะเพื่อแลก',
    buttonClass: 'bg-primary-container text-on-primary',
    tearLabel: 'VOUCHER 01',
    serial: 'BBA-LOVE',
    serialClass: 'text-tertiary',
    bars: ['w-0.5', 'w-1', 'w-0.5', 'w-1.5', 'w-0.5', 'w-1', 'w-0.5', 'w-2'],
    barClass: 'bg-on-surface',
    stampClass: 'bg-primary/95 text-on-primary -rotate-12',
    stampIcon: 'verified',
    stampText: 'แลกแล้ว ❤️',
  },
  {
    id: 'coupon-2',
    code: '#HS-002 • COZY PASS',
    codeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    statusDot: 'bg-secondary',
    statusText: 'ใช้งานได้ • ไม่จำกัด',
    statusClass: 'text-secondary',
    title: 'วันพักผ่อนเงียบ ๆ หนึ่งวัน',
    description:
      'กอดอุ่น ๆ ไม่จำกัด สิทธิ์เลือกหนังดูยาวทั้งวัน (คุณเป็นคนเลือกทั้งหมด) และไม่ต้องทำงานบ้าน',
    metaLabel: 'ระยะเวลา',
    metaValue: 'ต่ออายุได้ตลอดไป',
    metaClass: 'text-secondary',
    buttonIcon: 'bedtime',
    buttonLabel: 'ขอกอดหนึ่งที',
    buttonClass: 'bg-secondary text-on-secondary',
    tearLabel: 'VOUCHER 02',
    serial: 'COZY-99',
    serialClass: 'text-secondary',
    bars: ['w-1', 'w-0.5', 'w-2', 'w-0.5', 'w-1', 'w-1.5'],
    barClass: 'bg-on-surface',
    stampClass: 'bg-secondary/95 text-on-secondary -rotate-6',
    stampIcon: 'favorite',
    stampText: 'ฉันอนุมัติแล้ว ❤️',
  },
  {
    id: 'coupon-3',
    code: '#HS-003 • CRAVINGS',
    codeClass: 'bg-surface-container-high text-on-surface',
    statusDot: 'bg-tertiary',
    statusText: 'ใช้งานได้ • ทุกเวลา',
    statusClass: 'text-tertiary',
    title: 'วิ่งหาของกินตอนเที่ยงคืน',
    description:
      'วิ่งไปซื้อไอศกรีม เฟรนช์ฟรายส์ หรือราเมงเผ็ดในชุดนอน ระยะทางไม่ใช่อุปสรรคของความอยากของเรา',
    metaLabel: 'เวลา',
    metaValue: '11 PM – 4 AM',
    metaClass: 'text-tertiary',
    buttonIcon: 'local_pizza',
    buttonLabel: 'ส่งฉันไปซื้อเลย!',
    buttonClass: 'bg-tertiary text-on-tertiary',
    tearLabel: 'VOUCHER 03',
    serial: 'NITE-BIT',
    serialClass: 'text-tertiary',
    bars: ['w-0.5', 'w-2', 'w-1', 'w-0.5', 'w-1'],
    barClass: 'bg-on-surface',
    stampClass: 'bg-tertiary/95 text-on-tertiary rotate-3',
    stampIcon: 'done_all',
    stampText: 'แลกแล้ว ❤️',
  },
  {
    id: 'coupon-4',
    golden: true,
    code: 'GOLDEN EDITION',
    codeClass: 'bg-surface-container-lowest/80 text-on-primary-fixed-variant',
    codeIcon: 'workspace_premium',
    statusDot: null,
    statusIcon: 'all_inclusive',
    statusClass: 'text-on-primary-fixed',
    statusText: 'ไม่มีวันหมดอายุ',
    title: 'บัตรผ่านหยุดทะเลาะเล็ก ๆ',
    description:
      'ใช้การ์ดนี้ได้ทันทีในทุกการทะเลาะเล็ก ๆ (ใครเปิดไฟทิ้งไว้ จะกินอะไรดี) แลกกับกอดและสัญญาสงบศึกอัตโนมัติ',
    metaLabel: 'พลังพิเศษ',
    metaValue: 'สงบศึกทันที + จูบ',
    metaClass: 'text-primary',
    buttonIcon: 'handshake',
    buttonLabel: 'แลกสงบศึก',
    buttonClass: 'bg-primary text-on-primary',
    tearLabel: 'GOLD VIP',
    tearClass: 'text-on-primary-fixed',
    serial: 'TRUCE-00',
    serialClass: 'text-primary',
    bars: ['w-1', 'w-0.5', 'w-1.5', 'w-0.5', 'w-2'],
    barClass: 'bg-primary',
    stampClass: 'bg-primary text-on-primary -rotate-12',
    stampIcon: 'verified_user',
    stampText: 'ฉันอนุมัติแล้ว ❤️',
  },
]

export default function CouponsPage() {
  const [redeemed, setRedeemed] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(COUPONS.map((c) => [c.id, false])),
  )
  const [answer, setAnswer] = useState<string | null>(null)

  const readyCount = COUPONS.filter((c) => !redeemed[c.id]).length

  const toggleRedeem = (id: string) => setRedeemed((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="flex flex-col w-full px-margin pb-space-lg gap-space-lg relative overflow-hidden">
      <div className="absolute -top-12 -left-16 w-56 h-56 rounded-full bg-secondary-fixed opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute top-80 -right-16 w-60 h-60 rounded-full bg-primary-fixed opacity-50 blur-3xl pointer-events-none" />

      {/* Intro */}
      <div className="flex flex-col gap-space-xs pt-space-xs">
        <div className="inline-flex items-center gap-space-xs self-start px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed">
          <Icon name="favorite" filled className="text-[16px]" />
          <span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">มุมเกมของคู่รัก</span>
        </div>
        <div className="flex items-center justify-between gap-space-sm">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">เหรียญและคำขอบคุณ</h1>
          <div className="flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full text-tertiary shrink-0">
            <Icon name="stars" className="text-[16px]" />
            <span className="font-label-sm text-label-sm font-bold">คูปองพร้อมใช้ {readyCount} ใบ</span>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          คำถามสนุก ๆ ที่ทดสอบหัวใจของคุณ พร้อมคำสัญญาที่แลกได้ เฉพาะสำหรับคุณ
        </p>
      </div>

      {/* Quiz */}
      <section className="flex flex-col gap-space-sm bg-surface-container-lowest/80 backdrop-blur-xl rounded-lg p-space-md shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs text-primary">
            <Icon name="quiz" filled className="text-[20px]" />
            <span className="font-label-md text-label-md font-bold uppercase tracking-wider">ควิซความเข้ากัน • ข้อ 1 จาก 1</span>
          </div>
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
            สนุกและหวาน
          </span>
        </div>

        <div className="flex flex-col gap-space-xs">
          <p className="font-headline-sm text-headline-sm text-on-surface leading-snug">
            “ใคร<span className="text-primary font-bold">‘คิดถึงนะ’</span>พูดก่อน?”
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">{QUIZ.hint}</p>
        </div>

        <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
          {QUIZ.options.map((opt) => {
            const selected = answer === opt.label
            return (
              <button
                key={opt.label}
                type="button"
                aria-pressed={selected}
                onClick={() => setAnswer(opt.label)}
                className={`group flex flex-col items-center justify-center p-3.5 rounded-DEFAULT transition-all text-center ${
                  selected
                    ? 'bg-primary-container text-on-primary shadow-md'
                    : 'bg-surface-container-low text-on-surface hover:bg-secondary-fixed'
                }`}
              >
                <Icon
                  name={opt.icon}
                  className={`text-[24px] mb-1 group-hover:scale-110 transition-transform ${
                    selected ? 'text-on-primary' : opt.iconClass
                  }`}
                />
                <span className="font-label-md text-label-md font-semibold">{opt.label}</span>
                <span className="font-body-sm text-body-sm text-[11px] opacity-80">{opt.sub}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-space-xs p-3.5 rounded-DEFAULT bg-gradient-to-r from-primary-fixed to-secondary-fixed flex items-center gap-space-sm text-on-primary-fixed shadow-sm">
          <div className="w-9 h-9 rounded-full bg-surface-container-lowest/80 flex items-center justify-center shrink-0 text-primary">
            <Icon name="auto_awesome" filled className="text-[22px]" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-md text-label-md font-bold text-on-primary-fixed">คะแนนความเข้ากัน: 100%</span>
              <span className="font-label-sm text-[11px] px-1.5 py-px bg-primary text-on-primary rounded-full font-bold">
                PERFECT
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              ยืนยันแล้ว: เข้ากันเป็นคู่แท้! ✨
            </p>
          </div>
        </div>
      </section>

      {/* Vouchers */}
      <section className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">คูปองความรักที่แลกได้</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">แตะเพื่อแลกได้ทุกเมื่อที่หัวใจต้องการ</p>
          </div>
          <Icon name="confirmation_number" className="text-tertiary text-[26px]" />
        </div>

        {COUPONS.map((coupon) => (
          <Voucher
            key={coupon.id}
            coupon={coupon}
            isRedeemed={redeemed[coupon.id]}
            onToggle={() => toggleRedeem(coupon.id)}
          />
        ))}
      </section>

      {/* Next step */}
      <aside className="mt-space-sm flex flex-col items-center">
        <Link
          to="/the-question"
          className="w-full relative group p-space-md rounded-lg bg-gradient-to-r from-primary via-tertiary-container to-secondary text-on-primary shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-between overflow-hidden active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-space-sm relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Icon name="volunteer_activism" filled className="text-[28px] animate-pulse [animation-duration:1.2s]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-white/80">ขั้นต่อไป</span>
              <span className="font-headline-sm text-headline-sm font-bold text-white leading-tight">
                พร้อมสำหรับคำถามที่สำคัญที่สุดหรือยัง?
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 relative z-10 group-hover:translate-x-1 transition-transform">
            <Icon name="arrow_forward" className="text-[22px]" />
          </div>
        </Link>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-2.5">
          คำตอบของคุณจะปลดล็อกคำสารภาพสุดท้ายที่ผนึกไว้
        </p>
      </aside>
    </div>
  )
}

function Voucher({ coupon, isRedeemed, onToggle }: Readonly<{ coupon: Coupon; isRedeemed: boolean; onToggle: () => void }>) {
  const cardBg = coupon.golden
    ? 'bg-gradient-to-br from-primary-fixed to-secondary-fixed shadow-md'
    : 'bg-surface-container-lowest/90 backdrop-blur-md shadow-sm'
  const stubBg = coupon.golden ? 'bg-surface-container-lowest/60 backdrop-blur-sm' : 'bg-surface-container-low'

  return (
    <article
      id={coupon.id}
      className={`relative rounded-DEFAULT overflow-hidden transition-all duration-300 ${cardBg} ${
        isRedeemed ? 'grayscale-[0.35] opacity-90' : ''
      }`}
    >
      <div className="flex items-stretch relative z-10">
        <div className="flex-1 p-space-md flex flex-col justify-between gap-space-sm min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full font-label-sm text-[11px] font-bold tracking-wider flex items-center gap-1 ${coupon.codeClass}`}
            >
              {coupon.codeIcon && (
                <Icon name={coupon.codeIcon} filled className="text-[13px] text-primary" />
              )}
              {coupon.code}
            </span>
            <span
              className={`font-label-sm text-[11px] font-semibold flex items-center gap-1 shrink-0 ${
                isRedeemed ? 'text-outline' : coupon.statusClass
              }`}
            >
              {coupon.statusIcon ? (
                <Icon name={coupon.statusIcon} className="text-[14px]" />
              ) : (
                <span
                  className={`w-2 h-2 rounded-full inline-block ${isRedeemed ? 'bg-outline' : coupon.statusDot}`}
                />
              )}
              {isRedeemed ? 'เพิ่งใช้ไป' : coupon.statusText}
            </span>
          </div>

          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-snug">
              {coupon.title}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{coupon.description}</p>
          </div>

          <div className="relative w-full border-t border-dashed border-outline-variant/60" />

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                {coupon.metaLabel}
              </span>
              <span className={`font-label-md text-label-md font-bold ${coupon.metaClass}`}>{coupon.metaValue}</span>
            </div>
            <button
              type="button"
              onClick={onToggle}
              className={`px-4 py-2 rounded-full font-label-md text-label-md font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center gap-1 shrink-0 ${
                isRedeemed ? 'bg-surface-dim text-on-surface-variant' : coupon.buttonClass
              }`}
            >
              <Icon name={isRedeemed ? 'check_circle' : coupon.buttonIcon} className="text-[16px]" />
              <span>{isRedeemed ? 'แลกแล้ว' : coupon.buttonLabel}</span>
            </button>
          </div>
        </div>

        {/* Perforated stub */}
        <div className={`relative w-16 ${stubBg} flex flex-col items-center justify-between py-4 px-1 shrink-0`}>
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-surface" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-surface" />
          <span
            className={`font-label-sm text-[9px] tracking-widest rotate-90 uppercase whitespace-nowrap mt-4 ${
              coupon.tearClass ?? 'text-on-surface-variant'
            }`}
          >
            {coupon.tearLabel}
          </span>
          <div className="flex items-center gap-0.5 h-16 w-8 my-auto opacity-70">
            {coupon.bars.map((w, i) => (
              <div key={i} className={`h-full ${w} ${coupon.barClass}`} />
            ))}
          </div>
          <span className={`font-label-sm text-[10px] font-bold tracking-tighter ${coupon.serialClass}`}>
            {coupon.serial}
          </span>
        </div>
      </div>

      {/* Stamp overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
          isRedeemed ? 'opacity-100 scale-100' : 'opacity-0 scale-150'
        }`}
      >
        <div
          className={`transform px-6 py-2 rounded-DEFAULT font-headline-sm text-headline-sm font-extrabold uppercase tracking-widest shadow-xl flex items-center gap-2 ${coupon.stampClass}`}
        >
          <Icon name={coupon.stampIcon} filled className="text-[24px]" />
          <span>{coupon.stampText}</span>
        </div>
      </div>
    </article>
  )
}
