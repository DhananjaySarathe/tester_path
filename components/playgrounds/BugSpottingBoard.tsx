'use client'

import { useState } from 'react'
import { bugSpottingCases } from '@/data/playgrounds'

export default function BugSpottingBoard() {
  const [selectedCase, setSelectedCase] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentCase = bugSpottingCases[selectedCase]

  const handleAnswer = (answerId: string) => {
    setSelectedAnswer(answerId)
    setShowExplanation(true)
  }

  const resetCase = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">🧪 Bug Spotting Board</h3>
        <p className="text-slate-400 text-sm">
          A visual observation playground. Look carefully at the UI and identify what's wrong.
        </p>
      </div>

      <div className="mb-6">
        <div className="bg-slate-900 p-4 rounded-lg mb-4">
          {currentCase.uiComponent}
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700 mb-4">
          <p className="text-white font-semibold mb-3">{currentCase.question}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {currentCase.options.map((option) => {
              const isSelected = selectedAnswer === option.id
              const isCorrect = option.id === currentCase.correctAnswer
              const showResult = showExplanation && isSelected

              return (
                <button
                  key={option.id}
                  onClick={() => !showExplanation && handleAnswer(option.id)}
                  disabled={showExplanation}
                  className={`p-3 rounded-lg border-2 transition ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-900/30 border-green-500 text-green-400'
                        : 'bg-red-900/30 border-red-500 text-red-400'
                      : isSelected
                        ? 'bg-brand-900/30 border-brand-500 text-brand-400'
                        : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-brand-500 hover:text-brand-400'
                  } ${showExplanation ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                >
                  {option.icon && <div className="text-2xl mb-1">{option.icon}</div>}
                  <div className="text-xs font-medium">{option.label}</div>
                  {showResult && isCorrect && (
                    <div className="text-xs mt-1">✓ Correct!</div>
                  )}
                  {showResult && !isCorrect && (
                    <div className="text-xs mt-1">✗ Wrong</div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {showExplanation && (
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 space-y-4">
            <div className="flex items-start gap-3">
              <div className="text-3xl">
                {selectedAnswer === currentCase.correctAnswer ? '✅' : '❌'}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-2">Explanation</h4>
                <div className="bg-slate-800 p-3 rounded mb-3">
                  <p className="text-white font-semibold mb-1">{currentCase.explanation.summary}</p>
                  <p className="text-slate-300 text-sm">{currentCase.explanation.details}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-slate-800 p-3 rounded">
                    <p className="text-xs text-slate-400 mb-1">Severity</p>
                    <p className="text-yellow-400 font-semibold">{currentCase.explanation.severity}</p>
                  </div>
                  <div className="bg-slate-800 p-3 rounded">
                    <p className="text-xs text-slate-400 mb-1">Priority</p>
                    <p className="text-red-400 font-semibold">{currentCase.explanation.priority}</p>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 p-3 rounded border border-blue-700 mb-3">
                  <p className="text-blue-400 text-sm font-semibold mb-1">Why It Matters</p>
                  <p className="text-slate-300 text-sm">{currentCase.explanation.whyItMatters}</p>
                </div>
                
                <div className="bg-purple-900/20 p-3 rounded border border-purple-700 mb-3">
                  <p className="text-purple-400 text-sm font-semibold mb-1">Bug Type</p>
                  <p className="text-slate-300 text-sm">{currentCase.meta.bugType}</p>
                </div>
                
                <div className="bg-green-900/20 p-3 rounded border border-green-700">
                  <p className="text-green-400 text-sm font-semibold mb-1">Skills Practiced</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {currentCase.meta.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-800/30 text-green-300 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={resetCase}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
          >
            Reset
          </button>
          {bugSpottingCases.length > 1 && (
            <button
              onClick={() => {
                setSelectedCase((prev) => (prev + 1) % bugSpottingCases.length)
                resetCase()
              }}
              className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
            >
              Next Case
            </button>
          )}
        </div>
        <div className="text-sm text-slate-400">
          Case {selectedCase + 1} of {bugSpottingCases.length}
        </div>
      </div>
    </div>
  )
}

