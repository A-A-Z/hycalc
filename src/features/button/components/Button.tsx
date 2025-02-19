import clsx from 'clsx'
import '../assets/btn.css'

import type { FC, Ref, ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
}

export const Button: FC<ButtonProps> = ({ children, className, ref, ...props }) => (
  <button ref={ref} className={clsx('btn', className)} type="button" {...props}>{children}</button>
)
