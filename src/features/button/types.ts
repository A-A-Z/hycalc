import type {
  Ref,
  ButtonHTMLAttributes,
  InputHTMLAttributes
} from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>,
  size?: 'normal' | 'large',
  highlight?: 'onsite' | 'remote'
}

export interface ButtonFileProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLButtonElement>
  isLoading?: boolean
}
