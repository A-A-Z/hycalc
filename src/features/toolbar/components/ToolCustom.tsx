import { forwardRef } from 'react'
import { useGridStatus } from 'features/status'
import { ToggleButton } from 'features/button'

import type { ToolProps } from '../types'

export const ToolCustom = forwardRef<HTMLButtonElement, ToolProps>(({ index, handleKeyDown }, ref): JSX.Element => {
  const { isCustomMode, toggleCustomMode } = useGridStatus()

  return (
    <ToggleButton
      ref={ref}
      tabIndex={index === 0 ? 0 : -1}
      onClick={() => { toggleCustomMode() }}
      onKeyDown={e => { handleKeyDown(e.key, index) }}
      isActive={isCustomMode}
    >
      Custom
    </ToggleButton>
  )
})
