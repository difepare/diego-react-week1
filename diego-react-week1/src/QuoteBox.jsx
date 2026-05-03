// QuoteBox.jsx
// 1. Recibimos 'frase' por props usando destructuring { frase }
function QuoteBox({ frase }) {
  return (
    <div style={{
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '30px',
      minHeight: '100px'
    }}>
      "{frase}"
    </div>
  )
}

export default QuoteBox