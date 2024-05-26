/*
* This file is part of HyCalc.
*
* HyCalc is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* HyCalc is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
  const [monthOffset, setMonthOffset] = useState(0)
  const [counter, setCounter] = useState(0)

  // get current year and month
  const { year, month } = useMemo(() => getYearAndMonth(monthOffset), [counter, monthOffset])

  // force a update even the user enters the page
  const onEnterPage = useCallback(() => {
    setCounter(count => count + 1)
  }, [setCounter])

  const onClick = useCallback(() => {
    setMonthOffset(value => value - 1)
  }, [setMonthOffset])

  return (
    <DateRecordsProvider year={year} month={month}>
      <div onMouseEnter={onEnterPage}>
        <Page>
          <button onClick={onClick}>- {monthOffset}</button>
          <Title gridId={gridId} year={year} month={month} />
          <Calendar id={gridId} year={year} month={month} />
        </Page>
      </div>
    </DateRecordsProvider>
  )
}

export default App
