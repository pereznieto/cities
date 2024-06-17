import { FC, useState } from 'react'
import { useStore } from '../store'
import Button from './Button'
import TextInput from './TextInput'

const SaveScore: FC = () => {
  const isScoreSaved = useStore(({ isScoreSaved }) => isScoreSaved)
  const saveScore = useStore(({ saveScore }) => saveScore)
  const [name, setName] = useState<string>('')
  const saveNewScore = () => void saveScore(name)

  return (
    <div className="mt-8 flex items-center justify-between">
      <TextInput id="name" label="Name" onChange={({ target: { value } }) => void setName(value)} />
      <Button
        onClick={saveNewScore}
        color="sky"
        className="ml-5 px-4 py-2 text-sm"
        rounded={false}
        disabled={isScoreSaved || !name}
      >
        {isScoreSaved ? 'Score saved!' : 'Save score'}
      </Button>
    </div>
  )
}

export default SaveScore
