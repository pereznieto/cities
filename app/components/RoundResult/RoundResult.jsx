import React from 'react';
import useGlobal from '../../store';
import { getLineBetweenTwoPoints, latitudeToY, longitudeToX } from '../../utils/distance';
import styles from './RoundResult.module.scss';

const defaultOffsetRatio = 0.05;

const getScreenCoordinates = ({ height, width }, { latitude, longitude }) => ({
  x: longitudeToX(width, longitude),
  y: latitudeToY(height, latitude),
});

const getStyle = ({ x, y }) => ({
  top: `${y - 4}px`,
  left: `${x - 4}px`,
});

const getStylePositionForScorePopup = (a, b) => {
  const xDiff = a.x - b.x;
  const yDiff = a.y - b.y;
  const xBaseOffset = xDiff * defaultOffsetRatio;
  const xOffset = xDiff > 0 ? xBaseOffset : -xBaseOffset;
  const yOffset = yDiff * defaultOffsetRatio;
  return {
    left: `${(a.x + b.x) / 2 + xOffset}px`,
    top: `${(a.y + b.y) / 2 + yOffset}px`,
  };
};

const RoundResult = ({ city, city: { latitude, longitude, clicked }, score }) => {
  const [{ gameOver, mapSize }, { updateMissedSummary }] = useGlobal();

  const updateResultSummary = () => {
    city.country && updateMissedSummary(city);
  };

  const realScreenCoordinates = getScreenCoordinates(mapSize, { latitude, longitude });
  const clickedScreenCoordinates = clicked
    ? getScreenCoordinates(mapSize, clicked)
    : null;

  return (
    <div className={styles.roundResult} onClick={updateResultSummary}>
      <div className={styles.real} style={getStyle(realScreenCoordinates)} />
      {clickedScreenCoordinates && (
        <React.Fragment>
          {!gameOver && (
            <div
              className={styles.roundScore}
              style={getStylePositionForScorePopup(
                realScreenCoordinates,
                clickedScreenCoordinates
              )}
            >
              {score}
            </div>
          )}
          <div className={styles.clicked} style={getStyle(clickedScreenCoordinates)} />
          <div
            className={styles.line}
            style={getLineBetweenTwoPoints(
              realScreenCoordinates,
              clickedScreenCoordinates
            )}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default RoundResult;
