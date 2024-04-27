import { forwardRef } from 'react'
import { Tool } from './Tool'

import type { ToolProps } from '../types'

export const ToolCustom = forwardRef<HTMLButtonElement, ToolProps>(({ index }, ref): JSX.Element => {
  return (
    <Tool
      ref={ref} 
      index={index}
      label="Custom"
      onClick={() => null}
    />
  )
})
