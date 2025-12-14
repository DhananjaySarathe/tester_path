'use client'

import { useState, useEffect } from 'react'
import { bugSpottingCases } from '@/data/playgrounds'

const STORAGE_KEY = 'bug-spotting-shown'
const STORAGE_INDEX_KEY = 'bug-spotting-index'
const STORAGE_SHUFFLED_KEY = 'bug-spotting-shuffled'

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function BugSpottingBoard() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shuffledCases, setShuffledCases] = useState<typeof bugSpottingCases>([])

  // Initialize shuffled array and load from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedShuffledIds = localStorage.getItem(STORAGE_SHUFFLED_KEY)
    const savedIndex = localStorage.getItem(STORAGE_INDEX_KEY)
    const shownIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

    let shuffled: typeof bugSpottingCases
    let index = 0

    if (savedShuffledIds && savedIndex !== null) {
      // Restore shuffled order from IDs
      const shuffledIds = JSON.parse(savedShuffledIds)
      shuffled = shuffledIds.map((id: string) => 
        bugSpottingCases.find(c => c.id === id)
      ).filter(Boolean) as typeof bugSpottingCases
      index = parseInt(savedIndex, 10)
      
      // If we've shown all cases, reset
      if (shownIds.length >= bugSpottingCases.length) {
        shuffled = shuffleArray(bugSpottingCases)
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
          shuffled = shuffleArray(bugSpottingCases)
          localStorage.setItem(STORAGE_KEY, '[]')
          localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(shuffled.map(c => c.id)))
          index = 0
        }
      }
    } else {
      // First time - create new shuffled array
      shuffled = shuffleArray(bugSpottingCases)
      localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(shuffled.map(c => c.id)))
    }

    setShuffledCases(shuffled)
    setCurrentIndex(index)
    localStorage.setItem(STORAGE_INDEX_KEY, index.toString())
  }, [])

  const currentCase = shuffledCases[currentIndex]
  const remainingCases = shuffledCases.length - currentIndex
  const totalCases = bugSpottingCases.length

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
    if (newIndex >= shuffledCases.length || shownIds.length >= bugSpottingCases.length) {
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
      const newShuffled = shuffleArray(bugSpottingCases)
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
          <i className="fa-solid fa-flask text-brand-400"></i> <span>Bug Spotting Board</span>
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm">
          A visual observation playground. Look carefully at the UI and identify what's wrong.
        </p>
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="bg-slate-900 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 overflow-x-auto">
          {currentCase.uiComponent}
        </div>

        <div className="bg-blue-900/20 p-3 sm:p-4 rounded-lg border border-blue-700 mb-3 sm:mb-4">
          <p className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{currentCase.question}</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {currentCase.options.map((option) => {
              const isSelected = selectedAnswer === option.id
              const isCorrect = option.id === currentCase.correctAnswer
              const showResult = showExplanation && isSelected

              return (
                <button
                  key={option.id}
                  onClick={() => !showExplanation && handleAnswer(option.id)}
                  disabled={showExplanation}
                  className={`p-2 sm:p-3 rounded-lg border-2 transition text-center ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-900/30 border-green-500 text-green-400'
                        : 'bg-red-900/30 border-red-500 text-red-400'
                      : isSelected
                        ? 'bg-brand-900/30 border-brand-500 text-brand-400'
                        : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-brand-500 hover:text-brand-400'
                  } ${showExplanation ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                >
                  {option.icon && <div className="text-xl sm:text-2xl mb-1">{option.icon}</div>}
                  <div className="text-xs sm:text-sm font-medium break-words">{option.label}</div>
                  {showResult && isCorrect && (
                    <div className="text-xs mt-1 flex items-center gap-1">
                      <i className="fa-solid fa-check text-green-400"></i> Correct!
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

