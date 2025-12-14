export default function Hero() {
  return (
    <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-slate-600 bg-slate-800/50 backdrop-blur-sm mb-8">
          <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2"></span>
          <span className="text-sm font-medium text-slate-300">Practical-First Approach</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          Break Features <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-500">
            Before Users Do
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
          Startups don't care about certificates. They care about finding real bugs fast. Here is
          your realistic, no-fluff roadmap to getting hired.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#roadmap"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:py-4 md:text-lg md:px-10 transition shadow-lg shadow-brand-500/20"
          >
            Start Learning
          </a>
          <a
            href="#portfolio"
            className="px-8 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-300 hover:bg-slate-800 md:py-4 md:text-lg md:px-10 transition"
          >
            Build Portfolio
          </a>
        </div>
      </div>
    </header>
  )
}

