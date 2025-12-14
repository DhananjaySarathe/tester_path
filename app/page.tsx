import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import RealityCheck from '@/components/RealityCheck'
import Fundamentals from '@/components/Fundamentals'
import TechnicalEdge from '@/components/TechnicalEdge'
import PlaygroundsPromo from '@/components/PlaygroundsPromo'
import Roadmap from '@/components/Roadmap'
import Portfolio from '@/components/Portfolio'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <RealityCheck />
      <Fundamentals />
      <TechnicalEdge />
      <PlaygroundsPromo />
      <Roadmap />
      <Portfolio />
      <Footer />
    </main>
  )
}

