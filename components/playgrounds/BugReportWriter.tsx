'use client'

import { useState } from 'react'
import { bugReportCases } from '@/data/playgrounds'

export default function BugReportWriter() {
  const [selectedCase, setSelectedCase] = useState(0)
  const [showImproved, setShowImproved] = useState(false)

  const currentCase = bugReportCases[selectedCase]

  const resetCase = () => {
    setShowImproved(false)
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">📝 Write the Better Bug</h3>
        <p className="text-slate-400 text-sm">
          A communication improvement playground. Learn how to convert vague complaints into actionable bug reports.
        </p>
      </div>

      <div className="mb-6">
        <div className="bg-slate-900 p-6 rounded-lg mb-4 border border-slate-700">
          <h4 className="text-xl font-bold text-white mb-4">{currentCase.title}</h4>
          
          <div className="mb-4">
            <p className="text-sm text-red-400 font-semibold mb-2">❌ Bad Bug Report:</p>
            <div className="bg-red-900/20 p-4 rounded border border-red-700">
              <p className="text-slate-300 italic">"{currentCase.badReport}"</p>
            </div>
          </div>

          {!showImproved ? (
            <button
              onClick={() => setShowImproved(true)}
              className="w-full px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition font-semibold"
            >
              <i className="fa-solid fa-arrow-right mr-2"></i>
              Show Improved Version
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-green-400 font-semibold mb-2">✅ Improved Version:</p>
                <div className="bg-green-900/20 p-4 rounded border border-green-700">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Title:</p>
                      <p className="text-white font-semibold">{currentCase.improvedReport.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 text-slate-300 ml-2">
                        {currentCase.improvedReport.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Expected:</p>
                      <p className="text-slate-300">{currentCase.improvedReport.expected}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Actual:</p>
                      <p className="text-slate-300">{currentCase.improvedReport.actual}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Impact:</p>
                      <p className="text-slate-300">{currentCase.improvedReport.impact}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 p-4 rounded border border-blue-700">
                <p className="text-blue-400 text-sm font-semibold mb-2">💡 Teaching Explanation</p>
                <div className="space-y-2 text-slate-300 text-sm">
                  <p>
                    <strong className="text-white">{currentCase.teachingExplanation.title}</strong> — 
                    {currentCase.teachingExplanation.title === 'Title is specific' 
                      ? ' Makes it easy to find and understand the issue'
                      : ''}
                  </p>
                  <p>
                    <strong className="text-white">{currentCase.teachingExplanation.steps}</strong> — 
                    {currentCase.teachingExplanation.steps === 'Steps are reproducible' 
                      ? ' Developer can follow exactly and reproduce the bug'
                      : ''}
                  </p>
                  <p>
                    <strong className="text-white">{currentCase.teachingExplanation.impact}</strong> — 
                    {currentCase.teachingExplanation.impact === 'Impact helps prioritize fix' 
                      ? ' Shows business value and urgency'
                      : ''}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={resetCase}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
        >
          Reset
        </button>
        {bugReportCases.length > 1 && (
          <button
            onClick={() => {
              setSelectedCase((prev) => (prev + 1) % bugReportCases.length)
              resetCase()
            }}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
          >
            Next Case
          </button>
        )}
      </div>
    </div>
  )
}

