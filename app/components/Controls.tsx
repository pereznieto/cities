import { FC, useEffect, useRef } from 'react'
import Button from './Button'
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
    <div className="mx-5 select-none items-start justify-between md:flex">
      {!splashScreen && (
        <>
          <GameScore />
          <div className="mx-2 my-5 md:my-0">
            <p className="text-xl uppercase tracking-wider">
              Round <strong>{round}</strong> of <strong>{CITIES_PER_GAME}</strong>{' '}
              {pause && (
                <span className="text-base">
                  (+<strong className="select-text">{pause.score}</strong> points)
                </span>
              )}
            </p>
            {pause ? (
              <p className="text-xl">
                You missed <strong className="select-text">{pause?.city.name}</strong>{' '}
                {distance ? (
                  <span>
                    by <strong className="select-text">{distance.toFixed(0)}</strong> km
                  </span>
                ) : (
                  <span>completely!</span>
                )}
              </p>
            ) : (
              currentCity && (
                <p>
                  Find <strong>{getDisplayName(currentCity, mode)}</strong>
                </p>
              )
            )}
          </div>
          {pause && !gameOver ? (
            <Button onClick={nextCity} className="px-8 py-2 text-xl md:w-1/4">
              Next round
            </Button>
          ) : (
            <div className="opacity-0 md:w-1/4" aria-label="Easer Egg">
              🥚
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Controls
