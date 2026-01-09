import { useId, useRef } from 'react'
import { useNavigate } from 'react-router'
import { Page } from 'features/page'
import { ConfigProvider } from 'features/config'
import { DateRecordsProvider } from 'features/records'
import { StatusProvider } from 'features/status'
import { isSameDay } from 'lib/date'

import type { FC, ReactNode, MouseEventHandler } from 'react'

interface MainWrapperProps {
  children: ReactNode
}

export const MainWrapper: FC<MainWrapperProps> = ({ children }) => {
  const navigate = useNavigate()
  const gridId = useId()
  const renderDate = useRef(new Date())

  const onEnterPage: MouseEventHandler<HTMLDivElement> = () => {
    const currentDate = new Date()
    if (!isSameDay(renderDate.current, currentDate)) {
      // if not the same date as first rendered then go to today
      renderDate.current = currentDate
      navigate('/')
    }
  }

  return (
    <StatusProvider gridId={gridId}>
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
