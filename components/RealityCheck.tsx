'use client'

import { useState } from 'react'
import Modal from './Modal'
import { knowledgeData } from '@/data/knowledge'

export default function RealityCheck() {
  const [openModal, setOpenModal] = useState<string | null>(null)

  return (
    <section id="reality" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Startup vs. Theory</h2>
          <p className="mt-4 text-slate-400">Understanding what the job actually looks like.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What they don't care about */}
          <div className="glass-card p-8 rounded-2xl border-l-4 border-red-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
              <i className="fa-solid fa-ban text-9xl text-red-500"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <i className="fa-solid fa-xmark text-red-500 mr-3"></i> Not a Priority
            </h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">❌</span> Expensive Certificates (ISTQB
                initially)
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">❌</span> Following rigid, outdated
                documentation
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">❌</span> Only manual "clicking around"
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">❌</span> Waiting for perfect requirements
              </li>
            </ul>
          </div>

          {/* What they WANT */}
          <div className="glass-card p-8 rounded-2xl border-l-4 border-brand-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
              <i className="fa-solid fa-check-circle text-9xl text-brand-500"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <i className="fa-solid fa-check text-brand-500 mr-3"></i> Highly Valued
            </h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start">
                <span className="text-brand-500 mr-2">✅</span> Ownership & Curiosity
              </li>
              <li className="flex items-start">
                <span className="text-brand-500 mr-2">✅</span> Understanding product flows & user
                impact
              </li>
              <li className="flex items-start">
                <span className="text-brand-500 mr-2">✅</span> Clear communication (Devs need to
                reproduce bugs)
              </li>
              <li className="flex items-start">
                <span className="text-brand-500 mr-2">✅</span> Testing fast with incomplete info
              </li>
            </ul>
          </div>
        </div>

        {/* Exploratory Testing Section */}
        <div className="mt-12 text-center">
          <div
            className="inline-block glass-card p-6 rounded-2xl border-2 border-brand-500/50 cursor-pointer hover:border-brand-500 transition group"
            onClick={() => setOpenModal('exploratoryTesting')}
          >
            <div className="flex items-center justify-center gap-3">
              <i className="fa-solid fa-magnifying-glass text-brand-500 text-3xl group-hover:scale-110 transition"></i>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-1">Exploratory Testing</h3>
                <p className="text-slate-400 text-sm">The most important skill for startup testers</p>
              </div>
              <i className="fa-solid fa-circle-info text-brand-400 opacity-0 group-hover:opacity-100 transition"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && knowledgeData[openModal] && (
        <Modal
          isOpen={true}
          onClose={() => setOpenModal(null)}
          title={knowledgeData[openModal].title}
        >
          {knowledgeData[openModal].content}
        </Modal>
      )}
    </section>
  )
}

