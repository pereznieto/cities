import React from 'react';
import styles from './RoundsResult.module.scss';
import RoundResult from '../RoundResult/RoundResult';

const RoundsResult = ({ playedCities }) => (
  <div className={styles.roundsResult}>
    {playedCities.map(city => (
      <RoundResult key={city.id} city={city} />
    ))}
  </div>
);

export default RoundsResult;
