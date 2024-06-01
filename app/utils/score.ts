import { MILLISECONDS_PER_TURN } from '../components/Timer';

const MAX_SCORE_PER_ROUND = 100;
const HALF_EARTH_CIRCUMFERENCE = 40075 / 2;

const ACCURACY_WEIGHTING = 0.8;
const TIME_WEIGHTING = 0.2;

export const normaliseAccuracyScore = (score: number) =>
  Math.round(Math.pow(score * Math.pow(MAX_SCORE_PER_ROUND, 1 / Math.E), Math.E));

export const normaliseTimeScore = (score: number) =>
  Math.round(Math.sin((score * Math.PI) / 2) * 100);

export const calculateTurnScore = (distance: number | null, timeLeft: number) => {
  if ((!distance && distance !== 0) || (!timeLeft && timeLeft !== 0)) {
    return 0;
  }
  const rawDistanceScore = (HALF_EARTH_CIRCUMFERENCE - distance) / HALF_EARTH_CIRCUMFERENCE;
  const distanceScore = normaliseAccuracyScore(rawDistanceScore);
  const rawTimeScore = timeLeft / MILLISECONDS_PER_TURN;
  const timeScore = normaliseTimeScore(rawTimeScore);
  return Math.round(distanceScore * ACCURACY_WEIGHTING + timeScore * TIME_WEIGHTING);
};
