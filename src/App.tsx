import { useId } from 'react'

import { Page } from 'features/page'
import { Calendar } from 'features/calendar'
import { Title  } from 'features/title'
import { DateRecordsProvider } from 'features/records'

import 'global/assets/app.css'
import 'global/assets/themes/theme-dark.css'

function App() {
  const gridId = useId()

  // TODO: replace with real
  const year = 2024
  const month = 2

  return (
    <DateRecordsProvider year={year} month={month}>
      <Page>
        <Title gridId={gridId} year={year} month={month} />
        <Calendar id={gridId} year={year} month={month} />
      </Page>
    </DateRecordsProvider>
  )
}

export default App
