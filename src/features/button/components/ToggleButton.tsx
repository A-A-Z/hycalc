import { Button } from './Button'
import { Toggle } from './Toggle'

import type { FC, Ref } from 'react'
import type { ButtonProps } from './Button'

interface ToggleButtonProps extends ButtonProps {
  isActive: boolean
  ref?: Ref<HTMLButtonElement>
}

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
