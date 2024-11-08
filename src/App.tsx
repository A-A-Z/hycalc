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
import { Title } from 'features/title'
import { Toolbar } from 'features/toolbar'
import { ConfigProvider } from 'features/config'
import { DateRecordsProvider } from 'features/records'
import { GridStatusProvider } from 'features/status'
import { getYearAndMonth } from 'lib/date'

// import themes and global styles and vars
import 'global/assets/reset.css'
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
    setCounter(count => count + 1) // TODO bounch this
  }, [setCounter])

  return (
    <GridStatusProvider counter={counter}>
      <ConfigProvider>
        <DateRecordsProvider year={year} month={month}>
          <div onMouseEnter={onEnterPage}>
            <Page>
              <Title gridId={gridId} year={year} month={month} setMonthOffset={setMonthOffset} />
              <Calendar id={gridId} year={year} month={month} />
              <Toolbar gridId={gridId} />
            </Page>
          </div>
        </DateRecordsProvider>
      </ConfigProvider>
    </GridStatusProvider>
  )
}

export default App
