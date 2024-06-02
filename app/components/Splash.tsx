import React from 'react'
import { Button } from '@headlessui/react'
import { difficulties } from '../utils/city'
import SaveScore from './SaveScore'
import TopScores from './TopScores'
import { useStore } from '../store'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import RoundResult from './RoundResult'
import GameScore from './GameScore'
import clsx from 'clsx'

const Splash = () => {
  const gameOver = useStore(({ gameOver }) => gameOver)
  const isScoreSaved = useStore(({ isScoreSaved }) => isScoreSaved)
  const showRoundsResult = useStore(({ showRoundsResult }) => showRoundsResult)
  const playedCities = useStore(({ playedCities }) => playedCities)
  const startGame = useStore(({ startGame }) => startGame)
  const restartGame = useStore(({ restartGame }) => restartGame)
  const toggleRoundsResult = useStore(({ toggleRoundsResult }) => toggleRoundsResult)
  const play = gameOver ? restartGame : startGame

  return (
    <>
      {gameOver && (
        <>
          <div className="absolute left-0 top-0 z-[2] h-full w-full cursor-default">
            {playedCities.map((city) => (
              <RoundResult key={city.id} city={city} />
            ))}
          </div>
          <Button
            onClick={toggleRoundsResult}
            className="absolute right-7 top-7 z-[3] rounded-full bg-sky-600 p-2 text-white shadow-md transition hover:bg-sky-700 hover:shadow-lg data-[active]:bg-sky-800"
          >
            {showRoundsResult ? <EyeSlashIcon className="size-5" /> : <EyeIcon className="size-5" />}
          </Button>
        </>
      )}
      <div
        className={clsx(
          'absolute z-[2] flex h-screen w-full cursor-default flex-col items-center bg-white/70 transition-all duration-500 ease-in-out',
          showRoundsResult ? 'top-full opacity-0' : 'top-0',
        )}
      >
        <div className="mx-5 my-12 select-none text-6xl uppercase tracking-[15px]">Cities</div>
        <div className="mb-5 select-none text-3xl tracking-[4px]">
          {gameOver && <p className="mb-2">Game over!</p>}
          <p>Select difficulty to {gameOver ? 'play again' : 'start'}</p>
        </div>
        <div className="mb-8 flex">
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty}
              className="mx-4 rounded-full bg-green-600 px-7 py-2 text-lg capitalize text-white shadow-md transition hover:bg-green-700 hover:shadow-lg data-[active]:bg-green-800"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={() => void play(difficulty)}
            >
              {difficulty}
            </Button>
          ))}
        </div>
        {gameOver && <GameScore />}
        {gameOver && !isScoreSaved ? <SaveScore /> : <TopScores />}
      </div>
    </>
  )
}

export default Splash
