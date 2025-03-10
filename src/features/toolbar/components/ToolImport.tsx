// import { use } from 'react'
// import { format } from 'lib/date'
// import { StatusContext } from 'features/status'
import { FileButton } from 'features/button'
// import { useDateRecords } from 'features/records'

import type { FC } from 'react'
import type { ToolProps } from '../types'

export const ToolImport: FC<ToolProps> = ({ index, handleKeyDown, ref, ...props }) => {
  // const { } = useDateRecords(2)

  return (
    <FileButton
      ref={ref}
      tabIndex={index === 0 ? 0 : -1}
      onKeyDown={e => { handleKeyDown(e.key, index) }}
      {...props}
    >Import</FileButton>
  )
}
