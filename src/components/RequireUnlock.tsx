import { Link, Outlet } from 'react-router-dom'
import Icon from './Icon.tsx'
import { useUnlock } from '../context/unlockStore.ts'

export default function RequireUnlock() {
  const { unlocked } = useUnlock()

  if (unlocked) return <Outlet />

  return (
    <div className="flex flex-col items-center justify-center w-full px-margin pt-space-xl">
      <div className="w-full max-w-sm rounded-lg bg-surface-container-lowest/85 backdrop-blur-xl shadow-xl p-space-lg flex flex-col items-center text-center gap-space-sm">
        <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
          <Icon name="lock" filled className="text-[32px]" />
        </div>
        <h1 className="font-headline-sm text-headline-sm text-on-surface">หน้านี้ยังถูกล็อคอยู่</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          กรุณาปลดล็อคหน้าจดหมายก่อน โดยกรอกวันที่เราเจอกันครั้งแรก
        </p>
        <Link
          to="/envelope"
          className="mt-space-sm w-full py-3 px-space-md rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
        >
          <Icon name="mail" className="text-[18px]" />
          <span>ไปปลดล็อคหน้าจดหมาย</span>
        </Link>
      </div>
    </div>
  )
}
