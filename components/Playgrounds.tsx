import BugSpottingBoard from './playgrounds/BugSpottingBoard'
import PredictionPlayground from './playgrounds/PredictionPlayground'
import APIDecoder from './playgrounds/APIDecoder'
import BugReportWriter from './playgrounds/BugReportWriter'

export default function Playgrounds() {
  return (
    <section id="playgrounds" className="py-20 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Interactive Playgrounds
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Learn by doing. These 4 playgrounds form a complete tester-thinking loop:
            <span className="text-brand-400 font-semibold"> Observe → Predict → Analyze → Communicate</span>
          </p>
        </div>

        <div className="space-y-8">
          {/* Playground 1: Bug Spotting */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-500/20 text-brand-400 px-4 py-2 rounded-lg font-bold">
                1. Observe
              </div>
              <h3 className="text-xl font-bold text-white">Bug Spotting Board</h3>
            </div>
            <BugSpottingBoard />
          </div>

          {/* Playground 2: Prediction */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg font-bold">
                2. Predict
              </div>
              <h3 className="text-xl font-bold text-white">What Will Happen If...?</h3>
            </div>
            <PredictionPlayground />
          </div>

          {/* Playground 3: API Analysis */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg font-bold">
                3. Analyze
              </div>
              <h3 className="text-xl font-bold text-white">API Response Decoder</h3>
            </div>
            <APIDecoder />
          </div>

          {/* Playground 4: Bug Report Writing */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg font-bold">
                4. Communicate
              </div>
              <h3 className="text-xl font-bold text-white">Write the Better Bug</h3>
            </div>
            <BugReportWriter />
          </div>
        </div>
      </div>
    </section>
  )
}

