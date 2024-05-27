import clsx from 'clsx';
import React from 'react';
import { Button } from '@headlessui/react'
import useGlobal from '../../store';
import { difficulties } from '../../utils/city';
import RoundsResult from '../RoundsResult/RoundsResult';
import SaveScore from '../SaveScore/SaveScore';
import TopScores from '../TopScores/TopScores';
import styles from './Splash.module.scss';

const Splash = () => {
  const [
    { gameOver, isScoreSaved, playedCities, showRoundsResult },
    { startGame, restartGame, toggleRoundsResult },
  ] = useGlobal();

  return (
    <React.Fragment>
      {gameOver && (
        <Button
          onClick={toggleRoundsResult}
          className="absolute top-1 z-3 rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 transition"
        >
          {showRoundsResult ? 'Hide' : 'Show'} Results
        </Button>
      )}
      {gameOver && <RoundsResult playedCities={playedCities} />}
      <div
        className={clsx(styles.splash, {
          [styles.hide]: showRoundsResult,
        })}
      >
        <div className={styles.title}>Senscity</div>
        <div className={styles.difficultyText}>
          Select difficulty to {gameOver ? 'play again' : 'start'}
        </div>
        <div className={styles.buttonWrapper}>
          {difficulties.map(difficulty => (
            <Button
              key={difficulty}
              className="rounded bg-sky-600 my-0 mx-5 py-2 px-4 text-sm text-white capitalize data-[hover]:bg-sky-500 data-[active]:bg-sky-700 transition"
              onClick={() => {
                gameOver ? restartGame(difficulty) : startGame(difficulty);
              }}
            >
              {difficulty}
            </Button>
          ))}
        </div>
        {!gameOver && <TopScores />}
        {gameOver && !isScoreSaved && <SaveScore />}
        {gameOver && isScoreSaved && <TopScores />}
      </div>
    </React.Fragment>
  );
};

export default Splash;
