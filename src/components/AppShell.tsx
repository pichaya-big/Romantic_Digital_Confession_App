import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon from './Icon.tsx'
import { TABS } from '../nav.js'

export default function AppShell() {
  const { pathname } = useLocation()
  const current = TABS.find((tab) => pathname.startsWith(tab.path)) ?? TABS[0]

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary-fixed selection:text-on-primary-fixed">
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(225,29,72,0.05)]">
        <div className="h-16 px-margin flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <img
              src="/images/logo.jpg"
              alt="โลโก้ Heartstrings"
              className="h-8 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col truncate">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">
                Heartstrings
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface truncate leading-tight">
                {current.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs shrink-0">
            <button
              type="button"
              aria-label="เพลงโรแมนติก"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-surface-container-low/70 text-tertiary hover:text-primary transition-colors"
            >
              <Icon name="music_note" className="text-[22px]" />
            </button>
            <img
              src="/images/avatar.jpg"
              alt="โปรไฟล์"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-4px_24px_rgba(225,29,72,0.06)]">
        <div className="flex justify-between items-center h-16 px-space-xs max-w-md mx-auto">
          {TABS.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center py-space-xs gap-0.5 transition-colors ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`
              }
            >
              <Icon name={tab.icon} className="text-[20px]" />
              <span className="font-label-sm text-[11px] leading-tight">{tab.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
