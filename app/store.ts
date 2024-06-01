import { create } from 'zustand'
import { CITIES_PER_GAME, City, Difficulty, getCitiesToPlay, getDisplayName } from './utils/city'
import { Score, getScoresFromDatabase, saveScoreToDatabase } from './utils/storage'
import { Coordinates, getDistanceBetweenTwoCoordinates, xToLongitude, yToLatitude } from './utils/distance'
import { calculateTurnScore } from './utils/score'

export interface MapSize {
  height: number
  width: number
  top: number
  left: number
}

export interface LatitudeLongitude {
  latitude: number
  longitude: number
}

export interface PlayedCity extends City {
  clicked: LatitudeLongitude | null
  distance: number | null
  score: number
  timeLeft: number
  round: number
}

export interface State {
  mapSize: MapSize
  mode: Difficulty
  round: number
  timeLeft: number
  currentCity: City | null
  citiesToPlay: readonly City[]
  playedCities: readonly PlayedCity[]
  distance: number | null
  score: number
  pause: null | {
    city: {
      name: string
      latitude: number
      longitude: number
    }
    score: number
    clicked: LatitudeLongitude | null
    timeLeft: number
  }
  isRunning: boolean
  gameOver: boolean
  splashScreen: boolean
  showRoundsResult: boolean
  isScoreSaved: boolean
  scores: readonly Score[]
}

interface Actions {
  updateMapSize(mapSize: State['mapSize']): void
  setTimeLeft(timeLeft: State['timeLeft']): void
  startGame(mode: State['mode']): void
  restartGame(mode: State['mode']): void
  endTurn(clickedCoordinate?: Coordinates): void
  saveScore(name: string): void
  nextCity(): void
  getScores(): void
  toggleRoundsResult(): void
}

export const initialState: State = {
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
  scores: [],
  mapSize: { height: 0, width: 0, top: 0, left: 0 },
  mode: Difficulty.Normal,
  timeLeft: 0,
  citiesToPlay: [],
  showRoundsResult: false,
}

export const useStore = create<State & Actions>((set) => ({
  ...initialState,
  updateMapSize: (mapSize: State['mapSize']) => set(() => ({ mapSize })),
  setTimeLeft: (timeLeft: State['timeLeft']) => set(() => ({ timeLeft })),
  startGame: (mode: State['mode']) =>
    set(() => {
      const citiesToPlay = getCitiesToPlay(mode)
      return {
        mode,
        isRunning: true,
        splashScreen: false,
        citiesToPlay,
        currentCity: citiesToPlay[0],
      }
    }),
  restartGame: (mode: State['mode']) =>
    set(() => {
      const citiesToPlay = getCitiesToPlay(mode)
      return {
        ...initialState,
        mode,
        isRunning: true,
        splashScreen: false,
        citiesToPlay,
        currentCity: citiesToPlay[0],
      }
    }),
  endTurn: (clickedCoordinate?: Coordinates) =>
    set((state) => {
      const { playedCities, citiesToPlay, currentCity, mapSize, score, timeLeft, mode, round } = state

      if (!currentCity) {
        return state
      }

      const clicked = clickedCoordinate
        ? {
            latitude: yToLatitude(mapSize.height, clickedCoordinate.y),
            longitude: xToLongitude(mapSize.width, clickedCoordinate.x),
          }
        : null
      const distance = clickedCoordinate ? getDistanceBetweenTwoCoordinates(clicked!, currentCity) : null
      const turnScore = calculateTurnScore(distance, timeLeft)
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
      ]

      const gameOver = newPlayedCities.length === CITIES_PER_GAME

      return {
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
      }
    }),
  saveScore: (name: string) =>
    set(({ scores, score, mode, playedCities }) => {
      const newScore = { name, score, mode, playedCities }
      saveScoreToDatabase(newScore)
      return { scores: [...scores, newScore], isScoreSaved: true }
    }),
  getScores: () => set(() => ({ scores: getScoresFromDatabase() })),
  nextCity: () =>
    set((state) =>
      state.pause && state.round !== CITIES_PER_GAME ? { pause: null, isRunning: true, round: state.round + 1 } : state,
    ),
  toggleRoundsResult: () => set(({ showRoundsResult }) => ({ showRoundsResult: !showRoundsResult })),
}))
