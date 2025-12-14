'use client'

import { useState } from 'react'
import Modal from './Modal'
import { knowledgeData } from '@/data/knowledge'

export default function TechnicalEdge() {
  const [openModal, setOpenModal] = useState<string | null>(null)

  return (
    <section id="tech" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Technical Knowledge <span className="text-brand-500">(Light but Smart)</span>
        </h2>
        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-16">
          Don't just click. Know what's happening under the hood.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Web Tech */}
          <div
            className="bg-slate-900 p-8 rounded-2xl hover:border-brand-500 border border-transparent transition duration-300 cursor-pointer group"
            onClick={() => setOpenModal('webBasics')}
          >
            <div className="h-12 w-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6">
              <i className="fa-brands fa-html5 text-orange-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Web Basics</h3>
            <p className="text-slate-400 text-sm mb-4">Startups run on the web. You need to read the DOM.</p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>
                <i className="fa-solid fa-angle-right text-brand-500 text-xs mr-2"></i>HTML Forms
                & Inputs
              </li>
              <li>
                <i className="fa-solid fa-angle-right text-brand-500 text-xs mr-2"></i>CSS
                Responsiveness
              </li>
              <li>
                <i className="fa-solid fa-angle-right text-brand-500 text-xs mr-2"></i>Client vs
                Server Errors (4xx vs 5xx)
              </li>
            </ul>
            <div className="mt-4 text-brand-400 text-xs opacity-0 group-hover:opacity-100 transition">
              <i className="fa-solid fa-circle-info mr-1"></i>Click to learn more
            </div>
          </div>

          {/* API Testing */}
          <div
            className="bg-slate-900 p-8 rounded-2xl hover:border-brand-500 border-2 border-brand-500/50 shadow-[0_0_30px_rgba(20,184,166,0.1)] transform md:-translate-y-4 relative cursor-pointer group"
            onClick={() => setOpenModal('apiTesting')}
          >
            <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              HUGE PLUS 🚀
            </div>
            <div className="h-12 w-12 bg-brand-500/20 rounded-lg flex items-center justify-center mb-6">
              <i className="fa-solid fa-network-wired text-brand-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">API Testing</h3>
            <p className="text-slate-400 text-sm mb-4">
              Most apps are API-heavy. Test the engine, not just the paint.
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>
                <i className="fa-solid fa-angle-right text-brand-500 text-xs mr-2"></i>REST APIs
                (GET/POST/PUT)
              </li>
              <li>
                <i className="fa-solid fa-angle-right text-brand-500 text-xs mr-2"></i>Status
                Codes & Auth Tokens
              </li>
              <li>
                <i className="fa-solid fa-angle-right text-brand-500 text-xs mr-2"></i>Tool:{' '}
                <strong>Postman</strong> (Must)
              </li>
            </ul>
            <div className="mt-4 text-brand-400 text-xs opacity-0 group-hover:opacity-100 transition">
              <i className="fa-solid fa-circle-info mr-1"></i>Click to learn more
            </div>
          </div>

          {/* Database */}
          <div
            className="bg-slate-900 p-8 rounded-2xl hover:border-brand-500 border border-transparent transition duration-300 cursor-pointer group"
            onClick={() => setOpenModal('databaseBasics')}
          >
            <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
              <i className="fa-solid fa-database text-blue-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Database Basics</h3>
            <p className="text-slate-400 text-sm mb-4">Verify if the data actually saved correctly.</p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>
                <i className="fa-solid fa-angle-right text-brand-500 text-xs mr-2"></i>Basic SQL
                Queries
              </li>
              <li>
                <i className="fa-solid fa-angle-right text-brand-500 text-xs mr-2"></i>SELECT *
                FROM users;
              </li>
              <li>
                <i className="fa-solid fa-angle-right text-brand-500 text-xs mr-2"></i>Verifying
                data integrity
              </li>
            </ul>
            <div className="mt-4 text-brand-400 text-xs opacity-0 group-hover:opacity-100 transition">
              <i className="fa-solid fa-circle-info mr-1"></i>Click to learn more
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
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

