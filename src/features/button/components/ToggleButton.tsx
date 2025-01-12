import { forwardRef } from 'react'
import { Button } from './Button'
import { Toggle } from './Toggle'

import type { ButtonProps } from './Button'

interface ToggleButtonProps extends ButtonProps {
  isActive: boolean
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(({ isActive, children, ...props } , ref): JSX.Element => (
  <Button
    ref={ref} className="btn--toggle"
    {...props}
    aria-pressed={isActive}
  >
    {children}
    <Toggle isActive={isActive} />
  </Button>
))
