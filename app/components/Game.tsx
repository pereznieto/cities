'use client'

import Controls from './Controls';
import Map from './Map';
import Timer from './Timer';
import { useStore } from '../store'

const Game = () => {
  const splashScreen = useStore(({ splashScreen }) => splashScreen)

  return (
    <>
      <Map />
      <div className="text-2xl overflow-hidden">
        {!splashScreen && <Timer />}
        <Controls />
      </div>
    </>
  );
};

export default Game;
