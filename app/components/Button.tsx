import { FC, MouseEventHandler, PropsWithChildren } from 'react'
import { Button as HeadlessButton } from '@headlessui/react'
import clsx from 'clsx'

interface Props extends PropsWithChildren {
  color?: 'green' | 'sky'
  disabled?: boolean | undefined
  rounded?: boolean
  className?: string
  title?: string
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
}

const Button: FC<Props> = ({ children, disabled, className, color = 'green', rounded = true, title, onClick }) => {
  const background = `bg-${color}-600 data-[active]:bg-${color}-700 data-[hover]:bg-${color}-500 data-[disabled]:bg-${color}-400`
  const classes = clsx(
    'text-white transition shadow-md hover:shadow-lg data-[disabled]:cursor-not-allowed',
    background,
    rounded ? 'rounded-full' : 'rounded',
    className,
  )
  const rippleProps = classes.includes('absolute')
    ? {}
    : {
        ['data-twe-ripple-init']: true,
        ['data-twe-ripple-color']: 'light',
      }

  return (
    <HeadlessButton onClick={onClick} className={classes} disabled={disabled} title={title} {...rippleProps}>
      {children}
    </HeadlessButton>
  )
}

export default Button
