import clsx from 'clsx'
import React from 'react'
import { Button } from '@headlessui/react'
import { difficulties } from '../utils/city'
import RoundsResult from './RoundsResult'
import SaveScore from './SaveScore'
import TopScores from './TopScores'
import { useStore } from '../store'

const Splash = () => {
  const gameOver = useStore(({ gameOver }) => gameOver)
  const isScoreSaved = useStore(({ isScoreSaved }) => isScoreSaved)
  const showRoundsResult = useStore(({ showRoundsResult }) => showRoundsResult)
  const startGame = useStore(({ startGame }) => startGame)
  const restartGame = useStore(({ restartGame }) => restartGame)
  const toggleRoundsResult = useStore(({ toggleRoundsResult }) => toggleRoundsResult)
  const play = gameOver ? restartGame : startGame

  return (
    <>
      {gameOver && (
        <Button
          onClick={toggleRoundsResult}
          className="z-3 absolute top-1 rounded bg-sky-600 px-4 py-2 text-sm text-white transition data-[active]:bg-sky-700 data-[hover]:bg-sky-500"
        >
          {showRoundsResult ? 'Hide' : 'Show'} Results
        </Button>
      )}
      {gameOver && <RoundsResult />}
      <div
        className={clsx(
          'absolute top-0 z-[2] flex min-h-full w-full cursor-default flex-col items-center justify-center bg-white/70 transition-all duration-500 ease-in-out',
          showRoundsResult && '-top-full opacity-0',
        )}
      >
        <div className="mx-5 my-12 text-6xl uppercase tracking-[15px]">Cities</div>
        <div className="mb-7 text-3xl tracking-[4px]">Select difficulty to {gameOver ? 'play again' : 'start'}</div>
        <div className="flex">
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty}
              className="mx-5 my-0 rounded bg-sky-600 px-4 py-2 text-sm capitalize text-white transition data-[active]:bg-sky-700 data-[hover]:bg-sky-500"
              onClick={() => void play(difficulty)}
            >
              {difficulty}
            </Button>
          ))}
        </div>
        {gameOver ? isScoreSaved ? <TopScores /> : <SaveScore /> : <TopScores />}
      </div>
    </>
  )
}

export default Splash
