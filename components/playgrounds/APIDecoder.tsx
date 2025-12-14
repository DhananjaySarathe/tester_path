'use client'

import { useState } from 'react'
import { apiCases } from '@/data/playgrounds'

export default function APIDecoder() {
  const [selectedCase, setSelectedCase] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<'correct' | 'incorrect' | 'partially' | null>(
    null
  )
  const [showExplanation, setShowExplanation] = useState(false)

  const currentCase = apiCases[selectedCase]

  const handleAnswer = (answer: 'correct' | 'incorrect' | 'partially') => {
    setSelectedAnswer(answer)
    setShowExplanation(true)
  }

  const resetCase = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">🔌 API Response Decoder</h3>
        <p className="text-slate-400 text-sm">
          A logic-analysis playground. Check if API behavior is correct — no tools needed.
        </p>
      </div>

      <div className="mb-6">
        <div className="bg-slate-900 p-6 rounded-lg mb-4 border border-slate-700">
          <h4 className="text-xl font-bold text-white mb-4">{currentCase.title}</h4>
          
          <div className="mb-4">
            <p className="text-sm text-slate-400 mb-2">Request:</p>
            <div className="bg-slate-950 p-4 rounded font-mono text-sm">
              <div className="text-green-400 mb-2">
                {currentCase.request.method} {currentCase.request.endpoint}
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap">
                {currentCase.request.body}
              </pre>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-400 mb-2">Response:</p>
            <div className="bg-slate-950 p-4 rounded font-mono text-sm">
              <div className={`mb-2 ${
                currentCase.response.status >= 200 && currentCase.response.status < 300
                  ? 'text-green-400'
                  : currentCase.response.status >= 400 && currentCase.response.status < 500
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}>
                {currentCase.response.status} {currentCase.response.statusText}
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap">
                {currentCase.response.body}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700 mb-4">
          <p className="text-white font-semibold mb-3">{currentCase.question}</p>
          <div className="grid grid-cols-3 gap-3">
            {(['correct', 'incorrect', 'partially'] as const).map((answer) => {
              const isSelected = selectedAnswer === answer
              const showResult = showExplanation && isSelected
              const isCorrect = answer === currentCase.correctAnswer

              return (
                <button
                  key={answer}
                  onClick={() => !showExplanation && handleAnswer(answer)}
                  disabled={showExplanation}
                  className={`p-3 rounded-lg border-2 transition capitalize ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-900/30 border-green-500 text-green-400'
                        : 'bg-red-900/30 border-red-500 text-red-400'
                      : isSelected
                        ? 'bg-brand-900/30 border-brand-500 text-brand-400'
                        : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-brand-500 hover:text-brand-400'
                  } ${showExplanation ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                >
                  {answer === 'correct' ? '✅ Correct' : answer === 'incorrect' ? '❌ Incorrect' : '⚠️ Partially'}
                  {showResult && isCorrect && (
                    <div className="text-xs mt-1">✓ Right!</div>
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
                <p className="text-slate-300 mb-4">{currentCase.explanation}</p>
                
                <div className="bg-green-900/20 p-4 rounded border border-green-700 mb-4">
                  <p className="text-green-400 text-sm font-semibold mb-2">Correct Behavior:</p>
                  <div className="bg-slate-950 p-3 rounded font-mono text-sm">
                    <div className={`mb-2 ${
                      currentCase.correctBehavior.status >= 200 && currentCase.correctBehavior.status < 300
                        ? 'text-green-400'
                        : currentCase.correctBehavior.status >= 400 && currentCase.correctBehavior.status < 500
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}>
                      {currentCase.correctBehavior.status} {currentCase.correctBehavior.statusText}
                    </div>
                    <pre className="text-slate-300 whitespace-pre-wrap">
                      {currentCase.correctBehavior.body}
                    </pre>
                  </div>
                </div>

                <div className="bg-yellow-900/20 p-3 rounded border border-yellow-700">
                  <p className="text-yellow-400 text-sm font-semibold mb-1">💡 Teaching Note</p>
                  <p className="text-slate-300 text-sm">{currentCase.teachingNote}</p>
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
        {apiCases.length > 1 && (
          <button
            onClick={() => {
              setSelectedCase((prev) => (prev + 1) % apiCases.length)
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

