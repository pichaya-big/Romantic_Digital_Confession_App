import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell.jsx'
import EnvelopePage from './pages/EnvelopePage.jsx'
import MomentsPage from './pages/MomentsPage.jsx'
import ReasonsPage from './pages/ReasonsPage.jsx'
import CouponsPage from './pages/CouponsPage.jsx'
import QuestionPage from './pages/QuestionPage.jsx'

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
