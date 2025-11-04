import { useRef, useCallback, use } from 'react'
import { StatusContext } from 'features/status'
import { ToolCustom } from './ToolCustom'
import { ToolPlanMode } from './ToolPlanMode'
import { ToolExport } from './ToolExport'
import { ToolImport } from './ToolImport'
import '../assets/toolbar.css'

import type { FC } from 'react'
import type { ToolProps, HandleKeyDownFn } from '../types'

// Ref: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/

export const Toolbar: FC = () => {
  const toolRefs = useRef<(HTMLButtonElement | null)[]>([])
  const { gridId } = use(StatusContext)

  const handleBtnArrowKey: HandleKeyDownFn = useCallback((key, index) => {
    console.log('arrow', { key, toolRefs })
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

  const tools: Array<FC<ToolProps>> = [
    ToolPlanMode,
    ToolCustom,
    ToolExport,
    ToolImport
  ]

  return (
    <ul
      role="toolbar"
      className="toolbar"
      aria-label="Calendar Toolbar"
      aria-controls={gridId}
      aria-orientation="horizontal"
    >
      {tools.map((Tool, index) => (
        <li key={index} className="toolbar__tool">
          <Tool
            ref={el => { toolRefs.current[index] = el }}
            handleKeyDown={handleBtnArrowKey}
            index={index}
          />
        </li>
      ))}
    </ul>
  )
}
