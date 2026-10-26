import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell.tsx'
import EnvelopePage from './pages/EnvelopePage.tsx'
import MomentsPage from './pages/MomentsPage.tsx'
import ReasonsPage from './pages/ReasonsPage.tsx'
import CouponsPage from './pages/CouponsPage.tsx'
import QuestionPage from './pages/QuestionPage.tsx'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="envelope" element={<EnvelopePage />} />
        <Route path="moments" element={<MomentsPage />} />
        <Route path="reasons" element={<ReasonsPage />} />
        <Route path="coupons" element={<CouponsPage />} />
        <Route path="the-question" element={<QuestionPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/envelope" replace />} />
    </Routes>
  )
}

export default App
