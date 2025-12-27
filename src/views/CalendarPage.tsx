import { useParams } from 'react-router'
import { Calendar } from 'features/calendar'
import { Title } from 'features/title'
import { Toolbar } from 'features/toolbar'

import type { FC } from 'react'

export const CalendarView: FC = () => {
  const foo = useParams()
  console.log({ foo })
  return (
    <>
      <Title />
      <Calendar />
      <Toolbar />
    </>
  )
}
