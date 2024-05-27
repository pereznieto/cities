const STORE_KEY = 'cities-store'

export async function saveScoreToDatabase(score) {
  const oldScores = await getScoresFromDatabase()
  return await localStorage.setItem(STORE_KEY, JSON.stringify([...oldScores, score]))
}

export async function getScoresFromDatabase() {
  const response = await localStorage.getItem(STORE_KEY) || '[]'
  return JSON.parse(response);
}
