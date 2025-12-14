'use client'

import { useState, useEffect } from 'react'
import { predictionCases } from '@/data/playgrounds'

const STORAGE_KEY = 'prediction-shown'
const STORAGE_INDEX_KEY = 'prediction-index'
const STORAGE_SHUFFLED_KEY = 'prediction-shuffled'

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function PredictionPlayground() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shuffledCases, setShuffledCases] = useState<typeof predictionCases>([])

  // Initialize shuffled array and load from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedShuffledIds = localStorage.getItem(STORAGE_SHUFFLED_KEY)
    const savedIndex = localStorage.getItem(STORAGE_INDEX_KEY)
    const shownIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

    let shuffled: typeof predictionCases
    let index = 0

    if (savedShuffledIds && savedIndex !== null) {
      // Restore shuffled order from IDs
      const shuffledIds = JSON.parse(savedShuffledIds)
      shuffled = shuffledIds.map((id: string) => 
        predictionCases.find(c => c.id === id)
      ).filter(Boolean) as typeof predictionCases
      index = parseInt(savedIndex, 10)
      
      // If we've shown all cases, reset
      if (shownIds.length >= predictionCases.length) {
        shuffled = shuffleArray(predictionCases)
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
          shuffled = shuffleArray(predictionCases)
          localStorage.setItem(STORAGE_KEY, '[]')
          localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(shuffled.map(c => c.id)))
          index = 0
        }
      }
    } else {
      // First time - create new shuffled array
      shuffled = shuffleArray(predictionCases)
      localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(shuffled.map(c => c.id)))
    }

    setShuffledCases(shuffled)
    setCurrentIndex(index)
    localStorage.setItem(STORAGE_INDEX_KEY, index.toString())
  }, [])

  const currentCase = shuffledCases[currentIndex]
  const remainingCases = shuffledCases.length - currentIndex
  const totalCases = predictionCases.length

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
    if (newIndex >= shuffledCases.length || shownIds.length >= predictionCases.length) {
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
      const newShuffled = shuffleArray(predictionCases)
      setShuffledCases(newShuffled)
      setCurrentIndex(0)
      localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(newShuffled.map(c => c.id)))
      localStorage.setItem(STORAGE_INDEX_KEY, '0')
      resetCase()
    }
  }

  if (!currentCase) {
    return (
      <div className="bg-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-700">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center justify-center gap-2 flex-wrap">
            <i className="fa-solid fa-trophy text-yellow-400"></i> <span>Great Job!</span>
          </h3>
          <p className="text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base">You've completed all available cases!</p>
          <button
            onClick={resetAll}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition text-sm sm:text-base"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-700">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2 flex-wrap">
          <i className="fa-solid fa-globe text-blue-400"></i> <span>What Will Happen If...?</span>
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm">
          A prediction-based thinking simulator. Think like a real (messy) user and predict the outcome.
        </p>
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="bg-slate-900 p-4 sm:p-6 rounded-lg mb-3 sm:mb-4 border border-slate-700">
          <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{currentCase.title}</h4>
          <p className="text-slate-300 text-base sm:text-lg mb-3 sm:mb-4">{currentCase.scenario}</p>
        </div>

        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
          {currentCase.options.map((option) => {
            const isSelected = selectedAnswer === option.id
            const isCorrect = option.id === currentCase.correctAnswer
            const showResult = showExplanation && isSelected

            return (
              <button
                key={option.id}
                onClick={() => !showExplanation && handleAnswer(option.id)}
                disabled={showExplanation}
                className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition ${
                  showResult
                    ? isCorrect
                      ? 'bg-green-900/30 border-green-500 text-green-400'
                      : 'bg-red-900/30 border-red-500 text-red-400'
                    : isSelected
                      ? 'bg-brand-900/30 border-brand-500 text-brand-400'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-brand-500 hover:text-brand-400'
                } ${showExplanation ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-medium text-sm sm:text-base break-words">{option.label}</span>
                  {showResult && isCorrect && (
                    <span className="text-green-400 font-bold flex items-center gap-1 text-xs sm:text-sm flex-shrink-0">
                      <i className="fa-solid fa-check"></i> Correct!
                    </span>
                  )}
                  {showResult && !isCorrect && (
                    <span className="text-red-400 font-bold flex items-center gap-1 text-xs sm:text-sm flex-shrink-0">
                      <i className="fa-solid fa-xmark"></i> Wrong
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className="bg-slate-900 p-4 sm:p-6 rounded-lg border border-slate-700 space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="text-2xl sm:text-3xl flex-shrink-0">
                {selectedAnswer === currentCase.correctAnswer ? (
                  <i className="fa-solid fa-circle-check text-green-400"></i>
                ) : (
                  <i className="fa-solid fa-circle-xmark text-red-400"></i>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">Explanation</h4>
                
                <div className="bg-slate-800 p-3 rounded mb-3">
                  <p className="text-blue-400 text-sm font-semibold mb-1">What Happens:</p>
                  <p className="text-slate-300 text-sm">{currentCase.explanation.whatHappens}</p>
                </div>
                
                <div className="bg-slate-800 p-3 rounded mb-3">
                  <p className="text-orange-400 text-sm font-semibold mb-1">Why:</p>
                  <p className="text-slate-300 text-sm">{currentCase.explanation.why}</p>
                </div>
                
                <div className="bg-green-900/20 p-3 rounded border border-green-700 mb-3">
                  <p className="text-green-400 text-sm font-semibold mb-1">Ideal Behavior:</p>
                  <p className="text-slate-300 text-sm">{currentCase.explanation.idealBehavior}</p>
                </div>
                
                <div className="bg-red-900/20 p-3 rounded border border-red-700 mb-3">
                  <p className="text-red-400 text-sm font-semibold mb-1">Impact:</p>
                  <p className="text-slate-300 text-sm">{currentCase.explanation.impact}</p>
                </div>
                
                <div className="bg-purple-900/20 p-3 rounded border border-purple-700 mb-3">
                  <p className="text-purple-400 text-sm font-semibold mb-1">Category</p>
                  <p className="text-slate-300 text-sm">{currentCase.meta.category}</p>
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

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={resetCase}
            className="px-3 sm:px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm sm:text-base flex-1 sm:flex-none"
          >
            Reset Current
          </button>
          {remainingCases > 1 && (
            <button
              onClick={nextCase}
              className="px-3 sm:px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition text-sm sm:text-base flex-1 sm:flex-none"
            >
              Next Case
            </button>
          )}
          <button
            onClick={resetAll}
            className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm sm:text-base flex-1 sm:flex-none"
          >
            Start Over
          </button>
        </div>
        <div className="text-xs sm:text-sm text-slate-400 text-center sm:text-right">
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

