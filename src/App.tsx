import { Calendar } from 'features/calendar'
import {Title  } from 'features/title'
import { DateRecordsProvider } from 'features/records'

function App() {
  return (
    <DateRecordsProvider>
      <Title gridId="x" year={2024} month={2} />
      <Calendar year={2024} month={2} />
    </DateRecordsProvider>
  )
}

export default App
