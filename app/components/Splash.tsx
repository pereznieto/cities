import clsx from 'clsx';
import React from 'react';
import { Button } from '@headlessui/react'
import { difficulties } from '../utils/city';
import RoundsResult from './RoundsResult';
import SaveScore from './SaveScore';
import TopScores from './TopScores';
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
          className="absolute top-1 z-3 rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 transition"
        >
          {showRoundsResult ? 'Hide' : 'Show'} Results
        </Button>
      )}
      {gameOver && <RoundsResult />}
      <div
        className={clsx('absolute top-0 flex justify-center items-center flex-col w-full min-h-full cursor-default z-[2] bg-white/70 transition-all duration-500 ease-in-out', showRoundsResult && 'opacity-0 -top-full')}
      >
        <div className="mx-5 my-12 text-6xl uppercase tracking-[15px]">Senscity</div>
        <div className="mb-7 text-3xl tracking-[4px]">
          Select difficulty to {gameOver ? 'play again' : 'start'}
        </div>
        <div className="flex">
          {difficulties.map(difficulty => (
            <Button
              key={difficulty}
              className="rounded bg-sky-600 my-0 mx-5 py-2 px-4 text-sm text-white capitalize data-[hover]:bg-sky-500 data-[active]:bg-sky-700 transition"
              onClick={() => void play(difficulty)}
            >
              {difficulty}
            </Button>
          ))}
        </div>
        {gameOver ? (isScoreSaved ? <TopScores /> : <SaveScore />) : <TopScores />}
      </div>
    </>
  );
};

export default Splash;
