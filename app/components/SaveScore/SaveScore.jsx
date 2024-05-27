import { Button, Field, Input, Label } from '@headlessui/react'
import React, { useState } from 'react';
import styles from './SaveScore.module.scss';
import useGlobal from '../../store';

const SaveScore = () => {
  const [{ isScoreSaved }, { saveScore }] = useGlobal();
  const [name, setName] = useState('');
  const saveNewScore = event => {
    event.preventDefault();
    saveScore(name);
  };

  return (
    <div className={styles.saveScore}>
      <div className={styles.nameWrapper}>
        <p className={styles.saveText}>Enter your name to save your score:</p>
        <Field disabled={isScoreSaved} className="relative mb-3">
          <Input
            type="text"
            id='name'
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
            placeholder="Name"
            onChange={event => void setName(event.target.value)}
          />
          <Label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none">Name</Label>
        </Field>
        <Button
          onClick={saveNewScore}
          className="rounded bg-emerald-600 mt-5 py-2 px-4 text-sm text-white data-[hover]:bg-emerald-500 data-[active]:bg-emerald-700 transition"
          disabled={isScoreSaved}
        >
          {isScoreSaved ? 'Score saved!' : 'Save score'}
        </Button>
      </div>
    </div>
  );
};

export default SaveScore;
