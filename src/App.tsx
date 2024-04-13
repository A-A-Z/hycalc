import { useId, useMemo, useCallback, useState } from 'react'

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
  const [counter, setCounter] = useState(0)

  // get current year and month
  const { year, month } = useMemo(() => getYearAndMonth(0), [counter])

  // force a update even the user enters the page
  const onEnterPage = useCallback(() => {
    setCounter(count => count + 1)
  }, [setCounter])

  return (
    <DateRecordsProvider year={year} month={month}>
      <div onMouseEnter={onEnterPage}>
        <Page>
          <Title gridId={gridId} year={year} month={month} />
          <Calendar id={gridId} year={year} month={month} />
        </Page>
      </div>
    </DateRecordsProvider>
  )
}

export default App
