import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient' // ← ESTA LÍNEA FALTABA
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // ← ESTA LÍNEA FALTABA
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function getUser() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) throw error

        if (!session) {
          navigate('/login') // Si no hay sesión, pa' login
          return
        }

        setUser(session.user)
        console.log('USUARIO EN DASHBOARD:', session.user.email)
      } catch (err) {
        console.error('Error en Dashboard:', err)
      } finally {
        setLoading(false) // ← CLAVE: Siempre apaga el loading
      }
    }

    getUser()
  }, [navigate])

  async function handleSubmit(e) {
  e.preventDefault()
  if (!content &&!file) {
    alert('Escribe algo o sube una foto')
    return
  }

  setUploading(true)

  try {
    let image_url = null

    // 1. SUBIR FOTO A STORAGE SI EXISTE
    if (file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
       .from('report-photos')
       .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. OBTENER URL PÚBLICA
      const { data } = supabase.storage
       .from('report-photos')
       .getPublicUrl(filePath)

      image_url = data.publicUrl
      console.log('FOTO SUBIDA:', image_url)
    }

    // 3. INSERTAR POST CON O SIN FOTO
    const { error } = await supabase
     .from('public_posts')
     .insert({
        user_id: user.id,
        user_name: user.user_metadata.full_name || user.email,
        user_avatar: user.user_metadata.avatar_url,
        content: content,
        image_url: image_url // ← NULL si no hay foto, URL si sí hay
      })

    if (error) throw error

    alert('¡Reporte publicado con foto!')
    setContent('')
    setFile(null)
    navigate('/') // ← Te lleva al Home a ver tu post

  } catch (error) {
    alert('Error: ' + error.message)
    console.error(error)
  } finally {
    setUploading(false)
  }
}

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Cargando Dashboard...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-4">Hola, {user?.user_metadata?.full_name || user?.email}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Reporta un hueco, semáforo dañado, basura..."
          className="w-full border p-3 rounded-lg h-32"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:bg-gray-400"
        >
          {uploading? 'Publicando...' : 'Publicar Reporte'}
        </button>
      </form>
    </div>
  )
}
