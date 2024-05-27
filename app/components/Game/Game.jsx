'use client'

import React from 'react';
import useGlobal from '../../store';
import Controls from '../Controls/Controls';
import Map from '../Map/Map';
import Timer from '../Timer/Timer';
import styles from './Game.module.scss';

const Game = () => {
  const [{ splashScreen }] = useGlobal();

  return (
    <React.Fragment>
      <Map />
      <div className={styles.gameMenu}>
        {!splashScreen && <Timer />}
        <Controls />
      </div>
    </React.Fragment>
  );
};

export default Game;
