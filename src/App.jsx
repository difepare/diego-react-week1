import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home' // ← NUEVO
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
// ... otros imports

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ← CAMBIA ESTO */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        {/* ... otras rutas */}
      </Routes>
    </BrowserRouter>
  )
}