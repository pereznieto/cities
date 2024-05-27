import React from 'react';
import * as actions from './actions';
import useGlobalHook from './GlobalHook';

export const initialState = {
  round: 1,
  currentCity: null,
  playedCities: [],
  gameOver: false,
  distance: null,
  score: 0,
  pause: null,
  isRunning: false,
  isScoreSaved: false,
  splashScreen: true,
  missedSummary: {},
  scores: [],
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
