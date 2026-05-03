import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './index.css'

// Página principal con API
function Generador() {
  const [fraseActual, setFraseActual] = useState('Cargando frase épica...')
  const [colorActual, setColorActual] = useState('text-gray-800')
  const [loading, setLoading] = useState(false)

  // Esta función ahora le pide a internet
  const obtenerFraseDeAPI = async () => {
    setLoading(true) // Prendemos el "cargando"
    try {
      // API pública de chistes de programación
      const respuesta = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single')
      const data = await respuesta.json()

      // Si la API responde bien, usamos el chiste
      if (data.joke) {
        setFraseActual(data.joke)
      } else {
        setFraseActual('La API se cayó. Culpa de Vite 😂')
      }
    } catch (error) {
      console.log('Error:', error)
      setFraseActual('No hay internet. ¿Estás en el TTC?')
    }
    setLoading(false) // Apagamos el "cargando"
  }

  // Cuando carga la app por primera vez, pide una frase
  useEffect(() => {
    obtenerFraseDeAPI()
  }, [])

  // Cambia color y título cuando llega frase nueva
  useEffect(() => {
    const colores = ['text-red-500', 'text-blue-500', 'text-green-500', 'text-purple-500']
    const indiceRandom = Math.floor(Math.random() * colores.length)
    setColorActual(colores[indiceRandom])
    document.title = fraseActual
  }, [fraseActual])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Generador de Frases Dev Toronto 🇨🇦
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <p className={`text-2xl text-center mb-6 transition-colors duration-300 ${colorActual} ${loading? 'opacity-50' : ''}`}>
          {loading? 'Consultando a Stack Overflow...' : fraseActual}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={obtenerFraseDeAPI}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading? 'Cargando...' : 'Nueva frase'}
          </button>

          <Link
            to="/about"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded"
          >
            ¿Quién hizo esto?
          </Link>
        </div>
      </div>
    </div>
  )
}

// Página "Sobre este proyecto"
function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Sobre este proyecto</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <p className="text-lg text-center mb-6">
          Hecho por Diego en Toronto usando React + Vite + Tailwind.
          <br />
          Semana 1, 2 y 3 de React dominadas ✅
        </p>
        <div className="flex justify-center">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
          >
            Volver al generador
          </Link>
        </div>
      </div>
    </div>
  )
}

// App principal con rutas
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Generador />} />
        <Route path="/about" element={<About />} />
      </Routes>
    
  )
}

export default App