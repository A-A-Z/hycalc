import clsx from 'clsx'
import '../assets/btn.css'

import type { FC } from 'react'
import type { ButtonProps } from '../types'

export const Button: FC<ButtonProps> = ({
  children,
  className,
  ref,
  size = 'normal',
  highlight,
  ...props
}) => (
  <button
    ref={ref}
    className={clsx(
      'btn',
      `btn--${size}`,
      highlight !== undefined && `btn--hightligh-${highlight}`,
      className
    )}
    type="button"
    {...props}
  >
    {children}
  </button>
)
