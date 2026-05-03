// App.jsx
import { useState, useEffect } from 'react'
import QuoteBox from './QuoteBox' // Importamos los componentes hijos
import Button from './Button'
import './App.css'

function App() {
  // 1. Array con frases de devs de Toronto
  const frases = [
    "Debuggear en producción con un café de Tim Hortons",
    "Mi código funciona en mi máquina y en la CN Tower",
    "Commits en inglés, bugs en spanglish",
    "Esperando el streetcar mientras arreglo este bug",
    "-40°C afuera, pero mi laptop está más hot por este loop infinito"
  ]

  const colores = ['#0d1117', '#0d47a1', '#b71c1c', '#1b5e20', '#4a148c']

  // 2. useState para la frase actual. Inicia con la primera del array
  const [fraseActual, setFraseActual] = useState(frases[0])
  // 3. useState para el color de fondo
  const [bgColor, setBgColor] = useState(colores[0])

  // 4. Función que se ejecuta al hacer clic en el botón
  const generarNuevaFrase = () => {
    // Elegimos un índice random del array de frases
    const indiceRandom = Math.floor(Math.random() * frases.length)
    // Actualizamos el state con la nueva frase
    setFraseActual(frases[indiceRandom])
  }

  // 5. useEffect: se ejecuta cuando 'fraseActual' cambia
  useEffect(() => {
    // Elegimos un color random cada vez que cambia la frase
    const colorRandom = colores[Math.floor(Math.random() * colores.length)]
    setBgColor(colorRandom)

    // Bonus del Día 5: cambiamos el título de la pestaña
    document.title = `Dev Quote: ${fraseActual}`

    console.log('Nueva frase mostrada:', fraseActual)
  }, [fraseActual]) // Dependencia: solo se ejecuta si fraseActual cambia

  return (
    <div style={{
      backgroundColor: bgColor,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 0.5s ease' // Animación suave
    }}>
      <h2 style={{ color: 'white', marginBottom: '20px' }}>
        Generador de Frases Dev Toronto 🇨🇦
      </h2>

      {/* 6. Le pasamos la frase al componente hijo como prop */}
      <QuoteBox frase={fraseActual} />

      {/* 7. Le pasamos la función y el texto al botón como props */}
      <Button onClick={generarNuevaFrase} texto="Nueva frase" />
    </div>
  )
}

export default App