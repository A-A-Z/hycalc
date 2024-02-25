import { Calendar } from './features/calendar'
import { DateRecordsProvider } from './features/records'

function App() {
  return (
    <DateRecordsProvider>
      <h1>HyCalc</h1>
      <Calendar year={2024} month={2} />
    </DateRecordsProvider>
  )
}

export default App
