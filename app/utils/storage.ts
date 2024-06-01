import { PlayedCity } from "../store"
import { Difficulty } from "./city"

const STORE_KEY = 'cities-store'

export interface Score {
  name: string
  score: number
  mode: Difficulty
  playedCities: readonly PlayedCity[]
}

export const saveScoreToDatabase = (score: Score): void => {
  const oldScores = getScoresFromDatabase()
  return global?.window?.localStorage.setItem(STORE_KEY, JSON.stringify([...oldScores, score]))
}

export const getScoresFromDatabase = (): readonly Score[] => {
  const response = global?.window?.localStorage.getItem(STORE_KEY) || '[]'
  return JSON.parse(response);
}
