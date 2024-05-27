import React, { useCallback } from 'react';
import useGlobal from '../../store';
import RoundResult from '../RoundResult/RoundResult';
import Splash from '../Splash/Splash';
import styles from './Map.module.scss';

const Map = () => {
  const [
    { mapSize, splashScreen, pause, gameOver, showRoundsResult },
    { updateMapSize, endTurn },
  ] = useGlobal();

  const getMouseCoordinates = ({ clientX, clientY }) => {
    if (!gameOver && !pause && !splashScreen) {
      endTurn({
        x: clientX - mapSize.left,
        y: clientY - mapSize.top,
      });
    }
  };

  const measuredRef = useCallback(node => {
    if (node !== null) {
      const width = node.offsetWidth;
      const height = node.offsetHeight;
      const { top, left } = node.getBoundingClientRect();

      updateMapSize({
        width,
        height,
        top: top.toFixed(0),
        left: left.toFixed(0),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={measuredRef} onClick={getMouseCoordinates} className={styles.map}>
      {pause && !showRoundsResult && (
        <div className={styles.pause}>
          <RoundResult
            city={{
              latitude: pause.city.latitude,
              longitude: pause.city.longitude,
              clicked: pause.clicked,
              name: pause.city.name,
            }}
            score={pause.score}
          />
        </div>
      )}
      {(splashScreen || gameOver) && <Splash />}
    </div>
  );
};

export default Map;
