import { Button } from './Button'
import { Toggle } from './Toggle'

import type { FC } from 'react'
import type { ToggleButtonProps } from '../types'

export const ToggleButton: FC<ToggleButtonProps> = (({ isActive, children, ref, ...props }) => (
  <Button
    ref={ref}
    className="btn--toggle"
    {...props}
    aria-pressed={isActive}
  >
    {children}
    <Toggle isActive={isActive} />
  </Button>
))
