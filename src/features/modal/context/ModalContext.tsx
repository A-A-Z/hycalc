import { createContext } from 'react'
import type { ModalContextValues } from '../types'

export const ModalContext = createContext<ModalContextValues>({})
