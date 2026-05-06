import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    const { data: { user } = await supabase.auth.getUser()
    
    if (!user) {
      navigate('/login')
    } else {
      setUser(user)
      getPosts(user.email)
    }
    setLoading(false)
  }

  async function getPosts(email) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', email)
      .order('created_at', { ascending: false })
    
    if (!error) setPosts(data || [])
  }

  async function createPost(e) {
    e.preventDefault()
    if (!newPost.trim()) return

    const { error } = await supabase
      .from('posts')
      .insert({ 
        user_id: user.email, 
        content: newPost 
      })

    if (!error) {
      setNewPost('')
      getPosts(user.email) // Recarga la lista
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      Cargando tu mundo...
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* HEADER CON TU FOTO */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img 
              src={user.user_metadata.avatar_url} 
              className="w-16 h-16 rounded-full border-2 border-blue-500" 
            />
            <div>
              <h1 className="text-2xl font-bold">Hola, {user.user_metadata.full_name}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={signOut} 
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Salir
          </button>
        </div>

        {/* CAJA PARA ESCRIBIR RECUERDOS */}
        <form onSubmit={createPost} className="mb-8">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="¿Qué quieres recordar hoy, Ing. del Flow?"
            className="w-full bg-gray-800 border-gray-700 rounded-lg p-4 mb-3 text-white focus:border-blue-500 outline-none"
            rows="3"
          />
          <button 
            type="submit" 
            className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold w-full"
          >
            Guardar recuerdo en la nube ☁️
          </button>
        </form>

        {/* LISTA DE RECUERDOS */}
        <h2 className="text-xl font-bold mb-4">Tus recuerdos guardados:</h2>
        <div className="space-y-3">
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Aún no tienes recuerdos. ¡Escribe el primero arriba!
            </p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-gray-800 p-4 rounded-lg border-gray-700">
                <p className="text-lg">{post.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(post.created_at).toLocaleString('es-CO', { 
                    dateStyle: 'medium', 
                    timeStyle: 'short' 
                  })}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}