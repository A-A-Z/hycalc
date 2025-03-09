import clsx from 'clsx'
import '../assets/btn.css'

import type { FC, Ref, ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
  variant?: 'default' | 'light'
}

const variantMap = {
  light: 'btn--colour-light'
}

export const Button: FC<ButtonProps> = ({ children, className, ref, variant = 'default', ...props }) => (
  <button ref={ref} className={clsx('btn', variant !== 'default' && variantMap[variant], className)} type="button" {...props}>{children}</button>
)
