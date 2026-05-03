function Button({ onClick, texto }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-sky-400 text-slate-900 font-bold rounded-lg hover:bg-sky-300 transition-colors"
    >
      {texto}
    </button>
  )
}

export default Button  // ← Esta línea probablemente te falta