export interface Tab {
  path: string
  label: string
  icon: string
}

export const TABS: Tab[] = [
  { path: '/envelope', label: 'จดหมาย', icon: 'mail' },
  { path: '/moments', label: 'ความทรงจำ', icon: 'auto_stories' },
  { path: '/reasons', label: 'เหตุผล', icon: 'favorite' },
  { path: '/coupons', label: 'คูปอง', icon: 'redeem' },
  { path: '/the-question', label: 'คำถามสำคัญ', icon: 'volunteer_activism' },
]
