import { useId, useState } from 'react'
import { Page } from 'features/page'
import { ConfigProvider } from 'features/config'
import { DateRecordsProvider } from 'features/records'
import { StatusProvider } from 'features/status'
import { format, DATE_FORMATS } from 'lib/date'

import type { FC, ReactNode } from 'react'

interface MainWrapperProps {
  children: ReactNode
}

export const MainWrapper: FC<MainWrapperProps> = ({ children }) => {
  const gridId = useId()
  const [dateCheck, setDateCheck] = useState(format(new Date(), DATE_FORMATS.dateKey))

  // force a update event the user enters the page on a different date
  const onEnterPage = () => {
    setDateCheck(format(new Date(), DATE_FORMATS.dateKey))
  }

  return (
    <StatusProvider gridId={gridId} dateCheck={dateCheck}>
      <ConfigProvider>
        <DateRecordsProvider>
          <div onMouseEnter={onEnterPage}>
            <Page>{children}</Page>
          </div>
        </DateRecordsProvider>
      </ConfigProvider>
    </StatusProvider>
  )
}
