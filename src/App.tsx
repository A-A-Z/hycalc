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

import { useId, useCallback, useState } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { format, DATE_FORMATS } from 'lib/date'

import { Page } from 'features/page'
// import { Calendar } from 'features/calendar'
// import { Title } from 'features/title'
// import { Toolbar } from 'features/toolbar'
import { ConfigProvider } from 'features/config'
import { DateRecordsProvider } from 'features/records'
import { StatusProvider } from 'features/status'
import { CalendarView } from './views/CalendarPage'

// import themes and global styles and vars
import 'global/assets/reset.css'
import 'global/assets/app.css'
import 'global/assets/common.css'
import 'global/assets/themes/theme-dark.css'

const router = createBrowserRouter([
  {
    index: true,
    Component: CalendarView
  },
  {
    path: '/:year/:month',
    Component: CalendarView
  }
], { basename: import.meta.env.BASE_URL })

function App() {
  const gridId = useId()
  const [dateCheck, setDateCheck] = useState(format(new Date(), DATE_FORMATS.dateKey))

  // force a update event the user enters the page on a different date
  const onEnterPage = useCallback(() => {
    setDateCheck(format(new Date(), DATE_FORMATS.dateKey))
  }, [])

  return (
    <StatusProvider gridId={gridId} dateCheck={dateCheck}>
      <ConfigProvider>
        <DateRecordsProvider>
          <div onMouseEnter={onEnterPage}>
            <Page>
              {/* <Title />
              <Calendar />
              <Toolbar /> */}
              <RouterProvider router={router} />
            </Page>
          </div>
        </DateRecordsProvider>
      </ConfigProvider>
    </StatusProvider>
  )
}

export default App
