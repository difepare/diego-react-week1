import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // 1. Traer usuario y sus posts cuando carga la página
  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    // ¿Quién está logueado?
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      navigate('/login') // Si no hay nadie, pa' fuera
    } else {
      setUser(user)
      getPosts(user.email) // Trae los posts de este usuario
    }
    setLoading(false)
  }

  // 2. Función para traer posts de la base de datos
  async function getPosts(email) {
    const { data } = await supabase
      .from('posts') // De la tabla posts
      .select('*') // Trae todas las columnas
      .eq('user_id', email) // Donde user_id sea tu email
      .order('created_at', { ascending: false }) // Los más nuevos primero
    
    setPosts(data || [])
  }

  // 3. Función para guardar post nuevo
  async function createPost(e) {
    e.preventDefault()
    if (!newPost.trim()) return

    const { error } = await supabase
      .from('posts') // En la tabla posts
      .insert({ // Inserta una fila nueva
        user_id: user.email, // Con tu email
        content: newPost // Y lo que escribiste
      })

    if (!error) {
      setNewPost('') // Limpia el input
      getPosts(user.email) // Vuelve a cargar los posts
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={user.user_metadata.avatar_url} className="w-16 h-16 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">Hola, {user.user_metadata.full_name}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
          <button onClick={signOut} className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
            Salir
          </button>
        </div>

        {/* FORMULARIO PARA CREAR POST */}
        <form onSubmit={createPost} className="mb-8">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Escribe tu primer recuerdo..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 mb-3 text-white"
            rows="3"
          />
          <button type="submit" className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
            Guardar en la nube ☁️
          </button>
        </form>

        {/* LISTA DE POSTS */}
        <h2 className="text-xl font-bold mb-4">Tus recuerdos guardados:</h2>
        <div className="space-y-3">
          {posts.length === 0 ? (
            <p className="text-gray-500">Aún no tienes recuerdos. ¡Escribe el primero!</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <p>{post.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(post.created_at).toLocaleString('es-CO')}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}