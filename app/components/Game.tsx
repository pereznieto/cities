'use client'

import Controls from './Controls'
import Map from './Map'
import Timer from './Timer'
import { useStore } from '../store'

const Game = () => {
  const splashScreen = useStore(({ splashScreen }) => splashScreen)

  return (
    <>
      <Map />
      <div className="overflow-hidden text-2xl">
        {!splashScreen && <Timer />}
        <Controls />
      </div>
    </>
  )
}

export default Game
