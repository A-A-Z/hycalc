import '../assets/action-list.css'
import type { FC, ReactNode } from 'react'

interface Action {
  id: string
  content: ReactNode
}

interface ActionListProps {
  actions: Action[]
  // children: ReactNode
}

export const ActionList: FC<ActionListProps> = ({ actions }) => {
  // console.log({ children })
  return (
    <ul className="action-list">
      {actions.map(({ id, content }) => (
        <li key={id}>{content}</li>
      ))}
    </ul>
  )
}
