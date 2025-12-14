import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function PlaygroundsPage() {
  const playgrounds = [
    {
      id: 'bug-spotting',
      title: 'Bug Spotting Board',
      icon: <i className="fa-solid fa-flask text-brand-400"></i>,
      step: '1. Observe',
      description: 'A visual observation playground. Look carefully at UI components and identify what\'s wrong.',
      color: 'brand',
      gradient: 'from-brand-500/20 to-brand-600/20',
      borderColor: 'border-brand-500',
      textColor: 'text-brand-400',
    },
    {
      id: 'prediction',
      title: 'What Will Happen If...?',
      icon: <i className="fa-solid fa-globe text-blue-400"></i>,
      step: '2. Predict',
      description: 'A prediction-based thinking simulator. Think like a real user and predict system behavior.',
      color: 'blue',
      gradient: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-400',
    },
    {
      id: 'api-decoder',
      title: 'API Response Decoder',
      icon: <i className="fa-solid fa-plug text-purple-400"></i>,
      step: '3. Analyze',
      description: 'A logic-analysis playground. Check if API behavior is correct — no tools needed.',
      color: 'purple',
      gradient: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500',
      textColor: 'text-purple-400',
    },
    {
      id: 'bug-report',
      title: 'Write the Better Bug',
      icon: <i className="fa-solid fa-pen-to-square text-green-400"></i>,
      step: '4. Communicate',
      description: 'A communication improvement playground. Learn to convert vague complaints into actionable bug reports.',
      color: 'green',
      gradient: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-500',
      textColor: 'text-green-400',
    },
  ]

  return (
    <main className="min-h-screen bg-dark-bg">
      <Navigation />
      <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Interactive Playgrounds
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Learn by doing. These 4 playgrounds form a complete tester-thinking loop:
            <span className="text-brand-400 font-semibold"> Observe → Predict → Analyze → Communicate</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {playgrounds.map((playground) => (
            <Link
              key={playground.id}
              href={`/playgrounds/${playground.id}`}
              className="group"
            >
              <div className={`bg-gradient-to-br ${playground.gradient} rounded-2xl p-8 border-2 ${playground.borderColor} hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{playground.icon}</div>
                  <div className="flex-1">
                    <div className={`${playground.textColor} text-sm font-bold mb-2`}>
                      {playground.step}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{playground.title}</h3>
                  </div>
                </div>
                <p className="text-slate-300 mb-6">{playground.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`${playground.textColor} font-semibold group-hover:translate-x-2 transition-transform`}>
                    Start Learning →
                  </span>
                  <div className={`${playground.textColor} text-2xl group-hover:translate-x-2 transition-transform`}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <i className="fa-solid fa-bullseye text-brand-400 text-3xl mb-2"></i>
              <p className="text-slate-300 text-sm">Questions are randomly shuffled</p>
            </div>
            <div className="text-center">
              <i className="fa-solid fa-book text-blue-400 text-3xl mb-2"></i>
              <p className="text-slate-300 text-sm">No duplicate questions shown</p>
            </div>
            <div className="text-center">
              <i className="fa-solid fa-floppy-disk text-purple-400 text-3xl mb-2"></i>
              <p className="text-slate-300 text-sm">Progress saved locally</p>
            </div>
            <div className="text-center">
              <i className="fa-solid fa-rotate text-green-400 text-3xl mb-2"></i>
              <p className="text-slate-300 text-sm">Reset anytime to start fresh</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  )
}

