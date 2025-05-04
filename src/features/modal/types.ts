import type { Ref, ReactNode } from 'react'

export interface ModalProps {
  ref?: Ref<HTMLDialogElement>
  id?: string
  title: string
  children: ReactNode
  actions?: ReactNode[]
}
