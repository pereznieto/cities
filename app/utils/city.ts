import { allCities } from '../cities/allCities';
import { popularCities } from '../cities/popularCities';
import { sample } from './sample'

export const CITIES_PER_GAME = 10; // Minimum 3
export enum Difficulty {
  Easy = 'easy',
  Normal = 'normal',
  Hard = 'hard',
}
export const difficulties = Object.values(Difficulty)

interface RawCity {
  n: string // Name
  c: string // Country
  p: number // Population
  lt: number // Latitude
  lg: number // Longitude
}

export interface City {
  id: number
  name: string
  country: string
  population: number
  latitude: number
  longitude: number
}

const getNumberOfEasyCitiesForNormal = (total: number): number => (total < 6 ? 1 : 3)

export const getCitiesToPlay = (difficulty: Difficulty): readonly City[] => {
  const getNewCity = (cities: readonly City[], cityDifficulty: Difficulty | 'harder') => [
    ...cities,
    { ...getCity(cityDifficulty)(cities.map(({ id }) => id)), difficulty: cityDifficulty },
  ];
  const emptyArray = Array(CITIES_PER_GAME).fill({})
  if (difficulty === Difficulty.Normal) {
    return emptyArray.reduce<readonly City[]>((cities, _, index) => {
      if (index < getNumberOfEasyCitiesForNormal(CITIES_PER_GAME)) {
        return getNewCity(cities, Difficulty.Easy);
      } else if (index < CITIES_PER_GAME - 1) {
        return getNewCity(cities, Difficulty.Normal);
      } else {
        return getNewCity(cities, 'harder');
      }
    }, []);
  } else {
    return emptyArray.reduce<readonly City[]>(cities => getNewCity(cities, difficulty), []);
  }
};

export const getCity = (difficulty: Difficulty | 'harder'): (playedIds: readonly number[]) => City => {
  switch (difficulty) {
    case Difficulty.Easy:
      return getRandomPopularCity;
    case Difficulty.Normal:
      return getRandomCity(1000000);
    case Difficulty.Hard:
      return getRandomCity(100000);
    case 'harder':
      return getRandomCity(100000, 1000000);
    default:
      return () => sample(getCities(allCities));
  }
};

export const getRandomCity = (
  minimumPopulation: number,
  maximumPopulation = 100000000
) => (playedIds: readonly number[]): City => {
  const unplayedCities = getCities(allCities).filter(
    ({ id, population }) =>
      playedIds.indexOf(id) === -1 &&
      population > minimumPopulation &&
      population < maximumPopulation
  )
  return sample(unplayedCities)
};

export const getRandomPopularCity = (playedIds: readonly number[]): City => {
  const unplayedPopularCities = getCities(allCities).filter(
    ({ id, name }) => playedIds.indexOf(id) === -1 && popularCities.includes(name)
  )
  return sample(unplayedPopularCities)
};

export const getCities = (rawCities: readonly RawCity[]): readonly City[] =>
  rawCities.map(
    ({ n: name, c: country, p: population, lt: latitude, lg: longitude }, index) => ({
      name,
      latitude,
      longitude,
      country,
      population,
      id: index,
    })
  );

export const getDisplayName = ({ name, country }: City, difficulty: Difficulty): string => (difficulty === Difficulty.Easy || isCityNameDuplicate(name)) ? `${name}, ${country}` : name

export const isCityNameDuplicate = (cityName: string): boolean =>
  getCities(allCities).reduce<readonly City[]>(
    (accumulator, current) =>
      current.name === cityName ? [...accumulator, current] : accumulator,
    []
  ).length > 1;
