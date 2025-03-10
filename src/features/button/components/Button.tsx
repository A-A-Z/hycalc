import clsx from 'clsx'
import '../assets/btn.css'

import type { FC } from 'react'
import { ButtonProps } from '../types'

export const Button: FC<ButtonProps> = ({ children, className, ref, ...props }) => (
  <button ref={ref} className={clsx('btn', className)} type="button" {...props}>{children}</button>
)
