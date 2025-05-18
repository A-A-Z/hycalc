import { ModalContext } from './ModalContext'
import type { FC } from 'react'
import type { ModalProviderProps } from '../types'

export const ModalProvider: FC<ModalProviderProps> = ({ children, ...value }) => {
  return <ModalContext value={value}>{children}</ModalContext>
}
