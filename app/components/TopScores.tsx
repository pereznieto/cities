import clsx from 'clsx'
import React from 'react'
import { difficulties } from '../utils/city'
import { useStore } from '../store'

const TopScores = () => {
  const scores = useStore(({ scores }) => scores)
  const getScores = useStore(({ getScores }) => getScores)

  if (!scores) {
    getScores()
    return (
      <div
        className="text-surface mt-8 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-500 border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      />
    )
  }

  const groupedTopScores = difficulties.map((difficulty) => ({
    difficulty,
    scores: scores
      .filter(({ mode }) => mode === difficulty)
      .sort((a, b) => (a.score > b.score ? -1 : 1))
      .slice(0, 10),
  }))

  const getTrophy = (index: number) => {
    switch (index) {
      case 0:
        return ' 🏆'
      case 1:
        return ' 🥈'
      case 2:
        return ' 🥉'
      default:
        return ''
    }
  }

  return (
    <div className="mt-12 bg-white p-5 text-center shadow-lg">
      <p className="mx-0 mb-2.5 mt-0 text-2xl font-bold">
        <span className="mx-2.5 my-0" role="img" aria-label="world-America-icon">
          🌎
        </span>
        Top scores locally
        <span className="mx-2.5 my-0" role="img" aria-label="world-Europe-icon">
          🌍
        </span>
      </p>
      {scores.length === 0 ? (
        <div>
          <p>No scores yet…</p>
          <p>Play a game and save your score to start the leaderboard!</p>
        </div>
      ) : (
        <div className="flex max-h-[370px] overflow-x-hidden overflow-y-scroll">
          {groupedTopScores.map(({ difficulty, scores }) => (
            <div key={difficulty} className="mx-5 my-0">
              <h3 className="mb-5 capitalize">{difficulty}</h3>
              {scores.map(({ name, score }, index) => (
                <div
                  key={`${name}-${score}-${index}`}
                  className={clsx(
                    'm-2.5 flex items-center justify-between text-base',
                    index === 0 && 'text-lg font-bold',
                  )}
                >
                  <span className="mr-2.5 font-bold">
                    {name}
                    {getTrophy(index)}
                  </span>
                  <span className="font-mono font-bold">{score}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TopScores
