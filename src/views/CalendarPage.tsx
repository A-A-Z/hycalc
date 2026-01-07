import { Calendar } from 'features/calendar'
import { Title } from 'features/title'
import { Toolbar } from 'features/toolbar'
import { MainWrapper } from './MainWrapper'

import type { FC } from 'react'

export const CalendarView: FC = () => {
  return (
    <MainWrapper>
      <Title />
      <Calendar />
      <Toolbar />
    </MainWrapper>
  )
}
