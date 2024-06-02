import dynamic from 'next/dynamic'
import Game from './components/Game'

const DynamicElementsInitializer = dynamic(() => import('./components/ElementsInitializer'), { ssr: false })

const Home = () => (
  <main className="relative mb-12 text-center">
    <DynamicElementsInitializer />
    <Game />
  </main>
)

export default Home
