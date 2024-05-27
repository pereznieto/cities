import { millisecondsPerTurn } from '../components/Timer/Timer';

const maxScorePerRound = 100;
const halfEarthCircumference = 40075 / 2;

const accuracyWeighting = 0.8;
const timeWeighting = 0.2;

export const normaliseAccuracyScore = score =>
  Math.round(Math.pow(score * Math.pow(maxScorePerRound, 1 / Math.E), Math.E));

export const normaliseTimeScore = score =>
  Math.round(Math.sin((score * Math.PI) / 2) * 100);

export const calculateTurnScore = (distance, timeLeft) => {
  if ((!distance && distance !== 0) || (!timeLeft && timeLeft !== 0)) {
    return 0;
  }
  const rawDistanceScore = (halfEarthCircumference - distance) / halfEarthCircumference;
  const distanceScore = normaliseAccuracyScore(rawDistanceScore);
  const rawTimeScore = timeLeft / millisecondsPerTurn;
  const timeScore = normaliseTimeScore(rawTimeScore);
  return Math.round(distanceScore * accuracyWeighting + timeScore * timeWeighting);
};
