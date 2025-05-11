import clsx from 'clsx'
import '../assets/action-list.css'
import type { FC, ReactNode } from 'react'

interface Action {
  id: string
  content: ReactNode
}

interface ActionListProps {
  actions: Action[]
  align?: 'right' | 'left'
}

export const ActionList: FC<ActionListProps> = ({ actions, align = 'right' }) => (
  <ul className={clsx('action-list', `action-list--align-${align}`)}>
    {actions.map(({ id, content }) => (
      <li key={id}>{content}</li>
    ))}
  </ul>
)
