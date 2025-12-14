'use client'

import { useParams, useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import BugSpottingBoard from '@/components/playgrounds/BugSpottingBoard'
import PredictionPlayground from '@/components/playgrounds/PredictionPlayground'
import APIDecoder from '@/components/playgrounds/APIDecoder'
import BugReportWriter from '@/components/playgrounds/BugReportWriter'

export default function PlaygroundPage() {
  const params = useParams()
  const router = useRouter()
  const playgroundId = params.id as string

  const playgroundComponents: Record<string, React.ReactNode> = {
    'bug-spotting': <BugSpottingBoard />,
    'prediction': <PredictionPlayground />,
    'api-decoder': <APIDecoder />,
    'bug-report': <BugReportWriter />,
  }

  const playgroundTitles: Record<string, string> = {
    'bug-spotting': 'Bug Spotting Board',
    'prediction': 'What Will Happen If...?',
    'api-decoder': 'API Response Decoder',
    'bug-report': 'Write the Better Bug',
  }

  if (!playgroundComponents[playgroundId]) {
    return (
      <main className="min-h-screen bg-dark-bg">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Playground Not Found</h1>
            <button
              onClick={() => router.push('/playgrounds')}
              className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
            >
              Back to Playgrounds
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark-bg">
      <Navigation />
      <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => router.push('/playgrounds')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-3 sm:mb-0 text-sm sm:text-base"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Back to Playgrounds</span>
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">{playgroundTitles[playgroundId]}</h1>
        </div>
        {playgroundComponents[playgroundId]}
      </div>
      </div>
    </main>
  )
}

