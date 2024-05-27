import { initialState } from '.';
import { citiesPerGame, getCitiesToPlay, getDisplayName } from '../utils/city';
import {
  getDistanceBetweenTwoCoordinates,
  xToLongitude,
  yToLatitude,
} from '../utils/distance';
import { calculateTurnScore } from '../utils/score';
import { getScoresFromDatabase, saveScoreToDatabase } from '../utils/storage';

export const updateMapSize = (store, mapSize) => {
  store.setState({ mapSize });
};

export const setTimeLeft = (store, timeLeft) => {
  store.setState({ timeLeft });
};

const newGame = (store, mode, stateOverride) => {
  const citiesToPlay = getCitiesToPlay(mode);
  store.setState({
    ...stateOverride,
    mode,
    isRunning: true,
    splashScreen: false,
    citiesToPlay,
    currentCity: citiesToPlay[0],
  });
};

export const startGame = (store, mode) => newGame(store, mode, []);

export const restartGame = (store, mode) => newGame(store, mode, initialState);

export const nextCity = store => {
  if (store.state.pause && store.state.round !== citiesPerGame) {
    store.setState({ pause: null, isRunning: true, round: store.state.round + 1 });
  }
};

export const endTurn = (store, clickedCoordinate) => {
  const {
    playedCities,
    citiesToPlay,
    currentCity,
    mapSize,
    score,
    timeLeft,
    mode,
    round,
  } = store.state;
  const clicked = clickedCoordinate
    ? {
        latitude: yToLatitude(mapSize.height, clickedCoordinate.y),
        longitude: xToLongitude(mapSize.width, clickedCoordinate.x),
      }
    : null;
  const distance = clickedCoordinate
    ? getDistanceBetweenTwoCoordinates(clicked, currentCity)
    : null;
  const turnScore = calculateTurnScore(distance, timeLeft);
  const newPlayedCities = [
    ...playedCities,
    {
      ...currentCity,
      clicked,
      distance,
      score: turnScore,
      timeLeft,
      round,
    },
  ];

  const gameOver = newPlayedCities.length === citiesPerGame;

  store.setState({
    isRunning: false,
    playedCities: newPlayedCities,
    currentCity: citiesToPlay[newPlayedCities.length],
    gameOver,
    distance,
    score: score + turnScore,
    pause: {
      city: {
        name: getDisplayName(currentCity, mode),
        latitude: currentCity.latitude,
        longitude: currentCity.longitude,
      },
      score: turnScore,
      clicked,
      timeLeft,
    },
  });
};

export const saveScore = (store, name) => {
  const { score, mode, playedCities } = store.state;
  const newScore = { name, score, mode, playedCities };
  saveScoreToDatabase(newScore).then(() => {
    store.setState({ scores: [], isScoreSaved: true });
  });
};

export const getScores = store => {
  getScoresFromDatabase().then(scores => {
    store.setState({ scores });
  });
};

export const toggleRoundsResult = store => {
  store.setState({ showRoundsResult: !store.state.showRoundsResult });
};

export const updateMissedSummary = (store, city) => {
  store.setState({ missedSummary: city });
};
