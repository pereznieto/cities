import { FC, useEffect, useState } from 'react'
import { useInterval } from '../utils/hooks'
import { useStore } from '../store'
import clsx from 'clsx'

export const MILLISECONDS_PER_TURN = 5000
const TICK_SPEED = 10

const Timer: FC = () => {
  const [timeLeft, setLocalTimeLeft] = useState<number>(MILLISECONDS_PER_TURN)
  const [delay, setDelay] = useState<number | null>(TICK_SPEED)
  const isRunning = useStore(({ isRunning }) => isRunning)
  const setTimeLeft = useStore(({ setTimeLeft }) => setTimeLeft)
  const endTurn = useStore(({ endTurn }) => endTurn)

  useEffect(() => {
    if (isRunning) {
      setLocalTimeLeft(MILLISECONDS_PER_TURN)
      setDelay(TICK_SPEED)
    } else {
      setDelay(null)
    }
  }, [isRunning])

  useInterval(() => {
    if (timeLeft > 0) {
      setLocalTimeLeft(timeLeft - TICK_SPEED)
      setTimeLeft(timeLeft - TICK_SPEED)
    } else {
      endTurn()
    }
  }, delay)

  const barStyle = { width: `${((MILLISECONDS_PER_TURN - timeLeft) * 100) / MILLISECONDS_PER_TURN}%` }

  return (
    <div className="relative mb-5 h-1.5 bg-slate-300">
      <div
        className={clsx('absolute left-0 h-1.5 w-full bg-orange-500', isRunning && 'animate-redden')}
        style={barStyle}
      />
    </div>
  )
}

export default Timer
