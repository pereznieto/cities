import { allCities } from '../cities/allCities';
import { popularCities } from '../cities/popularCities';
import { sample } from './sample'

export const citiesPerGame = 10; // Minimum 3
export const Difficulty = { Easy: 'easy', Normal: 'normal', Hard: 'hard' };
export const difficulties = Object.values(Difficulty);

const getNumberOfEasyCitiesForNormal = total => (total < 6 ? 1 : 3);

export const getCitiesToPlay = difficulty => {
  const getNewCity = (cities, difficulty) => [
    ...cities,
    { ...getCity(difficulty)(cities.map(({ id }) => id)), difficulty },
  ];
  const emptyArray = Array(citiesPerGame).fill({})
  if (difficulty === Difficulty.Normal) {
    return emptyArray.reduce((cities, current, index) => {
      if (index < getNumberOfEasyCitiesForNormal(citiesPerGame)) {
        return getNewCity(cities, Difficulty.Easy);
      } else if (index < citiesPerGame - 1) {
        return getNewCity(cities, Difficulty.Normal);
      } else {
        return getNewCity(cities, 'harder');
      }
    }, []);
  } else {
    return emptyArray.reduce(cities => getNewCity(cities, difficulty), []);
  }
};

export const getCity = difficulty => {
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
  minimumPopulation,
  maximumPopulation = 100000000
) => playedIds => {
  const unplayedCities = getCities(allCities).filter(
    ({ id, population }) =>
      playedIds.indexOf(id) === -1 &&
      population > minimumPopulation &&
      population < maximumPopulation
  );
  return sample(unplayedCities);
};

export const getRandomPopularCity = playedIds => {
  const unplayedCities = getCities(allCities).filter(
    ({ id, name }) => playedIds.indexOf(id) === -1 && popularCities.includes(name)
  );
  return sample(unplayedCities);
};

export const getCities = rawCities =>
  rawCities.map(
    ({ n: name, lt: latitude, lg: longitude, c: country, p: population }, id) => ({
      name,
      latitude,
      longitude,
      country,
      population,
      id,
    })
  );

export const getDisplayName = ({ name, country }, difficulty) => {
  if (name) {
    if (difficulty === Difficulty.Easy || isCityNameDuplicate(name)) {
      return `${name}, ${country}`;
    }
    return name;
  }
};

export const isCityNameDuplicate = cityName =>
  getCities(allCities).reduce(
    (accumulator, current) =>
      current.name === cityName ? [...accumulator, current] : accumulator,
    []
  ).length > 1;
