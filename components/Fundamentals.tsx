export default function Fundamentals() {
  return (
    <section id="fundamentals" className="py-20 bg-dark-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12 border-b border-slate-700 pb-4">
          Core Fundamentals <span className="text-brand-500 text-lg ml-2">(Non-Negotiable)</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Concept List */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h4 className="font-bold text-xl text-white mb-4">Concepts to Master</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center">
                  <i className="fa-solid fa-layer-group text-blue-400 w-6"></i> SDLC & STLC
                  (Practical view)
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-rotate text-blue-400 w-6"></i> Bug Life Cycle
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-triangle-exclamation text-blue-400 w-6"></i> Severity
                  vs Priority
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-filter text-blue-400 w-6"></i> Smoke vs Sanity vs
                  Regression
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                  Resources
                </p>
                <p className="text-slate-300 text-sm mt-1">
                  YouTube: Software Testing Mentor, Guru99
                </p>
              </div>
            </div>
          </div>

          {/* The "Perfect Bug Report" Interactive Card */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xl text-white mb-4">The "Golden" Bug Report</h4>
            <p className="text-slate-400 mb-4 text-sm">
              This is what makes developers love you. Clear, concise, impactful.
            </p>

            <div className="bg-white text-slate-900 rounded-lg shadow-2xl overflow-hidden font-mono text-sm relative">
              <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-center">
                <span className="font-bold text-red-700">
                  <i className="fa-solid fa-bug mr-2"></i>BUG-402
                </span>
                <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded font-bold uppercase">
                  High Severity
                </span>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="block text-xs font-bold text-slate-500 uppercase">Title</span>
                  <p className="font-bold text-lg">
                    Login button overlaps keyboard on Android small screens
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-100 p-3 rounded">
                    <span className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Expected Behavior
                    </span>
                    <p className="text-green-700">
                      Login button should remain visible above the keyboard or page should scroll.
                    </p>
                  </div>
                  <div className="bg-slate-100 p-3 rounded">
                    <span className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Actual Behavior
                    </span>
                    <p className="text-red-700">
                      Button is hidden behind the keyboard, user cannot proceed.
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Steps to Reproduce
                  </span>
                  <ol className="list-decimal list-inside text-slate-700 space-y-1">
                    <li>Open app on Pixel 4a (Android 12)</li>
                    <li>Navigate to Login Screen</li>
                    <li>Tap 'Email' field to focus (keyboard opens)</li>
                  </ol>
                </div>

                <div>
                  <span className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Business Impact
                  </span>
                  <p className="text-slate-700">
                    <i className="fa-solid fa-arrow-trend-down text-red-500 mr-1"></i> User cannot
                    login → Direct revenue loss.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

