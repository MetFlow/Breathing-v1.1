import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ArcStylePicker from './components/ArcStylePicker'
import VisualBreathing from './components/VisualBreathing'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VisualBreathing />} />
        <Route path="/arc-demo" element={<ArcStylePicker />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
