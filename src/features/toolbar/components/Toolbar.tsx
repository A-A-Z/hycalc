import { useRef, useCallback, use } from 'react'
import { StatusContext } from 'features/status'
import { ToolCustom } from './ToolCustom'
import { ToolPlanMode } from './ToolPlanMode'
import { ToolExport } from './ToolExport'
import { ToolImport } from './ToolImport'
import '../assets/toolbar.css'

import type { FC } from 'react'
import type { HandleKeyDownFn } from '../types'

// Ref: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/

export const Toolbar: FC = () => {
  const toolRefs = useRef<(HTMLButtonElement | null)[]>([])
  const { gridId } = use(StatusContext)

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
      <li className="toolbar__tool">
        <ToolExport ref={el => { toolRefs.current[2] = el }} handleKeyDown={handleBtnArrowKey} index={2} />
      </li>
      <li className="toolbar__tool">
        <ToolImport ref={el => { toolRefs.current[3] = el }} handleKeyDown={handleBtnArrowKey} index={3} />
      </li>
    </ul>
  )
}
