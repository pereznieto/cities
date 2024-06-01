import { FC } from 'react';
import RoundResult from './RoundResult';
import { useStore } from '../store';

const RoundsResult: FC = () => {
  const playedCities = useStore(({ playedCities }) => playedCities)
  
  return (
    <div className="absolute left-0 top-0 z-[2] flex justify-center items-center flex-col w-full h-full bg-white/5 cursor-default">
      {playedCities.map(city => <RoundResult key={city.id} city={city} />)}
    </div>
  )
}

export default RoundsResult;
