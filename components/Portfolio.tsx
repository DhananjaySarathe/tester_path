'use client'

import { useState } from 'react'

export default function Portfolio() {
  const [copied, setCopied] = useState(false)

  const dmText = `Hi [Name],

I've been testing web apps hands-on (UI + API) and love breaking products early.

Would love to help your team improve quality. Happy to do a small test task.

Best,
[Your Name]`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dmText).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    })
  }

  return (
    <section id="portfolio" className="py-20 bg-dark-bg border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">Getting Hired 🚀</h2>
            <p className="text-slate-400 mt-2">Resume tips and the exact message to send.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Resume Fix */}
            <div>
              <h4 className="text-lg font-bold text-brand-400 mb-4 uppercase tracking-wide">
                Resume Cheat Sheet
              </h4>
              <div className="space-y-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-900/50">
                  <p className="text-red-400 text-sm font-bold mb-1">❌ Don't Write:</p>
                  <p className="text-slate-400 italic text-sm">
                    "Fresher tester, trained in manual testing concepts."
                  </p>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-900/50">
                  <p className="text-green-400 text-sm font-bold mb-1">✅ Write This:</p>
                  <p className="text-slate-300 text-sm">
                    "Tested real-world web apps, reported 50+ bugs across UI, API, and flows.
                    Hands-on with Postman, exploratory testing, and startup-style fast releases."
                  </p>
                </div>
              </div>
            </div>

            {/* DM Template */}
            <div>
              <h4 className="text-lg font-bold text-blue-400 mb-4 uppercase tracking-wide">
                Founder DM Template
              </h4>
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-700 relative group">
                <button
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white transition"
                  title="Copy to Clipboard"
                >
                  <i className="fa-regular fa-copy"></i>
                </button>
                <div
                  className={`absolute top-4 right-12 bg-green-600 text-white text-xs px-2 py-1 rounded transition-opacity duration-300 ${
                    copied ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  Copied!
                </div>

                <p className="font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {dmText}
                </p>
              </div>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Use this on LinkedIn or Twitter DMs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

