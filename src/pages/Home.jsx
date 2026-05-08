import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // ← AGREGA ESTO
import { supabase } from '../supabaseClient'
import LikeButton from '../components/LikeButton'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null) // ← AGREGA ESTO

  useEffect(() => {
    checkUser() // ← AGREGA ESTO
    getPosts()
  }, [])

  // NUEVA FUNCIÓN: Verifica si hay sesión
  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user ?? null)
    console.log('USUARIO EN HOME:', session?.user) // Debug
  }

  async function getPosts() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('public_posts')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('POSTS TRAÍDOS:', data, 'ERROR:', error) // Debug
      
      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      console.error('Error cargando feed:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p className="text-center p-8">Cargando reportes...</p>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">
        Flow Social - Reportes Ciudadanos
      </h1>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">
            Sé el primero en reportar algo en Tuluá
          </p>
          
          {user ? (
            <Link 
              to="/dashboard" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block"
            >
              Ir a Dashboard y Reportar
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block"
            >
              Inicia sesión para reportar
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border rounded-lg p-4 shadow-sm">
              
              {/* HEADER DEL POST - ABRE */}
              <div className="flex items-center mb-3">
                <img
                  src={post.user_avatar || 'https://via.placeholder.com/40'}
                  alt={post.user_name}
                  className="w-10 h-10 rounded-full mr-3"
                />


                


                <div>
                  <p className="font-semibold">{post.user_name || 'Ciudadano'}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleString('es-CO')}
                  </p>
                </div>
              </div>  {/* ← HEADER DEL POST - CIERRA. ESTE TE FALTABA */}

              {/* CONTENIDO */}
              <p className="text-gray-800 mb-3 whitespace-pre-wrap">{post.content}</p>
              
              {/* IMAGEN SI EXISTE */}
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt="Reporte ciudadano"
                  className="w-full rounded-lg border-2 border-blue-600"
                  loading="lazy"  // ← Solo carga cuando el usuario hace scroll                
                />
              )}
              
            <div className="p-4">
                <div className="flex items-center gap-4 mb-2">
                <LikeButton postId={post.id} userId={user?.id} />
                 <span className="text-gray-500">💬 0</span>
                </div>
                 <p className="font-bold">{post.user_name}</p>
                 <p>{post.content}</p>
               </div>

            </div>
          ))}  {/* ← CIERRA EL MAP */}
        </div>
      )}
    </div>
  )  //{/* ← CIERRA EL RETURN */}
}  //{/* ← CIERRA LA FUNCIÓN Home */}