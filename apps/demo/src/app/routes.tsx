import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { GradebookPage } from '../pages/gradebook'
import { ShadcnPage } from '../pages/shadcn'
import { Navbar } from '../widgets/navbar'

export function AppRoutes() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gradebook" element={<GradebookPage />} />
          <Route path="/shadcn" element={<ShadcnPage />} />
        </Routes>
      </main>
    </div>
  )
}
