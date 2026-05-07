import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPublicPosts()
  }, [])

  async function getPublicPosts() {
    const { data, error } = await supabase
      .from('public_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error trayendo posts:', error)
    } else {
      setPosts(data)
    }
    setLoading(false)
  }

  if (loading) return <p className="text-center mt-10">Cargando reportes de Tuluá...</p>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mi Tuluá</h1>
        <Link 
          to="/login" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Reportar
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-xl">Sé el primero en reportar algo en Tuluá</p>
          <Link to="/login" className="text-blue-500 underline">Inicia sesión para publicar</Link>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow mb-4">
            <div className="flex items-center mb-2">
              <img 
                src={post.user_avatar} 
                alt={post.user_name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-bold">{post.user_name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleString('es-CO')}
                </p>
              </div>
            </div>
            <p className="text-gray-800">{post.content}</p>
          </div>
        ))
      )}
    </div>
  )
}