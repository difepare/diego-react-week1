import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Sobre este proyecto</h1>
      <p className="text-xl mb-8 max-w-xl text-center">
        Hecho por Diego en Toronto usando React + Vite + Tailwind.
        Semana 1 y 2 de React dominadas ✅
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-sky-400 text-slate-900 font-bold rounded-lg hover:bg-sky-300"
      >
        Volver al generador
      </Link>
    </div>
  )
}

export default About