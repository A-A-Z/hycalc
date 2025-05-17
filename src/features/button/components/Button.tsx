import clsx from 'clsx'
import '../assets/btn.css'

import type { FC } from 'react'
import type { ButtonProps } from '../types'

export const Button: FC<ButtonProps> = ({ children, className, ref, size = 'normal', ...props }) => (
  <button
    ref={ref}
    className={clsx('btn', `btn--${size}`, className)}
    type="button"
    {...props}
  >
    {children}
  </button>
)
