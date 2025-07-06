import type { Ref, ReactNode } from 'react'

export interface ModalProps {
  ref?: Ref<HTMLDialogElement>
  id?: string
  title: string
  children: ReactNode
  onClose?: () => void
}

export interface ModalContextValues {
  onClose?: () => void
}

export interface ModalProviderProps extends ModalContextValues {
  children: ReactNode
}
