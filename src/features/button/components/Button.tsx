import { forwardRef } from 'react'
import clsx from 'clsx'
import '../assets/btn.css'

import type { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, ...props } , ref): JSX.Element => (
  <button ref={ref} className={clsx('btn', className)} type="button" {...props}>{children}</button>
))
