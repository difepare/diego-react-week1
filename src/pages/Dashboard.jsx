import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate('/login')
      } else {
        setUser(user)
      }
    })
  }, [navigate])

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (!user) return <p className="text-white">Cargando...</p>

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          Hola, {user.email} 👋
        </h1>
        <img src={user.user_metadata.avatar_url} className="w-20 h-20 rounded-full mb-6" />
        <p className="text-gray-400 mb-8">
          Bienvenido al cuarto privado. Solo gente logueada ve esto.
        </p>
        <button
          onClick={signOut}
          className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}