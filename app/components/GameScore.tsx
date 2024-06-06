import { FC } from 'react'
import { useStore } from '../store'
import clsx from 'clsx'

const GameScore: FC = () => {
  const score = useStore(({ score }) => score)
  const gameOver = useStore(({ gameOver }) => gameOver)

  return (
    <div
      className={clsx(
        'inline-block min-w-52 select-none rounded-md bg-orange-500 px-5 py-2.5 text-lg uppercase tracking-wide text-black md:w-1/4',
        gameOver && 'animate-pulse-orange text-4xl',
      )}
    >
      <p>
        Game score: <strong className="select-text">{score.toFixed(0)}</strong>
      </p>
    </div>
  )
}

export default GameScore
