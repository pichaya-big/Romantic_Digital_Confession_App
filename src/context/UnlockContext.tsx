import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { UnlockContext } from './unlockStore.ts'

const STORAGE_KEY = 'heartstrings-unlocked'

function readStoredUnlock(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function UnlockProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [unlocked, setUnlocked] = useState(readStoredUnlock)

  const unlock = useCallback(() => {
    setUnlocked(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // storage ใช้ไม่ได้ (เช่น private mode) ให้ปลดล็อคได้ในรอบการใช้งานนี้เท่านั้น
    }
  }, [])

  const value = useMemo(() => ({ unlocked, unlock }), [unlocked, unlock])

  return <UnlockContext.Provider value={value}>{children}</UnlockContext.Provider>
}
