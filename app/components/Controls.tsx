import { FC, useEffect, useRef } from 'react'
import { Button } from '@headlessui/react'
import { CITIES_PER_GAME, getDisplayName } from '../utils/city'
import { useStore } from '../store'
import GameScore from './GameScore'

const SPACE_KEY = ' '

const Controls: FC = () => {
  const mode = useStore(({ mode }) => mode)
  const pause = useStore(({ pause }) => pause)
  const gameOver = useStore(({ gameOver }) => gameOver)
  const distance = useStore(({ distance }) => distance)
  const splashScreen = useStore(({ splashScreen }) => splashScreen)
  const currentCity = useStore(({ currentCity }) => currentCity)
  const round = useStore(({ round }) => round)
  const nextCity = useStore(({ nextCity }) => nextCity)

  const handleKeyUp = useRef((event: KeyboardEvent) => {
    if (event.key === SPACE_KEY) {
      nextCity()
    }
  })

  useEffect(() => {
    const keyupHandler = handleKeyUp.current
    window.addEventListener('keyup', keyupHandler)
    return () => void window.removeEventListener('keyup', keyupHandler)
  }, [])

  return (
    <div>
      {!splashScreen && (
        <>
          <GameScore />
          <p className="my-5 text-xl uppercase tracking-wider">
            Round <strong>{round}</strong> of <strong>{CITIES_PER_GAME}</strong>
          </p>
          {!pause && currentCity && (
            <p>
              Find <strong>{getDisplayName(currentCity, mode)}</strong>
            </p>
          )}
        </>
      )}
      {pause && (
        <>
          <div>
            <p>
              You missed <strong>{pause?.city.name}</strong>
            </p>
            <p>
              {distance ? (
                <span>
                  by<strong> {distance.toFixed(0)}</strong> km
                </span>
              ) : (
                <span>completely!</span>
              )}
            </p>
            <p className="mt-5 text-lg uppercase tracking-wider">
              Round score: <strong>{pause.score}</strong>
            </p>
          </div>
          {!gameOver && (
            <Button
              onClick={nextCity}
              className="mt-5 rounded bg-green-600 px-4 py-2 text-xl text-white transition data-[active]:bg-green-700 data-[hover]:bg-green-500"
            >
              Next round
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default Controls
