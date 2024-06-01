import { Button } from '@headlessui/react'
import clsx from 'clsx'
import { FC, useEffect, useRef } from 'react'
import { CITIES_PER_GAME, getDisplayName } from '../utils/city'
import { useStore } from '../store'

const SPACE_KEY = ' '

const Controls: FC = () => {
  const mode = useStore(({ mode }) => mode)
  const score = useStore(({ score }) => score)
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
    <div className="grid grid-cols-3 gap-4">
      {!splashScreen && (
        <div>
          <div
            className={clsx(
              'inline-block min-w-44 rounded-md bg-orange-500 px-5 py-2.5 text-lg uppercase tracking-wide',
              gameOver && 'animate-pulse-orange text-4xl',
            )}
          >
            <p>
              Game score: <strong>{score.toFixed(0)}</strong>
            </p>
          </div>
        </div>
      )}
      <div>
        {!splashScreen && (
          <p className="-mt-2.5 mb-5 text-xl uppercase tracking-wider">
            Round <strong>{round}</strong> of <strong>{CITIES_PER_GAME}</strong>
          </p>
        )}
        {!splashScreen && !pause && currentCity && (
          <p>
            Find <strong>{getDisplayName(currentCity, mode)}</strong>
          </p>
        )}
        {pause && (
          <div>
            <p>
              You missed <strong>{pause?.city.name}</strong>
            </p>
            <p>
              {distance ? (
                <span>
                  by<strong> {distance.toFixed(2)}</strong> km
                </span>
              ) : (
                <span>completely!</span>
              )}
            </p>
            <p className="mt-5 text-lg uppercase tracking-wider">
              Score: <strong>{pause.score}</strong>
            </p>
          </div>
        )}
      </div>
      {pause && !gameOver && (
        <div>
          <Button
            onClick={nextCity}
            className="rounded bg-green-600 px-4 py-2 text-sm text-white transition data-[active]:bg-green-700 data-[hover]:bg-green-500"
          >
            Next city
          </Button>
        </div>
      )}
    </div>
  )
}

export default Controls
