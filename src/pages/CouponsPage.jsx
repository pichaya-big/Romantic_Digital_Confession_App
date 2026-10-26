import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

const QUIZ = {
  question: '“Who said ‘I miss you’ first?”',
  hint: 'Pick who made the first move. Be honest!',
  options: [
    { label: 'You did!', sub: 'With zero hesitation', icon: 'sentiment_satisfied_alt', iconClass: 'text-secondary' },
    { label: 'Definitely me', sub: 'Blushing immediately', icon: 'favorite', iconClass: 'text-primary' },
    { label: 'At the same second', sub: 'Telepathic link', icon: 'sync_alt', iconClass: 'text-tertiary' },
    { label: 'The 3AM text', sub: 'Proof still exists', icon: 'music_note', iconClass: 'text-secondary-container' },
  ],
}

const COUPONS = [
  {
    id: 'coupon-1',
    code: '#HS-001 • SWEET REWARD',
    codeClass: 'bg-primary-fixed text-on-primary-fixed',
    statusDot: 'bg-primary animate-ping',
    statusText: 'Active • 1 Available',
    statusClass: 'text-tertiary',
    title: 'Bubble Tea on Demand',
    description: 'Any size, unlimited boba toppings, delivered with extra sugar or ice level of your choice.',
    metaLabel: 'Bearer Privileges',
    metaValue: 'No Questions Asked',
    metaClass: 'text-primary',
    buttonIcon: 'touch_app',
    buttonLabel: 'Tap to Redeem',
    buttonClass: 'bg-primary-container text-on-primary',
    tearLabel: 'VOUCHER 01',
    serial: 'BBA-LOVE',
    serialClass: 'text-tertiary',
    bars: ['w-0.5', 'w-1', 'w-0.5', 'w-1.5', 'w-0.5', 'w-1', 'w-0.5', 'w-2'],
    barClass: 'bg-on-surface',
    stampClass: 'bg-primary/95 text-on-primary -rotate-12',
    stampIcon: 'verified',
    stampText: 'REDEEMED ❤️',
  },
  {
    id: 'coupon-2',
    code: '#HS-002 • COZY PASS',
    codeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    statusDot: 'bg-secondary',
    statusText: 'Active • Unlimited',
    statusClass: 'text-secondary',
    title: 'One Day Peaceful Chill-Out',
    description:
      'Unlimited warm cuddles, streaming marathon rights (you choose all movies), and zero chores allowed.',
    metaLabel: 'Validity',
    metaValue: 'Forever Renewable',
    metaClass: 'text-secondary',
    buttonIcon: 'bedtime',
    buttonLabel: 'Claim Snuggles',
    buttonClass: 'bg-secondary text-on-secondary',
    tearLabel: 'VOUCHER 02',
    serial: 'COZY-99',
    serialClass: 'text-secondary',
    bars: ['w-1', 'w-0.5', 'w-2', 'w-0.5', 'w-1', 'w-1.5'],
    barClass: 'bg-on-surface',
    stampClass: 'bg-secondary/95 text-on-secondary -rotate-6',
    stampIcon: 'favorite',
    stampText: 'APPROVED BY ME ❤️',
  },
  {
    id: 'coupon-3',
    code: '#HS-003 • CRAVINGS',
    codeClass: 'bg-surface-container-high text-on-surface',
    statusDot: 'bg-tertiary',
    statusText: 'Active • Valid 24/7',
    statusClass: 'text-tertiary',
    title: 'Midnight Snack Run',
    description:
      'Ice cream, fries, or spicy ramen run in pajamas. Distance is no obstacle to our cravings.',
    metaLabel: 'Hours',
    metaValue: '11 PM – 4 AM',
    metaClass: 'text-tertiary',
    buttonIcon: 'local_pizza',
    buttonLabel: 'Send Me Out!',
    buttonClass: 'bg-tertiary text-on-tertiary',
    tearLabel: 'VOUCHER 03',
    serial: 'NITE-BIT',
    serialClass: 'text-tertiary',
    bars: ['w-0.5', 'w-2', 'w-1', 'w-0.5', 'w-1'],
    barClass: 'bg-on-surface',
    stampClass: 'bg-tertiary/95 text-on-tertiary rotate-3',
    stampIcon: 'done_all',
    stampText: 'REDEEMED ❤️',
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
    statusText: 'Never Expires',
    title: 'Get Out of Any Minor Argument Free',
    description:
      'Play this card immediately during any petty disagreement (who left the lights on, what to eat). Yields an automatic hug and peace treaty.',
    metaLabel: 'Superpower',
    metaValue: 'Instant Truce + Kiss',
    metaClass: 'text-primary',
    buttonIcon: 'handshake',
    buttonLabel: 'Redeem Truce',
    buttonClass: 'bg-primary text-on-primary',
    tearLabel: 'GOLD VIP',
    tearClass: 'text-on-primary-fixed',
    serial: 'TRUCE-00',
    serialClass: 'text-primary',
    bars: ['w-1', 'w-0.5', 'w-1.5', 'w-0.5', 'w-2'],
    barClass: 'bg-primary',
    stampClass: 'bg-primary text-on-primary -rotate-12',
    stampIcon: 'verified_user',
    stampText: 'APPROVED BY ME ❤️',
  },
]

