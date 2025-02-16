import { useGridStatus } from 'features/status'
import { ToggleButton } from 'features/button'

import type { FC } from 'react'
import type { ToolProps } from '../types'

export const ToolCustom: FC<ToolProps> = ({ index, handleKeyDown, ref }) => {
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
}
