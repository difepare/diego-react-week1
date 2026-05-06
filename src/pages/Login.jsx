import { supabase } from '../supabaseClient'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    // Si ya hay sesión, mándalo a dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/dashboard')
    })
  }, [navigate])

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="bg-gray-800 rounded-2xl p-10 max-w-md w-full text-center border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6">
          Entra a la casa de Diego 🔐
        </h1>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-3"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" />
          Entrar con Google
        </button>
      </div>
    </div>
  )
}