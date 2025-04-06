// import { use } from 'react'
import { format } from 'lib/date'
// import { StatusContext } from 'features/status'
import { Button } from 'features/button'
import { getAllRecords } from 'features/records'

import type { FC } from 'react'
import type { ToolProps } from '../types'

export const ToolExport: FC<ToolProps> = ({ index, handleKeyDown, ref }) => {
  // const { } = useDateRecords(2)

  const downloadJSON = () => {
    const data = getAllRecords()

    // Convert the data object to a JSON string
    const jsonString = JSON.stringify(data)
    // Create a blob with the JSON string and the appropriate MIME type
    const blob = new Blob([jsonString], { type: 'application/json' })
    // Create an object URL for the blob
    const url = URL.createObjectURL(blob)

    // Create a temporary link element
    const link = document.createElement('a')
    link.href = url
    link.download = `hycalc_export_${format(new Date, 'yyyy_MM_dd')}.json` // Set the file name for the download

    // Append the link, trigger a click, then remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke the object URL to free up memory
    URL.revokeObjectURL(url);
  }

  return (
    <Button
      ref={ref}
      tabIndex={index === 0 ? 0 : -1}
      onClick={downloadJSON}
      onKeyDown={e => { handleKeyDown(e.key, index) }}
    >
      Export
    </Button>
  )
}
