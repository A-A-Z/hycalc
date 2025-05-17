import type {
  Ref,
  ButtonHTMLAttributes,
  InputHTMLAttributes
} from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>,
  size?: 'normal' | 'large'
}

export interface ButtonFileProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLButtonElement>
  isLoading?: boolean
}
