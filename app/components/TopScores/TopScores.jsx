import clsx from 'clsx';
import React from 'react';
import useGlobal from '../../store';
import { difficulties } from '../../utils/city';
import styles from './TopScores.module.scss';
import { isEmpty } from '../../utils/isEmpty'

const TopScores = () => {
  const [{ scores }, { getScores }] = useGlobal();

  console.debug('scores: ', scores)

  if (isEmpty(scores)) {
    getScores();
    return <div className="mt-8 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-500 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status" />
  }

  const groupedTopScores = difficulties.map(difficulty => ({
    difficulty,
    scores: scores
      .filter(score => score.mode === difficulty)
      .sort((a, b) => (a.score > b.score ? -1 : 1))
      .slice(0, 10),
  }));

  const getTrophy = id => {
    switch (id) {
      case 0:
        return ' 🏆';
      case 1:
        return ' 🥈';
      case 2:
        return ' 🥉';
      default:
        return '';
    }
  };

  return (
    <div className={styles.scores}>
      <p className={styles.scoresText}>
        <span className={styles.emoji} role='img' aria-label='world-America-icon'>
          🌎
        </span>
        Top scores globally
        <span className={styles.emoji} role='img' aria-label='world-Europe-icon'>
          🌍
        </span>
      </p>
      <div className={styles.topScores}>
        {groupedTopScores.map(({ difficulty, scores }) => (
          <div key={difficulty} className={styles.difficulty}>
            <h3 className={clsx(styles.difficultyTitle, 'capitalize')}>{difficulty}</h3>
            {scores.map(({ name, score }, id) => (
              <div
                key={`${name}-${score}-${id}`}
                className={clsx(styles.scoreItem, { [styles.topDawg]: id === 0 })}
              >
                <span className={styles.name}>
                  {name}
                  {getTrophy(id)}
                </span>
                <span className={styles.score}>{score}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopScores;
