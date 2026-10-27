import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell.tsx'
import RequireUnlock from './components/RequireUnlock.tsx'
import { UnlockProvider } from './context/UnlockContext.tsx'
import EnvelopePage from './pages/EnvelopePage.tsx'
import MomentsPage from './pages/MomentsPage.tsx'
import ReasonsPage from './pages/ReasonsPage.tsx'
import CouponsPage from './pages/CouponsPage.tsx'
import QuestionPage from './pages/QuestionPage.tsx'

function App() {
  return (
    <UnlockProvider>
      <Routes>
        <Route element={<AppShell />}>
          {/* หน้าจดหมายเปิดได้เสมอ เพราะเป็นหน้าที่ใช้ปลดล็อค */}
          <Route path="envelope" element={<EnvelopePage />} />

          {/* หน้าอื่นทั้งหมดต้องปลดล็อคก่อน */}
          <Route element={<RequireUnlock />}>
            <Route path="moments" element={<MomentsPage />} />
            <Route path="reasons" element={<ReasonsPage />} />
            <Route path="coupons" element={<CouponsPage />} />
            <Route path="the-question" element={<QuestionPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/envelope" replace />} />
      </Routes>
    </UnlockProvider>
  )
}

export default App
