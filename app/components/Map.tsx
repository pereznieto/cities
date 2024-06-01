import React, { FC, useCallback } from 'react'
import RoundResult from './RoundResult'
import Splash from './Splash'
import { useStore } from '../store'

const Map: FC = () => {
  const mapSize = useStore(({ mapSize }) => mapSize)
  const splashScreen = useStore(({ splashScreen }) => splashScreen)
  const pause = useStore(({ pause }) => pause)
  const gameOver = useStore(({ gameOver }) => gameOver)
  const showRoundsResult = useStore(({ showRoundsResult }) => showRoundsResult)
  const updateMapSize = useStore(({ updateMapSize }) => updateMapSize)
  const endTurn = useStore(({ endTurn }) => endTurn)

  const getMouseCoordinates = ({ clientX, clientY }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!gameOver && !pause && !splashScreen) {
      endTurn({
        x: clientX - mapSize.left,
        y: clientY - mapSize.top,
      });
    }
  };

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const width = node.offsetWidth;
      const height = node.offsetHeight;
      const { top, left } = node.getBoundingClientRect();

      updateMapSize({
        width,
        height,
        top: parseInt(top.toFixed()),
        left: parseInt(left.toFixed()),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={measuredRef} onClick={getMouseCoordinates} className="relative w-screen h-[43.15vw] z-[1] mx-auto my-0 bg-[url('./assets/map.jpg')] bg-no-repeat bg-contain bg-center cursor-crosshair">
      {pause && !showRoundsResult && (
        <div className="absolute top-0 left-0 z-[2] w-full h-full flex justify-center items-center flex-col bg-neutral-50/5 cursor-default">
          <RoundResult
            city={{
              latitude: pause.city.latitude,
              longitude: pause.city.longitude,
              clicked: pause.clicked,
            }}
          />
        </div>
      )}
      {(splashScreen || gameOver) && <Splash />}
    </div>
  );
};

export default Map;
