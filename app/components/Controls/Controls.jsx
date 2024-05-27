import { Button } from '@headlessui/react'
import clsx from 'clsx';
import React, { useEffect } from 'react';
import useGlobal from '../../store';
import { citiesPerGame, getDisplayName } from '../../utils/city';
import { isEmpty } from '../../utils/isEmpty'
import styles from './Controls.module.scss';

const Controls = () => {
  const [
    {
      mode,
      score,
      pause,
      gameOver,
      distance,
      splashScreen,
      currentCity,
      missedSummary,
      round,
    },
    { nextCity },
  ] = useGlobal();

  const SPACE_KEY = 32;

  const handleKeyUp = event => {
    if (event.keyCode === SPACE_KEY) {
      nextCity();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasMissedSummary = !isEmpty(missedSummary);
  const getCityToDisplay = () =>
    hasMissedSummary
      ? `${missedSummary.name}, ${missedSummary.country}`
      : pause.city.name;
  const distanceToDisplay = hasMissedSummary ? missedSummary.distance : distance;
  const roundToDisplay = hasMissedSummary ? missedSummary.round : round;
  const statsToDisplay = hasMissedSummary && (
    <div>
      <p>
        Time left: <strong>{(missedSummary.timeLeft / 1000).toFixed(2)}</strong>s | Score:
        <strong> {missedSummary.score}</strong>
      </p>
    </div>
  );

  return (
    <div className={clsx(styles.controls, 'grid grid-cols-3 gap-4')}>
      {!splashScreen && (
        <div>
          <div className={clsx(styles.score, gameOver && styles.finalScore)}>
            <p>
              {gameOver ? 'Final score: ' : 'Score: '}
              <strong>{score.toFixed(0)}</strong>
            </p>
          </div>
        </div>
      )}
      <div>
        {!splashScreen && (
          <p className={styles.round}>
            Round <strong>{roundToDisplay}</strong> of <strong>{citiesPerGame}</strong>
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
              You missed <strong>{getCityToDisplay()}</strong>
            </p>
            <p>
              {distanceToDisplay ? (
                <span>
                  by<strong> {distanceToDisplay.toFixed(2)}</strong> km
                </span>
              ) : (
                <span>completely!</span>
              )}
            </p>
            {statsToDisplay}
          </div>
        )}
      </div>
      {pause && !gameOver && (
        <div>
          <Button onClick={nextCity} className="rounded bg-emerald-600 py-2 px-4 text-sm text-white data-[hover]:bg-emerald-500 data-[active]:bg-emerald-700 transition">
            Next city
          </Button>
        </div>
      )}
    </div>
  );
};

export default Controls;
