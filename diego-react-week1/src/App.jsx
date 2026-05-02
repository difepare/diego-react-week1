// App.jsx
// 1. Importamos useState: el hook para guardar datos que cambian
import { useState } from 'react'
import './App.css'

function App() {
  // 2. Creamos una "memoria" para el componente
  //    nombre = valor actual → "Diego"
  //    setNombre = función para cambiarlo
  //    useState("Diego") = valor inicial
  const [nombre, setNombre] = useState("Diego")
  const [contador, setContador] = useState(0)

  // 3. Función que se ejecuta al hacer clic
  const sumarClic = () => {
    // IMPORTANTE: Nunca hagas contador = contador + 1
    // Siempre usa la función set
    setContador(contador + 1)
  }

  // 4. Esto es JSX: parece HTML pero es JavaScript
  //    Las llaves {} nos dejan meter variables de JS
  return (
    <div className="card">
      <h1>Hola {nombre} desde Toronto! 👋</h1>
      <p>Has hecho clic {contador} veces</p>
      
      {/* onClick ejecuta la función sumarClic */}
      <button onClick={sumarClic}>
        Suma +1
      </button>

      <hr style={{margin: '20px 0'}} />

      {/* Input controlado: el valor viene de useState */}
      {/* Input que ya tienes */}
<input
  type="text"
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
  placeholder="Cambia tu nombre"
/>

{/* Agrega esto nuevo */}
<button
  onClick={() => setContador(0)}
  style={{marginTop: '10px', marginLeft: '10px'}}
>
  Reset
</button>
    </div>
  )
}

export default App