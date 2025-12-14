'use client'

import { useState, useEffect } from 'react'
import { apiCases } from '@/data/playgrounds'

const STORAGE_KEY = 'api-decoder-shown'
const STORAGE_INDEX_KEY = 'api-decoder-index'
const STORAGE_SHUFFLED_KEY = 'api-decoder-shuffled'

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function APIDecoder() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shuffledCases, setShuffledCases] = useState<typeof apiCases>([])

  // Initialize shuffled array and load from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedShuffledIds = localStorage.getItem(STORAGE_SHUFFLED_KEY)
    const savedIndex = localStorage.getItem(STORAGE_INDEX_KEY)
    const shownIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

    let shuffled: typeof apiCases
    let index = 0

    if (savedShuffledIds && savedIndex !== null) {
      // Restore shuffled order from IDs
      const shuffledIds = JSON.parse(savedShuffledIds)
      shuffled = shuffledIds.map((id: string) => 
        apiCases.find(c => c.id === id)
      ).filter(Boolean) as typeof apiCases
      index = parseInt(savedIndex, 10)
      
      // If we've shown all cases, reset
      if (shownIds.length >= apiCases.length) {
        shuffled = shuffleArray(apiCases)
        localStorage.setItem(STORAGE_KEY, '[]')
        localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(shuffled.map(c => c.id)))
        index = 0
      } else {
        // Find next unshown case
        while (index < shuffled.length && shownIds.includes(shuffled[index]?.id)) {
          index++
        }
        // If we've reached the end but not all are shown, reset
        if (index >= shuffled.length) {
          shuffled = shuffleArray(apiCases)
          localStorage.setItem(STORAGE_KEY, '[]')
          localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(shuffled.map(c => c.id)))
          index = 0
        }
      }
    } else {
      // First time - create new shuffled array
      shuffled = shuffleArray(apiCases)
      localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(shuffled.map(c => c.id)))
    }

    setShuffledCases(shuffled)
    setCurrentIndex(index)
    localStorage.setItem(STORAGE_INDEX_KEY, index.toString())
  }, [])

  const currentCase = shuffledCases[currentIndex]
  const remainingCases = shuffledCases.length - currentIndex
  const totalCases = apiCases.length

  const handleAnswer = (answerId: string) => {
    setSelectedAnswer(answerId)
    setShowExplanation(true)
    
    // Mark this case as shown
    if (currentCase && typeof window !== 'undefined') {
      const shownIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (!shownIds.includes(currentCase.id)) {
        shownIds.push(currentCase.id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(shownIds))
      }
    }
  }

  const resetCase = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const nextCase = () => {
    const shownIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    let newIndex = currentIndex + 1
    
    // Skip already shown cases
    while (newIndex < shuffledCases.length && shownIds.includes(shuffledCases[newIndex]?.id)) {
      newIndex++
    }
    
    // If we've shown all cases, reset
    if (newIndex >= shuffledCases.length || shownIds.length >= apiCases.length) {
      resetAll()
      return
    }
    
    setCurrentIndex(newIndex)
    localStorage.setItem(STORAGE_INDEX_KEY, newIndex.toString())
    resetCase()
  }

  const resetAll = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_INDEX_KEY)
      localStorage.removeItem(STORAGE_SHUFFLED_KEY)
      const newShuffled = shuffleArray(apiCases)
      setShuffledCases(newShuffled)
      setCurrentIndex(0)
      localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(newShuffled.map(c => c.id)))
      localStorage.setItem(STORAGE_INDEX_KEY, '0')
      resetCase()
    }
  }

  // Helper function to format body (object or string)
  const formatBody = (body: string | object | undefined): string => {
    if (!body) return ''
    if (typeof body === 'string') return body
    return JSON.stringify(body, null, 2)
  }

  if (!currentCase) {
    return (
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <i className="fa-solid fa-trophy text-yellow-400"></i> Great Job!
          </h3>
          <p className="text-slate-300 mb-6">You've completed all available cases!</p>
          <button
            onClick={resetAll}
            className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <i className="fa-solid fa-plug text-purple-400"></i> API Response Decoder
        </h3>
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
              {currentCase.request.headers && Object.keys(currentCase.request.headers).length > 0 && (
                <div className="mb-2 text-slate-400">
                  <div className="text-xs mb-1">Headers:</div>
                  {Object.entries(currentCase.request.headers).map(([key, value]) => (
                    <div key={key} className="text-xs text-slate-300">
                      {key}: {value}
                    </div>
                  ))}
                </div>
              )}
              {currentCase.request.body && (
                <pre className="text-slate-300 whitespace-pre-wrap">
                  {formatBody(currentCase.request.body)}
                </pre>
              )}
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
                {currentCase.response.status} {currentCase.response.statusText || ''}
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap">
                {formatBody(currentCase.response.body)}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700 mb-4">
          <p className="text-white font-semibold mb-3">{currentCase.question}</p>
          <div className={`grid gap-3 ${
            currentCase.options.length === 2 ? 'grid-cols-2' : 
            currentCase.options.length === 3 ? 'grid-cols-3' : 
            'grid-cols-2 md:grid-cols-4'
          }`}>
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
                  <span className="font-medium">{option.label}</span>
                  {showResult && isCorrect && (
                    <div className="text-xs mt-1 flex items-center gap-1">
                      <i className="fa-solid fa-check text-green-400"></i> Right!
                    </div>
                  )}
                  {showResult && !isCorrect && (
                    <div className="text-xs mt-1 flex items-center gap-1">
                      <i className="fa-solid fa-xmark text-red-400"></i> Wrong
                    </div>
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
                {selectedAnswer === currentCase.correctAnswer ? (
                  <i className="fa-solid fa-circle-check text-green-400"></i>
                ) : (
                  <i className="fa-solid fa-circle-xmark text-red-400"></i>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-2">Explanation</h4>
                
                {(currentCase.explanation.whyIncorrect || currentCase.explanation.why) && (
                  <div className="bg-slate-800 p-3 rounded mb-3">
                    <p className="text-red-400 text-sm font-semibold mb-1">
                      {currentCase.explanation.whyIncorrect ? 'Why Incorrect:' : 'Why:'}
                    </p>
                    <p className="text-slate-300 text-sm">
                      {currentCase.explanation.whyIncorrect || currentCase.explanation.why}
                    </p>
                  </div>
                )}
                
                <div className="bg-green-900/20 p-3 rounded border border-green-700 mb-3">
                  <p className="text-green-400 text-sm font-semibold mb-1">Correct Behavior:</p>
                  <p className="text-slate-300 text-sm">{currentCase.explanation.correctBehavior}</p>
                </div>
                
                <div className="bg-red-900/20 p-3 rounded border border-red-700 mb-3">
                  <p className="text-red-400 text-sm font-semibold mb-1">Risk:</p>
                  <p className="text-slate-300 text-sm">{currentCase.explanation.risk}</p>
                </div>
                
                <div className="bg-purple-900/20 p-3 rounded border border-purple-700 mb-3">
                  <p className="text-purple-400 text-sm font-semibold mb-1">Topic</p>
                  <p className="text-slate-300 text-sm">{currentCase.meta.topic}</p>
                </div>
                
                <div className="bg-blue-900/20 p-3 rounded border border-blue-700">
                  <p className="text-blue-400 text-sm font-semibold mb-1">Skills Practiced</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {currentCase.meta.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-800/30 text-blue-300 text-xs rounded"
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

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-3">
          <button
            onClick={resetCase}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
          >
            Reset Current
          </button>
          {remainingCases > 1 && (
            <button
              onClick={nextCase}
              className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
            >
              Next Case
            </button>
          )}
          <button
            onClick={resetAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Start Over
          </button>
        </div>
        <div className="text-sm text-slate-400">
          {remainingCases > 0 ? (
            <>
              Case {currentIndex + 1} of {totalCases} ({remainingCases} remaining)
            </>
          ) : (
            <>All cases completed!</>
          )}
        </div>
      </div>
    </div>
  )
}

