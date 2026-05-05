import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import App from './App.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Posts from './pages/Posts.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './index.css'

function Layout() {
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // 1. Revisa si ya hay sesión al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // 2. Escucha si entras o sales con Google
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <>
      <nav className="bg-gray-900 p-4 flex gap-4 text-white">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/posts">Posts</Link>
        
        {session ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={signOut} className="ml-auto bg-red-600 px-3 py-1 rounded">
              Salir
            </button>
          </>
        ) : (
          <Link to="/login" className="ml-auto">Login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
)