import React, { useEffect, useState } from 'react';
import useGlobal from '../../store';
import { useInterval } from '../../utils/hooks';
import clsx from 'clsx'

export const millisecondsPerTurn = 5000;
const tickSpeed = 10;

const Timer = () => {
  const [timeLeft, setLocalTimeLeft] = useState(millisecondsPerTurn);
  const [delay, setDelay] = useState(tickSpeed);
  const [{ isRunning }, { setTimeLeft, endTurn }] = useGlobal();

  useEffect(() => {
    if (isRunning) {
      setLocalTimeLeft(millisecondsPerTurn);
      setDelay(tickSpeed);
    } else {
      setDelay(null);
    }
  }, [isRunning]);

  useInterval(() => {
    if (timeLeft > 0) {
      setLocalTimeLeft(timeLeft - tickSpeed);
      setTimeLeft(timeLeft - tickSpeed);
    } else {
      endTurn();
    }
  }, delay);

  const barStyle = {
    width: `${((millisecondsPerTurn - timeLeft) * 100) / millisecondsPerTurn}%`,
  };

  return (
    <div className="relative mb-5 h-1.5 bg-cyan-100">
      <div className={clsx('absolute left-0 w-full h-1.5 bg-orange-500', isRunning ? 'animate-redden' : '')} style={barStyle} />
    </div>
  );
};

export default Timer;
