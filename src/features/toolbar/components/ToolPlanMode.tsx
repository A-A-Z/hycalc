import { useGridStatus } from 'features/status'
import { ToggleButton } from 'features/button'

import type { FC } from 'react'
import type { ToolProps } from '../types'

export const ToolPlanMode: FC<ToolProps> = ({ index, handleKeyDown, ref }) => {
  const { isPlanMode, togglePlanMode } = useGridStatus()

  return (
    <ToggleButton
      ref={ref}
      tabIndex={index === 0 ? 0 : -1}
      onClick={() => { togglePlanMode() }}
      onKeyDown={e => { handleKeyDown(e.key, index) }}
      isActive={isPlanMode}
    >
      Plan mode
    </ToggleButton>
  )
}
