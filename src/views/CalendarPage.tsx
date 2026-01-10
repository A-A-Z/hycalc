import { Calendar } from 'features/calendar'
import { Title } from 'features/title'
import { Toolbar } from 'features/toolbar'
import { format } from 'lib/date'
import { MainWrapper } from './MainWrapper'

import type { FC } from 'react'

export const CalendarView: FC = () => {
  const key = format(new Date(), 'yyyy-MM-dd')
  return (
    <MainWrapper key={key}>
      <Title />
      <Calendar key={key} />
      <Toolbar />
    </MainWrapper>
  )
}
