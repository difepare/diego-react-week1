export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 max-w-2xl border border-white/20">
        <h1 className="text-5xl font-bold text-white mb-6">
          Sobre Diego 🇨🇴
        </h1>
        <p className="text-xl text-white/90 mb-4">
          Ing. Mecánico de Cali, Valle viviendo en Toronto 🇨🇦
        </p>
        <p className="text-lg text-white/80 mb-6">
          De Tuluá a Vercel. Enamorado de React desde 2026.
        </p>
        <div className="flex gap-4">
          <span className="px-4 py-2 bg-white/20 rounded-lg text-white font-semibold">
            React
          </span>
          <span className="px-4 py-2 bg-white/20 rounded-lg text-white font-semibold">
            Vite
          </span>
          <span className="px-4 py-2 bg-white/20 rounded-lg text-white font-semibold">
            Tailwind
          </span>
        </div>
      </div>
    </div>
  )
}

