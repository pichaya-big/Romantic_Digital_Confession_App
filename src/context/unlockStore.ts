import { createContext, useContext } from 'react'

export interface UnlockContextValue {
  unlocked: boolean
  unlock: () => void
}

export const UnlockContext = createContext<UnlockContextValue | null>(null)

export function useUnlock(): UnlockContextValue {
  const ctx = useContext(UnlockContext)
  if (!ctx) throw new Error('useUnlock must be used inside UnlockProvider')
  return ctx
}
