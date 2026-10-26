export interface Tab {
  path: string
  label: string
  icon: string
}

export const TABS: Tab[] = [
  { path: '/envelope', label: 'Envelope', icon: 'mail' },
  { path: '/moments', label: 'Moments', icon: 'auto_stories' },
  { path: '/reasons', label: 'Reasons', icon: 'favorite' },
  { path: '/coupons', label: 'Coupons', icon: 'redeem' },
  { path: '/the-question', label: 'The Question', icon: 'volunteer_activism' },
]