export default function CouponsPage() {
  const [redeemed, setRedeemed] = useState(() => Object.fromEntries(COUPONS.map((c) => [c.id, false])))
  const [answer, setAnswer] = useState(null)

  const readyCount = COUPONS.filter((c) => !redeemed[c.id]).length

  const toggleRedeem = (id) => setRedeemed((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="flex flex-col w-full px-margin pb-space-lg gap-space-lg relative overflow-hidden">
      <div className="absolute -top-12 -left-16 w-56 h-56 rounded-full bg-secondary-fixed opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute top-80 -right-16 w-60 h-60 rounded-full bg-primary-fixed opacity-50 blur-3xl pointer-events-none" />

      {/* Intro */}
      <div className="flex flex-col gap-space-xs pt-space-xs">
        <div className="inline-flex items-center gap-space-xs self-start px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed">
          <Icon name="favorite" filled className="text-[16px]" />
          <span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">Couples Arcade</span>
        </div>
        <div className="flex items-center justify-between gap-space-sm">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Tokens &amp; Tributes</h1>
          <div className="flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full text-tertiary shrink-0">
            <Icon name="stars" className="text-[16px]" />
            <span className="font-label-sm text-label-sm font-bold">{readyCount} Coupons Ready</span>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Playful questions to test your heartstrings, paired with redeemable promises just for you.
        </p>
      </div>

      {/* Quiz */}
      <section className="flex flex-col gap-space-sm bg-surface-container-lowest/80 backdrop-blur-xl rounded-lg p-space-md shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs text-primary">
            <Icon name="quiz" filled className="text-[20px]" />
            <span className="font-label-md text-label-md font-bold uppercase tracking-wider">Harmony Quiz • Q1 of 1</span>
          </div>
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
            Fun &amp; Sweet
          </span>
        </div>

        <div className="flex flex-col gap-space-xs">
          <p className="font-headline-sm text-headline-sm text-on-surface leading-snug">
            “Who said <span className="text-primary font-bold">‘I miss you’</span> first?”
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
              <span className="font-label-md text-label-md font-bold text-on-primary-fixed">Match Score: 100%</span>
              <span className="font-label-sm text-[11px] px-1.5 py-px bg-primary text-on-primary rounded-full font-bold">
                PERFECT
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Soulmate Compatibility locked in! ✨
            </p>
          </div>
        </div>
      </section>

      {/* Vouchers */}
      <section className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Redeemable Love Vouchers</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Tap to redeem whenever your heart demands.</p>
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
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-white/80">Next Step</span>
              <span className="font-headline-sm text-headline-sm font-bold text-white leading-tight">
                Ready for the most important question?
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 relative z-10 group-hover:translate-x-1 transition-transform">
            <Icon name="arrow_forward" className="text-[22px]" />
          </div>
        </Link>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-2.5">
          Your answer unlocks the final sealed confession.
        </p>
      </aside>
    </div>
  )
}

function Voucher({ coupon, isRedeemed, onToggle }) {
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
              {isRedeemed ? 'Used just now' : coupon.statusText}
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
              <span>{isRedeemed ? 'Redeemed' : coupon.buttonLabel}</span>
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
