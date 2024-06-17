import { ChangeEventHandler, FC, MouseEventHandler, PropsWithChildren } from 'react'
import { Field, Input, Label } from '@headlessui/react'

interface Props {
  id: string
  label: string
  disabled?: boolean | undefined
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

const TextInput: FC<Props> = ({ id, label, disabled, onChange }) => (
  <Field disabled={disabled} className="relative">
    <Input
      id={id}
      type="text"
      className="peer block min-h-[auto] w-full rounded border-0 bg-sky-200/90 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
      placeholder={label}
      autoComplete="off"
      onChange={onChange}
    />
    <Label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-700 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none">
      {label}
    </Label>
  </Field>
)

export default TextInput
