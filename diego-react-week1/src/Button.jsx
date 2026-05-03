// Button.jsx
// 1. Recibimos onClick y texto como props
function Button({ onClick, texto }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        fontSize: '1.1rem',
        cursor: 'pointer',
        backgroundColor: '#61dafb',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold'
      }}
    >
      {texto}
    </button>
  )
}

export default Button