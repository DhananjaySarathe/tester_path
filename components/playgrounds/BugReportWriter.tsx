'use client'

import { useState, useEffect } from 'react'
import { bugReportCases } from '@/data/playgrounds'

const STORAGE_KEY = 'bug-report-shown'
const STORAGE_INDEX_KEY = 'bug-report-index'
const STORAGE_SHUFFLED_KEY = 'bug-report-shuffled'

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function BugReportWriter() {
  const [showImproved, setShowImproved] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shuffledCases, setShuffledCases] = useState<typeof bugReportCases>([])

  // Initialize shuffled array and load from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedShuffledIds = localStorage.getItem(STORAGE_SHUFFLED_KEY)
    const savedIndex = localStorage.getItem(STORAGE_INDEX_KEY)
    const shownIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

    let shuffled: typeof bugReportCases
    let index = 0

    if (savedShuffledIds && savedIndex !== null) {
      // Restore shuffled order from IDs
      const shuffledIds = JSON.parse(savedShuffledIds)
      shuffled = shuffledIds.map((id: string) => 
        bugReportCases.find(c => c.id === id)
      ).filter(Boolean) as typeof bugReportCases
      index = parseInt(savedIndex, 10)
      
      // If we've shown all cases, reset
      if (shownIds.length >= bugReportCases.length) {
        shuffled = shuffleArray(bugReportCases)
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
          shuffled = shuffleArray(bugReportCases)
          localStorage.setItem(STORAGE_KEY, '[]')
          localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(shuffled.map(c => c.id)))
          index = 0
        }
      }
    } else {
      // First time - create new shuffled array
      shuffled = shuffleArray(bugReportCases)
      localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(shuffled.map(c => c.id)))
    }

    setShuffledCases(shuffled)
    setCurrentIndex(index)
    localStorage.setItem(STORAGE_INDEX_KEY, index.toString())
  }, [])

  const currentCase = shuffledCases[currentIndex]
  const remainingCases = shuffledCases.length - currentIndex
  const totalCases = bugReportCases.length

  const resetCase = () => {
    setShowImproved(false)
  }

  const nextCase = () => {
    const shownIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    let newIndex = currentIndex + 1
    
    // Skip already shown cases
    while (newIndex < shuffledCases.length && shownIds.includes(shuffledCases[newIndex]?.id)) {
      newIndex++
    }
    
    // If we've shown all cases, reset
    if (newIndex >= shuffledCases.length || shownIds.length >= bugReportCases.length) {
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
      const newShuffled = shuffleArray(bugReportCases)
      setShuffledCases(newShuffled)
      setCurrentIndex(0)
      localStorage.setItem(STORAGE_SHUFFLED_KEY, JSON.stringify(newShuffled.map(c => c.id)))
      localStorage.setItem(STORAGE_INDEX_KEY, '0')
      resetCase()
    }
  }

  const markAsShown = () => {
    if (currentCase && typeof window !== 'undefined') {
      const shownIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (!shownIds.includes(currentCase.id)) {
        shownIds.push(currentCase.id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(shownIds))
      }
    }
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
          <i className="fa-solid fa-pen-to-square text-green-400"></i> Write the Better Bug
        </h3>
        <p className="text-slate-400 text-sm">
          A communication improvement playground. Learn how to convert vague complaints into actionable bug reports.
        </p>
      </div>

      <div className="mb-6">
        <div className="bg-slate-900 p-6 rounded-lg mb-4 border border-slate-700">
          <h4 className="text-xl font-bold text-white mb-4">{currentCase.title}</h4>
          
          <div className="mb-4">
            <p className="text-sm text-red-400 font-semibold mb-2 flex items-center gap-1">
              <i className="fa-solid fa-circle-xmark"></i> Bad Bug Report:
            </p>
            <div className="bg-red-900/20 p-4 rounded border border-red-700">
              <p className="text-slate-300 italic">"{currentCase.badReport}"</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-blue-400 font-semibold mb-2">{currentCase.question}</p>
          </div>

          {!showImproved ? (
            <button
              onClick={() => {
                setShowImproved(true)
                markAsShown()
              }}
              className="w-full px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition font-semibold"
            >
              <i className="fa-solid fa-arrow-right mr-2"></i>
              Show Improved Version
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-green-400 font-semibold mb-2 flex items-center gap-1">
                  <i className="fa-solid fa-circle-check"></i> Improved Version:
                </p>
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

              <div className="bg-red-900/20 p-4 rounded border border-red-700 mb-4">
                <p className="text-red-400 text-sm font-semibold mb-2 flex items-center gap-1">
                  <i className="fa-solid fa-triangle-exclamation"></i> Issues in Bad Report:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-2">
                  {currentCase.explanation.issuesInBadReport.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-900/20 p-4 rounded border border-green-700 mb-4">
                <p className="text-green-400 text-sm font-semibold mb-2 flex items-center gap-1">
                  <i className="fa-solid fa-circle-check"></i> Why Improved is Better:
                </p>
                <p className="text-slate-300 text-sm">{currentCase.explanation.whyImprovedIsBetter}</p>
              </div>

              <div className="bg-purple-900/20 p-3 rounded border border-purple-700 mb-3">
                <p className="text-purple-400 text-sm font-semibold mb-1">Difficulty</p>
                <p className="text-slate-300 text-sm">{currentCase.meta.difficulty}</p>
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
          )}
        </div>
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

