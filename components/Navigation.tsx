'use client'

import { useState } from 'react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 glass-card border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <i className="fa-solid fa-bug text-brand-500 text-2xl mr-2"></i>
            <span className="font-bold text-xl text-white tracking-tight">
              Startup<span className="text-brand-500">Tester</span>
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#reality"
                className="hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Expectations
              </a>
              <a
                href="#fundamentals"
                className="hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Fundamentals
              </a>
              <a
                href="#tech"
                className="hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Tech Stack
              </a>
              <a
                href="#playgrounds"
                className="hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Playgrounds
              </a>
              <a
                href="#roadmap"
                className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-md text-sm font-bold transition"
              >
                30-Day Plan
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-dark-card border-t border-slate-700`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#reality"
            className="block hover:bg-slate-700 px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Expectations
          </a>
          <a
            href="#fundamentals"
            className="block hover:bg-slate-700 px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Fundamentals
          </a>
          <a
            href="#tech"
            className="block hover:bg-slate-700 px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tech Stack
          </a>
          <a
            href="#playgrounds"
            className="block hover:bg-slate-700 px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Playgrounds
          </a>
          <a
            href="#roadmap"
            className="block text-brand-400 hover:bg-slate-700 px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            30-Day Plan
          </a>
        </div>
      </div>
    </nav>
  )
}

