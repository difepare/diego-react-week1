import { useEffect, useState } from 'react'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Llamamos a una API gratis que da posts falsos
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Cargando posts... ⏳</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Posts desde una API real 🌎
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {posts.map(post => (
          <div key={post.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition">
            <h2 className="text-xl font-bold text-white mb-3 capitalize">
              {post.title}
            </h2>
            <p className="text-gray-400">
              {post.body}
            </p>
            <span className="inline-block mt-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
              Post #{post.id}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}