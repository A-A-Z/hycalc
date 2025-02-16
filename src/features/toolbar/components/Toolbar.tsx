import { useRef, useCallback } from 'react'
import { useGridStatus } from 'features/status'
import { ToolCustom } from './ToolCustom'
import { ToolPlanMode } from './ToolPlanMode'
import '../assets/toolbar.css'

import type { HandleKeyDownFn } from '../types'

// Ref: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/

export const Toolbar = (): JSX.Element => {
  const toolRefs = useRef<(HTMLButtonElement | null)[]>([])
  const { gridId } = useGridStatus()

  const handleBtnArrowKey: HandleKeyDownFn = useCallback((key, index) => {
    switch (key) {
      case 'ArrowRight':
        toolRefs.current[index + 1]?.focus()
        break

      case 'ArrowLeft':
        if (index > 0) {
          toolRefs.current[index - 1]?.focus()
        }
        break

      case 'Home':
        toolRefs.current[0]?.focus()
        break

      case 'End':
        toolRefs.current[1]?.focus()
    }
  }, [])

  return (
    <ul
      role="toolbar"
      className="toolbar"
      aria-label="Calendar Toolbar"
      aria-controls={gridId}
      aria-orientation="horizontal"
    >
      <li className="toolbar__tool">
        <ToolPlanMode ref={el => { toolRefs.current[0] = el }} handleKeyDown={handleBtnArrowKey} index={0} />
      </li>
      <li className="toolbar__tool">
        <ToolCustom ref={el => { toolRefs.current[1] = el }} handleKeyDown={handleBtnArrowKey} index={1} />
      </li>
    </ul>
  )
}
