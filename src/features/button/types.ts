import type { Ref, ButtonHTMLAttributes, LabelHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
}

export interface ButtonFileProps extends LabelHTMLAttributes<HTMLLabelElement> {
  ref?: Ref<HTMLButtonElement>
}
