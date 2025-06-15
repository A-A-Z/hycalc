import type { ReactNode } from 'react'

export interface Action {
  id: string
  content: ReactNode
  isActive?: boolean
}

export interface ActionListProps {
  actions: Action[]
  align?: 'right' | 'left' | 'center'
}
