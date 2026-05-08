import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home' // ← DEJA SOLO ESTA
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Posts from './pages/Posts'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  )
}

export default App