import clsx from 'clsx'
import '../assets/action-list.css'

import type { FC } from 'react'
import type { ActionListProps } from '../types'

export const ActionList: FC<ActionListProps> = ({ actions, align = 'right' }) => (
  <ul className={clsx('action-list', `action-list--align-${align}`)}>
    {actions
      .filter(({ isActive = true }) => isActive )
      .map(({ id, content }) => <li key={id}>{content}</li>)
    }
  </ul>
)
