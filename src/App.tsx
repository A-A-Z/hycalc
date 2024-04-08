import { useId, useMemo } from 'react'

import { Page } from 'features/page'
import { Calendar } from 'features/calendar'
import { Title  } from 'features/title'
import { DateRecordsProvider } from 'features/records'
import { getYearAndMonth } from 'lib/date'

// import themes and global styles and vars
import 'global/assets/reset.css'
import 'global/assets/layout.css'
import 'global/assets/app.css'
import 'global/assets/common.css'
import 'global/assets/themes/theme-dark.css'

function App() {
  const gridId = useId()
  const { year, month } = useMemo(() => getYearAndMonth(0), [])

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
