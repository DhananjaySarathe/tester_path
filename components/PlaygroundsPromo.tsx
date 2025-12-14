'use client'

import Link from 'next/link'

export default function PlaygroundsPromo() {
  return (
    <section id="playgrounds" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-dark-bg to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-500/20 mb-4">
            <i className="fa-solid fa-gamepad text-brand-400 text-3xl"></i>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Learn by <span className="text-brand-400">Doing</span>
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto">
            Practice real testing skills with our interactive playgrounds. No theory, just hands-on learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Link
            href="/playgrounds/bug-spotting"
            className="group bg-slate-800/50 hover:bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-brand-500 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/30 transition">
                <i className="fa-solid fa-flask text-brand-400 text-xl"></i>
              </div>
              <div>
                <div className="text-xs text-brand-400 font-semibold mb-1">1. Observe</div>
                <h3 className="text-lg font-bold text-white">Bug Spotting</h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Identify bugs by visually inspecting UI components
            </p>
            <div className="flex items-center text-brand-400 text-sm font-semibold group-hover:translate-x-2 transition-transform">
              Try it <i className="fa-solid fa-arrow-right ml-2"></i>
            </div>
          </Link>

          <Link
            href="/playgrounds/prediction"
            className="group bg-slate-800/50 hover:bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition">
                <i className="fa-solid fa-globe text-blue-400 text-xl"></i>
              </div>
              <div>
                <div className="text-xs text-blue-400 font-semibold mb-1">2. Predict</div>
                <h3 className="text-lg font-bold text-white">What Will Happen If...?</h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Predict system behavior in edge case scenarios
            </p>
            <div className="flex items-center text-blue-400 text-sm font-semibold group-hover:translate-x-2 transition-transform">
              Try it <i className="fa-solid fa-arrow-right ml-2"></i>
            </div>
          </Link>

          <Link
            href="/playgrounds/api-decoder"
            className="group bg-slate-800/50 hover:bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition">
                <i className="fa-solid fa-plug text-purple-400 text-xl"></i>
              </div>
              <div>
                <div className="text-xs text-purple-400 font-semibold mb-1">3. Analyze</div>
                <h3 className="text-lg font-bold text-white">API Decoder</h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Analyze API requests and responses for correctness
            </p>
            <div className="flex items-center text-purple-400 text-sm font-semibold group-hover:translate-x-2 transition-transform">
              Try it <i className="fa-solid fa-arrow-right ml-2"></i>
            </div>
          </Link>

          <Link
            href="/playgrounds/bug-report"
            className="group bg-slate-800/50 hover:bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-green-500 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition">
                <i className="fa-solid fa-pen-to-square text-green-400 text-xl"></i>
              </div>
              <div>
                <div className="text-xs text-green-400 font-semibold mb-1">4. Communicate</div>
                <h3 className="text-lg font-bold text-white">Write Better Bugs</h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Improve bug reports from vague to actionable
            </p>
            <div className="flex items-center text-green-400 text-sm font-semibold group-hover:translate-x-2 transition-transform">
              Try it <i className="fa-solid fa-arrow-right ml-2"></i>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/playgrounds"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105"
          >
            <i className="fa-solid fa-rocket"></i>
            Explore All Playgrounds
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div className="bg-slate-800/30 rounded-lg p-4 sm:p-6 border border-slate-700">
            <i className="fa-solid fa-shuffle text-brand-400 text-2xl sm:text-3xl mb-3"></i>
            <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Randomized Questions</h4>
            <p className="text-slate-400 text-xs sm:text-sm">Each session is unique with shuffled questions</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-4 sm:p-6 border border-slate-700">
            <i className="fa-solid fa-chart-line text-blue-400 text-2xl sm:text-3xl mb-3"></i>
            <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Track Progress</h4>
            <p className="text-slate-400 text-xs sm:text-sm">Your progress is saved locally</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-4 sm:p-6 border border-slate-700">
            <i className="fa-solid fa-graduation-cap text-purple-400 text-2xl sm:text-3xl mb-3"></i>
            <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Learn by Practice</h4>
            <p className="text-slate-400 text-xs sm:text-sm">40+ real-world scenarios to master</p>
          </div>
        </div>
      </div>
    </section>
  )
}

