import { FC, useState } from 'react'
import { Button, Field, Input, Label } from '@headlessui/react'
import { useStore } from '../store'

const SaveScore: FC = () => {
  const isScoreSaved = useStore(({ isScoreSaved }) => isScoreSaved)
  const saveScore = useStore(({ saveScore }) => saveScore)
  const [name, setName] = useState<string>('')
  const saveNewScore = () => void saveScore(name)

  return (
    <div className="mt-8 flex items-center justify-between">
      <Field disabled={isScoreSaved} className="relative">
        <Input
          type="text"
          id="name"
          className="peer block min-h-[auto] w-full rounded border-0 bg-sky-200/90 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
          placeholder="Name"
          autoComplete="off"
          onChange={({ target }) => void setName(target.value)}
        />
        <Label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-700 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none">
          Name
        </Label>
      </Field>
      <Button
        onClick={saveNewScore}
        className="ml-5 rounded bg-sky-600 px-4 py-2 text-sm text-white transition hover:bg-sky-700 data-[disabled]:cursor-not-allowed data-[active]:bg-sky-800 data-[disabled]:bg-sky-400"
        disabled={isScoreSaved || !name}
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        {isScoreSaved ? 'Score saved!' : 'Save score'}
      </Button>
    </div>
  )
}

export default SaveScore
