// import { useParams } from 'react-router'
import { Calendar } from 'features/calendar'
import { Title } from 'features/title'
import { Toolbar } from 'features/toolbar'
// import { parseMonth, parseYear } from 'global/utils'
import { MainWrapper } from './MainWrapper'

import type { FC } from 'react'

// type CalendarViewParams = Record<'year' | 'month', string>

export const CalendarView: FC = () => {
  // const {
  //   month,
  //   year
  // } = useParams<CalendarViewParams>()
  // const yearClean = parseYear(year)
  // const monthClean = parseMonth(month)
  // console.log({ month, year, monthClean, yearClean })
  return (
    <MainWrapper>
      <Title />
      <Calendar />
      <Toolbar />
    </MainWrapper>
  )
}
