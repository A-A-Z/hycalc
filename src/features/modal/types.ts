import type { Ref, ReactNode } from 'react'

export interface ModalProps {
  ref?: Ref<HTMLDialogElement>
  id?: string
  title: string
  /** Use showModalshowModal over isOpen.  Just needed here for unit testing */
  isOpen?: boolean
  children: ReactNode
  onClose?: () => void
}

export interface ModalContextValues {
  onClose?: () => void
}

export interface ModalProviderProps extends ModalContextValues {
  children: ReactNode
}
