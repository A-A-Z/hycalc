import clsx from 'clsx'
import '../assets/toggle.css'

import type { FC } from 'react'

interface ToggleProps {
  isActive: boolean
}

export const Toggle: FC<ToggleProps> = ({ isActive }) => (
  <div className={clsx('toggle', isActive && 'toggle--active')} role="presentation"></div>
)
