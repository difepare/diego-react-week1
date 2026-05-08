import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function LikeButton({ postId, userId }) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Cargar likes al inicio
  useEffect(() => {
    fetchLikes()
  }, [postId])

  async function fetchLikes() {
    // 1. Contar total de likes
    const { count } = await supabase
     .from('likes')
     .select('*', { count: 'exact', head: true })
     .eq('post_id', postId)

    setLikes(count || 0)

    // 2. Ver si yo ya di like
    if (userId) {
      const { data } = await supabase
       .from('likes')
       .select('id')
       .eq('post_id', postId)
       .eq('user_id', userId)
       .single()

      setIsLiked(!!data)
    }
  }

  async function toggleLike() {
    if (!userId) {
      alert('Inicia sesión para dar like, Ing. del Flow')
      return
    }

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)

    if (isLiked) {
      // Quitar like
      await supabase
       .from('likes')
       .delete()
       .eq('post_id', postId)
       .eq('user_id', userId)

      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      // Dar like
      await supabase
       .from('likes')
       .insert({ post_id: postId, user_id: userId })

      setLikes(likes + 1)
      setIsLiked(true)
    }
  }

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center gap-2 transition-all ${isAnimating? 'scale-125' : 'scale-100'}`}
    >
      <span className={`text-2xl transition-all ${isLiked? 'grayscale-0' : 'grayscale'}`}>
        {isLiked? '❤️' : '🤍'}
      </span>
      <span className="font-bold text-gray-700">{likes}</span>
    </button>
  )
}