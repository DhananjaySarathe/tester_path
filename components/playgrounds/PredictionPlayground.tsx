'use client'

import { useState } from 'react'
import { predictionCases } from '@/data/playgrounds'

export default function PredictionPlayground() {
  const [selectedCase, setSelectedCase] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentCase = predictionCases[selectedCase]

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
        <h3 className="text-2xl font-bold text-white mb-2">🌐 What Will Happen If...?</h3>
        <p className="text-slate-400 text-sm">
          A prediction-based thinking simulator. Think like a real (messy) user and predict the outcome.
        </p>
      </div>

      <div className="mb-6">
        <div className="bg-slate-900 p-6 rounded-lg mb-4 border border-slate-700">
          <h4 className="text-xl font-bold text-white mb-3">{currentCase.title}</h4>
          <p className="text-slate-300 text-lg mb-4">{currentCase.scenario}</p>
        </div>

        <div className="space-y-3 mb-4">
          {currentCase.options.map((option) => {
            const isSelected = selectedAnswer === option.id
            const showResult = showExplanation && isSelected

            return (
              <button
                key={option.id}
                onClick={() => !showExplanation && handleAnswer(option.id)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-lg border-2 text-left transition ${
                  showResult
                    ? option.isCorrect
                      ? 'bg-green-900/30 border-green-500 text-green-400'
                      : 'bg-red-900/30 border-red-500 text-red-400'
                    : isSelected
                      ? 'bg-brand-900/30 border-brand-500 text-brand-400'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-brand-500 hover:text-brand-400'
                } ${showExplanation ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.label}</span>
                  {showResult && option.isCorrect && (
                    <span className="text-green-400 font-bold">✓ Correct!</span>
                  )}
                  {showResult && !option.isCorrect && isSelected && (
                    <span className="text-red-400 font-bold">✗ Wrong</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 space-y-4">
            <div className="flex items-start gap-3">
              <div className="text-3xl">
                {currentCase.options.find((o) => o.id === selectedAnswer)?.isCorrect
                  ? '✅'
                  : '⚠️'}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-2">Explanation</h4>
                <p className="text-slate-300 mb-3">{currentCase.explanation}</p>
                <div className="bg-red-900/20 p-3 rounded border border-red-700 mb-3">
                  <p className="text-red-400 text-sm font-semibold mb-1">Impact</p>
                  <p className="text-slate-300 text-sm">{currentCase.impact}</p>
                </div>
                <div className="bg-green-900/20 p-3 rounded border border-green-700 mb-3">
                  <p className="text-green-400 text-sm font-semibold mb-2">Expected Best Practice:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-2">
                    {currentCase.bestPractice.map((practice, idx) => (
                      <li key={idx}>{practice}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-3 rounded border border-yellow-700">
                  <p className="text-yellow-400 text-sm font-semibold mb-1">💡 Teaching Highlight</p>
                  <p className="text-slate-300 text-sm">{currentCase.teachingHighlight}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={resetCase}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
        >
          Reset
        </button>
        {predictionCases.length > 1 && (
          <button
            onClick={() => {
              setSelectedCase((prev) => (prev + 1) % predictionCases.length)
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

