import { FC, useState } from 'react'
import { Button, Field, Input, Label } from '@headlessui/react'
import { useStore } from '../store'

const SaveScore: FC = () => {
  const isScoreSaved = useStore(({ isScoreSaved }) => isScoreSaved)
  const saveScore = useStore(({ saveScore }) => saveScore)
  const [name, setName] = useState<string>('')
  const saveNewScore = () => void saveScore(name)

  return (
    <div>
      <div className="mt-12">
        <p className=" mt-0 mb-2.5 mx-0 text-2xl">Enter your name to save your score:</p>
        <Field disabled={isScoreSaved} className="relative mb-3">
          <Input
            type="text"
            id='name'
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
            placeholder="Name"
            onChange={({ target }) => void setName(target.value)}
          />
          <Label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none">Name</Label>
        </Field>
        <Button
          onClick={saveNewScore}
          className="rounded bg-green-600 mt-5 py-2 px-4 text-sm text-white data-[hover]:bg-green-500 data-[active]:bg-green-700 transition"
          disabled={isScoreSaved}
        >
          {isScoreSaved ? 'Score saved!' : 'Save score'}
        </Button>
      </div>
    </div>
  );
};

export default SaveScore;
